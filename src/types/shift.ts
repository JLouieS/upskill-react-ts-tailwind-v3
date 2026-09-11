import type { EmployeeId, IsoDate } from './employee';
import type { IsoTime, Brand } from './brand';

export type ShiftId = Brand<number, 'ShiftId'>;

export function toShiftId(value: number): ShiftId {
  return value as ShiftId;
}

export type ShiftRole = "front-desk" | "warehouse";

export type Shift = {
  id: ShiftId;
  employeeId: EmployeeId | null;   // unassigned until someone is assigned
  role: ShiftRole;
  date: IsoDate;
  startTime: IsoTime;
  endTime: IsoTime;
};

export type CreateShiftRequest = Omit<Shift, "id" | "employeeId">;