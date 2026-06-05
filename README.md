# ⛵ ShipCheck

> **Early MVP** — A release-readiness CLI that scans your project, generates checklists, and creates Codex-friendly tasks before you ship.

---

## What is ShipCheck?

ShipCheck is an open-source Node.js CLI that answers one question before you release: **is this project actually ready to ship?**

It checks your project for common release requirements (README, LICENSE, CHANGELOG, CI, etc.) and generates:

- `RELEASE_CHECKLIST.md` — a human-friendly checklist at your repo root
- `.shipcheck/report.md` — a detailed pass/fail report
- `.codex/tasks/release-readiness.md` — structured AI-agent-friendly tasks for any failing checks

No accounts. No paid APIs. No configuration required.

---

## Installation

### Use locally (recommended during development)

```bash
git clone https://github.com/lowkeyjojo/shipcheck.git
cd shipcheck
npm install
npm run build
npm link
```

After `npm link`, the `shipcheck` command is available globally in your terminal.

### Use with npx (once published)

```bash
npx shipcheck scan
```

---

## Commands

### `shipcheck init`

Initialises ShipCheck in the current directory. Creates a `.shipcheck/config.json` file.

```bash
shipcheck init
```

---

### `shipcheck scan`

Scans the current directory and prints a pass/fail checklist to the terminal.

```bash
shipcheck scan
```

Example output:

```
  ⛵  ShipCheck v0.1.0  — Release Readiness Scanner

  Scanning /your-project ...

  ✅  README.md          README.md found
  ✅  LICENSE            LICENSE found
  ❌  CHANGELOG          No CHANGELOG file found
  ✅  .gitignore         .gitignore found
  ✅  package.json       my-project@1.0.0
  ❌  GitHub Issue Templates   .github/ISSUE_TEMPLATE/ directory not found
  ✅  GitHub Actions     2 workflow(s) found

  ─────────────────────────────────
  5 / 7 checks passed
```

To scan a different directory:

```bash
# macOS / Linux
shipcheck scan --dir /path/to/project

# Windows
shipcheck scan --dir "C:\Users\Joe\Documents\GitHub\my-project"
```

---

### `shipcheck report`

Generates `RELEASE_CHECKLIST.md` and `.shipcheck/report.md`. Runs a scan automatically if no previous scan exists.

```bash
shipcheck report
```

---

### `shipcheck codex`

Generates `.codex/tasks/release-readiness.md` — a structured task list formatted for Codex or AI agent consumption. Each failing check becomes a numbered task with a suggested fix.

```bash
shipcheck codex
```

---

## What ShipCheck checks

| Check | What it looks for |
|---|---|
| README.md | Exists and is non-empty |
| LICENSE | LICENSE or LICENSE.md exists |
| CHANGELOG | CHANGELOG.md or similar exists |
| .gitignore | .gitignore exists |
| package.json | Exists with name, version, description |
| GitHub Issue Templates | `.github/ISSUE_TEMPLATE/` with at least one file |
| GitHub Actions | `.github/workflows/` with at least one workflow |

---

## Generated files

| File | Command | Description |
|---|---|---|
| `RELEASE_CHECKLIST.md` | `shipcheck report` | Human-readable checklist |
| `.shipcheck/report.md` | `shipcheck report` | Detailed report with fix suggestions |
| `.shipcheck/last-scan.json` | `shipcheck scan` | Raw scan results cache |
| `.codex/tasks/release-readiness.md` | `shipcheck codex` | AI-agent task list |

---

## Development

```bash
npm run dev        # run without building (uses tsx)
npm run build      # compile TypeScript to dist/
npm run lint       # lint the source
```

---

## Roadmap

- [ ] CHANGELOG version format validation
- [ ] Semver version check in package.json
- [ ] GitHub release tag check
- [ ] Custom check configuration via `.shipcheck/config.json`
- [ ] HTML report output

---

## License

MIT — see [LICENSE](./LICENSE)
