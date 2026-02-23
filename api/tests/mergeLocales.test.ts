import { describe, expect, it } from "vitest";
import { mergeMagicItemLocales } from "../src/magic-items/import/mergeLocales";

describe("mergeMagicItemLocales", () => {
  it("merges EN and FR rows using VO name", () => {
    const output = mergeMagicItemLocales(
      [
        {
          lang: "en",
          name: "Bag of Holding",
          voName: null,
          type: "Wondrous item",
          rarity: "Uncommon",
          requiresAttunement: false,
          attunementText: null,
          sourceBook: "DMG",
          itemUrl: "https://www.aidedd.org/dnd/om.php?vo=bag-of-holding",
        },
      ],
      [
        {
          lang: "fr",
          name: "Sac sans fond",
          voName: "Bag of Holding",
          type: "Objet merveilleux",
          rarity: "Peu commun",
          requiresAttunement: false,
          attunementText: null,
          sourceBook: "GDM",
          itemUrl: "https://www.aidedd.org/dnd/om.php?vf=sac-sans-fond",
        },
      ],
    );

    expect(output.warnings).toHaveLength(0);
    expect(output.mergedItems).toHaveLength(1);
    expect(output.mergedItems[0]).toMatchObject({
      canonicalId: "bag-of-holding-wondrous-item",
      nameEn: "Bag of Holding",
      nameFr: "Sac sans fond",
      status: "active",
    });
    expect(output.mergedItems[0]?.sourceRowHash).toBeTypeOf("string");
  });

  it("reports warnings for unmatched rows", () => {
    const output = mergeMagicItemLocales(
      [
        {
          lang: "en",
          name: "Unmatched EN",
          voName: null,
          type: null,
          rarity: null,
          requiresAttunement: null,
          attunementText: null,
          sourceBook: null,
          itemUrl: null,
        },
      ],
      [
        {
          lang: "fr",
          name: "Sans correspondance",
          voName: null,
          type: null,
          rarity: null,
          requiresAttunement: null,
          attunementText: null,
          sourceBook: null,
          itemUrl: null,
        },
      ],
    );

    expect(output.mergedItems).toHaveLength(0);
    expect(output.warnings.some((warning) => warning.includes("No french match"))).toBe(true);
    expect(output.warnings.some((warning) => warning.includes("No english match"))).toBe(true);
  });
});
