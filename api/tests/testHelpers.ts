import type { Response } from "express";
import { vi } from "vitest";
import type { DatabaseClient } from "../src/db/mongoClient";
import type { MasterScreenDamageService } from "../src/master-screen/services/masterScreenDamageService";
import type { MasterScreenTransportService } from "../src/master-screen/services/masterScreenTransportService";
import type { MasterScreenPropertiesService } from "../src/master-screen/services/masterScreenPropertiesService";
import type { MasterScreenLifestyleService } from "../src/master-screen/services/masterScreenLifestyleService";
import type { SearchService } from "../src/search/services/searchService";
import type { MagicItemService } from "../src/magic-items/services/magicItemService";

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

export function createMasterScreenTransportServiceMock(
  getTransportData: ReturnType<typeof vi.fn>,
): MasterScreenTransportService {
  return { getTransportData } as unknown as MasterScreenTransportService;
}

export function createMasterScreenPropertiesServiceMock(
  getPropertiesData: ReturnType<typeof vi.fn>,
): MasterScreenPropertiesService {
  return { getPropertiesData } as unknown as MasterScreenPropertiesService;
}

export function createMasterScreenLifestyleServiceMock(
  getLifestyles: ReturnType<typeof vi.fn>,
): MasterScreenLifestyleService {
  return { getLifestyles } as unknown as MasterScreenLifestyleService;
}

export function createSearchServiceMock(
  search: ReturnType<typeof vi.fn>,
): SearchService {
  return { search } as unknown as SearchService;
}

export function createMagicItemServiceMock(
  getMagicItems: ReturnType<typeof vi.fn>,
  getMagicItemByCanonicalId: ReturnType<typeof vi.fn>,
  getRandomStock: ReturnType<typeof vi.fn> = vi.fn(),
): MagicItemService {
  return {
    getMagicItems,
    getMagicItemByCanonicalId,
    getRandomStock,
  } as unknown as MagicItemService;
}
