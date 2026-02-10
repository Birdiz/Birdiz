import type { Collection, Db } from "mongodb";
import { describe, expect, it, vi } from "vitest";
import { MasterScreenPropertiesRepository } from "../src/master-screen/repositories/masterScreenPropertiesRepository";
import { createDatabaseClientMock } from "./testHelpers";

describe("MasterScreenPropertiesRepository", () => {
  it("seeds properties collections when empty", async () => {
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

    const repository = new MasterScreenPropertiesRepository({
      databaseClient: createDatabaseClientMock(vi.fn().mockResolvedValue(database)),
      buildings: [{ name: "Building", price: "1", rent: "1", duration: "1" }],
      maintenances: [
        {
          name: "Maintenance",
          cost: "1",
          workerUnqualified: "1",
          workerQualified: "1",
        },
      ],
    });

    await repository.ensureSeedData();

    expect(insertMany).toHaveBeenCalledTimes(2);
  });

  it("backfills localization fields when properties collections are already seeded", async () => {
    const estimatedDocumentCount = vi.fn().mockResolvedValue(1);
    const insertMany = vi.fn().mockResolvedValue(undefined);
    const updateOne = vi.fn().mockResolvedValue(undefined);

    const collection = {
      estimatedDocumentCount,
      insertMany,
      updateOne,
      find: vi.fn(),
    } as unknown as Collection;

    const database = {
      collection: vi.fn().mockReturnValue(collection),
    } as unknown as Db;

    const repository = new MasterScreenPropertiesRepository({
      databaseClient: createDatabaseClientMock(vi.fn().mockResolvedValue(database)),
      buildings: [{ name: "Building", nameEn: "Building", nameFr: "Batiment", price: "1", rent: "1", duration: "1" }],
      maintenances: [
        {
          name: "Maintenance",
          nameEn: "Maintenance",
          nameFr: "Entretien",
          cost: "1",
          workerUnqualified: "1",
          workerQualified: "1",
        },
      ],
    });

    await repository.ensureSeedData();

    expect(insertMany).not.toHaveBeenCalled();
    expect(updateOne).toHaveBeenCalledTimes(2);
  });

  it("returns grouped properties data", async () => {
    const makeCollection = (payload: Array<Record<string, unknown>>) => {
      const toArray = vi.fn().mockResolvedValue(payload);
      const sort = vi.fn().mockReturnValue({ toArray });
      const find = vi.fn().mockReturnValue({ sort });

      return {
        estimatedDocumentCount: vi.fn(),
        insertMany: vi.fn(),
        updateOne: vi.fn(),
        find,
      };
    };

    const database = {
      collection: vi.fn((name: string) => {
        const map: Record<string, unknown> = {
          master_screen_buildings: makeCollection([{ name: "Build" }]),
          master_screen_maintenances: makeCollection([{ name: "Maint" }]),
        };

        return map[name] as Collection;
      }),
    } as unknown as Db;

    const repository = new MasterScreenPropertiesRepository({
      databaseClient: createDatabaseClientMock(vi.fn().mockResolvedValue(database)),
      buildings: [],
      maintenances: [],
    });

    const result = await repository.findPropertiesData();

    expect(result).toEqual({
      buildings: [{ name: "Build" }],
      maintenance: [{ name: "Maint" }],
    });
  });
});
