import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeShell from "./home-shell";

const content = {
  projectName: "DDBuilder",
  subtitle: "Toolkit for Dungeon Masters",
  menuItems: [
    { label: "Home", href: "/" },
    { label: "Next Steps", href: "/next-steps" },
  ],
  githubUrl: "https://github.com/Birdiz/Birdiz",
};

describe("HomeShell", () => {
  it("renders navigation and children content", () => {
    render(
      <HomeShell content={content}>
        <p>Child content</p>
      </HomeShell>,
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
      <HomeShell content={content}>
        <p>Child content</p>
      </HomeShell>,
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
