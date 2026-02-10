import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getMasterScreenDamages,
  getMasterScreenLifestyles,
  getMasterScreenProperties,
  getMasterScreenTransport,
} from "./masterScreenData";

describe("master screen data clients", () => {
  const originalApiBase = process.env.API_BASE_URL;
  const originalPublicApiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.API_BASE_URL = originalApiBase;
    process.env.NEXT_PUBLIC_API_BASE_URL = originalPublicApiBase;
  });

  it("returns damages payload with locale query", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ damages: [{ die: "1d10", examples: [] }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await getMasterScreenDamages("fr");

    expect(result).toEqual([{ die: "1d10", examples: [] }]);
    expect(fetchSpy.mock.calls[0][0]).toContain("/api/master-screen/damages?locale=fr");
  });

  it("defaults damages locale query to english", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ damages: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await getMasterScreenDamages();

    expect(fetchSpy.mock.calls[0][0]).toContain("/api/master-screen/damages?locale=en");
  });

  it("returns transport payload", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          boats: [{ name: "Boat" }],
          mounts: [{ name: "Mount" }],
          mountEquipments: [{ name: "Equip" }],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const result = await getMasterScreenTransport("fr");

    expect(result.boats).toEqual([{ name: "Boat" }]);
    expect(fetchSpy.mock.calls[0][0]).toContain("/api/master-screen/transport?locale=fr");
  });

  it("returns properties payload", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          buildings: [{ name: "Build" }],
          maintenance: [{ name: "Maint" }],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const result = await getMasterScreenProperties("en");

    expect(result).toEqual({
      buildings: [{ name: "Build" }],
      maintenance: [{ name: "Maint" }],
    });
    expect(fetchSpy.mock.calls[0][0]).toContain(
      "/api/master-screen/properties?locale=en",
    );
  });

  it("returns lifestyles payload", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ lifestyles: [{ name: "Modeste" }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await getMasterScreenLifestyles("fr");

    expect(result).toEqual([{ name: "Modeste" }]);
    expect(fetchSpy.mock.calls[0][0]).toContain(
      "/api/master-screen/lifestyles?locale=fr",
    );
  });

  it("returns empty fallback for failed requests", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));

    await expect(getMasterScreenDamages()).resolves.toEqual([]);
    await expect(getMasterScreenTransport()).resolves.toEqual({
      boats: [],
      mounts: [],
      mountEquipments: [],
    });
    await expect(getMasterScreenProperties()).resolves.toEqual({
      buildings: [],
      maintenance: [],
    });
    await expect(getMasterScreenLifestyles()).resolves.toEqual([]);
  });
});
