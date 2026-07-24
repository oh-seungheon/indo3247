'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { spawn } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Constant-time comparison so auth checks don't leak timing info.
function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function readBody(req, limit = 1 << 20) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) {
        reject(new Error('payload too large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function extractToken(req, url) {
  const auth = req.headers['authorization'];
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7).trim();
  if (req.headers['x-auth-token']) return String(req.headers['x-auth-token']).trim();
  const q = url.searchParams.get('token');
  if (q) return q.trim();
  return null;
}

function collectSystemInfo() {
  const load = os.loadavg();
  const mem = { total: os.totalmem(), free: os.freemem() };
  const cpus = os.cpus();
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    uptimeSeconds: Math.round(os.uptime()),
    nodeVersion: process.version,
    user: (os.userInfo().username) || 'unknown',
    cwd: process.cwd(),
    cpu: {
      model: cpus.length ? cpus[0].model.trim() : 'unknown',
      cores: cpus.length,
    },
    loadavg: { '1m': load[0], '5m': load[1], '15m': load[2] },
    memory: {
      total: mem.total,
      free: mem.free,
      used: mem.total - mem.free,
      usedPercent: Math.round(((mem.total - mem.free) / mem.total) * 100),
    },
    time: new Date().toISOString(),
  };
}

// Resolve a requested path safely; keep browsing rooted at `root`.
function resolveInside(root, requested) {
  const target = path.resolve(root, requested || '.');
  const normRoot = path.resolve(root);
  if (target !== normRoot && !target.startsWith(normRoot + path.sep)) {
    return null;
  }
  return target;
}

function listDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const items = entries.map((e) => {
    const full = path.join(dir, e.name);
    let size = 0;
    let mtime = null;
    try {
      const st = fs.statSync(full);
      size = st.size;
      mtime = st.mtime.toISOString();
    } catch {
      /* unreadable entry — report it without stats */
    }
    return {
      name: e.name,
      type: e.isDirectory() ? 'dir' : e.isSymbolicLink() ? 'link' : 'file',
      size,
      mtime,
    };
  });
  items.sort((a, b) => {
    if (a.type === 'dir' && b.type !== 'dir') return -1;
    if (a.type !== 'dir' && b.type === 'dir') return 1;
    return a.name.localeCompare(b.name);
  });
  return items;
}

function createServer(config) {
  const { token, shell, fsRoot } = config;

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = decodeURIComponent(url.pathname);

    // ---- Static assets (public, no auth needed to fetch the shell UI) ----
    if (req.method === 'GET' && !pathname.startsWith('/api/')) {
      return serveStatic(pathname, res);
    }

    // ---- Everything under /api requires the token ----
    const provided = extractToken(req, url);
    if (!provided || !safeEqual(provided, token)) {
      return sendJson(res, 401, { error: 'unauthorized' });
    }

    try {
      if (pathname === '/api/system' && req.method === 'GET') {
        return sendJson(res, 200, collectSystemInfo());
      }

      if (pathname === '/api/exec' && req.method === 'POST') {
        const raw = await readBody(req);
        let payload = {};
        try {
          payload = JSON.parse(raw || '{}');
        } catch {
          return sendJson(res, 400, { error: 'invalid JSON body' });
        }
        return runCommand(res, shell, payload);
      }

      if (pathname === '/api/fs/list' && req.method === 'GET') {
        const requested = url.searchParams.get('path') || '.';
        const target = resolveInside(fsRoot, requested);
        if (!target) return sendJson(res, 403, { error: 'path outside root' });
        let stat;
        try {
          stat = fs.statSync(target);
        } catch {
          return sendJson(res, 404, { error: 'not found' });
        }
        if (!stat.isDirectory()) return sendJson(res, 400, { error: 'not a directory' });
        return sendJson(res, 200, {
          root: path.resolve(fsRoot),
          path: target,
          relative: path.relative(fsRoot, target) || '.',
          items: listDirectory(target),
        });
      }

      return sendJson(res, 404, { error: 'not found' });
    } catch (err) {
      return sendJson(res, 500, { error: String(err && err.message ? err.message : err) });
    }
  });

  return server;
}

function serveStatic(pathname, res) {
  let rel = pathname === '/' ? '/index.html' : pathname;
  const target = path.join(PUBLIC_DIR, path.normalize(rel));
  if (!target.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('forbidden');
  }
  fs.readFile(target, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('not found');
    }
    const ext = path.extname(target).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

// Stream command output back to the browser as Server-Sent Events.
function runCommand(res, shell, payload) {
  const command = typeof payload.command === 'string' ? payload.command.trim() : '';
  if (!command) return sendJson(res, 400, { error: 'command is required' });

  const cwd = typeof payload.cwd === 'string' && payload.cwd ? payload.cwd : process.cwd();
  const timeoutMs = Math.min(Math.max(Number(payload.timeoutMs) || 60000, 1000), 600000);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-store',
    Connection: 'keep-alive',
  });

  const send = (event, data) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  send('start', { command, cwd, shell: shell.join(' ') });

  let child;
  try {
    child = spawn(shell[0], [...shell.slice(1), command], {
      cwd,
      env: process.env,
    });
  } catch (err) {
    send('error', { message: String(err.message || err) });
    send('exit', { code: -1 });
    return res.end();
  }

  const killTimer = setTimeout(() => {
    send('error', { message: `timed out after ${timeoutMs}ms; killing process` });
    child.kill('SIGKILL');
  }, timeoutMs);

  child.stdout.on('data', (d) => send('stdout', { chunk: d.toString('utf8') }));
  child.stderr.on('data', (d) => send('stderr', { chunk: d.toString('utf8') }));
  child.on('error', (err) => send('error', { message: String(err.message || err) }));
  child.on('close', (code, signal) => {
    clearTimeout(killTimer);
    send('exit', { code, signal });
    res.end();
  });

  res.on('close', () => {
    clearTimeout(killTimer);
    if (child && !child.killed) child.kill('SIGKILL');
  });
}

module.exports = { createServer, collectSystemInfo };
