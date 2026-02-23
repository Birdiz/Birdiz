import type { RequestHandler } from "express";
import type { MasterScreenDamageService } from "../services/masterScreenDamageService";
import { resolveLocale } from "../utils/locale";
import { getErrorMessage } from "../../utils/error";

interface MasterScreenDamagesControllerOptions {
  masterScreenDamageService: MasterScreenDamageService;
}

export function createMasterScreenDamagesController({
  masterScreenDamageService,
}: MasterScreenDamagesControllerOptions): RequestHandler {
  return async function masterScreenDamagesController(req, res): Promise<void> {
    try {
      const locale = resolveLocale(req.query.locale);
      const damages = await masterScreenDamageService.getDamages(locale);

      res.json({ damages });
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to load master screen damages",
        error: getErrorMessage(error),
      });
    }
  };
}
