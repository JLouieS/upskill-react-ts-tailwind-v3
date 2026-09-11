import { EmployeeListResponseDto } from './schemas';
import { z } from "zod";
import type { Employee } from '../types/employee';
import { toEmployeeId } from "../types/employee";

type EmployeeDto = z.infer<typeof EmployeeListResponseDto>["employees"][number];

export function toEmployee(dto: EmployeeDto): Employee {
  return {
    ...dto,
    id: toEmployeeId(dto.id)
  };
}

export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch("/api/employees");
  const data = await response.json();

  const validated = EmployeeListResponseDto.parse(data);

  return validated.employees.map(toEmployee);
}