---
name: readme-maintenance
description: Keep README.md and docs/ content aligned with current repository behavior, developer workflows, and deployment paths. Use when users ask to review, refresh, or correct project documentation, especially after command, tooling, endpoint, environment-variable, or architecture changes.
---

# README Maintenance Workflow

1. Inspect current sources of truth before editing README content:
- `Makefile`
- `api/package.json`
- `web/package.json`
- `docker-compose.yml`
- API routes/controllers for documented endpoints

2. Detect and fix documentation drift:
- Keep `README.md` concise and navigation-focused
- Move feature-specific and API-specific details to `docs/*.md`
- Add and maintain cross-links between docs files
- Add missing setup and run paths (Docker and local)
- Align command examples with current `make` targets
- Align quality checks with current lint, typecheck, and test commands
- Confirm endpoint paths and service URLs
- Confirm environment variables and defaults

3. Preserve readability:
- Keep README concise and task-oriented
- Prefer short sections with copy-pasteable commands
- Avoid repeating details that are already obvious from code

4. Validate after edits:
- Re-read `README.md` and verify every command/path exists
- Re-read `docs/*.md` and verify links and references are coherent
- If README includes command workflows, run representative checks when practical
- Summarize exactly what was changed and why

## Output Expectations

- Keep language concrete and current-state focused.
- Include both local and Docker instructions when both are supported.
- Document primary quality gates: lint, typecheck, and tests.
- Prefer splitting dense documentation into linked files under `docs/`.
