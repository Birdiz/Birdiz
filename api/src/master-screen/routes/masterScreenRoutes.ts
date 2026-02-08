import { Router, type RequestHandler } from "express";

interface MasterScreenRouterOptions {
  masterScreenDamagesController: RequestHandler;
  masterScreenTransportController: RequestHandler;
  masterScreenPropertiesController: RequestHandler;
  masterScreenLifestyleController: RequestHandler;
}

export function createMasterScreenRouter({
  masterScreenDamagesController,
  masterScreenTransportController,
  masterScreenPropertiesController,
  masterScreenLifestyleController,
}: MasterScreenRouterOptions): Router {
  const router = Router();

  router.get("/damages", masterScreenDamagesController);
  router.get("/transport", masterScreenTransportController);
  router.get("/properties", masterScreenPropertiesController);
  router.get("/lifestyles", masterScreenLifestyleController);

  return router;
}
