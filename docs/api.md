# API

[Back To Documentation Index](README.md)

Base URL: `http://localhost:4000`

## Endpoints

- `GET /health`
  - Returns `{ "status": "ok" }`
- `GET /api/master-screen/damages`
  - Returns Master Screen damage examples
  - Data is seeded into MongoDB when empty
- `GET /api/master-screen/transport`
  - Returns transport references (boats, mounts, mount equipment)
- `GET /api/master-screen/properties`
  - Returns buildings and maintenance references
- `GET /api/master-screen/lifestyles`
  - Returns lifestyle references and related services
- `GET /api/search`
  - Runs global search across indexed DDBuilder modules
  - Query params:
    - `q` (string): search text
    - `locale` (`en`|`fr`): locale-scoped search
    - `module` (optional): module filter (for example `navigation`, `master-screen`)
    - `section` (optional): section filter (for example `transport`, `lifestyles`)
    - `entityType` (optional): entity filter (for example `page`, `boat`, `damage`)
    - `limit` (optional): max results per page (default `20`, max `50`)
    - `offset` (optional): pagination offset (default `0`)
  - Returns:
    - `query`: normalized query payload used by the API
    - `total`: total matching results before pagination
    - `results`: scored search documents with deep-link `href`
    - `facets`: module/section/entity counts for filter UIs

## Related Docs

- [Development Setup And Commands](development.md)
- [Environment Variables And Docker Defaults](environment.md)
- [Search Engine Architecture](search-engine.md)
