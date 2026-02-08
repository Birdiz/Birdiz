import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MasterScreenPage from "./page";
import {
  getMasterScreenDamages,
  getMasterScreenLifestyles,
  getMasterScreenProperties,
  getMasterScreenTransport,
} from "../../lib/masterScreenData";

vi.mock("../../lib/masterScreenData", () => ({
  getMasterScreenDamages: vi.fn(),
  getMasterScreenTransport: vi.fn(),
  getMasterScreenProperties: vi.fn(),
  getMasterScreenLifestyles: vi.fn(),
}));

describe("MasterScreenPage", () => {
  it("renders card navigation and swaps active section content", async () => {
    vi.mocked(getMasterScreenDamages).mockResolvedValue([
      {
        die: "1d10",
        examples: ["Bruler par quelque chose"],
      },
    ]);
    vi.mocked(getMasterScreenTransport).mockResolvedValue({
      boats: [{ name: "Barque", price: "50 PO", rent: "5 PA" }],
      mounts: [],
      mountEquipments: [],
    });
    vi.mocked(getMasterScreenProperties).mockResolvedValue({
      buildings: [{ name: "Cottage", price: "400 PO", rent: "5 PO", duration: "15" }],
      maintenance: [
        {
          name: "Ferme",
          cost: "5 PA",
          workerUnqualified: "2",
          workerQualified: "1",
        },
      ],
    });
    vi.mocked(getMasterScreenLifestyles).mockResolvedValue([
      {
        name: "Modeste",
        price: "1PO/j",
        description: "Simple and stable.",
        services: [{ name: "Transport en ville", price: "1 PC/j" }],
      },
    ]);

    render(await MasterScreenPage());

    expect(
      screen.getByRole("heading", {
        name: "In-session references for high-velocity decisions",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show Damages" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("1d10")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Show Transport" }));

    expect(screen.getByRole("button", { name: "Show Transport" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("Barque")).toBeInTheDocument();
    expect(screen.queryByText("1d10")).not.toBeInTheDocument();
  });

  it("renders empty state when selected section has no data", async () => {
    vi.mocked(getMasterScreenDamages).mockResolvedValue([]);
    vi.mocked(getMasterScreenTransport).mockResolvedValue({
      boats: [],
      mounts: [],
      mountEquipments: [],
    });
    vi.mocked(getMasterScreenProperties).mockResolvedValue({
      buildings: [],
      maintenance: [],
    });
    vi.mocked(getMasterScreenLifestyles).mockResolvedValue([]);

    render(await MasterScreenPage());

    expect(screen.getByText("No damages found yet.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Show Transport" }));
    expect(screen.getByText("No transport data found yet.")).toBeInTheDocument();
  });
});
