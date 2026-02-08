import { describe, expect, it, vi } from "vitest";
import { createMasterScreenTransportController } from "../src/master-screen/controllers/masterScreenTransportController";
import {
  createMasterScreenTransportServiceMock,
  createMockResponse,
} from "./testHelpers";

describe("createMasterScreenTransportController", () => {
  it("returns transport data", async () => {
    const transport = { boats: [], mounts: [], mountEquipments: [] };
    const masterScreenTransportService = createMasterScreenTransportServiceMock(
      vi.fn().mockResolvedValue(transport),
    );
    const { json, res } = createMockResponse();

    const controller = createMasterScreenTransportController({
      masterScreenTransportService,
    });

    await controller({} as never, res, vi.fn());

    expect(masterScreenTransportService.getTransportData).toHaveBeenCalledOnce();
    expect(json).toHaveBeenCalledWith(transport);
  });

  it("returns 500 when service throws", async () => {
    const masterScreenTransportService = createMasterScreenTransportServiceMock(
      vi.fn().mockRejectedValue(new Error("db unavailable")),
    );
    const { json, res, status } = createMockResponse();

    const controller = createMasterScreenTransportController({
      masterScreenTransportService,
    });

    await controller({} as never, res, vi.fn());

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      message: "Unable to load master screen transport data",
      error: "db unavailable",
    });
  });
});
