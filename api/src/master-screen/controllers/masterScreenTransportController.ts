import type { RequestHandler } from "express";
import type { MasterScreenTransportService } from "../services/masterScreenTransportService";

interface MasterScreenTransportControllerOptions {
  masterScreenTransportService: MasterScreenTransportService;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

export function createMasterScreenTransportController({
  masterScreenTransportService,
}: MasterScreenTransportControllerOptions): RequestHandler {
  return async function masterScreenTransportController(_req, res): Promise<void> {
    try {
      const transport = await masterScreenTransportService.getTransportData();

      res.json(transport);
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to load master screen transport data",
        error: getErrorMessage(error),
      });
    }
  };
}
