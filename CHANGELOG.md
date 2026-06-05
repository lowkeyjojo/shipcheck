# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-05

### Added

- `shipcheck init` — initialise ShipCheck in a project directory
- `shipcheck scan` — scan the current directory for release readiness
- `shipcheck report` — generate `RELEASE_CHECKLIST.md` and `.shipcheck/report.md`
- `shipcheck codex` — generate `.codex/tasks/release-readiness.md` for AI agents
- Release readiness checks for README, LICENSE, CHANGELOG, `.gitignore`, `package.json`, GitHub issue templates, and GitHub Actions
- Cross-platform path handling (macOS and Windows)
- Clean terminal output with ship/checkmark branding

[0.1.0]: https://github.com/lowkeyjojo/shipcheck/releases/tag/v0.1.0
