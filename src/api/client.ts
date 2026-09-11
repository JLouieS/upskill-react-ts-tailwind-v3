import { EmployeeListResponseDto, ShiftDto, ApiErrorDto } from './schemas';
import { z } from "zod";
import type { Employee } from '../types/employee';
import { toEmployeeId, toIsoDate } from "../types/employee";
import { toShiftId } from '../types/shift';
import { toIsoTime } from '../types/brand';
import type { Shift, CreateShiftRequest } from '../types/shift';

export type EmployeeDto = z.infer<typeof EmployeeListResponseDto>["employees"][number];
export type ShiftDtoType = z.infer<typeof ShiftDto>;

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

export function toShift(dto: ShiftDtoType): Shift {
  return {
    id: toShiftId(dto.id),
    employeeId: dto.employeeId === null
      ? null
      : toEmployeeId(dto.employeeId),
    role: dto.role,
    date: toIsoDate(dto.date),
    startTime: toIsoTime(dto.startTime),
    endTime: toIsoTime(dto.endTime),
  };
}

export async function createShift(
  request: CreateShiftRequest
): Promise<Shift> {
  const response = await fetch("/api/shifts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = ApiErrorDto.parse(data);
    throw error;
  }

  const validated = ShiftDto.parse(data);

  return toShift(validated);
}