#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const os = require('os');
const path = require('path');
const { createServer } = require('../src/server');

const HELP = `
remote-control — a CLI-launched, web-based remote control panel

Usage:
  remote-control [options]

Options:
  -p, --port <n>      Port to listen on            (default: 4545)
  -H, --host <addr>   Address to bind              (default: 127.0.0.1)
  -t, --token <str>   Access token (auto-generated if omitted)
      --root <dir>    Root directory for file browsing (default: cwd)
      --shell <cmd>   Shell used to run commands
                      (default: bash on POSIX, cmd.exe on Windows)
      --open          Print a ready-to-click URL with the token embedded
  -h, --help          Show this help

Security:
  Binds to 127.0.0.1 by default so it is only reachable from this machine.
  Every /api call requires the token. Exposing this on 0.0.0.0 gives anyone
  who has the token full shell access to the host — do so deliberately.
`;

function parseArgs(argv) {
  const opts = {
    port: 4545,
    host: '127.0.0.1',
    token: null,
    root: process.cwd(),
    shell: null,
    open: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    switch (a) {
      case '-p':
      case '--port':
        opts.port = parseInt(next(), 10);
        break;
      case '-H':
      case '--host':
        opts.host = next();
        break;
      case '-t':
      case '--token':
        opts.token = next();
        break;
      case '--root':
        opts.root = path.resolve(next());
        break;
      case '--shell':
        opts.shell = next();
        break;
      case '--open':
        opts.open = true;
        break;
      case '-h':
      case '--help':
        opts.help = true;
        break;
      default:
        console.error(`Unknown option: ${a}`);
        opts.help = true;
    }
  }
  return opts;
}

function defaultShell() {
  if (process.platform === 'win32') return ['cmd.exe', '/c'];
  return ['bash', '-lc'];
}

function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.help) {
    process.stdout.write(HELP);
    process.exit(0);
  }

  if (!Number.isInteger(opts.port) || opts.port < 1 || opts.port > 65535) {
    console.error('Invalid --port; must be 1-65535');
    process.exit(1);
  }

  const token = opts.token || crypto.randomBytes(18).toString('base64url');
  const shell = opts.shell ? opts.shell.split(' ') : defaultShell();

  const server = createServer({ token, shell, fsRoot: opts.root });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${opts.port} is already in use. Try --port <other>.`);
    } else {
      console.error('Server error:', err.message);
    }
    process.exit(1);
  });

  server.listen(opts.port, opts.host, () => {
    const shown = opts.host === '0.0.0.0' ? firstLanAddress() : opts.host;
    const base = `http://${shown}:${opts.port}`;
    console.log('');
    console.log('  remote-control is running');
    console.log('  ────────────────────────────────────────────');
    console.log(`  URL     : ${base}`);
    console.log(`  Token   : ${token}`);
    console.log(`  Shell   : ${shell.join(' ')}`);
    console.log(`  FS root : ${opts.root}`);
    if (opts.open) {
      console.log('');
      console.log(`  Open    : ${base}/#token=${token}`);
    }
    if (opts.host === '0.0.0.0') {
      console.log('');
      console.log('  ⚠  Bound to 0.0.0.0 — reachable from your network.');
      console.log('     Anyone with the token above gets shell access.');
    }
    console.log('');
    console.log('  Press Ctrl+C to stop.');
    console.log('');
  });

  const shutdown = () => {
    console.log('\nShutting down…');
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 2000).unref();
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

function firstLanAddress() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const net of ifaces[name] || []) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return '0.0.0.0';
}

main();
