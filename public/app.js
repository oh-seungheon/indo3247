'use strict';

(function () {
  const $ = (sel) => document.querySelector(sel);

  const el = {
    authPanel: $('#authPanel'),
    authForm: $('#authForm'),
    tokenInput: $('#tokenInput'),
    rememberToken: $('#rememberToken'),
    authError: $('#authError'),
    app: $('#app'),
    statusDot: $('#statusDot'),
    hostMeta: $('#hostMeta'),
    systemStats: $('#systemStats'),
    memFill: $('#memFill'),
    refreshBtn: $('#refreshBtn'),
    upBtn: $('#upBtn'),
    currentPath: $('#currentPath'),
    fileList: $('#fileList'),
    cmdInput: $('#cmdInput'),
    runBtn: $('#runBtn'),
    clearBtn: $('#clearBtn'),
    output: $('#output'),
    logoutBtn: $('#logoutBtn'),
  };

  const STORAGE_KEY = 'rc_token';
  let token = null;
  let currentDir = '.';
  const history = [];
  let historyIdx = -1;

  // ---- token bootstrap: URL hash > sessionStorage > localStorage ----
  function bootToken() {
    const hash = new URLSearchParams(location.hash.slice(1));
    if (hash.get('token')) {
      const t = hash.get('token');
      history.pushState && window.history.replaceState(null, '', location.pathname + location.search);
      return t;
    }
    return sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY) || null;
  }

  function authHeaders() {
    return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  }

  async function api(pathname, options = {}) {
    const res = await fetch(pathname, {
      ...options,
      headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      const e = new Error('unauthorized');
      e.unauthorized = true;
      throw e;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  function setStatus(state) {
    el.statusDot.className = 'dot' + (state === 'online' ? ' online' : state === 'error' ? ' error' : '');
    el.statusDot.title = state;
  }

  function fmtBytes(n) {
    if (!n && n !== 0) return '—';
    const u = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    let v = n;
    while (v >= 1024 && i < u.length - 1) { v /= 1024; i++; }
    return `${v.toFixed(v < 10 && i > 0 ? 1 : 0)} ${u[i]}`;
  }

  function fmtUptime(sec) {
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${d ? d + 'd ' : ''}${h}h ${m}m`;
  }

  // ---------- System ----------
  async function loadSystem() {
    try {
      const s = await api('/api/system');
      setStatus('online');
      el.hostMeta.textContent = `${s.user}@${s.hostname} · ${s.platform}/${s.arch}`;
      const rows = [
        ['Host', s.hostname],
        ['OS', `${s.platform} ${s.release}`],
        ['CPU', `${s.cpu.model} ×${s.cpu.cores}`],
        ['Load', `${s.loadavg['1m'].toFixed(2)} / ${s.loadavg['5m'].toFixed(2)} / ${s.loadavg['15m'].toFixed(2)}`],
        ['Memory', `${fmtBytes(s.memory.used)} / ${fmtBytes(s.memory.total)} (${s.memory.usedPercent}%)`],
        ['Uptime', fmtUptime(s.uptimeSeconds)],
        ['Node', s.nodeVersion],
        ['CWD', s.cwd],
      ];
      el.systemStats.innerHTML = rows
        .map(([k, v]) => `<dt>${k}</dt><dd>${escapeHtml(String(v))}</dd>`)
        .join('');
      el.memFill.style.width = `${s.memory.usedPercent}%`;
    } catch (err) {
      if (err.unauthorized) return handleUnauthorized();
      setStatus('error');
      el.systemStats.innerHTML = `<dd class="error">${escapeHtml(err.message)}</dd>`;
    }
  }

  // ---------- Files ----------
  async function loadFiles(dir) {
    try {
      const data = await api(`/api/fs/list?path=${encodeURIComponent(dir)}`);
      currentDir = data.relative;
      el.currentPath.textContent = data.path;
      const items = data.items;
      if (!items.length) {
        el.fileList.innerHTML = '<li class="muted">empty</li>';
        return;
      }
      el.fileList.innerHTML = items
        .map((it) => {
          const icon = it.type === 'dir' ? '📁' : it.type === 'link' ? '🔗' : '📄';
          const cls = it.type === 'dir' ? 'dir' : 'entry';
          const size = it.type === 'dir' ? '' : fmtBytes(it.size);
          return `<li class="${cls}" data-dir="${it.type === 'dir' ? '1' : ''}" data-name="${escapeAttr(it.name)}">
            <span class="name"><span class="icon">${icon}</span>${escapeHtml(it.name)}</span>
            <span class="size">${size}</span>
          </li>`;
        })
        .join('');
    } catch (err) {
      if (err.unauthorized) return handleUnauthorized();
      el.fileList.innerHTML = `<li class="error">${escapeHtml(err.message)}</li>`;
    }
  }

  el.fileList.addEventListener('click', (e) => {
    const li = e.target.closest('li.dir');
    if (!li) return;
    const name = li.getAttribute('data-name');
    const next = currentDir === '.' ? name : `${currentDir}/${name}`;
    loadFiles(next);
  });

  el.upBtn.addEventListener('click', () => {
    if (currentDir === '.' || currentDir === '') return;
    const parts = currentDir.split('/').filter(Boolean);
    parts.pop();
    loadFiles(parts.length ? parts.join('/') : '.');
  });

  // ---------- Command exec (SSE stream) ----------
  function appendOutput(text, cls) {
    const span = document.createElement('span');
    if (cls) span.className = cls;
    span.textContent = text;
    el.output.appendChild(span);
    el.output.scrollTop = el.output.scrollHeight;
  }

  async function runCommand(command) {
    if (!command.trim()) return;
    history.push(command);
    historyIdx = history.length;
    appendOutput(`\n$ ${command}\n`, 'meta');
    el.runBtn.disabled = true;

    try {
      const res = await fetch('/api/exec', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ command, cwd: undefined }),
      });
      if (res.status === 401) return handleUnauthorized();
      if (!res.body) {
        appendOutput('(no response body)\n', 'err');
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      // Parse the SSE stream incrementally.
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buffer.indexOf('\n\n')) !== -1) {
          const rawEvent = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          handleSseEvent(rawEvent);
        }
      }
    } catch (err) {
      appendOutput(`\n[client error] ${err.message}\n`, 'err');
    } finally {
      el.runBtn.disabled = false;
      loadSystem();
    }
  }

  function handleSseEvent(raw) {
    let event = 'message';
    let dataStr = '';
    for (const line of raw.split('\n')) {
      if (line.startsWith('event:')) event = line.slice(6).trim();
      else if (line.startsWith('data:')) dataStr += line.slice(5).trim();
    }
    let data = {};
    try { data = JSON.parse(dataStr); } catch { return; }

    switch (event) {
      case 'stdout': appendOutput(data.chunk); break;
      case 'stderr': appendOutput(data.chunk, 'err'); break;
      case 'error': appendOutput(`\n[error] ${data.message}\n`, 'err'); break;
      case 'exit': {
        const cls = data.code === 0 ? 'code0' : 'codeN';
        const sig = data.signal ? ` (signal ${data.signal})` : '';
        appendOutput(`\n[exit ${data.code}${sig}]\n`, cls);
        break;
      }
      default: break;
    }
  }

  // ---------- Command history via arrow keys ----------
  el.cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      if (historyIdx > 0) { historyIdx--; el.cmdInput.value = history[historyIdx]; e.preventDefault(); }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < history.length - 1) { historyIdx++; el.cmdInput.value = history[historyIdx]; }
      else { historyIdx = history.length; el.cmdInput.value = ''; }
      e.preventDefault();
    }
  });

  // ---------- wiring ----------
  el.runBtn.addEventListener('click', () => {
    runCommand(el.cmdInput.value);
    el.cmdInput.value = '';
  });
  el.cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { runCommand(el.cmdInput.value); el.cmdInput.value = ''; }
  });
  el.clearBtn.addEventListener('click', () => { el.output.textContent = ''; });
  el.refreshBtn.addEventListener('click', loadSystem);
  document.querySelectorAll('.chip').forEach((c) => {
    c.addEventListener('click', () => { el.cmdInput.value = c.getAttribute('data-cmd'); el.cmdInput.focus(); });
  });
  el.logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });

  el.authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    token = el.tokenInput.value.trim();
    if (!token) return;
    try {
      await api('/api/system'); // validation ping
      if (el.rememberToken.checked) localStorage.setItem(STORAGE_KEY, token);
      else sessionStorage.setItem(STORAGE_KEY, token);
      showApp();
    } catch (err) {
      el.authError.hidden = false;
      el.authError.textContent = err.unauthorized ? 'Invalid token.' : `Error: ${err.message}`;
    }
  });

  function handleUnauthorized() {
    token = null;
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setStatus('error');
    el.app.hidden = true;
    el.authPanel.hidden = false;
    el.logoutBtn.hidden = true;
    el.authError.hidden = false;
    el.authError.textContent = 'Session expired — token no longer valid.';
  }

  function showApp() {
    el.authPanel.hidden = true;
    el.app.hidden = false;
    el.logoutBtn.hidden = false;
    el.authError.hidden = true;
    loadSystem();
    loadFiles('.');
    el.cmdInput.focus();
  }

  // ---------- helpers ----------
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }

  // ---------- init ----------
  token = bootToken();
  if (token) {
    api('/api/system')
      .then(showApp)
      .catch(() => { token = null; el.authPanel.hidden = false; });
  } else {
    el.authPanel.hidden = false;
  }
})();
