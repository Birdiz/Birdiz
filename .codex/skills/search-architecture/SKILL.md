---
name: search-architecture
description: Design and implement scalable search for Birdiz/DDBuilder using a global index plus page-level refinement, with locale-aware indexing and deep links to destination pages/sections.
---

# Search Architecture

Use this skill when users ask for search, filtering, discovery, findability, command palette behavior, or DDBuilder feature parity for lookup workflows.

## Core Decision

1. Build one global search system first.
2. Add per-page filters as refinements on top of the same search backend.
3. Do not build separate per-page search engines.

## Why This Pattern

1. Users want to find data first, then navigate to where it lives.
2. DDBuilder scope will grow beyond one page/module.
3. A single index avoids duplicated matching/ranking logic.

## Required Design Rules

1. Keep one canonical search document shape across modules:
- `id`, `locale`, `module`, `section`, `entityType`, `title`, `body`, `keywords`, `href`, `anchor`, `weight`, `metadata`
2. Support locale-aware search (`en`, `fr`) and preserve language isolation in ranking.
3. Return deep-linkable results (`/{locale}/...` + section/query context).
4. Allow scoped filtering (`module`, `section`, `entityType`) without changing the core search engine.
5. Keep scoring/ranking centralized (no per-page custom rankers unless explicitly needed).

## Data And Enum Strategy

1. Inventory domain enums/taxonomies before implementation:
- locale
- module
- section
- entity type
- optional tags
2. Encode these as explicit fields in index documents.
3. Avoid implicit parsing from free-text labels when a structured field exists.

## Implementation Workflow

1. Baseline audit:
- list searchable sources in `api/src/**/data` and `web/lib/**`
- define module/section/entity mappings
2. API-first search contract:
- add search endpoint contract before UI wiring
- include pagination and filters from day one
3. Index builders per module:
- one builder for master-screen now
- additional builders for future modules
4. UI integration:
- global search entry point in shell/header/sidebar
- page consumes result context for refinement/highlighting
5. Validation:
- search service tests (ranking/filter/locale/deep link)
- web tests (open result, navigate to target page/section, locale correctness)

## Anti-Patterns

1. Per-page isolated search implementations.
2. Duplicated tokenization/matching logic in both API and web.
3. Locale-agnostic indexing that mixes `en` and `fr` terms in one ranking pass.
4. Building UI-only search first without a stable API/search contract.

## Delivery Checklist

- [ ] Global search contract defined and versioned.
- [ ] Index schema includes structured fields (module/section/entityType/locale).
- [ ] Deep links route users to exact destination context.
- [ ] Per-page filters reuse global search backend.
- [ ] Tests cover locale, ranking basics, filters, and navigation outcomes.
