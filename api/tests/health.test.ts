import type { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { healthController } from "../src/controllers/healthController";
import { createMockResponse } from "./testHelpers";

describe("healthController", () => {
  it("returns ok status payload", () => {
    const { json, res } = createMockResponse();

    healthController({} as Request, res as Response, vi.fn());

    expect(json).toHaveBeenCalledWith({ status: "ok" });
  });
});
