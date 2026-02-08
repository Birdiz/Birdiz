import type { Collection, Db } from "mongodb";
import { describe, expect, it, vi } from "vitest";
import { MasterScreenTransportRepository } from "../src/master-screen/repositories/masterScreenTransportRepository";
import { createDatabaseClientMock } from "./testHelpers";

describe("MasterScreenTransportRepository", () => {
  it("seeds transport collections when empty", async () => {
    const estimatedDocumentCount = vi.fn().mockResolvedValue(0);
    const insertMany = vi.fn().mockResolvedValue(undefined);
    const find = vi.fn();

    const collection = {
      estimatedDocumentCount,
      insertMany,
      find,
    } as unknown as Collection;

    const database = {
      collection: vi.fn().mockReturnValue(collection),
    } as unknown as Db;

    const repository = new MasterScreenTransportRepository({
      databaseClient: createDatabaseClientMock(vi.fn().mockResolvedValue(database)),
      boats: [{ name: "Boat", price: "1", rent: "1" }],
      mounts: [{ name: "Mount", price: "1", rent: "1", charge: "1" }],
      mountEquipments: [{ name: "Equip", price: "1", charge: "1" }],
    });

    await repository.ensureSeedData();

    expect(insertMany).toHaveBeenCalledTimes(3);
  });

  it("returns grouped transport data", async () => {
    const makeCollection = (payload: Array<Record<string, unknown>>) => {
      const toArray = vi.fn().mockResolvedValue(payload);
      const sort = vi.fn().mockReturnValue({ toArray });
      const find = vi.fn().mockReturnValue({ sort });

      return {
        estimatedDocumentCount: vi.fn(),
        insertMany: vi.fn(),
        find,
      };
    };

    const database = {
      collection: vi.fn((name: string) => {
        const map: Record<string, unknown> = {
          master_screen_boats: makeCollection([{ name: "Boat" }]),
          master_screen_mounts: makeCollection([{ name: "Mount" }]),
          master_screen_mount_equipments: makeCollection([{ name: "Equip" }]),
        };

        return map[name] as Collection;
      }),
    } as unknown as Db;

    const repository = new MasterScreenTransportRepository({
      databaseClient: createDatabaseClientMock(vi.fn().mockResolvedValue(database)),
      boats: [],
      mounts: [],
      mountEquipments: [],
    });

    const result = await repository.findTransportData();

    expect(result).toEqual({
      boats: [{ name: "Boat" }],
      mounts: [{ name: "Mount" }],
      mountEquipments: [{ name: "Equip" }],
    });
  });
});
