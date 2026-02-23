import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LocaleIntlProvider from "../../components/i18n/intl-provider";
import MagicTradingPostPage from "../[locale]/magic-trading-post/page";
import { getMessages } from "../../lib/i18n/messages";
import { getMagicItems, getRandomMagicStock } from "../../lib/magicItemsData";

vi.mock("../../lib/magicItemsData", () => ({
  getMagicItems: vi.fn(),
  getRandomMagicStock: vi.fn(),
}));

describe("LocalizedMagicTradingPostPage", () => {
  it("renders english localized item listing and details", async () => {
    vi.mocked(getMagicItems).mockResolvedValue({
      items: [
        {
          canonicalId: "bag-of-holding",
          name: "Bag of Holding",
          voName: "Bag of Holding",
          type: "Wondrous item",
          rarity: "Uncommon",
          requiresAttunement: false,
          attunementText: null,
          description: "Storage utility.",
          descriptionFallbackUsed: false,
          descriptionLocaleUsed: "en",
          sourceBook: "DMG",
          itemUrl: "https://example.com/bag",
          itemUrlFallbackUsed: false,
          itemUrlLocaleUsed: "en",
          imageUrl: "https://example.com/bag.jpg",
          imageFallbackUsed: false,
          imageLocaleUsed: "en",
          keywords: ["storage"],
        },
      ],
      total: 1,
      limit: 200,
      offset: 0,
    });
    vi.mocked(getRandomMagicStock).mockResolvedValue({
      seed: "test-seed",
      totalPool: 1,
      limit: 10,
      merchant: {
        name: "Aelric",
        ancestry: "human",
        reputation: "trusted",
        description: "Aelric is known for fair prices.",
      },
      items: [
        {
          item: {
            canonicalId: "bag-of-holding",
            name: "Bag of Holding",
            rarity: "Uncommon",
          },
          buyPriceGp: 220,
          rentPriceGp: 22,
        },
      ],
    });

    render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        {await MagicTradingPostPage({ params: { locale: "en" } })}
      </LocaleIntlProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Curated stock for arcane shopping scenes",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Bag of Holding").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Merchant Stock Roll" })).toBeInTheDocument();
    expect(screen.getByText("Aelric is known for fair prices.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open Source" })).toHaveAttribute(
      "href",
      "https://example.com/bag",
    );
    expect(
      screen.getAllByText(
        (_, element) =>
          element?.tagName === "P" &&
          element?.textContent?.replace(/\s+/g, " ").includes("Buy: 220 gp"),
      ).length,
    ).toBeGreaterThan(0);
    expect(getMagicItems).toHaveBeenCalledWith("en", expect.any(Object));
    expect(getRandomMagicStock).toHaveBeenCalledWith("en", expect.any(Object));
  });

  it("renders french localized labels", async () => {
    vi.mocked(getMagicItems).mockResolvedValue({
      items: [
        {
          canonicalId: "bag-of-holding",
          name: "Sac sans fond",
          voName: "Bag of Holding",
          type: "Objet merveilleux",
          rarity: "Peu commun",
          requiresAttunement: false,
          attunementText: null,
          description: "Utilitaire de stockage.",
          descriptionFallbackUsed: false,
          descriptionLocaleUsed: "fr",
          sourceBook: "GDM",
          itemUrl: "https://example.com/sac",
          itemUrlFallbackUsed: false,
          itemUrlLocaleUsed: "fr",
          imageUrl: null,
          imageFallbackUsed: false,
          imageLocaleUsed: null,
          keywords: ["stockage"],
        },
      ],
      total: 1,
      limit: 200,
      offset: 0,
    });
    vi.mocked(getRandomMagicStock).mockResolvedValue({
      seed: "test-seed-fr",
      totalPool: 1,
      limit: 10,
      merchant: {
        name: "Maelis",
        ancestry: "elfe",
        reputation: "shady",
        description: "Maelis applique des prix variables.",
      },
      items: [
        {
          item: {
            canonicalId: "bag-of-holding",
            name: "Sac sans fond",
            rarity: "Peu commun",
          },
          buyPriceGp: 260,
          rentPriceGp: 26,
        },
      ],
    });

    render(
      <LocaleIntlProvider locale="fr" messages={getMessages("fr")}>
        {await MagicTradingPostPage({ params: { locale: "fr" } })}
      </LocaleIntlProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Inventaire ciblé pour les scènes d'achat d'objets magiques",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Filtres d'inventaire")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tirage marchand" })).toBeInTheDocument();
    expect(screen.getAllByText("Sac sans fond").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Source" })).toHaveAttribute(
      "href",
      "https://example.com/sac",
    );
    expect(
      screen.getAllByText(
        (_, element) =>
          element?.tagName === "P" &&
          element?.textContent?.replace(/\s+/g, " ").includes("Achat: 260 po"),
      ).length,
    ).toBeGreaterThan(0);
  });
});
