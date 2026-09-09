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
  it("renders without crashing", () => {
    render(<EmployeeCard employee={jane} onSelect={vi.fn()} />);
    expect(true).toBe(true);
  });

  it("has a status", () => {
    render(<EmployeeCard employee={jane} onSelect={vi.fn()} />);
    const status = screen.queryByText(/status/i);
    expect(status).toBeDefined();
  });

  it("passes the correct props", () => {
    const onSelect = vi.fn();
    render(<EmployeeCard employee={jane} onSelect={onSelect} />);
    expect(typeof onSelect).toBe("function");
    expect(jane.status).toBe("active");
  });
});
