---
name: translation-maintenance
description: Enforce bilingual (en/fr) updates whenever UI/API text or data is changed, including locale-aware API responses and translation test coverage.
---

# Translation Maintenance

Use this skill when a change touches user-facing text, labels, metadata, or domain data that is displayed in the web app.

## Rules

1. Never ship new or changed user-facing strings in one language only.
2. Keep `en` and `fr` aligned in the same PR/commit.
3. Avoid hardcoded UI strings in components when localized message catalogs are available.
4. For locale-sensitive domain data, prefer API-layer localization over web-side wrapper translations.
5. Preserve backward compatibility for existing records when data models evolve.

## Mandatory Workflow

1. Identify impacted text surfaces:
- UI labels/headings/buttons
- SEO metadata (title/description)
- API payload text values rendered in UI

2. Update localization sources:
- Add/update both locales in `web/lib/i18n/messages.js`.
- If API data includes textual content, add locale-aware fields or locale mapping in API services/controllers.

3. Wire locale-aware delivery end-to-end:
- UI route provides locale context.
- Web clients pass locale to API when needed (`?locale=en|fr` or equivalent).
- API returns localized payload shape consumed by UI.

4. Add/update tests for both locales:
- At least one English assertion and one French assertion for impacted behavior.
- For API localization, test locale selection and default locale behavior.

5. Run validation before handoff:
- If web changed: `make lint-web`, `make typecheck-web`, `make test-web`
- If api changed: `make lint-api`, `make typecheck-api`, `make test-api`
- If both changed: `make lint`, `make typecheck`, `make test`

## Review Checklist

- [ ] No new one-language-only strings.
- [ ] `en` and `fr` catalogs updated together.
- [ ] API localization lives in API layer (not only web mapping) for domain data.
- [ ] Existing DB records remain compatible after localization model changes.
- [ ] Locale-aware tests exist and pass.
