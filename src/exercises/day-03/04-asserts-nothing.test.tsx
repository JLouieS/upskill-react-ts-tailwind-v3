// BUG 4 of 4 — this test PASSES and asserts nothing meaningful.
//
// There are three separate problems in here. Find all three.
//
// Your job:
//   1. Identify each problem and name it in a comment.
//   2. Rewrite the test so it would FAIL if the component stopped calling
//      onSelect, or stopped rendering the status.
//   3. If any of the three "tests" should not exist at all, delete it and
//      say why in your PR.

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EmployeeCard, jane } from "./EmployeeCard";

describe("EmployeeCard — bug 4", () => {
  it("has a status", () => {
    render(<EmployeeCard employee={jane} onSelect={vi.fn()} />);
    expect(screen.getByText(/status: active/i)).toBeInTheDocument();
  });
});
