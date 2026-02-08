import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";
import { homeContent } from "../lib/homeContent";

describe("HomePage", () => {
  it("renders project section and home description", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /Project/ })).toBeInTheDocument();
    expect(screen.getByText(homeContent.description)).toBeInTheDocument();
  });
});
