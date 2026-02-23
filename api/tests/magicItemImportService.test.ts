import { describe, expect, it, vi } from "vitest";
import { MagicItemImportService } from "../src/magic-items/services/magicItemImportService";

describe("MagicItemImportService", () => {
  it("imports, merges and syncs listing data", async () => {
    const syncImportedItems = vi.fn().mockResolvedValue({
      inserted: 1,
      updated: 0,
      unchanged: 0,
      deactivated: 0,
    });
    const service = new MagicItemImportService({
      aideddClient: {
        fetchListings: vi.fn().mockResolvedValue({
          enHtml: "<table></table>",
          frHtml: "<table></table>",
        }),
        fetchDetailPages: vi.fn().mockResolvedValue([
          { url: "https://example.com/bag", html: "<article><p>Storage item.</p></article>" },
          { url: "https://example.com/sac", html: "<article><p>Objet de stockage.</p></article>" },
        ]),
      } as never,
      aideddParser: {
        parseListing: vi
          .fn()
          .mockReturnValueOnce([
            {
              lang: "en",
              name: "Bag of Holding",
              voName: "Bag of Holding",
              type: "Wondrous item",
              rarity: "Uncommon",
              requiresAttunement: false,
              attunementText: null,
              sourceBook: "DMG",
              itemUrl: "https://example.com/bag",
            },
          ])
          .mockReturnValueOnce([
            {
              lang: "fr",
              name: "Sac sans fond",
              voName: "Bag of Holding",
              type: "Objet merveilleux",
              rarity: "Peu commun",
              requiresAttunement: false,
              attunementText: null,
              sourceBook: "GDM",
              itemUrl: "https://example.com/sac",
            },
          ]),
        parseDetail: vi
          .fn()
          .mockReturnValueOnce({
            description: "Storage item.",
            imageUrl: "https://www.aidedd.org/images/bag.jpg",
          })
          .mockReturnValueOnce({
            description: "Objet de stockage.",
            imageUrl: "https://www.aidedd.org/images/sac.jpg",
          }),
      } as never,
      magicItemRepository: {
        syncImportedItems,
      } as never,
      magicItemImportRunRepository: {
        create: vi.fn().mockResolvedValue(undefined),
        update: vi.fn().mockResolvedValue(undefined),
      } as never,
      loadLegacyItems: vi.fn().mockResolvedValue([]),
    });

    const summary = await service.runImport();

    expect(summary.status).toBe("success");
    expect(summary.counters.fetchedEn).toBe(1);
    expect(summary.counters.fetchedFr).toBe(1);
    expect(summary.counters.merged).toBe(1);
    expect(summary.counters.inserted).toBe(1);
    expect(syncImportedItems).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          descriptionEn: "Storage item.",
          descriptionFr: "Objet de stockage.",
          imageUrlEn: "https://www.aidedd.org/images/bag.jpg",
          imageUrlFr: "https://www.aidedd.org/images/sac.jpg",
        }),
      ]),
    );
  });

  it("returns failed status when fetching throws", async () => {
    const service = new MagicItemImportService({
      aideddClient: {
        fetchListings: vi.fn().mockRejectedValue(new Error("network unavailable")),
        fetchDetailPages: vi.fn(),
      } as never,
      aideddParser: {
        parseListing: vi.fn(),
        parseDetail: vi.fn(),
      } as never,
      magicItemRepository: {
        syncImportedItems: vi.fn(),
      } as never,
      magicItemImportRunRepository: {
        create: vi.fn().mockResolvedValue(undefined),
        update: vi.fn().mockResolvedValue(undefined),
      } as never,
      loadLegacyItems: vi.fn().mockResolvedValue([]),
    });

    const summary = await service.runImport();

    expect(summary.status).toBe("failed");
    expect(summary.errors).toContain("network unavailable");
    expect(summary.counters.errors).toBe(1);
  });

  it("falls back to local legacy items when Aidedd fetch is unavailable", async () => {
    const syncImportedItems = vi.fn().mockResolvedValue({
      inserted: 2,
      updated: 0,
      unchanged: 0,
      deactivated: 0,
    });
    const service = new MagicItemImportService({
      aideddClient: {
        fetchListings: vi.fn().mockRejectedValue(new Error("network unavailable")),
        fetchDetailPages: vi.fn().mockResolvedValue([]),
      } as never,
      aideddParser: {
        parseListing: vi.fn(),
        parseDetail: vi.fn().mockReturnValue({ description: null, imageUrl: null }),
      } as never,
      magicItemRepository: {
        syncImportedItems,
      } as never,
      magicItemImportRunRepository: {
        create: vi.fn().mockResolvedValue(undefined),
        update: vi.fn().mockResolvedValue(undefined),
      } as never,
      loadLegacyItems: vi.fn().mockResolvedValue([
        {
          name: "Sac sans fond",
          link: "https://www.aidedd.org/dnd/om.php?vf=sac-sans-fond",
        },
        {
          name: "Anneau de protection",
          link: "https://www.aidedd.org/dnd/om.php?vf=anneau-de-protection",
        },
      ]),
    });

    const summary = await service.runImport();

    expect(summary.status).toBe("success");
    expect(summary.counters.fetchedEn).toBe(2);
    expect(summary.counters.fetchedFr).toBe(2);
    expect(summary.counters.merged).toBe(2);
    expect(summary.warnings.some((warning) => warning.includes("fallback"))).toBe(true);
    expect(syncImportedItems).toHaveBeenCalled();
  });
});
