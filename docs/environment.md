# Environment Variables

[Back To Documentation Index](README.md)

## API

- `PORT` (default: `4000`)
- `MONGO_URL` (default: `mongodb://localhost:27017/birdiz`)
- `CORS_ORIGIN` (default: `*`)

## Web

- `API_BASE_URL` (server-side API base URL)
- `NEXT_PUBLIC_API_BASE_URL` (browser-side API base URL)

## Docker Compose Defaults

- API service:
  - `PORT=4000`
  - `CORS_ORIGIN=http://localhost:3000`
  - `MONGO_URL=mongodb://mongo:27017/birdiz`
- Web service:
  - `API_BASE_URL=http://api:4000`
  - `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000`

## Related Docs

- [Development Setup And Commands](development.md)
- [API Endpoints And Behavior](api.md)
