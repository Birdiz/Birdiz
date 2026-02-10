import type { RequestHandler } from "express";
import type { MasterScreenTransportService } from "../services/masterScreenTransportService";
import { resolveLocale } from "../utils/locale";

interface MasterScreenTransportControllerOptions {
  masterScreenTransportService: MasterScreenTransportService;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

export function createMasterScreenTransportController({
  masterScreenTransportService,
}: MasterScreenTransportControllerOptions): RequestHandler {
  return async function masterScreenTransportController(req, res): Promise<void> {
    try {
      const locale = resolveLocale(req.query?.locale);
      const transport = await masterScreenTransportService.getTransportData(locale);

      res.json(transport);
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to load master screen transport data",
        error: getErrorMessage(error),
      });
    }
  };
}
