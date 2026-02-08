import { describe, expect, it, vi } from "vitest";
import { createMasterScreenPropertiesController } from "../src/master-screen/controllers/masterScreenPropertiesController";
import {
  createMasterScreenPropertiesServiceMock,
  createMockResponse,
} from "./testHelpers";

describe("createMasterScreenPropertiesController", () => {
  it("returns properties data", async () => {
    const properties = { buildings: [], maintenance: [] };
    const masterScreenPropertiesService = createMasterScreenPropertiesServiceMock(
      vi.fn().mockResolvedValue(properties),
    );
    const { json, res } = createMockResponse();

    const controller = createMasterScreenPropertiesController({
      masterScreenPropertiesService,
    });

    await controller({} as never, res, vi.fn());

    expect(masterScreenPropertiesService.getPropertiesData).toHaveBeenCalledOnce();
    expect(json).toHaveBeenCalledWith(properties);
  });

  it("returns 500 when service throws", async () => {
    const masterScreenPropertiesService = createMasterScreenPropertiesServiceMock(
      vi.fn().mockRejectedValue(new Error("db unavailable")),
    );
    const { json, res, status } = createMockResponse();

    const controller = createMasterScreenPropertiesController({
      masterScreenPropertiesService,
    });

    await controller({} as never, res, vi.fn());

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      message: "Unable to load master screen properties data",
      error: "db unavailable",
    });
  });
});
