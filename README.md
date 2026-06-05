# ⛵ ShipCheck

**A release-readiness CLI that scans your project, generates checklists, and creates AI-friendly tasks before you ship.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg)](https://nodejs.org)

> Early MVP — actively being improved. Feedback and contributions welcome.

---

## What is ShipCheck?

ShipCheck is an open-source command-line tool that answers one question before you release:

**Is this project actually ready to ship?**

It scans your project folder for common release requirements — README, LICENSE, CHANGELOG, CI, and more — then generates human-readable checklists and AI-friendly task files you can act on immediately.

No accounts. No paid APIs. No cloud dashboard. Just run it in your terminal.

---

## Why it exists

Shipping a project often means juggling a mental checklist: Did I write a changelog? Is CI set up? Did I forget a license? ShipCheck turns that scattered process into a repeatable workflow.

It is especially useful when you:

- Are about to publish an npm package or open-source repo
- Want a quick release audit before tagging a version
- Need a checklist you can share with collaborators
- Want structured tasks for an AI coding agent to fix gaps

---

## Quick start

```bash
# 1. Install and build
git clone https://github.com/lowkeyjojo/shipcheck.git
cd shipcheck
npm install
npm run build
npm link

# 2. Initialise in your project (pick a preset)
cd /path/to/your-project
shipcheck init --preset node

# 3. Scan, report, and generate tasks
shipcheck scan
shipcheck report
shipcheck codex
```

ShipCheck scans the **current directory** by default. No extra configuration needed.

---

## Installation

### Option 1: Clone and link (recommended for now)

```bash
git clone https://github.com/lowkeyjojo/shipcheck.git
cd shipcheck
npm install
npm run build
npm link
```

After `npm link`, the `shipcheck` command is available globally in your terminal.

### Option 2: npx (once published to npm)

```bash
npx shipcheck scan
```

### Requirements

- Node.js 18 or later
- npm

---

## Commands

| Command | What it does |
|---|---|
| `shipcheck init` | Set up ShipCheck in the current directory and choose a preset |
| `shipcheck scan` | Scan the project and print a pass/fail checklist |
| `shipcheck report` | Generate `RELEASE_CHECKLIST.md` and `.shipcheck/report.md` |
| `shipcheck codex` | Generate `.codex/tasks/release-readiness.md` for AI agents |

### `shipcheck init`

Creates `.shipcheck/config.json` in your project. Choose a preset to tailor suggestions to your project type.

```bash
shipcheck init                    # default: generic
shipcheck init --preset node      # Node.js / npm project
shipcheck init --preset roblox    # Roblox experience
```

### `shipcheck scan`

Runs all release checks and prints results to the terminal. Saves results to `.shipcheck/last-scan.json`.

```bash
shipcheck scan

# Scan a different directory
shipcheck scan --dir /path/to/project          # macOS / Linux
shipcheck scan --dir "C:\path\to\project"      # Windows
```

### `shipcheck report`

Runs a fresh scan, then generates a checklist and detailed report. Always uses the latest project state.

```bash
shipcheck report
```

### `shipcheck codex`

Runs a fresh scan, then generates a structured task file for Codex or other AI coding agents. Failing checks become required tasks; preset suggestions become optional reminders.

```bash
shipcheck codex
```

---

## Presets

Presets add **advisory suggestions** tailored to your project type. They do not change the core checks — they add extra reminders in scan output, reports, and codex tasks.

| Preset | Best for | Adds suggestions like |
|---|---|---|
| `generic` | Any project (default) | Review README, confirm license, check for secrets |
| `node` | npm packages and CLIs | `npm pack --dry-run`, confirm scripts, CI build check |
| `roblox` | Roblox experiences | Mobile UI QA, DataStore safety, gamepass checks, admin script reminders |

```bash
shipcheck init --preset generic
shipcheck init --preset node
shipcheck init --preset roblox
```

The preset is stored in `.shipcheck/config.json`. If no config exists, `generic` is used automatically.

---

## What ShipCheck checks

These are the 7 core release checks. A failing check means something is missing or incomplete.

| Check | What it looks for |
|---|---|
| README.md | Exists and is non-empty |
| LICENSE | `LICENSE` or `LICENSE.md` exists |
| CHANGELOG | `CHANGELOG.md` or similar exists |
| .gitignore | `.gitignore` exists |
| package.json | Exists with `name`, `version`, and `description` |
| GitHub Issue Templates | `.github/ISSUE_TEMPLATE/` with at least one template |
| GitHub Actions | `.github/workflows/` with at least one workflow |

---

## Example output

```
  ⛵  ShipCheck v0.1.0  — Release Readiness Scanner

  Scanning /your-project  [preset: node]

  ✅  README.md              README.md found
  ✅  LICENSE                 LICENSE found
  ❌  CHANGELOG               No CHANGELOG file found
  ✅  .gitignore              .gitignore found
  ✅  package.json            my-project@1.0.0
  ❌  GitHub Issue Templates  .github/ISSUE_TEMPLATE/ directory not found
  ✅  GitHub Actions          1 workflow(s) found

  ─────────────────────────────────
  5 / 7 checks passed

  Node.js Preset Suggestions

  ℹ️  Confirm package.json scripts
  ℹ️  Run npm pack --dry-run
  ℹ️  Confirm README has install instructions
  ℹ️  Confirm CI runs build and lint
  ...

  ℹ️  Run `shipcheck report` to generate a full report with fix suggestions.
```

---

## Generated files

| File | Created by | Description |
|---|---|---|
| `RELEASE_CHECKLIST.md` | `shipcheck report` | Human-readable checklist at your repo root |
| `.shipcheck/report.md` | `shipcheck report` | Detailed report with fix suggestions and preset reminders |
| `.shipcheck/last-scan.json` | `shipcheck scan` | Raw scan results (used internally by report and codex) |
| `.shipcheck/config.json` | `shipcheck init` | Project config including the selected preset |
| `.codex/tasks/release-readiness.md` | `shipcheck codex` | AI-agent task list with required fixes and optional reminders |

Generated files are gitignored by default in projects that use ShipCheck.

---

## Current MVP limitations

ShipCheck is an early MVP. Here is what it does **not** do yet:

- No GitHub authentication or API calls
- No Roblox Studio or Open Cloud integration
- No web dashboard or cloud storage
- No custom check configuration (beyond presets)
- Checks are file-presence based, not content-quality based
- `package.json` check only validates `name`, `version`, and `description`

These are intentional — the goal is a simple, local, zero-dependency tool that works everywhere.

---

## Roadmap

- [ ] CHANGELOG version format validation
- [ ] Semver version check in `package.json`
- [ ] GitHub release tag check
- [ ] Custom check configuration via `.shipcheck/config.json`
- [ ] Additional presets (Python, Rust, etc.)
- [ ] HTML report output
- [ ] npm publish

---

## Contributing

Contributions are welcome. This is an early-stage open-source project and help is appreciated.

1. Fork the repo
2. Create a branch: `git checkout -b my-feature`
3. Make your changes
4. Run checks: `npm run build && npm run lint`
5. Open a pull request

Ideas for contributions:

- New presets for other project types
- Additional release checks
- Better error messages and terminal output
- Documentation improvements

See [CHANGELOG.md](./CHANGELOG.md) for release history.

---

## Development

```bash
npm run dev        # run without building (uses tsx)
npm run build      # compile TypeScript to dist/
npm run lint       # lint the source
```

---

## License

MIT — see [LICENSE](./LICENSE)
