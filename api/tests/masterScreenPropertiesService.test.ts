import { describe, expect, it, vi } from "vitest";
import { MasterScreenPropertiesService } from "../src/master-screen/services/masterScreenPropertiesService";
import type { MasterScreenPropertiesRepository } from "../src/master-screen/repositories/masterScreenPropertiesRepository";

describe("MasterScreenPropertiesService", () => {
  it("ensures seed data before returning localized properties", async () => {
    const properties = {
      buildings: [
        { name: "Atelier", nameEn: "Workshop", nameFr: "Atelier", price: "1", rent: "1", duration: "1" },
      ],
      maintenance: [
        {
          name: "Ferme",
          nameEn: "Farm",
          nameFr: "Ferme",
          cost: "1",
          workerUnqualified: "1",
          workerQualified: "1",
        },
      ],
    };
    const ensureSeedData = vi.fn().mockResolvedValue(undefined);
    const findPropertiesData = vi.fn().mockResolvedValue(properties);

    const repository = {
      ensureSeedData,
      findPropertiesData,
    } as unknown as MasterScreenPropertiesRepository;

    const service = new MasterScreenPropertiesService(repository);
    const result = await service.getPropertiesData("en");

    expect(result).toEqual({
      buildings: [{ ...properties.buildings[0], name: "Workshop", price: "1", rent: "1" }],
      maintenance: [{ ...properties.maintenance[0], name: "Farm", cost: "1" }],
    });
    expect(ensureSeedData).toHaveBeenCalledOnce();
    expect(findPropertiesData).toHaveBeenCalledOnce();
  });

  it("converts FR currency units to EN currency units", async () => {
    const properties = {
      buildings: [
        { name: "Atelier", nameEn: "Workshop", nameFr: "Atelier", price: "400 PO", rent: "5 PO", duration: "15" },
      ],
      maintenance: [
        {
          name: "Ferme",
          nameEn: "Farm",
          nameFr: "Ferme",
          cost: "5 PA",
          workerUnqualified: "2",
          workerQualified: "1",
        },
      ],
    };
    const repository = {
      ensureSeedData: vi.fn().mockResolvedValue(undefined),
      findPropertiesData: vi.fn().mockResolvedValue(properties),
    } as unknown as MasterScreenPropertiesRepository;

    const service = new MasterScreenPropertiesService(repository);
    const result = await service.getPropertiesData("en");

    expect(result.buildings[0]).toMatchObject({ price: "400 GP", rent: "5 GP" });
    expect(result.maintenance[0]).toMatchObject({ cost: "5 SP" });
  });
});
