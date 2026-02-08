import cors from "cors";
import express, { type RequestHandler, type Express } from "express";
import { createHealthRouter } from "./routes/healthRoutes";
import { createMasterScreenRouter } from "./master-screen/routes/masterScreenRoutes";

interface CreateAppOptions {
  corsOrigin: string;
  healthController: RequestHandler;
  masterScreenDamagesController: RequestHandler;
  masterScreenTransportController: RequestHandler;
  masterScreenPropertiesController: RequestHandler;
  masterScreenLifestyleController: RequestHandler;
}

export function createApp({
  corsOrigin,
  healthController,
  masterScreenDamagesController,
  masterScreenTransportController,
  masterScreenPropertiesController,
  masterScreenLifestyleController,
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

  return app;
}
