import { describe, expect, it, vi } from "vitest";
import { createSearchController } from "../src/search/controllers/searchController";
import { createMockResponse, createSearchServiceMock } from "./testHelpers";

describe("createSearchController", () => {
  it("returns the search payload", async () => {
    const payload = {
      query: {
        q: "barque",
        locale: "fr",
        module: null,
        section: null,
        entityType: null,
        limit: 20,
        offset: 0,
      },
      total: 1,
      results: [],
      facets: { modules: [], sections: [], entityTypes: [] },
    };
    const searchService = createSearchServiceMock(vi.fn().mockResolvedValue(payload));
    const { json, res } = createMockResponse();
    const controller = createSearchController({ searchService });

    await controller({ query: { q: "barque" } } as never, res, vi.fn());

    expect(searchService.search).toHaveBeenCalledWith({
      q: "barque",
      locale: "fr",
      module: null,
      section: null,
      entityType: null,
      limit: 20,
      offset: 0,
    });
    expect(json).toHaveBeenCalledWith(payload);
  });

  it("returns 500 when search fails", async () => {
    const searchService = createSearchServiceMock(
      vi.fn().mockRejectedValue(new Error("search backend unavailable")),
    );
    const { json, res, status } = createMockResponse();
    const controller = createSearchController({ searchService });

    await controller({ query: { q: "barque" } } as never, res, vi.fn());

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      message: "Unable to execute search query",
      error: "search backend unavailable",
    });
  });
});
