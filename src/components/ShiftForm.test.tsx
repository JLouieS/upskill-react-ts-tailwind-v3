import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ShiftForm } from "./ShiftForm";

describe("ShiftForm", () => {
  it("renders all form fields with accessible labels", () => {
    render(<ShiftForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Start time")).toBeInTheDocument();
    expect(screen.getByLabelText("End time")).toBeInTheDocument();
    expect(screen.getByLabelText("Role")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create" }),
    ).toBeInTheDocument();
  });

  it("allows the user to fill out the form", async () => {
    const user = userEvent.setup();

    render(<ShiftForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText("Date"), "2026-10-01");
    await user.type(screen.getByLabelText("Start time"), "09:00");
    await user.type(screen.getByLabelText("End time"), "17:00");
    await user.selectOptions(screen.getByLabelText("Role"), "warehouse");

    expect(screen.getByLabelText("Date")).toHaveValue("2026-10-01");
    expect(screen.getByLabelText("Start time")).toHaveValue("09:00");
    expect(screen.getByLabelText("End time")).toHaveValue("17:00");
    expect(screen.getByLabelText("Role")).toHaveValue("warehouse");
  });

  it("shows an error when end time is not after start time", async () => {
    const user = userEvent.setup();

    render(<ShiftForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText("Date"), "2026-10-01");
    await user.type(screen.getByLabelText("Start time"), "09:00");
    await user.type(screen.getByLabelText("End time"), "08:00");

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(
      screen.getByText("End time must be after start time."),
    ).toBeInTheDocument();
  });

  it("shows an error when the date is in the past", async () => {
    const user = userEvent.setup();

    render(<ShiftForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText("Date"), "2020-01-01");
    await user.type(screen.getByLabelText("Start time"), "09:00");
    await user.type(screen.getByLabelText("End time"), "17:00");

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(
      screen.getByText("Date cannot be in the past."),
    ).toBeInTheDocument();
  });

  it("submits a valid shift", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<ShiftForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Date"), "2026-10-01");
    await user.type(screen.getByLabelText("Start time"), "09:00");
    await user.type(screen.getByLabelText("End time"), "17:00");
    await user.selectOptions(screen.getByLabelText("Role"), "warehouse");

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmit).toHaveBeenCalledWith({
      date: expect.anything(),
      startTime: expect.anything(),
      endTime: expect.anything(),
      role: "warehouse",
    });
  });

  it("disables the Create button while submitting", async () => {
    const user = userEvent.setup();

    let resolveSubmit!: () => void;

    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmit = resolve;
        }),
    );

    render(<ShiftForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Date"), "2026-10-01");
    await user.type(screen.getByLabelText("Start time"), "09:00");
    await user.type(screen.getByLabelText("End time"), "17:00");

    const button = screen.getByRole("button", { name: "Create" });

    await user.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Creating...");

    resolveSubmit();
  });

  it("clears the form after successful submission", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<ShiftForm onSubmit={onSubmit} />);

    const date = screen.getByLabelText("Date");
    const startTime = screen.getByLabelText("Start time");
    const endTime = screen.getByLabelText("End time");

    await user.type(date, "2026-10-02");
    await user.type(startTime, "09:00");
    await user.type(endTime, "17:00");

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(date).toHaveValue("");
    expect(startTime).toHaveValue("");
    expect(endTime).toHaveValue("");
    expect(screen.getByLabelText("Role")).toHaveValue("front-desk");
  });

  it("preserves the form when submission fails", async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn().mockRejectedValue(new Error("Request failed"));

    render(<ShiftForm onSubmit={onSubmit} />);

    const date = screen.getByLabelText("Date");
    const startTime = screen.getByLabelText("Start time");
    const endTime = screen.getByLabelText("End time");

    await user.type(date, "2026-10-01");
    await user.type(startTime, "09:00");
    await user.type(endTime, "17:00");

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(date).toHaveValue("2026-10-01");
    expect(startTime).toHaveValue("09:00");
    expect(endTime).toHaveValue("17:00");
    expect(onSubmit).toHaveBeenCalled();
  });

  it("shows the API error when shift creation fails", async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn().mockRejectedValue({
      code: "SHIFT_IN_PAST",
      message: "That date is in the past.",
    });

    render(<ShiftForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Date"), "2026-10-01");
    await user.type(screen.getByLabelText("Start time"), "09:00");
    await user.type(screen.getByLabelText("End time"), "17:00");

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(
      await screen.findByText("That date is in the past."),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Date")).toHaveFocus();
    expect(onSubmit).toHaveBeenCalled();
  });

  it("shows a generic message for an unknown API error", async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn().mockRejectedValue({
      code: "TEAPOT_UNAVAILABLE",
      message: "Unrecognised.",
    });

    render(<ShiftForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Date"), "2026-10-01");
    await user.type(screen.getByLabelText("Start time"), "09:00");
    await user.type(screen.getByLabelText("End time"), "17:00");

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(
      await screen.findByText("Something went wrong. Please try again."),
    ).toBeInTheDocument();
  });
});

it("shows the conflicting shift for a SHIFT_OVERLAP error", async () => {
  const user = userEvent.setup();

  const onSubmit = vi.fn().mockRejectedValue({
    code: "SHIFT_OVERLAP",
    message: "This shift overlaps with another shift.",
    conflictingShiftId: 123,
  });

  render(<ShiftForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText("Date"), "2026-10-01");
  await user.type(screen.getByLabelText("Start time"), "09:00");
  await user.type(screen.getByLabelText("End time"), "17:00");

  await user.click(screen.getByRole("button", { name: "Create" }));

  expect(
    await screen.findByText(/shift.*123/i),
  ).toBeInTheDocument();
});

it("shows a generic message and logs VALIDATION_FAILED", async () => {
  const user = userEvent.setup();
  const consoleError = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  const error = {
    code: "VALIDATION_FAILED",
    message: "End time must be after start time.",
  };

  const onSubmit = vi.fn().mockRejectedValue(error);

  render(<ShiftForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText("Date"), "2026-10-01");
  await user.type(screen.getByLabelText("Start time"), "09:00");
  await user.type(screen.getByLabelText("End time"), "17:00");

  await user.click(screen.getByRole("button", { name: "Create" }));

  expect(
    await screen.findByText("Something went wrong. Please try again."),
  ).toBeInTheDocument();

  expect(screen.queryByText(error.message)).not.toBeInTheDocument();

  expect(consoleError).toHaveBeenCalledWith(error);

  consoleError.mockRestore();
});