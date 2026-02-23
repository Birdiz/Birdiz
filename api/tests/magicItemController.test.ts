import { describe, expect, it, vi } from "vitest";
import {
  createMagicItemDetailController,
  createMagicItemListController,
  createMagicItemRandomStockController,
} from "../src/magic-items/controllers/magicItemController";
import { createMagicItemServiceMock, createMockResponse } from "./testHelpers";

describe("magic item controllers", () => {
  it("returns localized list payload with parsed filters", async () => {
    const items = [{ canonicalId: "bag-of-holding", name: "Bag of Holding" }];
    const magicItemService = createMagicItemServiceMock(
      vi.fn().mockResolvedValue({ items, total: 1 }),
      vi.fn(),
    );
    const { json, res } = createMockResponse();
    const controller = createMagicItemListController({ magicItemService });

    await controller(
      {
        query: {
          locale: "en",
          q: "bag",
          rarity: "Uncommon",
          type: "Wondrous item",
          attunement: "not-required",
          status: "active",
          limit: "10",
          offset: "5",
        },
      } as never,
      res,
      vi.fn(),
    );

    expect(magicItemService.getMagicItems).toHaveBeenCalledWith({
      locale: "en",
      q: "bag",
      rarity: "Uncommon",
      type: "Wondrous item",
      attunement: "not-required",
      status: "active",
      limit: 10,
      offset: 5,
    });
    expect(json).toHaveBeenCalledWith({ items, total: 1, limit: 10, offset: 5 });
  });

  it("returns 404 when detail lookup has no match", async () => {
    const magicItemService = createMagicItemServiceMock(
      vi.fn(),
      vi.fn().mockResolvedValue(null),
    );
    const { json, res, status } = createMockResponse();
    const controller = createMagicItemDetailController({ magicItemService });

    await controller(
      { params: { canonicalId: "missing-item" }, query: {} } as never,
      res,
      vi.fn(),
    );

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ message: "Magic item not found" });
  });

  it("returns item details in requested locale", async () => {
    const item = { canonicalId: "bag-of-holding", name: "Sac sans fond" };
    const magicItemService = createMagicItemServiceMock(
      vi.fn(),
      vi.fn().mockResolvedValue(item),
    );
    const { json, res } = createMockResponse();
    const controller = createMagicItemDetailController({ magicItemService });

    await controller(
      { params: { canonicalId: "bag-of-holding" }, query: { locale: "fr" } } as never,
      res,
      vi.fn(),
    );

    expect(magicItemService.getMagicItemByCanonicalId).toHaveBeenCalledWith(
      "bag-of-holding",
      "fr",
    );
    expect(json).toHaveBeenCalledWith({ item });
  });

  it("returns random stock with bounded limit and generated seed", async () => {
    const getRandomStock = vi.fn().mockResolvedValue({
      seed: "seed-123",
      totalPool: 42,
      merchant: {
        name: "Aelric",
        ancestry: "human",
        reputation: "trusted",
        description: "Aelric is fair.",
      },
      items: [],
    });
    const magicItemService = createMagicItemServiceMock(vi.fn(), vi.fn(), getRandomStock);
    const { json, res } = createMockResponse();
    const controller = createMagicItemRandomStockController({ magicItemService });

    await controller(
      {
        query: {
          locale: "fr",
          status: "active",
          limit: "20",
          seed: "seed-123",
        },
      } as never,
      res,
      vi.fn(),
    );

    expect(getRandomStock).toHaveBeenCalledWith({
      locale: "fr",
      status: "active",
      limit: 10,
      seed: "seed-123",
    });
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        seed: "seed-123",
        limit: 10,
      }),
    );
  });
});
