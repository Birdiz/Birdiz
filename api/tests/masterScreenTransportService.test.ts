import { describe, expect, it, vi } from "vitest";
import { MasterScreenTransportService } from "../src/master-screen/services/masterScreenTransportService";
import type { MasterScreenTransportRepository } from "../src/master-screen/repositories/masterScreenTransportRepository";

describe("MasterScreenTransportService", () => {
  it("ensures seed data before returning localized transport", async () => {
    const transport = {
      boats: [{ name: "Barque", nameEn: "Rowboat", nameFr: "Barque", price: "1", rent: "1" }],
      mounts: [{ name: "Ane", nameEn: "Donkey", nameFr: "Ane", price: "1", rent: "1", charge: "1" }],
      mountEquipments: [{ name: "Fontes", nameEn: "Saddlebags", nameFr: "Fontes", price: "1", charge: "1" }],
    };
    const ensureSeedData = vi.fn().mockResolvedValue(undefined);
    const findTransportData = vi.fn().mockResolvedValue(transport);

    const repository = {
      ensureSeedData,
      findTransportData,
    } as unknown as MasterScreenTransportRepository;

    const service = new MasterScreenTransportService(repository);
    const result = await service.getTransportData("en");

    expect(result).toEqual({
      boats: [{ ...transport.boats[0], name: "Rowboat", price: "1", rent: "1" }],
      mounts: [{ ...transport.mounts[0], name: "Donkey", price: "1", rent: "1" }],
      mountEquipments: [
        { ...transport.mountEquipments[0], name: "Saddlebags", price: "1" },
      ],
    });
    expect(ensureSeedData).toHaveBeenCalledOnce();
    expect(findTransportData).toHaveBeenCalledOnce();
  });

  it("converts FR currency units to EN currency units", async () => {
    const transport = {
      boats: [{ name: "Barque", nameEn: "Rowboat", nameFr: "Barque", price: "50 PO", rent: "5 PA" }],
      mounts: [],
      mountEquipments: [],
    };
    const repository = {
      ensureSeedData: vi.fn().mockResolvedValue(undefined),
      findTransportData: vi.fn().mockResolvedValue(transport),
    } as unknown as MasterScreenTransportRepository;

    const service = new MasterScreenTransportService(repository);
    const result = await service.getTransportData("en");

    expect(result.boats[0]).toMatchObject({ price: "50 GP", rent: "5 SP" });
  });
});
