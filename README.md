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

## Notes

- The Next.js app reads `NEXT_PUBLIC_API_BASE_URL` to reach the API.
- Update the UI and API to match the D&D builder workflows from the original Birdiz app.
