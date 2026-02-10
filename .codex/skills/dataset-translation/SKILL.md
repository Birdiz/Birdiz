---
name: dataset-translation
description: Translate structured datasets between English and French and fill any missing locale fields while preserving schema compatibility. Use when data records, API seed content, or search keywords exist in only one language and need bilingual parity.
---

# Dataset Translation Workflow

1. Detect translatable fields in the target dataset:
- Labels and names
- Descriptions and body text
- Keyword arrays and search terms

2. Preserve compatibility before changing schema:
- Keep existing canonical fields (for example `name`, `description`) when they are already consumed.
- Add locale-specific fields (`nameEn`, `nameFr`, `descriptionEn`, `descriptionFr`) when needed.
- Ensure old records without locale fields still resolve correctly through service-level fallbacks.

3. Localize in the API layer:
- Resolve locale in controller/service (`en` or `fr`).
- Return localized values in canonical output fields consumed by the client.
- Avoid web-only translation wrappers for domain data.

4. Keep search/index inputs localized:
- Ensure indexed keywords and section labels include both locales.
- Ensure locale-specific indexing uses locale-matched labels, titles, and descriptions.

5. Validate both locales with tests:
- Add at least one `en` assertion and one `fr` assertion for the changed dataset.
- Include fallback assertions for legacy records missing locale-specific fields.

6. Run quality checks:
- API changes: `make lint-api`, `make typecheck-api`, `make test-api`
- Web changes: `make lint-web`, `make typecheck-web`, `make test-web`
- Cross-service changes: `make lint`, `make typecheck`, `make test`
