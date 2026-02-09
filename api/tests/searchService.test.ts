import { describe, expect, it } from "vitest";
import type { SearchDocumentProvider } from "../src/search/types/searchTypes";
import { SearchService } from "../src/search/services/searchService";
import { NavigationSearchDocumentProvider } from "../src/search/providers/navigationSearchDocumentProvider";

function createProvider(): SearchDocumentProvider {
  return {
    async getDocuments(locale) {
      return [
        {
          id: `boat-barque-${locale}`,
          locale,
          module: "master-screen",
          section: "transport",
          entityType: "boat",
          title: "Barque",
          body: "50 PO 5 PA",
          keywords: ["transport", "boat"],
          href: `/${locale}/master-screen?section=transport`,
          anchor: "barque",
          weight: 80,
          metadata: {},
        },
        {
          id: `damage-1d10-${locale}`,
          locale,
          module: "master-screen",
          section: "damages",
          entityType: "damage",
          title: "1d10",
          body: locale === "en" ? "Burned by something" : "Bruler par quelque chose",
          keywords: ["damages", "dice"],
          href: `/${locale}/master-screen?section=damages`,
          anchor: "1d10",
          weight: 100,
          metadata: {},
        },
      ];
    },
  };
}

describe("SearchService", () => {
  it("filters, ranks, and paginates results", async () => {
    const service = new SearchService([createProvider()]);

    const payload = await service.search({
      q: "barque",
      locale: "fr",
      module: "master-screen",
      section: "transport",
      entityType: "boat",
      limit: 10,
      offset: 0,
    });

    expect(payload.total).toBe(1);
    expect(payload.results[0]?.title).toBe("Barque");
    expect(payload.results[0]?.href).toContain("/fr/master-screen");
    expect(payload.facets.modules).toEqual([{ value: "master-screen", count: 1 }]);
  });

  it("applies locale isolation", async () => {
    const service = new SearchService([createProvider()]);

    const payload = await service.search({
      q: "burned",
      locale: "fr",
      module: null,
      section: null,
      entityType: null,
      limit: 10,
      offset: 0,
    });

    expect(payload.total).toBe(0);
  });

  it("prioritizes exact page phrase matches with ranking boosts", async () => {
    const service = new SearchService([
      new NavigationSearchDocumentProvider(),
      createProvider(),
    ]);

    const payload = await service.search({
      q: "master screen",
      locale: "en",
      module: null,
      section: null,
      entityType: null,
      limit: 5,
      offset: 0,
    });

    expect(payload.total).toBeGreaterThan(0);
    expect(payload.results[0]?.entityType).toBe("page");
    expect(payload.results[0]?.title).toBe("Master Screen");
    expect(payload.results[0]?.href).toBe("/en/master-screen");
  });
});
