import { describe, expect, it, vi } from "vitest";
import { createMasterScreenLifestyleController } from "../src/master-screen/controllers/masterScreenLifestyleController";
import {
  createMasterScreenLifestyleServiceMock,
  createMockResponse,
} from "./testHelpers";

describe("createMasterScreenLifestyleController", () => {
  it("returns lifestyles", async () => {
    const lifestyles = [{ name: "Modeste", price: "1PO/j", description: "Desc", services: [] }];
    const masterScreenLifestyleService = createMasterScreenLifestyleServiceMock(
      vi.fn().mockResolvedValue(lifestyles),
    );
    const { json, res } = createMockResponse();

    const controller = createMasterScreenLifestyleController({
      masterScreenLifestyleService,
    });

    await controller({} as never, res, vi.fn());

    expect(masterScreenLifestyleService.getLifestyles).toHaveBeenCalledOnce();
    expect(json).toHaveBeenCalledWith({ lifestyles });
  });

  it("returns 500 when service throws", async () => {
    const masterScreenLifestyleService = createMasterScreenLifestyleServiceMock(
      vi.fn().mockRejectedValue(new Error("db unavailable")),
    );
    const { json, res, status } = createMockResponse();

    const controller = createMasterScreenLifestyleController({
      masterScreenLifestyleService,
    });

    await controller({} as never, res, vi.fn());

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      message: "Unable to load master screen lifestyles",
      error: "db unavailable",
    });
  });
});
