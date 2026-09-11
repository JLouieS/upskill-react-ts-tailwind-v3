import type { Employee } from './employee';
import type { ShiftId } from './shift';
// src/types/api.ts — provisional. Day 4 replaces this with the
// contract the backend actually guarantees.
export type ApiError = {
  code: string;
  message: string;
};

export type EmployeeListResponse = { employees: Employee[] };

export type KnownError =
  | {
      code: "SHIFT_IN_PAST";
      message: string
    }
  | {
      code: "SHIFT_OVERLAP";
      message: string;
      conflictingShiftId: ShiftId
    }
  | {
      code: "VALIDATION_FAILED";
      message: string
    };

export function isKnownError(
  error: ApiError
): error is KnownError {
  return (
    error.code === "SHIFT_IN_PAST" ||
    error.code === "SHIFT_OVERLAP" ||
    error.code === "VALIDATION_FAILED"
  );
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    typeof error.code === "string" &&
    typeof error.message === "string"
  );
}