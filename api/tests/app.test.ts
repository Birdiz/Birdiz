import { describe, expect, it, vi } from "vitest";

const routeFactoryMocks = vi.hoisted(() => ({
  createHealthRouter: vi.fn(() => (_req: unknown, _res: unknown, next: () => void) => next()),
  createMasterScreenRouter: vi.fn(
    () => (_req: unknown, _res: unknown, next: () => void) => next(),
  ),
  createSearchRouter: vi.fn(() => (_req: unknown, _res: unknown, next: () => void) => next()),
}));

vi.mock("../src/routes/healthRoutes", () => ({
  createHealthRouter: routeFactoryMocks.createHealthRouter,
}));
vi.mock("../src/master-screen/routes/masterScreenRoutes", () => ({
  createMasterScreenRouter: routeFactoryMocks.createMasterScreenRouter,
}));
vi.mock("../src/search/routes/searchRoutes", () => ({
  createSearchRouter: routeFactoryMocks.createSearchRouter,
}));

describe("createApp", () => {
  it("wires route factories with the provided controllers", async () => {
    const { createApp } = await import("../src/app");

    const healthController = vi.fn();
    const masterScreenDamagesController = vi.fn();
    const masterScreenTransportController = vi.fn();
    const masterScreenPropertiesController = vi.fn();
    const masterScreenLifestyleController = vi.fn();
    const searchController = vi.fn();

    const app = createApp({
      corsOrigin: "https://birdiz.dev",
      healthController,
      masterScreenDamagesController,
      masterScreenTransportController,
      masterScreenPropertiesController,
      masterScreenLifestyleController,
      searchController,
    });

    expect(typeof app.use).toBe("function");
    expect(routeFactoryMocks.createHealthRouter).toHaveBeenCalledWith({
      healthController,
    });
    expect(routeFactoryMocks.createMasterScreenRouter).toHaveBeenCalledWith({
      masterScreenDamagesController,
      masterScreenTransportController,
      masterScreenPropertiesController,
      masterScreenLifestyleController,
    });
    expect(routeFactoryMocks.createSearchRouter).toHaveBeenCalledWith({
      searchController,
    });
  });
});
