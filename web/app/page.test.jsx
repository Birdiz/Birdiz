import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";
import { homeContent } from "../lib/homeContent";

describe("HomePage", () => {
  it("renders hero and tool modules", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: homeContent.hero.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Intentions")).toBeInTheDocument();
    expect(screen.getByText("Tool Modules")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Master Screen" })).toBeInTheDocument();
  });
});
