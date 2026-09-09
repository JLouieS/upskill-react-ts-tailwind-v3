// The component under test for the Day 3 broken-test exercise.
// This file is CORRECT. Do not change it — the bugs are all in the tests.

import { useEffect, useState } from "react";

export type EmployeeStatus = "active" | "inactive" | "on-leave";

export type Employee = {
  id: number;
  name: string;
  email: string;
  department: string;
  status: EmployeeStatus;
};

const STATUS_LABELS: Record<EmployeeStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  "on-leave": "On Leave",
};

type EmployeeCardProps = {
  employee: Employee;
  onSelect: (id: number) => void;
};

export function EmployeeCard({ employee, onSelect }: EmployeeCardProps) {
  return (
    <article className="employee-card rounded border p-4">
      <h2>{employee.name}</h2>
      <p>{employee.email}</p>
      <p>{employee.department}</p>
      <p>Status: {STATUS_LABELS[employee.status]}</p>
      <button className="view-button" onClick={() => onSelect(employee.id)}>
        View Employee
      </button>
    </article>
  );
}

/** Simulates a request. Resolves after ~50ms. */
export function AsyncEmployeeCard({ employee, onSelect }: EmployeeCardProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) return <p>Loading...</p>;
  return <EmployeeCard employee={employee} onSelect={onSelect} />;
}

export const jane: Employee = {
  id: 1,
  name: "Jane Doe",
  email: "jane@example.com",
  department: "Engineering",
  status: "active",
};
