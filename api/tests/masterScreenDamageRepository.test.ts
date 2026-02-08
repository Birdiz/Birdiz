import type { Collection, Db } from "mongodb";
import { describe, expect, it, vi } from "vitest";
import { MasterScreenDamageRepository } from "../src/master-screen/repositories/masterScreenDamageRepository";
import { createDatabaseClientMock } from "./testHelpers";

describe("MasterScreenDamageRepository", () => {
  it("seeds collection with sortOrder when empty", async () => {
    const estimatedDocumentCount = vi.fn().mockResolvedValue(0);
    const insertMany = vi.fn().mockResolvedValue(undefined);
    const updateOne = vi.fn();
    const find = vi.fn();

    const collection = {
      estimatedDocumentCount,
      insertMany,
      updateOne,
      find,
    } as unknown as Collection;

    const collectionFactory = vi.fn().mockReturnValue(collection);
    const database = { collection: collectionFactory } as unknown as Db;

    const databaseClient = createDatabaseClientMock(
      vi.fn().mockResolvedValue(database),
    );

    const seedData = [
      { die: "1d10", examplesFr: ["A"], examplesEn: ["A-en"] },
      { die: "2d10", examplesFr: ["B"], examplesEn: ["B-en"] },
    ];

    const repository = new MasterScreenDamageRepository({
      databaseClient,
      seedData,
    });

    await repository.ensureSeedData();

    expect(collectionFactory).toHaveBeenCalledWith("master_screen_damages");
    expect(estimatedDocumentCount).toHaveBeenCalledOnce();
    expect(insertMany).toHaveBeenCalledWith([
      { die: "1d10", examplesFr: ["A"], examplesEn: ["A-en"], sortOrder: 1 },
      { die: "2d10", examplesFr: ["B"], examplesEn: ["B-en"], sortOrder: 2 },
    ]);
  });

  it("does not insert when collection already has documents", async () => {
    const estimatedDocumentCount = vi.fn().mockResolvedValue(4);
    const insertMany = vi.fn();
    const updateOne = vi.fn().mockResolvedValue({ acknowledged: true });
    const find = vi.fn();

    const collection = {
      estimatedDocumentCount,
      insertMany,
      updateOne,
      find,
    } as unknown as Collection;

    const database = {
      collection: vi.fn().mockReturnValue(collection),
    } as unknown as Db;

    const databaseClient = createDatabaseClientMock(
      vi.fn().mockResolvedValue(database),
    );

    const repository = new MasterScreenDamageRepository({
      databaseClient,
      seedData: [{ die: "1d10", examplesFr: ["A"], examplesEn: ["A-en"] }],
    });

    await repository.ensureSeedData();

    expect(insertMany).not.toHaveBeenCalled();
    expect(updateOne).toHaveBeenCalledWith(
      { die: "1d10" },
      {
        $set: {
          examplesFr: ["A"],
          examplesEn: ["A-en"],
        },
      },
    );
  });

  it("returns sorted damages without _id", async () => {
    const damages = [
      { die: "1d10", examplesFr: ["A"], examplesEn: ["A-en"], sortOrder: 1 },
    ];
    const toArray = vi.fn().mockResolvedValue(damages);
    const sort = vi.fn().mockReturnValue({ toArray });
    const find = vi.fn().mockReturnValue({ sort });

    const collection = {
      find,
      updateOne: vi.fn(),
      estimatedDocumentCount: vi.fn(),
      insertMany: vi.fn(),
    } as unknown as Collection;

    const database = {
      collection: vi.fn().mockReturnValue(collection),
    } as unknown as Db;

    const databaseClient = createDatabaseClientMock(
      vi.fn().mockResolvedValue(database),
    );

    const repository = new MasterScreenDamageRepository({
      databaseClient,
      seedData: [],
    });

    const result = await repository.findAll();

    expect(find).toHaveBeenCalledWith(
      {},
      {
        projection: {
          _id: 0,
          die: 1,
          examples: 1,
          examplesFr: 1,
          examplesEn: 1,
          sortOrder: 1,
        },
      },
    );
    expect(sort).toHaveBeenCalledWith({ sortOrder: 1 });
    expect(result).toEqual(damages);
  });
});
