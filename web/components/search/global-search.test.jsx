import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import LocaleIntlProvider from "../i18n/intl-provider";
import { getMessages } from "../../lib/i18n/messages";
import GlobalSearch from "./global-search";
import { fetchSearchResults } from "../../lib/apiClient";

vi.mock("../../lib/apiClient", () => ({
  fetchSearchResults: vi.fn(),
}));

describe("GlobalSearch", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("debounces query input and renders matching results", async () => {
    vi.mocked(fetchSearchResults).mockResolvedValue({
      results: [
        {
          id: "page-master-screen-en",
          section: "master-screen",
          title: "Master Screen",
          body: "Master screen references",
          href: "/en/master-screen",
        },
      ],
    });

    render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        <GlobalSearch locale="en" onNavigate={vi.fn()} />
      </LocaleIntlProvider>,
    );

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "master" },
    });

    await waitFor(() => {
      expect(fetchSearchResults).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "master",
          locale: "en",
          limit: 8,
        }),
      );
    });

    expect(await screen.findByRole("link", { name: /Master Screen/i })).toHaveAttribute(
      "href",
      "/en/master-screen",
    );
  });

  it("renders no-results state after search response", async () => {
    vi.mocked(fetchSearchResults).mockResolvedValue({ results: [] });

    render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        <GlobalSearch locale="en" onNavigate={vi.fn()} />
      </LocaleIntlProvider>,
    );

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "zzzz" },
    });

    await waitFor(() => {
      expect(fetchSearchResults).toHaveBeenCalled();
    });

    expect(await screen.findByText("No results found.")).toBeInTheDocument();
  });

  it("renders error state when backend reports failure", async () => {
    vi.mocked(fetchSearchResults).mockResolvedValue({
      results: [],
      error: "network_error",
    });

    render(
      <LocaleIntlProvider locale="en" messages={getMessages("en")}>
        <GlobalSearch locale="en" onNavigate={vi.fn()} />
      </LocaleIntlProvider>,
    );

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "master" },
    });

    expect(
      await screen.findByText("Search is temporarily unavailable."),
    ).toBeInTheDocument();
  });
});
