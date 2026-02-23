import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";
import { resolveLocale } from "../../master-screen/utils/locale";
import type { MagicItemService } from "../services/magicItemService";

interface MagicItemControllerOptions {
  magicItemService: MagicItemService;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

function toOptionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function toPositiveInteger(value: unknown, fallback: number): number {
  if (typeof value !== "string") {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

function parseAttunement(value: unknown): "required" | "not-required" | null {
  if (value === "required" || value === "not-required") {
    return value;
  }

  return null;
}

function parseStatus(value: unknown): "active" | "inactive" | null {
  if (value === "active" || value === "inactive") {
    return value;
  }

  return null;
}

function toBoundedInteger(
  value: unknown,
  fallback: number,
  minimum: number,
  maximum: number,
): number {
  const parsed = toPositiveInteger(value, fallback);
  return Math.min(Math.max(parsed, minimum), maximum);
}

export function createMagicItemListController({
  magicItemService,
}: MagicItemControllerOptions): RequestHandler {
  return async function magicItemListController(req, res): Promise<void> {
    try {
      const locale = resolveLocale(req.query.locale);
      const limit = Math.min(toPositiveInteger(req.query.limit, 20), 5000);
      const offset = toPositiveInteger(req.query.offset, 0);

      const result = await magicItemService.getMagicItems({
        locale,
        q: toOptionalString(req.query.q) ?? "",
        rarity: toOptionalString(req.query.rarity),
        type: toOptionalString(req.query.type),
        attunement: parseAttunement(req.query.attunement),
        status: parseStatus(req.query.status),
        limit,
        offset,
      });

      res.json({
        ...result,
        limit,
        offset,
      });
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to load magic items",
        error: getErrorMessage(error),
      });
    }
  };
}

export function createMagicItemDetailController({
  magicItemService,
}: MagicItemControllerOptions): RequestHandler {
  return async function magicItemDetailController(req, res): Promise<void> {
    try {
      const locale = resolveLocale(req.query.locale);
      const canonicalId = String(req.params.canonicalId || "");
      const item = await magicItemService.getMagicItemByCanonicalId(canonicalId, locale);

      if (!item) {
        res.status(404).json({
          message: "Magic item not found",
        });

        return;
      }

      res.json({ item });
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to load magic item",
        error: getErrorMessage(error),
      });
    }
  };
}

export function createMagicItemRandomStockController({
  magicItemService,
}: MagicItemControllerOptions): RequestHandler {
  return async function magicItemRandomStockController(req, res): Promise<void> {
    try {
      const locale = resolveLocale(req.query.locale);
      const limit = toBoundedInteger(req.query.limit, 10, 1, 10);
      const status = parseStatus(req.query.status) ?? "active";
      const seed = toOptionalString(req.query.seed) ?? randomUUID();
      const result = await magicItemService.getRandomStock({
        locale,
        limit,
        status,
        seed,
      });

      res.json({
        ...result,
        limit,
      });
    } catch (error: unknown) {
      res.status(500).json({
        message: "Unable to load random stock",
        error: getErrorMessage(error),
      });
    }
  };
}
