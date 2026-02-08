import { beforeEach, describe, expect, it, vi } from "vitest";
import { getMasterScreenDamages } from "./masterScreenData";

describe("getMasterScreenDamages", () => {
  const originalApiBase = process.env.API_BASE_URL;
  const originalPublicApiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.API_BASE_URL = originalApiBase;
    process.env.NEXT_PUBLIC_API_BASE_URL = originalPublicApiBase;
  });

  it("uses API_BASE_URL when available and returns damages payload", async () => {
    process.env.API_BASE_URL = "https://api.internal";
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.public";

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ damages: [{ die: "1d10", examples: [] }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await getMasterScreenDamages();

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.internal/api/master-screen/damages",
      { cache: "no-store" },
    );
    expect(result).toEqual([{ die: "1d10", examples: [] }]);
  });

  it("falls back to empty list for non-ok responses", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 500 }));

    const result = await getMasterScreenDamages();

    expect(result).toEqual([]);
  });

  it("falls back to empty list when fetch throws", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));

    const result = await getMasterScreenDamages();

    expect(result).toEqual([]);
  });

  it("falls back to empty list when payload has no damages field", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await getMasterScreenDamages();

    expect(result).toEqual([]);
  });
});
