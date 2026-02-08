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

## Related Docs

- [Development Setup And Commands](development.md)
- [Environment Variables And Docker Defaults](environment.md)
