# indo3247 · remote-control

A **CLI-launched, web-based remote control panel** for a host machine.

You run one command in your terminal; it starts a small local server and serves
a browser UI that lets you inspect the machine, browse files, and run shell
commands — all streamed live. The backend has **zero runtime dependencies**
(only Node's built-in modules), and the frontend is plain **HTML / CSS / JS**.

```
┌──────────────┐        HTTP + SSE        ┌───────────────────────┐
│   Browser    │  ───────────────────▶   │  remote-control (CLI) │
│  (HTML/JS)   │  ◀───────────────────    │   Node http server    │
│  control UI  │      token-guarded       │  runs shell on host   │
└──────────────┘                          └───────────────────────┘
```

## Features

- 🖥️ **System panel** — host, OS, CPU, load, memory (with a usage meter), uptime
- 📁 **File browser** — navigate directories under a chosen root (path-traversal blocked)
- ⌨️ **Command runner** — run shell commands with **live streaming output** (stdout/stderr, exit code)
- 🕘 **Command history** — ↑/↓ in the input, plus quick-command chips
- 🔒 **Token auth** — every API call requires a token; binds to `127.0.0.1` by default

## Requirements

- Node.js **≥ 18** (no `npm install` needed — there are no dependencies)

## Usage

```bash
# from the project directory
node bin/remote-control.js

# or, after `npm link` / global install
remote-control
```

You'll see something like:

```
  remote-control is running
  ────────────────────────────────────────────
  URL     : http://127.0.0.1:4545
  Token   : k3Jd...
  Shell   : bash -lc
  FS root : /home/you/project
```

Open the URL in a browser and paste the **Token**, or launch with `--open` to
get a ready-to-click link that embeds the token in the URL hash.

### Options

| Option | Default | Description |
| --- | --- | --- |
| `-p, --port <n>` | `4545` | Port to listen on |
| `-H, --host <addr>` | `127.0.0.1` | Address to bind |
| `-t, --token <str>` | random | Access token (auto-generated if omitted) |
| `--root <dir>` | cwd | Root directory for the file browser |
| `--shell <cmd>` | `bash -lc` / `cmd.exe /c` | Shell used to run commands |
| `--open` | — | Print a click-through URL with the token embedded |
| `-h, --help` | — | Show help |

Examples:

```bash
# custom port and a fixed token, print a click-through link
node bin/remote-control.js --port 8080 --token mysecret --open

# expose to the LAN (see the warning below), rooted at /var/log
node bin/remote-control.js --host 0.0.0.0 --root /var/log
```

## API

All `/api/*` endpoints require the token via `Authorization: Bearer <token>`,
an `X-Auth-Token` header, or a `?token=` query parameter.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/system` | Host/OS/CPU/memory/load snapshot (JSON) |
| `GET` | `/api/fs/list?path=<rel>` | List a directory under the FS root (JSON) |
| `POST` | `/api/exec` | Run a command; response is an **SSE** stream |

`/api/exec` body: `{ "command": "uname -a", "cwd": "/opt", "timeoutMs": 60000 }`
(only `command` is required). The SSE stream emits `start`, `stdout`, `stderr`,
`error`, and `exit` events.

## Security

This tool runs shell commands on the host on behalf of whoever holds the token.

- It **binds to `127.0.0.1` by default**, so it is only reachable from the same
  machine.
- Every `/api` call is **token-guarded** (constant-time comparison).
- File browsing is **confined to `--root`**; path traversal (`../`) is rejected.

If you pass `--host 0.0.0.0` you make it reachable over the network, and anyone
with the token gets full shell access. Only do that deliberately, over a trusted
network, ideally behind a TLS-terminating reverse proxy. There is intentionally
no command allow-listing — this is a control panel for your own machine, not a
hardened multi-tenant service.

## Project layout

```
bin/remote-control.js   CLI entry point (arg parsing, startup banner)
src/server.js           Zero-dependency HTTP server + API handlers
public/index.html       Web control-panel markup
public/style.css        Styling (dark theme)
public/app.js           Frontend logic (auth, stats, files, exec streaming)
```

## License

MIT
