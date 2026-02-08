import { describe, expect, it, vi } from "vitest";
import { createMasterScreenDamagesController } from "../src/master-screen/controllers/masterScreenController";
import {
  createMasterScreenDamageServiceMock,
  createMockResponse,
} from "./testHelpers";

describe("createMasterScreenDamagesController", () => {
  it("returns damages from the service with default locale", async () => {
    const damages = [{ die: "1d10", examples: ["Example"], sortOrder: 1 }];
    const masterScreenDamageService = createMasterScreenDamageServiceMock(
      vi.fn().mockResolvedValue(damages),
    );
    const { json, res } = createMockResponse();

    const controller = createMasterScreenDamagesController({
      masterScreenDamageService,
    });

    await controller({ query: {} } as never, res, vi.fn());

    expect(masterScreenDamageService.getDamages).toHaveBeenCalledWith("fr");
    expect(json).toHaveBeenCalledWith({ damages });
  });

  it("returns damages from the service with english locale", async () => {
    const damages = [{ die: "1d10", examples: ["Burned by something"], sortOrder: 1 }];
    const masterScreenDamageService = createMasterScreenDamageServiceMock(
      vi.fn().mockResolvedValue(damages),
    );
    const { json, res } = createMockResponse();

    const controller = createMasterScreenDamagesController({
      masterScreenDamageService,
    });

    await controller({ query: { locale: "en" } } as never, res, vi.fn());

    expect(masterScreenDamageService.getDamages).toHaveBeenCalledWith("en");
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

    await controller({ query: {} } as never, res, vi.fn());

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      message: "Unable to load master screen damages",
      error: "db unavailable",
    });
  });
});
