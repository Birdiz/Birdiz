import type { RequestHandler } from "express";
import type { MasterScreenPropertiesService } from "../services/masterScreenPropertiesService";
import { resolveLocale } from "../utils/locale";
import { getErrorMessage } from "../../utils/error";

interface MasterScreenPropertiesControllerOptions {
  masterScreenPropertiesService: MasterScreenPropertiesService;
}

export function createMasterScreenPropertiesController({
  masterScreenPropertiesService,
}: MasterScreenPropertiesControllerOptions): RequestHandler {
  return async function masterScreenPropertiesController(req, res): Promise<void> {
    try {
      const locale = resolveLocale(req.query?.locale);
      const properties = await masterScreenPropertiesService.getPropertiesData(locale);

      res.json(properties);
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to load master screen properties data",
        error: getErrorMessage(error),
      });
    }
  };
}
