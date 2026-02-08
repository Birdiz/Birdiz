import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LocaleIntlProvider from "./i18n/intl-provider";
import HomeShell from "./home-shell";
import { getMessages } from "../lib/i18n/messages";

const content = {
  projectName: "DDBuilder",
  subtitle: "Player and DM toolkit",
  menuItems: [
    { label: "Home", href: "/en" },
    { label: "Roadmap", href: "/en/next-steps" },
  ],
  githubUrl: "https://github.com/Birdiz/Birdiz",
};

describe("HomeShell", () => {
  it("renders navigation and children content", () => {
    render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        <HomeShell content={content} locale="en">
          <p>Child content</p>
        </HomeShell>
      </LocaleIntlProvider>,
    );

    expect(screen.getByRole("heading", { name: /DDBuilder/ })).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/Birdiz/Birdiz",
    );
  });

  it("toggles mobile menu open and closed", () => {
    const { container, getByRole } = render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        <HomeShell content={content} locale="en">
          <p>Child content</p>
        </HomeShell>
      </LocaleIntlProvider>,
    );

    const menuButton = getByRole("button", { name: "Open menu" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);

    expect(getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    const overlay = container.querySelector('div[aria-hidden="true"]');
    if (!overlay) {
      throw new Error("Expected overlay element to exist");
    }

    fireEvent.click(overlay);

    expect(getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
