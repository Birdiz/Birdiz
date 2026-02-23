import { beforeEach, describe, expect, it, vi } from "vitest";
import { getMagicItems, getRandomMagicStock } from "./magicItemsData";

describe("magic items data client", () => {
  const originalApiBase = process.env.API_BASE_URL;
  const originalPublicApiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.API_BASE_URL = originalApiBase;
    process.env.NEXT_PUBLIC_API_BASE_URL = originalPublicApiBase;
  });

  it("requests localized magic items with filters", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          items: [{ canonicalId: "bag-of-holding", name: "Bag of Holding" }],
          total: 1,
          limit: 20,
          offset: 0,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const result = await getMagicItems("fr", {
      q: "sac",
      rarity: "Peu commun",
      type: "Objet merveilleux",
      attunement: "not-required",
      status: "active",
      limit: 30,
      offset: 10,
    });

    expect(result.total).toBe(1);
    expect(fetchSpy.mock.calls[0][0]).toContain("/api/magic-items?locale=fr");
    expect(fetchSpy.mock.calls[0][0]).toContain("q=sac");
    expect(fetchSpy.mock.calls[0][0]).toContain("attunement=not-required");
    expect(fetchSpy.mock.calls[0][0]).toContain("status=active");
  });

  it("falls back to english locale for unsupported locale value", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ items: [], total: 0, limit: 0, offset: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await getMagicItems("xx");

    expect(fetchSpy.mock.calls[0][0]).toContain("/api/magic-items?locale=en");
  });

  it("requests random merchant stock and seed", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          seed: "fixed-seed",
          totalPool: 12,
          merchant: { name: "Aelric" },
          items: [],
          limit: 10,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const result = await getRandomMagicStock("fr", {
      limit: 10,
      status: "active",
      seed: "fixed-seed",
    });

    expect(result.seed).toBe("fixed-seed");
    expect(fetchSpy.mock.calls[0][0]).toContain("/api/magic-items/random-stock?locale=fr");
    expect(fetchSpy.mock.calls[0][0]).toContain("status=active");
    expect(fetchSpy.mock.calls[0][0]).toContain("seed=fixed-seed");
  });
});
