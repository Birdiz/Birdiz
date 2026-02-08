import type { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { healthController } from "../src/controllers/healthController";

describe("healthController", () => {
  it("returns ok status payload", () => {
    const json = vi.fn();
    const response = { json } as unknown as Response;

    healthController({} as Request, response, vi.fn());

    expect(json).toHaveBeenCalledWith({ status: "ok" });
  });
});
