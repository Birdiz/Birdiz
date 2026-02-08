import { describe, expect, it, vi } from "vitest";
import { createHealthRouter } from "../src/routes/healthRoutes";
import { createMasterScreenRouter } from "../src/master-screen/routes/masterScreenRoutes";

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
});
