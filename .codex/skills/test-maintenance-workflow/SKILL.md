---
name: test-maintenance-workflow
description: Add or update automated tests whenever code behavior changes in api or web. Use when implementing features, refactors, or bug fixes so test coverage evolves with production code and test commands are executed before handoff.
---

# Test Maintenance Workflow

Apply these rules for this repository:

1. Treat test updates as part of the same change as production code updates.
2. For behavior changes, add or update at least one test that would fail before the code change and pass after it.
3. Keep tests close to the service they validate:
`api/tests` for API tests and `web/**/*.test.jsx` (or `web/**/*.test.js`) for web tests.
4. Prefer stable assertions against behavior and outputs, not implementation details.
5. Run relevant checks before handoff and report what was executed.

## Command Guidance

- API test command:
`make test-api`
- Web test command:
`make test-web`
- Full test command:
`make test`

## Required Validation

- After API changes:
`make lint-api`, `make typecheck-api`, and `make test-api`
- After web changes:
`make lint-web`, `make typecheck-web`, and `make test-web`
- After touching both services:
`make lint`, `make typecheck`, and `make test`
