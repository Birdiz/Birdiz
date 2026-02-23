import { describe, expect, it, vi } from "vitest";
import type { MagicItemService } from "../src/magic-items/services/magicItemService";
import { MagicItemsSearchDocumentProvider } from "../src/search/providers/magicItemsSearchDocumentProvider";

describe("MagicItemsSearchDocumentProvider", () => {
  it("returns localized active magic-item search documents", async () => {
    const magicItemService = {
      getMagicItems: vi.fn().mockResolvedValue({
        total: 1,
        items: [
          {
            canonicalId: "bag-of-holding",
            status: "active",
            name: "Bag of Holding",
            voName: "Bag of Holding",
            type: "Wondrous item",
            rarity: "Uncommon",
            requiresAttunement: false,
            attunementText: null,
            description: "Extra-dimensional storage",
            descriptionFallbackUsed: false,
            descriptionLocaleUsed: "en",
            sourceBook: "DMG",
            itemUrl: "https://example.com/bag",
            itemUrlFallbackUsed: false,
            itemUrlLocaleUsed: "en",
            imageUrl: "https://example.com/bag.jpg",
            imageFallbackUsed: false,
            imageLocaleUsed: "en",
            keywords: ["storage", "utility"],
          },
        ],
      }),
    } as unknown as MagicItemService;

    const provider = new MagicItemsSearchDocumentProvider(magicItemService);
    const docs = await provider.getDocuments("en");

    expect(magicItemService.getMagicItems).toHaveBeenCalledWith({
      locale: "en",
      q: "",
      rarity: null,
      type: null,
      attunement: null,
      status: "active",
      limit: 10000,
      offset: 0,
    });
    expect(docs).toHaveLength(1);
    expect(docs[0]).toMatchObject({
      module: "magic-items",
      section: "magic-trading-post",
      entityType: "magic-item",
      title: "Bag of Holding",
      href: "/en/magic-trading-post?item=bag-of-holding",
    });
  });
});
