import type { Collection, Db } from "mongodb";
import { describe, expect, it, vi } from "vitest";
import { MasterScreenLifestyleRepository } from "../src/master-screen/repositories/masterScreenLifestyleRepository";
import { createDatabaseClientMock } from "./testHelpers";

describe("MasterScreenLifestyleRepository", () => {
  it("seeds lifestyles collection when empty", async () => {
    const estimatedDocumentCount = vi.fn().mockResolvedValue(0);
    const insertMany = vi.fn().mockResolvedValue(undefined);
    const toArray = vi.fn();
    const sort = vi.fn().mockReturnValue({ toArray });
    const find = vi.fn().mockReturnValue({ sort });

    const collection = {
      estimatedDocumentCount,
      insertMany,
      find,
    } as unknown as Collection;

    const database = {
      collection: vi.fn().mockReturnValue(collection),
    } as unknown as Db;

    const repository = new MasterScreenLifestyleRepository({
      databaseClient: createDatabaseClientMock(vi.fn().mockResolvedValue(database)),
      lifestyles: [{ name: "Modeste", price: "1", description: "Desc", services: [] }],
    });

    await repository.ensureSeedData();

    expect(insertMany).toHaveBeenCalledOnce();
  });

  it("returns sorted lifestyles", async () => {
    const lifestyles = [{ name: "Modeste" }];
    const toArray = vi.fn().mockResolvedValue(lifestyles);
    const sort = vi.fn().mockReturnValue({ toArray });
    const find = vi.fn().mockReturnValue({ sort });

    const collection = {
      estimatedDocumentCount: vi.fn(),
      insertMany: vi.fn(),
      find,
    } as unknown as Collection;

    const database = {
      collection: vi.fn().mockReturnValue(collection),
    } as unknown as Db;

    const repository = new MasterScreenLifestyleRepository({
      databaseClient: createDatabaseClientMock(vi.fn().mockResolvedValue(database)),
      lifestyles: [],
    });

    const result = await repository.findAll();

    expect(result).toEqual(lifestyles);
  });
});
