import { Router, type RequestHandler } from "express";

interface SummaryRouterOptions {
  summaryController: RequestHandler;
}

export function createSummaryRouter({ summaryController }: SummaryRouterOptions): Router {
  const router = Router();

  router.get("/summary", summaryController);

  return router;
}
