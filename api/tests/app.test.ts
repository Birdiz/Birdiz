import { describe, expect, it, vi } from "vitest";

const routeFactoryMocks = vi.hoisted(() => ({
  createHealthRouter: vi.fn(() => (_req: unknown, _res: unknown, next: () => void) => next()),
  createMasterScreenRouter: vi.fn(
    () => (_req: unknown, _res: unknown, next: () => void) => next(),
  ),
  createMagicItemRouter: vi.fn(
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
vi.mock("../src/magic-items/routes/magicItemRoutes", () => ({
  createMagicItemRouter: routeFactoryMocks.createMagicItemRouter,
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
    const magicItemListController = vi.fn();
    const magicItemDetailController = vi.fn();
    const magicItemRandomStockController = vi.fn();
    const searchController = vi.fn();

    const app = createApp({
      corsOrigin: "https://birdiz.dev",
      healthController,
      masterScreenDamagesController,
      masterScreenTransportController,
      masterScreenPropertiesController,
      masterScreenLifestyleController,
      magicItemListController,
      magicItemDetailController,
      magicItemRandomStockController,
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
    expect(routeFactoryMocks.createMagicItemRouter).toHaveBeenCalledWith({
      magicItemListController,
      magicItemDetailController,
      magicItemRandomStockController,
    });
    expect(routeFactoryMocks.createSearchRouter).toHaveBeenCalledWith({
      searchController,
    });
  });
});
