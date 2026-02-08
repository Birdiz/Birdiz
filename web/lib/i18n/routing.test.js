import { describe, expect, it } from "vitest";
import { getLocalePath } from "./routing";

describe("getLocalePath", () => {
  it("switches locale for locale-prefixed paths", () => {
    expect(getLocalePath("/en/master-screen", "fr")).toBe("/fr/master-screen");
    expect(getLocalePath("/fr/next-steps", "en")).toBe("/en/next-steps");
  });

  it("normalizes root and trailing slash paths", () => {
    expect(getLocalePath("/", "en")).toBe("/en");
    expect(getLocalePath("/en/", "fr")).toBe("/fr");
  });

  it("prefixes non-locale paths", () => {
    expect(getLocalePath("/master-screen", "fr")).toBe("/fr/master-screen");
    expect(getLocalePath("/master-screen", "en")).toBe("/master-screen");
  });
});
