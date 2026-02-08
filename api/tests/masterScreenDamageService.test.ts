import { describe, expect, it, vi } from "vitest";
import { MasterScreenDamageService } from "../src/master-screen/services/masterScreenDamageService";
import type { MasterScreenDamageRepository } from "../src/master-screen/repositories/masterScreenDamageRepository";

describe("MasterScreenDamageService", () => {
  it("ensures seed data before returning localized damages", async () => {
    const damages = [
      {
        die: "2d10",
        examplesFr: ["Frapper par la foudre"],
        examplesEn: ["Struck by lightning"],
        sortOrder: 2,
      },
    ];
    const ensureSeedData = vi.fn().mockResolvedValue(undefined);
    const findAll = vi.fn().mockResolvedValue(damages);

    const repository = {
      ensureSeedData,
      findAll,
    } as unknown as MasterScreenDamageRepository;

    const service = new MasterScreenDamageService(repository);
    const result = await service.getDamages("en");

    expect(result).toEqual([
      {
        die: "2d10",
        examples: ["Struck by lightning"],
        sortOrder: 2,
      },
    ]);
    expect(ensureSeedData).toHaveBeenCalledOnce();
    expect(findAll).toHaveBeenCalledOnce();
    expect(ensureSeedData.mock.invocationCallOrder[0]).toBeLessThan(
      findAll.mock.invocationCallOrder[0],
    );
  });

  it("falls back to french examples for legacy records", async () => {
    const ensureSeedData = vi.fn().mockResolvedValue(undefined);
    const findAll = vi.fn().mockResolvedValue([
      {
        die: "1d10",
        examples: ["Brûler par quelque chose"],
        sortOrder: 1,
      },
    ]);

    const repository = {
      ensureSeedData,
      findAll,
    } as unknown as MasterScreenDamageRepository;

    const service = new MasterScreenDamageService(repository);
    const result = await service.getDamages("fr");

    expect(result).toEqual([
      {
        die: "1d10",
        examples: ["Brûler par quelque chose"],
        sortOrder: 1,
      },
    ]);
  });
});
