import { Router, type RequestHandler } from "express";

interface SearchRouterOptions {
  searchController: RequestHandler;
}

export function createSearchRouter({ searchController }: SearchRouterOptions): Router {
  const router = Router();
  router.get("/search", searchController);
  return router;
}
