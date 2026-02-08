import type { RequestHandler } from "express";
import type { MasterScreenDamageService } from "../services/masterScreenDamageService";

interface MasterScreenDamagesControllerOptions {
  masterScreenDamageService: MasterScreenDamageService;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

export function createMasterScreenDamagesController({
  masterScreenDamageService,
}: MasterScreenDamagesControllerOptions): RequestHandler {
  return async function masterScreenDamagesController(_req, res): Promise<void> {
    try {
      const damages = await masterScreenDamageService.getDamages();

      res.json({ damages });
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to load master screen damages",
        error: getErrorMessage(error),
      });
    }
  };
}
