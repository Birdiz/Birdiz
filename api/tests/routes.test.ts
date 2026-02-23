import { describe, expect, it, vi } from "vitest";
import { createHealthRouter } from "../src/routes/healthRoutes";
import { createMasterScreenRouter } from "../src/master-screen/routes/masterScreenRoutes";
import { createSearchRouter } from "../src/search/routes/searchRoutes";
import { createMagicItemRouter } from "../src/magic-items/routes/magicItemRoutes";

function getRouteLayer(router: unknown) {
  const stack = (router as { stack?: Array<{ route?: unknown }> }).stack;
  return stack?.find((layer) => Boolean(layer.route))?.route as
    | { path: string; methods: Record<string, boolean> }
    | undefined;
}

describe("route factories", () => {
  it("creates /health GET route", () => {
    const healthController = vi.fn();
    const router = createHealthRouter({ healthController });
    const route = getRouteLayer(router);

    expect(route?.path).toBe("/health");
    expect(route?.methods.get).toBe(true);
  });

  it("creates /damages GET route", () => {
    const masterScreenDamagesController = vi.fn();
    const masterScreenTransportController = vi.fn();
    const masterScreenPropertiesController = vi.fn();
    const masterScreenLifestyleController = vi.fn();
    const router = createMasterScreenRouter({
      masterScreenDamagesController,
      masterScreenTransportController,
      masterScreenPropertiesController,
      masterScreenLifestyleController,
    });
    const route = getRouteLayer(router);

    expect(route?.path).toBe("/damages");
    expect(route?.methods.get).toBe(true);
  });

  it("creates /transport GET route", () => {
    const masterScreenDamagesController = vi.fn();
    const masterScreenTransportController = vi.fn();
    const masterScreenPropertiesController = vi.fn();
    const masterScreenLifestyleController = vi.fn();
    const router = createMasterScreenRouter({
      masterScreenDamagesController,
      masterScreenTransportController,
      masterScreenPropertiesController,
      masterScreenLifestyleController,
    });
    const stack = (router as { stack?: Array<{ route?: unknown }> }).stack || [];
    const transportRoute = stack
      .map((layer) => layer.route)
      .find(
        (route): route is { path: string; methods: Record<string, boolean> } =>
          Boolean(route) &&
          typeof (route as { path?: unknown }).path === "string" &&
          (route as { path: string }).path === "/transport",
      );

    expect(transportRoute?.methods.get).toBe(true);
  });

  it("creates /properties GET route", () => {
    const masterScreenDamagesController = vi.fn();
    const masterScreenTransportController = vi.fn();
    const masterScreenPropertiesController = vi.fn();
    const masterScreenLifestyleController = vi.fn();
    const router = createMasterScreenRouter({
      masterScreenDamagesController,
      masterScreenTransportController,
      masterScreenPropertiesController,
      masterScreenLifestyleController,
    });
    const stack = (router as { stack?: Array<{ route?: unknown }> }).stack || [];
    const propertiesRoute = stack
      .map((layer) => layer.route)
      .find(
        (route): route is { path: string; methods: Record<string, boolean> } =>
          Boolean(route) &&
          typeof (route as { path?: unknown }).path === "string" &&
          (route as { path: string }).path === "/properties",
      );

    expect(propertiesRoute?.methods.get).toBe(true);
  });

  it("creates /lifestyles GET route", () => {
    const masterScreenDamagesController = vi.fn();
    const masterScreenTransportController = vi.fn();
    const masterScreenPropertiesController = vi.fn();
    const masterScreenLifestyleController = vi.fn();
    const router = createMasterScreenRouter({
      masterScreenDamagesController,
      masterScreenTransportController,
      masterScreenPropertiesController,
      masterScreenLifestyleController,
    });
    const stack = (router as { stack?: Array<{ route?: unknown }> }).stack || [];
    const lifestylesRoute = stack
      .map((layer) => layer.route)
      .find(
        (route): route is { path: string; methods: Record<string, boolean> } =>
          Boolean(route) &&
          typeof (route as { path?: unknown }).path === "string" &&
          (route as { path: string }).path === "/lifestyles",
      );

    expect(lifestylesRoute?.methods.get).toBe(true);
  });

  it("creates /search GET route", () => {
    const searchController = vi.fn();
    const router = createSearchRouter({ searchController });
    const route = getRouteLayer(router);

    expect(route?.path).toBe("/search");
    expect(route?.methods.get).toBe(true);
  });

  it("creates /magic-items GET route", () => {
    const magicItemListController = vi.fn();
    const magicItemDetailController = vi.fn();
    const magicItemRandomStockController = vi.fn();
    const router = createMagicItemRouter({
      magicItemListController,
      magicItemDetailController,
      magicItemRandomStockController,
    });
    const route = getRouteLayer(router);

    expect(route?.path).toBe("/magic-items");
    expect(route?.methods.get).toBe(true);
  });

  it("creates /magic-items/:canonicalId GET route", () => {
    const magicItemListController = vi.fn();
    const magicItemDetailController = vi.fn();
    const magicItemRandomStockController = vi.fn();
    const router = createMagicItemRouter({
      magicItemListController,
      magicItemDetailController,
      magicItemRandomStockController,
    });
    const stack = (router as { stack?: Array<{ route?: unknown }> }).stack || [];
    const detailRoute = stack
      .map((layer) => layer.route)
      .find(
        (route): route is { path: string; methods: Record<string, boolean> } =>
          Boolean(route) &&
          typeof (route as { path?: unknown }).path === "string" &&
          (route as { path: string }).path === "/magic-items/:canonicalId",
      );

    expect(detailRoute?.methods.get).toBe(true);
  });

  it("creates /magic-items/random-stock GET route", () => {
    const magicItemListController = vi.fn();
    const magicItemDetailController = vi.fn();
    const magicItemRandomStockController = vi.fn();
    const router = createMagicItemRouter({
      magicItemListController,
      magicItemDetailController,
      magicItemRandomStockController,
    });
    const stack = (router as { stack?: Array<{ route?: unknown }> }).stack || [];
    const randomRoute = stack
      .map((layer) => layer.route)
      .find(
        (route): route is { path: string; methods: Record<string, boolean> } =>
          Boolean(route) &&
          typeof (route as { path?: unknown }).path === "string" &&
          (route as { path: string }).path === "/magic-items/random-stock",
      );

    expect(randomRoute?.methods.get).toBe(true);
  });
});
