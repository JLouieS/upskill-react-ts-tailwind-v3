import { useEffect } from "react";
import { useEmployeeState } from '../hooks/useEmployeeState';
import { toEmployeeId } from '../types/employee';


export function EmployeeLoader() {
  const [state, dispatch] = useEmployeeState();

  useEffect(() => {
    const loadEmployee = async () => {
      await Promise.resolve();

      dispatch({
        type: "loaded",
        employee: {
          id: toEmployeeId(1),
          name: "Jane Doe",
          email: "jane@example.com",
          department: "Engineering",
          status: "active",
        },
      });
    };

    loadEmployee();
  }, []);

  if (state.status === "loading") {
    return <div>Loading...</div>;
  }

  if (state.status === "success") {
    return <div>Employee loaded</div>;
  }

  return null;
}