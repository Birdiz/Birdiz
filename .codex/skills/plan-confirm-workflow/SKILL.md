---
name: plan-confirm-workflow
description: Plan first and request user confirmation before implementation. Use when the user wants explicit validation before code changes, risky refactors, migrations, or any multi-step change where approval is required before building.
---

# Plan Confirm Workflow

1. Clarify scope and assumptions before editing:
- Restate the requested outcome.
- Identify constraints and dependencies.
- Highlight unknowns that affect implementation.

2. Produce a concise implementation plan:
- Break work into concrete steps.
- Include affected files/services.
- Include validation strategy (lint, typecheck, tests).

3. Request explicit confirmation:
- Ask for a clear go/no-go before making file changes.
- Do not edit code before confirmation.

4. After confirmation, execute exactly the approved plan:
- If new risks appear, pause and re-confirm.
- Keep the user updated as milestones are completed.

5. Close with validation evidence:
- Report commands run and outcomes.
- List changed files and behavior impact.
