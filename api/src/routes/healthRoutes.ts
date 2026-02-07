import { Router, type RequestHandler } from "express";

interface HealthRouterOptions {
  healthController: RequestHandler;
}

export function createHealthRouter({ healthController }: HealthRouterOptions): Router {
  const router = Router();

  router.get("/health", healthController);

  return router;
}
