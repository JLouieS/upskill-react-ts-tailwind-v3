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