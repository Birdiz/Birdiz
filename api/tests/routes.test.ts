import { describe, expect, it, vi } from "vitest";
import { createHealthRouter } from "../src/routes/healthRoutes";
import { createSummaryRouter } from "../src/routes/summaryRoutes";
import { createMasterScreenRouter } from "../src/routes/masterScreenRoutes";

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

  it("creates /summary GET route", () => {
    const summaryController = vi.fn();
    const router = createSummaryRouter({ summaryController });
    const route = getRouteLayer(router);

    expect(route?.path).toBe("/summary");
    expect(route?.methods.get).toBe(true);
  });

  it("creates /damages GET route", () => {
    const masterScreenDamagesController = vi.fn();
    const router = createMasterScreenRouter({ masterScreenDamagesController });
    const route = getRouteLayer(router);

    expect(route?.path).toBe("/damages");
    expect(route?.methods.get).toBe(true);
  });
});
