import type { Employee } from './employee';
// src/types/api.ts — provisional. Day 4 replaces this with the
// contract the backend actually guarantees.
export type ApiError = {
  code: string;
  message: string;
};

export type EmployeeListResponse = { employees: Employee[] };