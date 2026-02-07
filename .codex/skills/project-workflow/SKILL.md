---
name: project-workflow
description: Use Makefile targets first (except npm dependency installs), request permission before npm installs, and always run lint + typecheck after code changes.
---

# Project Workflow

Apply these rules for this repository:

1. Prefer `make` targets instead of direct `npm` commands whenever a Makefile target exists.
2. Exception: dependency installation uses `npm install` (or `npm i`) and should not be replaced with `make`.
3. Before any `npm install` command, request escalation/permission so the install can run without stalling.
4. After any code change, run both lint and typecheck commands for the affected service(s).

## Command Guidance

- Web service checks:
  - `make lint-web`
  - `make typecheck-web`
- API service checks:
  - `make lint-api`
  - `make typecheck-api`
- Full project checks:
  - `make lint`
  - `make typecheck`

If Makefile coverage is missing for a needed check, use the closest npm script and note it.
