# Development

[Back To Documentation Index](README.md)

## Local Setup

Install dependencies for both services:

```bash
make install
```

Run both services in dev mode:

```bash
make dev
```

Run services independently:

```bash
make dev-api
make dev-web
```

## Docker Setup

Run full stack:

```bash
docker compose up --build
```

Run only API service:

```bash
make docker-up-api
```

## Quality Checks

Run checks for both services:

```bash
make lint
make typecheck
make test
```

Service-specific checks:

- `make lint-api`, `make typecheck-api`, `make test-api`
- `make lint-web`, `make typecheck-web`, `make test-web`

## Related Docs

- [API Endpoints And Behavior](api.md)
- [Environment Variables And Docker Defaults](environment.md)
