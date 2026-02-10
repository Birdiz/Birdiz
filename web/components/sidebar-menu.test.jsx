import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LocaleIntlProvider from "./i18n/intl-provider";
import SidebarMenu from "./sidebar-menu";
import { getMessages } from "../lib/i18n/messages";

vi.mock("next/navigation", () => ({
  usePathname: () => null,
}));

const props = {
  locale: "en",
  projectName: "DDBuilder",
  subtitle: "Player and DM toolkit",
  items: [{ label: "Home", href: "/en" }],
  sidebarId: "site-sidebar",
  isOpen: true,
  onClose: vi.fn(),
};

describe("SidebarMenu", () => {
  it("falls back to locale-root links when pathname is unavailable", () => {
    render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        <SidebarMenu {...props} />
      </LocaleIntlProvider>,
    );

    expect(screen.getByRole("link", { name: "en" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: "fr" })).toHaveAttribute("href", "/fr");
  });
});
