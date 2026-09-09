// BUG 2 of 4 — this test FAILS with "Unable to find an element".
//
// The component is correct: it shows "Loading..." and then the employee
// about 50ms later. The test is wrong about WHEN it looks.
//
// Your job: make it pass. Do not use setTimeout, and do not increase any
// timeout value. The fix is one query, changed.

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AsyncEmployeeCard, jane } from "./EmployeeCard";

describe("AsyncEmployeeCard — bug 2", () => {
  it("shows the employee once loading finishes", async () => {
    render(<AsyncEmployeeCard employee={jane} onSelect={vi.fn()} />);

    expect(await screen.findByText("Jane Doe")).toBeInTheDocument();
  });
});
