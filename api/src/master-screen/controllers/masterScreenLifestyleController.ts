import type { RequestHandler } from "express";
import type { MasterScreenLifestyleService } from "../services/masterScreenLifestyleService";

interface MasterScreenLifestyleControllerOptions {
  masterScreenLifestyleService: MasterScreenLifestyleService;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

export function createMasterScreenLifestyleController({
  masterScreenLifestyleService,
}: MasterScreenLifestyleControllerOptions): RequestHandler {
  return async function masterScreenLifestyleController(_req, res): Promise<void> {
    try {
      const lifestyles = await masterScreenLifestyleService.getLifestyles();

      res.json({ lifestyles });
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to load master screen lifestyles",
        error: getErrorMessage(error),
      });
    }
  };
}
