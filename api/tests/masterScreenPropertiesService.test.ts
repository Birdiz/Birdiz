import { describe, expect, it, vi } from "vitest";
import { MasterScreenPropertiesService } from "../src/master-screen/services/masterScreenPropertiesService";
import type { MasterScreenPropertiesRepository } from "../src/master-screen/repositories/masterScreenPropertiesRepository";

describe("MasterScreenPropertiesService", () => {
  it("ensures seed data before returning properties", async () => {
    const properties = { buildings: [], maintenance: [] };
    const ensureSeedData = vi.fn().mockResolvedValue(undefined);
    const findPropertiesData = vi.fn().mockResolvedValue(properties);

    const repository = {
      ensureSeedData,
      findPropertiesData,
    } as unknown as MasterScreenPropertiesRepository;

    const service = new MasterScreenPropertiesService(repository);
    const result = await service.getPropertiesData();

    expect(result).toEqual(properties);
    expect(ensureSeedData).toHaveBeenCalledOnce();
    expect(findPropertiesData).toHaveBeenCalledOnce();
  });
});
