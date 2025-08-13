import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ToggleButton from "../toggle-button";

vi.mock("@/app/action", () => ({
  toggleBookReadStatus: vi.fn(),
}));

describe("ToggleButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render a button with "Read" text', () => {
    render(<ToggleButton id="book-123" />);

    const button = screen.getByRole("button", { name: "Read" });
    expect(button).toBeInTheDocument();
  });

  it("should have correct styling classes", () => {
    render(<ToggleButton id="book-123" />);

    const button = screen.getByRole("button", { name: "Read" });
    expect(button).toHaveClass("border", "rounded", "px-3", "py-1", "text-sm");
  });

  it("should call toggleBookReadStatus with correct id when clicked", async () => {
    const user = userEvent.setup();
    render(<ToggleButton id="book-456" />);

    const button = screen.getByRole("button", { name: "Read" });
    await user.click(button);

    const { toggleBookReadStatus } = await import("@/app/action");
    expect(toggleBookReadStatus).toHaveBeenCalledWith("book-456");
    expect(toggleBookReadStatus).toHaveBeenCalledTimes(1);
  });

  it("should handle multiple clicks correctly", async () => {
    const user = userEvent.setup();
    render(<ToggleButton id="book-789" />);

    const button = screen.getByRole("button", { name: "Read" });

    await user.click(button);
    await user.click(button);
    await user.click(button);

    const { toggleBookReadStatus } = await import("@/app/action");
    expect(toggleBookReadStatus).toHaveBeenCalledWith("book-789");
    expect(toggleBookReadStatus).toHaveBeenCalledTimes(3);
  });
});
