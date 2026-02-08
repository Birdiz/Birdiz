import { describe, expect, it, vi } from "vitest";
import { createMasterScreenDamagesController } from "../src/master-screen/controllers/masterScreenController";
import {
  createMasterScreenDamageServiceMock,
  createMockResponse,
} from "./testHelpers";

describe("createMasterScreenDamagesController", () => {
  it("returns damages from the service", async () => {
    const damages = [{ die: "1d10", examples: ["Example"], sortOrder: 1 }];
    const masterScreenDamageService = createMasterScreenDamageServiceMock(
      vi.fn().mockResolvedValue(damages),
    );
    const { json, res } = createMockResponse();

    const controller = createMasterScreenDamagesController({
      masterScreenDamageService,
    });

    await controller({} as never, res, vi.fn());

    expect(masterScreenDamageService.getDamages).toHaveBeenCalledOnce();
    expect(json).toHaveBeenCalledWith({ damages });
  });

  it("returns 500 when the service throws", async () => {
    const masterScreenDamageService = createMasterScreenDamageServiceMock(
      vi.fn().mockRejectedValue(new Error("db unavailable")),
    );
    const { json, res, status } = createMockResponse();

    const controller = createMasterScreenDamagesController({
      masterScreenDamageService,
    });

    await controller({} as never, res, vi.fn());

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      message: "Unable to load master screen damages",
      error: "db unavailable",
    });
  });
});
