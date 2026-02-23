import type { RequestHandler } from "express";
import type { MasterScreenLifestyleService } from "../services/masterScreenLifestyleService";
import { resolveLocale } from "../utils/locale";
import { getErrorMessage } from "../../utils/error";

interface MasterScreenLifestyleControllerOptions {
  masterScreenLifestyleService: MasterScreenLifestyleService;
}

export function createMasterScreenLifestyleController({
  masterScreenLifestyleService,
}: MasterScreenLifestyleControllerOptions): RequestHandler {
  return async function masterScreenLifestyleController(req, res): Promise<void> {
    try {
      const locale = resolveLocale(req.query?.locale);
      const lifestyles = await masterScreenLifestyleService.getLifestyles(locale);

      res.json({ lifestyles });
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to load master screen lifestyles",
        error: getErrorMessage(error),
      });
    }
  };
}
