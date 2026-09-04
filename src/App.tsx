import { Navigate, Route, Routes } from "react-router-dom";
import { EmployeeCard } from './components/EmployeeCard';
import type { EmployeeId } from './types/employee';
import { toEmployeeId, type Employee } from "./types/employee";
import { useEffect } from "react";
import { useEmployeeState  } from './hooks/useEmployeeState';
import { EmployeeState } from './types/employee';
import { assertNever } from './lib/assertNever';
import { cn } from './lib/cn';
import { Button } from './components/Button';

// The three routes from product-spec.md, stubbed. You fill them in.
// Note there is no /availability route — availability is a panel on the
// employee detail page. Day 5 explains why that distinction matters.

function EmployeesPage() {
  const [state, dispatch] = useEmployeeState();
  const isInactive = false;

  useEffect(() => {
    const initialEmployee: Employee = {
      id: toEmployeeId(1),
      name: "Jane Doe",
      email: "jane@example.com",
      department: "Engineering",
      status: "active",
    };

    setTimeout(() => {
      dispatch({
        type: "loaded",
        employee: initialEmployee,
      });
    }, 1000);
  }, []);

  const handleSelect = (id: EmployeeId) => {
    console.log("Selected employee:", id);
  };

  const renderEmployeeState = (state: EmployeeState) => {
    switch (state.status) {
      case "loading":
        return <p>Loading...</p>;

      case "empty":
        return <p>No employee found.</p>;

      case "error":
        return <p>Error: {state.error.message}</p>;

      case "success":
        return (
          <EmployeeCard
            employee={state.employee}
            onSelect={handleSelect}
          />
        );

      default:
        return assertNever(state);
    }
  }

  return (
    <div>
      <h1>Employees</h1>
      {renderEmployeeState(state)}
      <p className="p-card rounded-card bg-brand-500">
        Tailwind is working.
      </p>
      <article
        className={`rounded p-4 ${isInactive ? "opacity-60" : ""}`}
      >
        Employee
      </article>
      <Button>Default</Button>
      <Button variant="secondary">
        Secondary
      </Button>

      <Button variant="danger" size="lg">
        Delete
      </Button>
    </div>
  );
}

function EmployeeDetailPage() {
  return <h1>Employee detail</h1>;
}

function SchedulingPage() {
  return <h1>Scheduling</h1>;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/employees" replace />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/employees/:id" element={<EmployeeDetailPage />} />
      <Route path="/scheduling" element={<SchedulingPage />} />
    </Routes>
  );
}