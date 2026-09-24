import type { EmployeeId } from "../../entities/employee/model/employee.types";

export function indexById<T extends { id: EmployeeId }>(
  items: readonly T[],
): Map<EmployeeId, T> {
  return new Map(items.map((item) => [item.id, item]));
}