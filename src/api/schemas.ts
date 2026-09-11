import { z } from "zod";

export const EmployeeDto = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  department: z.string(),
  status: z.enum(["active", "inactive", "on-leave"]),
});

export const EmployeeListResponseDto = z.object({
  employees: z.array(EmployeeDto),
});

export const ShiftDto = z.object({
  id: z.number(),
  employeeId: z.number().nullable(),
  role: z.enum(["front-desk", "warehouse"]),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const ApiErrorDto = z.object({
  code: z.string(),
  message: z.string(),
});