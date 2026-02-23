import { Router, type RequestHandler } from "express";

interface MagicItemRouterOptions {
  magicItemListController: RequestHandler;
  magicItemDetailController: RequestHandler;
  magicItemRandomStockController: RequestHandler;
}

export function createMagicItemRouter({
  magicItemListController,
  magicItemDetailController,
  magicItemRandomStockController,
}: MagicItemRouterOptions): Router {
  const router = Router();

  router.get("/magic-items", magicItemListController);
  router.get("/magic-items/random-stock", magicItemRandomStockController);
  router.get("/magic-items/:canonicalId", magicItemDetailController);

  return router;
}
