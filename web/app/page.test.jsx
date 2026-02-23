import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LocaleIntlProvider from "../components/i18n/intl-provider";
import HomePage from "./[locale]/page";
import { getMessages } from "../lib/i18n/messages";

describe("LocalizedHomePage", () => {
  it("renders english hero and tool modules", async () => {
    render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        {await HomePage({ params: { locale: "en" } })}
      </LocaleIntlProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Tools first. Lore second. Faster play for everyone.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Tool Modules")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Master Screen" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Magic Trading Post" }),
    ).toBeInTheDocument();
  });

  it("renders french locale content", async () => {
    render(
      <LocaleIntlProvider locale="fr" messages={getMessages("fr")}>
        {await HomePage({ params: { locale: "fr" } })}
      </LocaleIntlProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Les outils d'abord. Le lore ensuite. Plus fluide pour tous.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Écran MJ" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Comptoir magique" })).toBeInTheDocument();
  });
});
