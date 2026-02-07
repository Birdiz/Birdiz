import { Router, type RequestHandler } from "express";

interface MasterScreenRouterOptions {
  masterScreenDamagesController: RequestHandler;
}

export function createMasterScreenRouter({
  masterScreenDamagesController,
}: MasterScreenRouterOptions): Router {
  const router = Router();

  router.get("/damages", masterScreenDamagesController);

  return router;
}
