import { z } from "zod";

export const ShiftDto = z.object({
  id: z.number(),
  employeeId: z.number().nullable(),
  role: z.enum(["front-desk", "warehouse"]),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export type ShiftDtoType = z.infer<typeof ShiftDto>;

export const ApiErrorDto = z.object({
  code: z.string(),
  message: z.string(),
});