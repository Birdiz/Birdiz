import { describe, expect, it, vi } from "vitest";
import { MasterScreenDamageService } from "../src/master-screen/services/masterScreenDamageService";
import type { MasterScreenDamageRepository } from "../src/master-screen/repositories/masterScreenDamageRepository";

describe("MasterScreenDamageService", () => {
  it("ensures seed data before returning all damages", async () => {
    const damages = [{ die: "2d10", examples: ["Lightning"], sortOrder: 2 }];
    const ensureSeedData = vi.fn().mockResolvedValue(undefined);
    const findAll = vi.fn().mockResolvedValue(damages);

    const repository = {
      ensureSeedData,
      findAll,
    } as unknown as MasterScreenDamageRepository;

    const service = new MasterScreenDamageService(repository);
    const result = await service.getDamages();

    expect(result).toEqual(damages);
    expect(ensureSeedData).toHaveBeenCalledOnce();
    expect(findAll).toHaveBeenCalledOnce();
    expect(ensureSeedData.mock.invocationCallOrder[0]).toBeLessThan(
      findAll.mock.invocationCallOrder[0],
    );
  });
});
