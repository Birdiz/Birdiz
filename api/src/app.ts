import cors from "cors";
import express, { type RequestHandler, type Express } from "express";
import { createHealthRouter } from "./routes/healthRoutes";
import { createSummaryRouter } from "./routes/summaryRoutes";
import { createMasterScreenRouter } from "./routes/masterScreenRoutes";

interface CreateAppOptions {
  corsOrigin: string;
  healthController: RequestHandler;
  summaryController: RequestHandler;
  masterScreenDamagesController: RequestHandler;
}

export function createApp({
  corsOrigin,
  healthController,
  summaryController,
  masterScreenDamagesController,
}: CreateAppOptions): Express {
  const app = express();

  app.use(
    cors({
      origin: corsOrigin,
    }),
  );

  app.use(createHealthRouter({ healthController }));
  app.use("/api", createSummaryRouter({ summaryController }));
  app.use(
    "/api/master-screen",
    createMasterScreenRouter({ masterScreenDamagesController }),
  );

  return app;
}
