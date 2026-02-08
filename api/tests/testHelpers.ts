import type { Response } from "express";
import { vi } from "vitest";
import type { DatabaseClient } from "../src/db/mongoClient";
import type { MasterScreenDamageService } from "../src/services/masterScreenDamageService";

export function createMockResponse(): {
  json: ReturnType<typeof vi.fn>;
  status: ReturnType<typeof vi.fn>;
  res: Response;
} {
  const json = vi.fn();
  const status = vi.fn().mockReturnValue({ json });

  return {
    json,
    status,
    res: { json, status } as unknown as Response,
  };
}

export function createDatabaseClientMock(
  getDatabase: ReturnType<typeof vi.fn>,
): DatabaseClient {
  return { getDatabase } as unknown as DatabaseClient;
}

export function createMasterScreenDamageServiceMock(
  getDamages: ReturnType<typeof vi.fn>,
): MasterScreenDamageService {
  return { getDamages } as unknown as MasterScreenDamageService;
}
