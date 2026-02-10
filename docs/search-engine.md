# Search Engine Architecture

[Back To Documentation Index](README.md)

## Purpose

The search engine powers global search in DDBuilder across:

- Navigation pages (`home`, `master-screen`, `next-steps`)
- Master Screen domain content (`damages`, `transport`, `properties`, `lifestyles`)

It is designed as an in-memory, provider-based retrieval system with:

- Locale isolation (`en` and `fr`)
- Structured filtering (`module`, `section`, `entityType`)
- Deterministic ranking and facets
- Deep-link ready results (`href` + optional `anchor`)

## End-To-End Flow

1. Web UI sends `GET /api/search` with query text and locale.
2. API controller parses and normalizes query params.
3. `SearchService` asks each provider for documents for the requested locale.
4. Service applies structured filters (`module`, `section`, `entityType`).
5. Service scores documents, sorts results, paginates, and computes facets.
6. API returns `query`, `total`, `results`, and `facets`.
7. Web UI groups results by section and renders localized section labels.

## Core Components

### Route and Controller

- Route: `GET /api/search` in `api/src/search/routes/searchRoutes.ts`
- Controller: `api/src/search/controllers/searchController.ts`
- Behavior:
  - Calls `parseSearchQuery(req)`
  - Executes `searchService.search(query)`
  - Returns `500` with `{ message, error }` on unexpected errors

### Query Parsing and Normalization

Implemented in `api/src/search/utils/searchQuery.ts`.

- `q`: trimmed string (empty string allowed)
- `locale`: normalized via `resolveLocale`
  - Current behavior: `"en"` stays `en`, any other input resolves to `fr`
- `limit`: non-negative integer, default `20`, clamped to max `50`
- `offset`: non-negative integer, default `0`
- `module`, `section`, `entityType`: validated against allowlists; invalid values become `null`

### Document Providers

Providers implement `SearchDocumentProvider` (`getDocuments(locale)`):

- `NavigationSearchDocumentProvider`
  - Generates page-level records with localized labels and descriptions.
- `MasterScreenSearchDocumentProvider`
  - Generates records from domain datasets (damages, boats, mounts, buildings, maintenances, lifestyles, services).
  - Uses locale-aware section keywords:
    - `en`: `Damages`, `Transport`, `Properties`, `Lifestyles`
    - `fr`: `Dégâts`, `Transport`, `Propriétés`, `Modes de vie`

Provider wiring is centralized in `api/src/search/providers/searchProviders.ts`.

## Search Document Schema

`SearchDocument` fields are defined in `api/src/search/types/searchTypes.ts`:

- Identity and scope: `id`, `locale`, `module`, `section`, `entityType`
- Content: `title`, `body`, `keywords`
- Navigation: `href`, `anchor`
- Ranking metadata: `weight`
- Extra attributes: `metadata` (string dictionary)

## Matching and Ranking

Implemented in `api/src/search/services/searchService.ts`.

### Normalization

Before matching, values are normalized:

- Lowercased
- Unicode decomposed (`NFD`)
- Diacritics removed

This allows accent-insensitive search behavior (for example, `degats` matching `Dégâts`).

### Tokenization

The query is tokenized on non-alphanumeric separators:

- Example: `"mount price"` -> `["mount", "price"]`

### Scoring Model

Each document starts with a base `weight`, then receives boosts:

- Full-query boosts:
  - Exact title match: `+80`
  - Title starts with query: `+40`
  - Title contains query: `+20`
  - Exact keyword match: `+20`
- Per-token boosts (all tokens must match somewhere):
  - Exact title token: `+40`
  - Title starts with token: `+25`
  - Title contains token: `+12`
  - Keyword contains token: `+8`
  - Fallback token match in body/haystack: `+3`

If any token is missing from the combined haystack (`title + body + keywords`), score becomes `0` and the document is excluded.

### Sorting

Results are sorted by:

1. `score` descending
2. `weight` descending
3. `title` ascending (`localeCompare`)

## Filtering, Pagination, and Facets

### Structured Filters

Applied before ranking:

- Locale (mandatory)
- Optional `module`
- Optional `section`
- Optional `entityType`

### Pagination

- `total`: number of matches before pagination
- `results`: sliced by `offset` and `limit`

### Facets

Returned on the full scored set (not only paged results):

- `facets.modules`
- `facets.sections`
- `facets.entityTypes`

Facet values are sorted by:

1. `count` descending
2. `value` ascending

## Locale Behavior

### API Locale Resolution

Locale is resolved server-side before providers run, so results are locale-scoped by construction.

### Localized Keywords

Search relevance depends on localized `keywords` in provider documents. This is especially important for section-oriented queries in French, such as:

- `dégâts`
- `propriétés`
- `modes de vie`

## Frontend Consumption

Global search UI is implemented in `web/components/search/global-search.jsx`.

Key behaviors:

- Debounce: `220ms`
- Minimum query length: `2`
- Client cache TTL: `30s` per `locale + query`
- Request size: `limit=8`
- Results grouped by `section` and rendered with localized section labels from i18n catalogs

API requests are built in `web/lib/apiClient.js` (`fetchSearchResults`).

## Error Handling

- API controller catches unexpected errors and responds with HTTP `500`.
- Web client maps non-OK/network failures to a localized generic search error message.
- Aborted requests are explicitly ignored in UI state updates.

## Extension Guide

To add a new searchable module:

1. Add enum values in `SEARCH_MODULES`, and optionally new `SEARCH_SECTIONS`/`SEARCH_ENTITY_TYPES`.
2. Implement a new provider returning `SearchDocument[]`.
3. Register the provider in `createSearchProviders()`.
4. Add tests for:
   - Provider document generation
   - Ranking/filter behavior in `SearchService` (if scoring expectations change)
   - Controller/query parsing if new query params are introduced
5. Add localized section labels and keywords for both `en` and `fr`.

## Test Coverage

Main automated coverage lives in:

- `api/tests/searchQuery.test.ts`
- `api/tests/searchService.test.ts`
- `api/tests/navigationSearchDocumentProvider.test.ts`
- `api/tests/masterScreenSearchDocumentProvider.test.ts`
- `api/tests/searchController.test.ts`

Run API checks:

```bash
make lint-api
make typecheck-api
make test-api
```

## Related Docs

- [API Endpoints And Behavior](api.md)
- [Development Setup And Commands](development.md)
- [Environment Variables And Docker Defaults](environment.md)
