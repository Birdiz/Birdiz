import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LocaleIntlProvider from "../../components/i18n/intl-provider";
import NextStepsPage from "../[locale]/next-steps/page";
import { getMessages } from "../../lib/i18n/messages";

describe("LocalizedNextStepsPage", () => {
  it("renders roadmap heading and milestones", async () => {
    render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        {await NextStepsPage({ params: { locale: "en" } })}
      </LocaleIntlProvider>,
    );

    expect(screen.getByRole("heading", { name: "Delivery roadmap" })).toBeInTheDocument();
    expect(screen.getByText("Milestones")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Master Screen expansion",
      }),
    ).toBeInTheDocument();
  });
});
