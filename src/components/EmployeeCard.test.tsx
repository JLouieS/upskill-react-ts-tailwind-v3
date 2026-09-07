import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EmployeeCard } from "./EmployeeCard";
import type { Employee } from "../types/employee";

// A fixture. Every test starts from a known employee rather than
// constructing one inline, so a schema change is one edit, not twelve.
const jane: Employee = {
  id: 1,
  name: "Jane Doe",
  email: "jane@example.com",
  department: "Engineering",
  status: "active",
};

const inactiveEmployee: Employee = {
  ...jane,
  status: 'inactive',
};

describe("EmployeeCard", () => {
  it("renders the employee name", () => {
    render(<EmployeeCard employee={jane} onSelect={vi.fn()} />);

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders the status label, not the raw status value", () => {
    render(<EmployeeCard employee={jane} onSelect={vi.fn()} />);

    expect(screen.getByText("Status: Active")).toBeInTheDocument();
  });

  it("renders the inactive status label", () => {
    render(<EmployeeCard employee={inactiveEmployee} onSelect={vi.fn()} />);

    expect(screen.getByText("Status: Inactive")).toBeInTheDocument();
  })

  it("calls onSelect with the employee id when the button is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<EmployeeCard employee={jane} onSelect={onSelect} />);

    await user.click(
      screen.getByRole("button", { name: /view employee/i }),
    );

    expect(onSelect).toHaveBeenCalledWith(jane.id);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});