import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EmployeeCard } from "./EmployeeCard";
import { toEmployeeId, type Employee } from '../types/employee';

// A fixture. Every test starts from a known employee rather than
// constructing one inline, so a schema change is one edit, not twelve.
const employee: Employee = {
  id: toEmployeeId(1),
  name: "Jane Doe",
  email: "jane@example.com",
  department: "Engineering",
  status: "active",
};

const inactiveEmployee: Employee = {
  ...employee,
  status: 'inactive',
};

const onLeaveEmployee: Employee = {
  ...employee,
  status: 'on-leave'
};

describe("EmployeeCard", () => {
  it("renders the employee name", () => {
    render(<EmployeeCard employee={employee} onSelect={vi.fn()} />);

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders the status label, not the raw status value", () => {
    render(<EmployeeCard employee={employee} onSelect={vi.fn()} />);

    expect(screen.getByText("Status: Active")).toBeInTheDocument();
  });

  it("renders the inactive status label", () => {
    render(<EmployeeCard employee={inactiveEmployee} onSelect={vi.fn()} />);

    expect(screen.getByText("Status: Inactive")).toBeInTheDocument();
  })

  it("renders the on-leave status label", () => {
    render(<EmployeeCard employee={onLeaveEmployee} onSelect={vi.fn()} />);

    expect(screen.getByText("Status: On Leave")).toBeInTheDocument();
  })

  it.each([
    ['active', "Status: Active"],
    ['inactive', "Status: Inactive"],
    ['on-leave', "Status: On Leave"]
  ] as const) ("renders the correct status for %s", (status, expectedLabel) => {
    const testEmployee: Employee = {
      ...employee,
      status
    };

    render (<EmployeeCard employee={testEmployee} onSelect={vi.fn()} />);
    
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
  })

  it("calls onSelect with the employee id when the button is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<EmployeeCard employee={employee} onSelect={onSelect} />);

    await user.click(
      screen.getByRole("button", { name: /view employee/i }),
    );

    expect(onSelect).toHaveBeenCalledWith(employee.id);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect when the button is activated with the keyboard', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<EmployeeCard employee={employee} onSelect={onSelect} />);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenCalledWith(employee.id);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});