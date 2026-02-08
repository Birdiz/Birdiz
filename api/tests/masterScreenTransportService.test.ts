import { describe, expect, it, vi } from "vitest";
import { MasterScreenTransportService } from "../src/master-screen/services/masterScreenTransportService";
import type { MasterScreenTransportRepository } from "../src/master-screen/repositories/masterScreenTransportRepository";

describe("MasterScreenTransportService", () => {
  it("ensures seed data before returning transport", async () => {
    const transport = { boats: [], mounts: [], mountEquipments: [] };
    const ensureSeedData = vi.fn().mockResolvedValue(undefined);
    const findTransportData = vi.fn().mockResolvedValue(transport);

    const repository = {
      ensureSeedData,
      findTransportData,
    } as unknown as MasterScreenTransportRepository;

    const service = new MasterScreenTransportService(repository);
    const result = await service.getTransportData();

    expect(result).toEqual(transport);
    expect(ensureSeedData).toHaveBeenCalledOnce();
    expect(findTransportData).toHaveBeenCalledOnce();
  });
});
