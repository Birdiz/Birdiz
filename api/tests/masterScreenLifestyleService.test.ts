import { describe, expect, it, vi } from "vitest";
import { MasterScreenLifestyleService } from "../src/master-screen/services/masterScreenLifestyleService";
import type { MasterScreenLifestyleRepository } from "../src/master-screen/repositories/masterScreenLifestyleRepository";

describe("MasterScreenLifestyleService", () => {
  it("ensures seed data before returning localized lifestyles", async () => {
    const lifestyles = [
      {
        name: "Modeste",
        nameEn: "Modest",
        nameFr: "Modeste",
        price: "1PO/j",
        description: "Desc fr",
        descriptionEn: "Desc en",
        descriptionFr: "Desc fr",
        services: [
          {
            name: "Embaucher un messager",
            nameEn: "Hire a messenger",
            nameFr: "Embaucher un messager",
            price: "2 PC/km",
          },
        ],
      },
    ];
    const ensureSeedData = vi.fn().mockResolvedValue(undefined);
    const findAll = vi.fn().mockResolvedValue(lifestyles);

    const repository = {
      ensureSeedData,
      findAll,
    } as unknown as MasterScreenLifestyleRepository;

    const service = new MasterScreenLifestyleService(repository);
    const result = await service.getLifestyles("en");

    expect(result).toEqual([
      {
        ...lifestyles[0],
        name: "Modest",
        price: "1GP/j",
        description: "Desc en",
        services: [
          { ...lifestyles[0].services[0], name: "Hire a messenger", price: "2 CP/km" },
        ],
      },
    ]);
    expect(ensureSeedData).toHaveBeenCalledOnce();
    expect(findAll).toHaveBeenCalledOnce();
  });

  it("converts FR currency units to EN currency units", async () => {
    const lifestyles = [
      {
        name: "Modeste",
        nameEn: "Modest",
        nameFr: "Modeste",
        price: "2PO/j",
        description: "Desc fr",
        descriptionEn: "Desc en",
        descriptionFr: "Desc fr",
        services: [
          {
            name: "Embaucher un messager",
            nameEn: "Hire a messenger",
            nameFr: "Embaucher un messager",
            price: "2 PC/km",
          },
        ],
      },
    ];
    const repository = {
      ensureSeedData: vi.fn().mockResolvedValue(undefined),
      findAll: vi.fn().mockResolvedValue(lifestyles),
    } as unknown as MasterScreenLifestyleRepository;

    const service = new MasterScreenLifestyleService(repository);
    const result = await service.getLifestyles("en");

    expect(result[0]).toMatchObject({ price: "2GP/j" });
    expect(result[0]?.services[0]).toMatchObject({ price: "2 CP/km" });
  });
});
