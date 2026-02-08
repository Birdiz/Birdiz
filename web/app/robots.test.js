import { describe, expect, it } from "vitest";
import robots from "./robots";

describe("robots", () => {
  it("returns crawl rules and sitemap", () => {
    const result = robots();

    expect(result.rules.allow).toBe("/");
    expect(result.sitemap).toContain("/sitemap.xml");
  });
});
