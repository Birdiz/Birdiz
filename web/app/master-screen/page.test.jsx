import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MasterScreenPage from "./page";
import { getMasterScreenDamages } from "../../lib/masterScreenData";

vi.mock("../../lib/masterScreenData", () => ({
  getMasterScreenDamages: vi.fn(),
}));

describe("MasterScreenPage", () => {
  it("renders damages from API data", async () => {
    vi.mocked(getMasterScreenDamages).mockResolvedValue([
      {
        die: "1d10",
        examples: ["Bruler par quelque chose"],
      },
    ]);

    render(await MasterScreenPage());

    expect(screen.getByRole("heading", { name: /Master Screen/ })).toBeInTheDocument();
    expect(screen.getByText("1d10")).toBeInTheDocument();
    expect(screen.getByText("Bruler par quelque chose")).toBeInTheDocument();
  });

  it("renders empty state when damages list is empty", async () => {
    vi.mocked(getMasterScreenDamages).mockResolvedValue([]);

    render(await MasterScreenPage());

    expect(screen.getByText("No damages found yet.")).toBeInTheDocument();
  });
});
