import { describe, expect, it, vi } from "vitest";

const routeFactoryMocks = vi.hoisted(() => ({
  createHealthRouter: vi.fn(() => (_req: unknown, _res: unknown, next: () => void) => next()),
  createSummaryRouter: vi.fn(() => (_req: unknown, _res: unknown, next: () => void) => next()),
  createMasterScreenRouter: vi.fn(
    () => (_req: unknown, _res: unknown, next: () => void) => next(),
  ),
}));

vi.mock("../src/routes/healthRoutes", () => ({
  createHealthRouter: routeFactoryMocks.createHealthRouter,
}));
vi.mock("../src/routes/summaryRoutes", () => ({
  createSummaryRouter: routeFactoryMocks.createSummaryRouter,
}));
vi.mock("../src/routes/masterScreenRoutes", () => ({
  createMasterScreenRouter: routeFactoryMocks.createMasterScreenRouter,
}));

describe("createApp", () => {
  it("wires route factories with the provided controllers", async () => {
    const { createApp } = await import("../src/app");

    const healthController = vi.fn();
    const summaryController = vi.fn();
    const masterScreenDamagesController = vi.fn();

    const app = createApp({
      corsOrigin: "https://birdiz.dev",
      healthController,
      summaryController,
      masterScreenDamagesController,
    });

    expect(typeof app.use).toBe("function");
    expect(routeFactoryMocks.createHealthRouter).toHaveBeenCalledWith({
      healthController,
    });
    expect(routeFactoryMocks.createSummaryRouter).toHaveBeenCalledWith({
      summaryController,
    });
    expect(routeFactoryMocks.createMasterScreenRouter).toHaveBeenCalledWith({
      masterScreenDamagesController,
    });
  });
});
