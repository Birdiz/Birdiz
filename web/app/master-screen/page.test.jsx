import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LocaleIntlProvider from "../../components/i18n/intl-provider";
import MasterScreenPage from "../[locale]/master-screen/page";
import { getMessages } from "../../lib/i18n/messages";
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

describe("LocalizedMasterScreenPage", () => {
  it("renders card navigation, locale-aware damages payload, and swaps active section content", async () => {
    vi.mocked(getMasterScreenDamages).mockResolvedValue([
      {
        die: "1d10",
        examples: ["Burned by something"],
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

    render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        {await MasterScreenPage({ params: { locale: "en" } })}
      </LocaleIntlProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Master Screen",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("In-session references for high-velocity decisions"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Pick a domain card to focus one data module at a time, then resolve outcomes without scanning through long stacked tables.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show Damages" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("1d10")).toBeInTheDocument();
    expect(screen.getByText("Burned by something")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Show Transport" }));

    expect(screen.getByRole("button", { name: "Show Transport" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("Barque")).toBeInTheDocument();
    expect(screen.queryByText("1d10")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Show Lifestyles" }));
    expect(screen.getByText("Transport en ville")).toBeInTheDocument();
    expect(screen.getByText("1 PC/j")).toBeInTheDocument();
    expect(getMasterScreenDamages).toHaveBeenCalledWith("en");
    expect(getMasterScreenTransport).toHaveBeenCalledWith("en");
    expect(getMasterScreenProperties).toHaveBeenCalledWith("en");
    expect(getMasterScreenLifestyles).toHaveBeenCalledWith("en");
  });

  it("requests french locale damages payload for fr route", async () => {
    vi.mocked(getMasterScreenDamages).mockResolvedValue([
      {
        die: "1d10",
        examples: ["Brûler par quelque chose"],
      },
    ]);
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

    render(
      <LocaleIntlProvider locale="fr" messages={getMessages("fr")}>
        {await MasterScreenPage({ params: { locale: "fr" } })}
      </LocaleIntlProvider>,
    );

    expect(screen.getByRole("heading", { name: "Écran MJ" })).toBeInTheDocument();
    expect(screen.getByText("Brûler par quelque chose")).toBeInTheDocument();
    expect(getMasterScreenDamages).toHaveBeenCalledWith("fr");
    expect(getMasterScreenTransport).toHaveBeenCalledWith("fr");
    expect(getMasterScreenProperties).toHaveBeenCalledWith("fr");
    expect(getMasterScreenLifestyles).toHaveBeenCalledWith("fr");
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

    render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        {await MasterScreenPage({ params: { locale: "en" } })}
      </LocaleIntlProvider>,
    );

    expect(screen.getByText("No damages found yet.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Show Transport" }));
    expect(screen.getByText("No transport data found yet.")).toBeInTheDocument();
  });

  it("opens the section requested via search params", async () => {
    vi.mocked(getMasterScreenDamages).mockResolvedValue([
      {
        die: "1d10",
        examples: ["Burned by something"],
      },
    ]);
    vi.mocked(getMasterScreenTransport).mockResolvedValue({
      boats: [{ name: "Barque", price: "50 PO", rent: "5 PA" }],
      mounts: [],
      mountEquipments: [],
    });
    vi.mocked(getMasterScreenProperties).mockResolvedValue({
      buildings: [],
      maintenance: [],
    });
    vi.mocked(getMasterScreenLifestyles).mockResolvedValue([]);

    render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        {
          await MasterScreenPage({
            params: { locale: "en" },
            searchParams: { section: "transport" },
          })
        }
      </LocaleIntlProvider>,
    );

    expect(screen.getByRole("button", { name: "Show Transport" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("Barque")).toBeInTheDocument();
    expect(screen.queryByText("1d10")).not.toBeInTheDocument();
  });
});
