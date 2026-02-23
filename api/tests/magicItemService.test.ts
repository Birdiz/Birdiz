import { describe, expect, it, vi } from "vitest";
import { MagicItemService } from "../src/magic-items/services/magicItemService";
import type { MagicItemRepository } from "../src/magic-items/repositories/magicItemRepository";

describe("MagicItemService", () => {
  it("returns filtered english listing", async () => {
    const repository = {
      ensureSeedData: vi.fn().mockResolvedValue(undefined),
      findAll: vi.fn().mockResolvedValue([
        {
          canonicalId: "bag-of-holding",
          status: "active",
          nameEn: "Bag of Holding",
          nameFr: "Sac sans fond",
          voName: "Bag of Holding",
          type: "Wondrous item",
          rarity: "Uncommon",
          requiresAttunement: false,
          descriptionEn: "Storage space",
          descriptionFr: "Espace de stockage",
          itemUrlEn: "https://en.example/bag",
          itemUrlFr: "https://fr.example/sac",
          imageUrlEn: "https://img.example/bag-en.jpg",
          imageUrlFr: "https://img.example/bag-fr.jpg",
          keywordsEn: ["storage"],
          keywordsFr: ["stockage"],
          sortOrder: 1,
        },
        {
          canonicalId: "holy-avenger",
          status: "inactive",
          nameEn: "Holy Avenger",
          nameFr: "Vengeresse sacree",
          voName: "Holy Avenger",
          type: "Weapon",
          rarity: "Legendary",
          requiresAttunement: true,
          descriptionEn: "Legendary sword",
          descriptionFr: "Epee legendaire",
          itemUrlEn: "https://en.example/holy-avenger",
          itemUrlFr: "https://fr.example/vengeresse",
          imageUrlEn: null,
          imageUrlFr: null,
          keywordsEn: ["paladin"],
          keywordsFr: ["paladin"],
          sortOrder: 2,
        },
      ]),
    } as unknown as MagicItemRepository;

    const service = new MagicItemService(repository);
    const result = await service.getMagicItems({
      locale: "en",
      q: "bag",
      rarity: "Uncommon",
      type: "Wondrous item",
      attunement: "not-required",
      status: "active",
      limit: 20,
      offset: 0,
    });

    expect(result.total).toBe(1);
    expect(result.items[0]).toMatchObject({
      canonicalId: "bag-of-holding",
      name: "Bag of Holding",
      imageUrl: "https://img.example/bag-en.jpg",
      descriptionFallbackUsed: false,
      descriptionLocaleUsed: "en",
      itemUrlFallbackUsed: false,
      itemUrlLocaleUsed: "en",
      imageFallbackUsed: false,
      imageLocaleUsed: "en",
    });
    expect(repository.ensureSeedData).toHaveBeenCalledOnce();
  });

  it("returns localized item details", async () => {
    const repository = {
      ensureSeedData: vi.fn().mockResolvedValue(undefined),
      findByCanonicalId: vi.fn().mockResolvedValue({
        canonicalId: "cloak-of-protection",
        status: "active",
        nameEn: "Cloak of Protection",
        nameFr: "Cape de protection",
        voName: "Cloak of Protection",
        type: "Wondrous item",
        rarity: "Uncommon",
        requiresAttunement: true,
        attunementTextEn: "Requires attunement",
        attunementTextFr: "Necessite un lien",
        descriptionEn: "Gain +1 AC.",
        descriptionFr: "Gagnez +1 a la CA.",
        sourceBook: "DMG",
        itemUrlEn: "https://en.example/cloak",
        itemUrlFr: "https://fr.example/cape",
        imageUrlEn: "https://img.example/cloak-en.jpg",
        imageUrlFr: "https://img.example/cloak-fr.jpg",
        keywordsEn: ["defense"],
        keywordsFr: ["defense"],
        sortOrder: 1,
      }),
    } as unknown as MagicItemRepository;

    const service = new MagicItemService(repository);
    const result = await service.getMagicItemByCanonicalId("cloak-of-protection", "fr");

    expect(result).toMatchObject({
      canonicalId: "cloak-of-protection",
      name: "Cape de protection",
      attunementText: "Necessite un lien",
      descriptionFallbackUsed: false,
      descriptionLocaleUsed: "fr",
      itemUrl: "https://fr.example/cape",
      itemUrlFallbackUsed: false,
      itemUrlLocaleUsed: "fr",
      imageUrl: "https://img.example/cloak-fr.jpg",
      imageFallbackUsed: false,
      imageLocaleUsed: "fr",
    });
  });

  it("uses opposite locale image when requested locale image is missing", async () => {
    const repository = {
      ensureSeedData: vi.fn().mockResolvedValue(undefined),
      findByCanonicalId: vi.fn().mockResolvedValue({
        canonicalId: "wand-of-fireballs",
        status: "active",
        nameEn: "Wand of Fireballs",
        nameFr: "Baguette de boule de feu",
        imageUrlEn: "https://img.example/wand-en.jpg",
        imageUrlFr: null,
        sortOrder: 1,
      }),
    } as unknown as MagicItemRepository;

    const service = new MagicItemService(repository);
    const result = await service.getMagicItemByCanonicalId("wand-of-fireballs", "fr");

    expect(result).toMatchObject({
      canonicalId: "wand-of-fireballs",
      imageUrl: "https://img.example/wand-en.jpg",
      imageFallbackUsed: true,
      imageLocaleUsed: "en",
    });
  });

  it("uses opposite locale metadata for description and itemUrl when missing", async () => {
    const repository = {
      ensureSeedData: vi.fn().mockResolvedValue(undefined),
      findByCanonicalId: vi.fn().mockResolvedValue({
        canonicalId: "ring-of-protection",
        status: "active",
        nameEn: "Ring of Protection",
        nameFr: "Anneau de protection",
        descriptionEn: "A warding ring.",
        descriptionFr: null,
        itemUrlEn: "https://en.example/ring",
        itemUrlFr: null,
        imageUrlEn: null,
        imageUrlFr: null,
        sortOrder: 1,
      }),
    } as unknown as MagicItemRepository;

    const service = new MagicItemService(repository);
    const result = await service.getMagicItemByCanonicalId("ring-of-protection", "fr");

    expect(result).toMatchObject({
      canonicalId: "ring-of-protection",
      description: "A warding ring.",
      descriptionFallbackUsed: true,
      descriptionLocaleUsed: "en",
      itemUrl: "https://en.example/ring",
      itemUrlFallbackUsed: true,
      itemUrlLocaleUsed: "en",
      imageUrl: null,
      imageFallbackUsed: false,
      imageLocaleUsed: null,
    });
  });

  it("matches accent-insensitive french queries", async () => {
    const repository = {
      ensureSeedData: vi.fn().mockResolvedValue(undefined),
      findAll: vi.fn().mockResolvedValue([
        {
          canonicalId: "epee-du-destin",
          status: "active",
          nameEn: "Sword of Fate",
          nameFr: "Epee du destin",
          type: "Arme",
          rarity: "Rare",
          descriptionEn: "A heroic blade",
          descriptionFr: "Épée puissante",
          sortOrder: 1,
        },
      ]),
    } as unknown as MagicItemRepository;

    const service = new MagicItemService(repository);
    const result = await service.getMagicItems({
      locale: "fr",
      q: "epee",
      rarity: null,
      type: null,
      attunement: null,
      status: "active",
      limit: 20,
      offset: 0,
    });

    expect(result.total).toBe(1);
    expect(result.items[0]?.canonicalId).toBe("epee-du-destin");
  });

  it("returns random stock with generated prices and merchant data", async () => {
    const repository = {
      ensureSeedData: vi.fn().mockResolvedValue(undefined),
      findAll: vi.fn().mockResolvedValue([
        {
          canonicalId: "bag-of-holding",
          status: "active",
          nameEn: "Bag of Holding",
          nameFr: "Sac sans fond",
          rarity: "Uncommon",
          sortOrder: 1,
        },
        {
          canonicalId: "cloak-of-protection",
          status: "active",
          nameEn: "Cloak of Protection",
          nameFr: "Cape de protection",
          rarity: "Rare",
          sortOrder: 2,
        },
      ]),
    } as unknown as MagicItemRepository;

    const service = new MagicItemService(repository);
    const result = await service.getRandomStock({
      locale: "en",
      status: "active",
      limit: 10,
      seed: "fixed-seed",
    });

    expect(result.seed).toBe("fixed-seed");
    expect(result.totalPool).toBe(2);
    expect(result.items).toHaveLength(2);
    expect(result.items[0]?.buyPriceGp).toBeGreaterThan(0);
    expect(result.items[0]?.rentPriceGp).toBeGreaterThan(0);
    expect(result.merchant.name.length).toBeGreaterThan(0);
    expect(["trusted", "shady"]).toContain(result.merchant.reputation);
  });
});
