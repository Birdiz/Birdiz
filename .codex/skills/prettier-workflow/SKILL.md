---
name: prettier-workflow
description: Run Prettier through Makefile targets, verify formatting completes successfully, and report touched files concisely.
---

# Prettier Workflow

Use this skill when a user asks to format code or run Prettier.

## Rules

1. Prefer Makefile targets over direct npm commands.
2. For full-repo formatting, run `make prettier`.
3. If only one service needs formatting, use `make prettier-web` or `make prettier-api` when available.
4. If a required make target does not exist, add it in the style of existing targets before running Prettier.
5. After formatting, confirm command exit status and summarize key results.

## Verification

- If formatting changed source code, run checks for affected services:
  - `make lint-web` and `make typecheck-web` for web changes.
  - `make lint-api` and `make typecheck-api` for api changes.
- If only docs/config/format-only files changed, skip checks and state that explicitly.
