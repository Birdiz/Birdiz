import type { RequestHandler } from "express";
import type { MasterScreenTransportService } from "../services/masterScreenTransportService";
import { resolveLocale } from "../utils/locale";
import { getErrorMessage } from "../../utils/error";

interface MasterScreenTransportControllerOptions {
  masterScreenTransportService: MasterScreenTransportService;
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
