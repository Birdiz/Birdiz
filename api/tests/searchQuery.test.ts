import { describe, expect, it } from "vitest";
import { parseSearchQuery } from "../src/search/utils/searchQuery";

describe("parseSearchQuery", () => {
  it("parses and sanitizes query parameters", () => {
    const query = parseSearchQuery({
      query: {
        q: "  barque ",
        locale: "en",
        module: "master-screen",
        section: "transport",
        entityType: "boat",
        limit: "100",
        offset: "2",
      },
    } as never);

    expect(query).toEqual({
      q: "barque",
      locale: "en",
      module: "master-screen",
      section: "transport",
      entityType: "boat",
      limit: 50,
      offset: 2,
    });
  });

  it("falls back to defaults for unsupported filters", () => {
    const query = parseSearchQuery({
      query: {
        q: "",
        locale: "xx",
        module: "unknown",
        section: "unknown",
        entityType: "unknown",
        limit: "-10",
        offset: "abc",
      },
    } as never);

    expect(query).toEqual({
      q: "",
      locale: "fr",
      module: null,
      section: null,
      entityType: null,
      limit: 20,
      offset: 0,
    });
  });

  it("accepts magic item filter values", () => {
    const query = parseSearchQuery({
      query: {
        q: "bag",
        locale: "en",
        module: "magic-items",
        section: "magic-trading-post",
        entityType: "magic-item",
      },
    } as never);

    expect(query).toEqual({
      q: "bag",
      locale: "en",
      module: "magic-items",
      section: "magic-trading-post",
      entityType: "magic-item",
      limit: 20,
      offset: 0,
    });
  });
});
