import { describe, expect, it, vi } from "vitest";
import { MasterScreenLifestyleService } from "../src/master-screen/services/masterScreenLifestyleService";
import type { MasterScreenLifestyleRepository } from "../src/master-screen/repositories/masterScreenLifestyleRepository";

describe("MasterScreenLifestyleService", () => {
  it("ensures seed data before returning lifestyles", async () => {
    const lifestyles = [{ name: "Modeste", price: "1PO/j", description: "Desc", services: [] }];
    const ensureSeedData = vi.fn().mockResolvedValue(undefined);
    const findAll = vi.fn().mockResolvedValue(lifestyles);

    const repository = {
      ensureSeedData,
      findAll,
    } as unknown as MasterScreenLifestyleRepository;

    const service = new MasterScreenLifestyleService(repository);
    const result = await service.getLifestyles();

    expect(result).toEqual(lifestyles);
    expect(ensureSeedData).toHaveBeenCalledOnce();
    expect(findAll).toHaveBeenCalledOnce();
  });
});
