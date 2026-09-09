// BUG 3 of 4 — this test PASSES. That is the problem.
//
// It passes for the wrong reason, and it would keep passing after a change
// that breaks the component for real users.
//
// Your job:
//   1. Rewrite it using accessible queries.
//   2. Then PROVE the original was bad: in EmployeeCard.tsx, temporarily
//      replace <button> with <div className="view-button" onClick={...}>.
//      The original test still passes. Your rewrite fails.
//      Put the component back afterwards.
//   3. Write one sentence in your PR explaining what the original test was
//      actually asserting.

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EmployeeCard, jane } from "./EmployeeCard";

describe("EmployeeCard — bug 3", () => {
  it("renders a view button", () => {
    render(
      <EmployeeCard employee={jane} onSelect={vi.fn()} />,
    );

    expect(screen.getByRole("button", { name: /view employee/i })).toBeInTheDocument();
  });
});
