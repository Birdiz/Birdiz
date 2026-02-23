import cors from "cors";
import express, { type RequestHandler, type Express } from "express";
import { createHealthRouter } from "./routes/healthRoutes";
import { createMasterScreenRouter } from "./master-screen/routes/masterScreenRoutes";
import { createMagicItemRouter } from "./magic-items/routes/magicItemRoutes";
import { createSearchRouter } from "./search/routes/searchRoutes";

interface CreateAppOptions {
  corsOrigin: string;
  healthController: RequestHandler;
  masterScreenDamagesController: RequestHandler;
  masterScreenTransportController: RequestHandler;
  masterScreenPropertiesController: RequestHandler;
  masterScreenLifestyleController: RequestHandler;
  magicItemListController: RequestHandler;
  magicItemDetailController: RequestHandler;
  magicItemRandomStockController: RequestHandler;
  searchController: RequestHandler;
}

export function createApp({
  corsOrigin,
  healthController,
  masterScreenDamagesController,
  masterScreenTransportController,
  masterScreenPropertiesController,
  masterScreenLifestyleController,
  magicItemListController,
  magicItemDetailController,
  magicItemRandomStockController,
  searchController,
}: CreateAppOptions): Express {
  const app = express();

  app.use(
    cors({
      origin: corsOrigin,
    }),
  );

  app.use(createHealthRouter({ healthController }));
  app.use(
    "/api/master-screen",
    createMasterScreenRouter({
      masterScreenDamagesController,
      masterScreenTransportController,
      masterScreenPropertiesController,
      masterScreenLifestyleController,
    }),
  );
  app.use(
    "/api",
    createMagicItemRouter({
      magicItemListController,
      magicItemDetailController,
      magicItemRandomStockController,
    }),
  );
  app.use("/api", createSearchRouter({ searchController }));

  return app;
}
