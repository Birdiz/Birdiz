import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("returns locale-aware urls", () => {
    const result = sitemap();

    expect(result.length).toBe(8);
    expect(result.find((entry) => entry.url.endsWith("/en"))).toBeTruthy();
    expect(result.find((entry) => entry.url.endsWith("/fr/master-screen"))).toBeTruthy();
    expect(result.find((entry) => entry.url.endsWith("/fr/magic-trading-post"))).toBeTruthy();
  });
});
