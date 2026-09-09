// BUG 1 of 4 — this test FAILS.
//
// Your job: make it pass without weakening what it asserts.
// Do not add a timeout. Do not wrap anything in act().
//
// The failure reads:
//     expected "spy" to be called with arguments: [ 1 ]
//     Number of calls: 0
//
// The button is real, the handler is wired, and clicking it in a browser
// works. So why is the call count zero at the moment you assert?
//
// Hint: look at what user.click() returns.

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmployeeCard, jane } from "./EmployeeCard";

describe("EmployeeCard — bug 1", () => {
  it("calls onSelect with the employee id when the button is clicked", () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<EmployeeCard employee={jane} onSelect={onSelect} />);

    user.click(screen.getByRole("button", { name: /view employee/i }));

    expect(onSelect).toHaveBeenCalledWith(jane.id);
  });
});
