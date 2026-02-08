import type { Db } from "mongodb";
import { describe, expect, it, vi } from "vitest";
import { createSummaryController } from "../src/controllers/summaryController";
import { createDatabaseClientMock, createMockResponse } from "./testHelpers";

describe("createSummaryController", () => {
  it("returns summary payload with database and collections", async () => {
    const toArray = vi.fn().mockResolvedValue([{ name: "users" }, { name: "sessions" }]);
    const listCollections = vi.fn(() => ({ toArray }));

    const database = {
      databaseName: "birdiz",
      listCollections,
    } as unknown as Db;

    const getDatabase = vi.fn().mockResolvedValue(database);
    const databaseClient = createDatabaseClientMock(getDatabase);
    const { json, res } = createMockResponse();

    const controller = createSummaryController({
      databaseClient,
    });

    await controller({} as never, res, vi.fn());

    expect(getDatabase).toHaveBeenCalledOnce();
    expect(listCollections).toHaveBeenCalledOnce();
    expect(json).toHaveBeenCalledWith({
      message: "Birdiz API is running",
      database: "birdiz",
      collections: ["users", "sessions"],
    });
  });

  it("returns 500 with an error message when database access fails", async () => {
    const databaseClient = createDatabaseClientMock(
      vi.fn().mockRejectedValue(new Error("connection failed")),
    );
    const { json, res, status } = createMockResponse();

    const controller = createSummaryController({
      databaseClient,
    });

    await controller({} as never, res, vi.fn());

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      message: "Unable to connect to MongoDB",
      error: "connection failed",
    });
  });

  it("falls back to an unknown error string for non-Error throwables", async () => {
    const databaseClient = createDatabaseClientMock(
      vi.fn().mockRejectedValue("boom"),
    );
    const { json, res, status } = createMockResponse();

    const controller = createSummaryController({
      databaseClient,
    });

    await controller({} as never, res, vi.fn());

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      message: "Unable to connect to MongoDB",
      error: "Unknown error",
    });
  });
});
