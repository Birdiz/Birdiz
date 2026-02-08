# Birdiz Revamp Starter

This repo contains a dockerized stack for a Birdiz revamp:

- **Node.js API** (Express + MongoDB driver)
- **MongoDB**
- **Next.js frontend**

## Quick start

```bash
docker compose up --build
```

Services:

- API: http://localhost:4000
- Web: http://localhost:3000
- MongoDB: localhost:27017

## API endpoints

- `GET /health` - basic health check
- `GET /api/summary` - MongoDB connection summary
- `GET /api/master-screen/damages` - damage examples for the Master Screen (seeded into MongoDB)

## Notes

- The Next.js server reads `API_BASE_URL` to reach the API (for example `http://api:4000` in Docker).
- `NEXT_PUBLIC_API_BASE_URL` remains available for browser-side API calls when needed.
- The API reads `CORS_ORIGIN` to allow the frontend origin (defaults to `*`).
- Update the UI and API to match the D&D builder workflows from the original Birdiz app.
