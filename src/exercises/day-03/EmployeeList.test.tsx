// Day 3, Exercise 7 — Test Audit
//
// Eight tests. All pass. THREE OF THEM SHOULD NOT EXIST.
//
// Your job: delete the three, keep the five, and justify every deletion.
// "It's redundant" is not a justification. Say what the test would catch
// that another test does not, and why that is worth a file to maintain.

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmployeeCard, jane, type Employee } from "./EmployeeCard";

const inactive: Employee = { ...jane, id: 2, name: "Sam Reyes", status: "inactive" };

describe("EmployeeCard", () => {
  it("renders the employee name", () => {
    render(<EmployeeCard employee={jane} onSelect={vi.fn()} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders the employee email", () => {
    render(<EmployeeCard employee={jane} onSelect={vi.fn()} />);
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  it("renders Active for an active employee", () => {
    render(<EmployeeCard employee={jane} onSelect={vi.fn()} />);
    expect(screen.getByText("Status: Active")).toBeInTheDocument();
  });

  it("renders Inactive for an inactive employee", () => {
    render(<EmployeeCard employee={inactive} onSelect={vi.fn()} />);
    expect(screen.getByText("Status: Inactive")).toBeInTheDocument();
  });

  it("calls onSelect with the employee id", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<EmployeeCard employee={jane} onSelect={onSelect} />);

    await user.click(screen.getByRole("button", { name: /view employee/i }));

    expect(onSelect).toHaveBeenCalledWith(jane.id);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  // tests if a class name exists which is not helpful and might fail if classname is changed
  // it("applies the employee-card class to the wrapper", () => {
  //   const { container } = render(
  //     <EmployeeCard employee={jane} onSelect={vi.fn()} />,
  //   );
  //   expect(container.firstChild).toHaveClass("employee-card");
  // });

  // does not verify any user behavior and no meaningful impact
  // it("accepts an onSelect prop", () => {
  //   const onSelect = vi.fn();
  //   render(<EmployeeCard employee={jane} onSelect={onSelect} />);
  //   expect(onSelect).toBeInstanceOf(Function);
  // });

  it("renders the STATUS_LABELS mapping for on-leave", () => {
    const onLeave: Employee = { ...jane, status: "on-leave" };
    render(<EmployeeCard employee={onLeave} onSelect={vi.fn()} />);
    expect(screen.getByText("Status: On Leave")).toBeInTheDocument();
  });
});
