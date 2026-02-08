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

  it("returns damages payload", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ damages: [{ die: "1d10", examples: [] }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await getMasterScreenDamages();

    expect(result).toEqual([{ die: "1d10", examples: [] }]);
  });

  it("returns transport payload", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
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

    const result = await getMasterScreenTransport();

    expect(result.boats).toEqual([{ name: "Boat" }]);
  });

  it("returns properties payload", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
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

    const result = await getMasterScreenProperties();

    expect(result).toEqual({
      buildings: [{ name: "Build" }],
      maintenance: [{ name: "Maint" }],
    });
  });

  it("returns lifestyles payload", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ lifestyles: [{ name: "Modeste" }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await getMasterScreenLifestyles();

    expect(result).toEqual([{ name: "Modeste" }]);
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
