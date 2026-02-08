# API

[Back To Documentation Index](README.md)

Base URL: `http://localhost:4000`

## Endpoints

- `GET /health`
  - Returns `{ "status": "ok" }`
- `GET /api/summary`
  - Returns API + MongoDB summary (database name and collections)
- `GET /api/master-screen/damages`
  - Returns Master Screen damage examples
  - Data is seeded into MongoDB when empty

## Related Docs

- [Development Setup And Commands](development.md)
- [Environment Variables And Docker Defaults](environment.md)
