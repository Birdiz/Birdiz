import type { Collection, Db } from "mongodb";
import { describe, expect, it, vi } from "vitest";
import { MagicItemRepository } from "../src/magic-items/repositories/magicItemRepository";
import { createDatabaseClientMock } from "./testHelpers";

describe("MagicItemRepository", () => {
  it("seeds magic items collection when empty", async () => {
    const estimatedDocumentCount = vi.fn().mockResolvedValue(0);
    const insertMany = vi.fn().mockResolvedValue(undefined);
    const collection = {
      estimatedDocumentCount,
      insertMany,
    } as unknown as Collection;
    const database = {
      collection: vi.fn().mockReturnValue(collection),
    } as unknown as Db;

    const repository = new MagicItemRepository({
      databaseClient: createDatabaseClientMock(vi.fn().mockResolvedValue(database)),
      seedData: [
        {
          canonicalId: "bag-of-holding",
          status: "active",
          nameEn: "Bag of Holding",
          nameFr: "Sac sans fond",
        },
      ],
    });

    await repository.ensureSeedData();

    expect(insertMany).toHaveBeenCalledOnce();
  });

  it("upserts seed records when collection already has content", async () => {
    const estimatedDocumentCount = vi.fn().mockResolvedValue(1);
    const updateOne = vi.fn().mockResolvedValue(undefined);
    const collection = {
      estimatedDocumentCount,
      updateOne,
    } as unknown as Collection;
    const database = {
      collection: vi.fn().mockReturnValue(collection),
    } as unknown as Db;

    const repository = new MagicItemRepository({
      databaseClient: createDatabaseClientMock(vi.fn().mockResolvedValue(database)),
      seedData: [
        {
          canonicalId: "bag-of-holding",
          status: "active",
          nameEn: "Bag of Holding",
          nameFr: "Sac sans fond",
        },
      ],
    });

    await repository.ensureSeedData();

    expect(updateOne).toHaveBeenCalledWith(
      { canonicalId: "bag-of-holding" },
      {
        $set: {
          canonicalId: "bag-of-holding",
          status: "active",
          nameEn: "Bag of Holding",
          nameFr: "Sac sans fond",
          sortOrder: 1,
        },
      },
      { upsert: true },
    );
  });

  it("returns all items sorted by sortOrder", async () => {
    const toArray = vi.fn().mockResolvedValue([{ canonicalId: "bag-of-holding" }]);
    const sort = vi.fn().mockReturnValue({ toArray });
    const find = vi.fn().mockReturnValue({ sort });
    const collection = {
      find,
    } as unknown as Collection;
    const database = {
      collection: vi.fn().mockReturnValue(collection),
    } as unknown as Db;

    const repository = new MagicItemRepository({
      databaseClient: createDatabaseClientMock(vi.fn().mockResolvedValue(database)),
      seedData: [],
    });

    const result = await repository.findAll();

    expect(result).toEqual([{ canonicalId: "bag-of-holding" }]);
  });

  it("syncs imported rows and deactivates missing active items", async () => {
    const toArray = vi
      .fn()
      .mockResolvedValueOnce([
        {
          canonicalId: "bag-of-holding",
          status: "active",
          sourceRowHash: "old-hash",
          sortOrder: 1,
        },
        {
          canonicalId: "cloak-of-protection",
          status: "active",
          sourceRowHash: "same-hash",
          sortOrder: 2,
        },
      ])
      .mockResolvedValueOnce([
        {
          canonicalId: "bag-of-holding",
          status: "active",
          sourceRowHash: "old-hash",
          sortOrder: 1,
        },
        {
          canonicalId: "cloak-of-protection",
          status: "active",
          sourceRowHash: "same-hash",
          sortOrder: 2,
        },
      ]);
    const sort = vi.fn().mockReturnValue({ toArray });
    const find = vi.fn().mockReturnValue({ sort });
    const updateOne = vi.fn().mockResolvedValue(undefined);

    const collection = {
      find,
      updateOne,
    } as unknown as Collection;
    const database = {
      collection: vi.fn().mockReturnValue(collection),
    } as unknown as Db;

    const repository = new MagicItemRepository({
      databaseClient: createDatabaseClientMock(vi.fn().mockResolvedValue(database)),
      seedData: [],
    });

    const counters = await repository.syncImportedItems([
      {
        canonicalId: "cloak-of-protection",
        status: "active",
        nameEn: "Cloak of Protection",
        nameFr: "Cape de protection",
        sourceRowHash: "same-hash",
      },
    ]);

    expect(counters).toEqual({
      inserted: 0,
      updated: 0,
      unchanged: 1,
      deactivated: 1,
    });
    expect(updateOne).toHaveBeenCalledWith(
      { canonicalId: "bag-of-holding" },
      { $set: { status: "inactive" } },
    );
  });
});
