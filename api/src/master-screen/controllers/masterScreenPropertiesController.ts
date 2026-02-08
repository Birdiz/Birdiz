import type { RequestHandler } from "express";
import type { MasterScreenPropertiesService } from "../services/masterScreenPropertiesService";

interface MasterScreenPropertiesControllerOptions {
  masterScreenPropertiesService: MasterScreenPropertiesService;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

export function createMasterScreenPropertiesController({
  masterScreenPropertiesService,
}: MasterScreenPropertiesControllerOptions): RequestHandler {
  return async function masterScreenPropertiesController(_req, res): Promise<void> {
    try {
      const properties = await masterScreenPropertiesService.getPropertiesData();

      res.json(properties);
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to load master screen properties data",
        error: getErrorMessage(error),
      });
    }
  };
}
