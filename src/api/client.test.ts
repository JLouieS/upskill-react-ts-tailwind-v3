import { failures } from '../mocks/handlers';
import { server } from '../mocks/server';
import { createShift, getEmployees } from "./client";
import { toIsoDate } from "../types/employee";
import { toIsoTime } from '../types/brand';
import type { ApiError } from "../types/api";
import { isKnownError, isApiError } from "../types/api";

it("rejects malformed employee responses", async () => {
  server.use(failures.employeesMalformed);

  await expect(getEmployees()).rejects.toThrow();
});

it("rejects when the server returns an error", async () => {
  server.use(failures.employeesServerError);

  await expect(getEmployees()).rejects.toThrow();
});

it("creates a shift", async () => {
  const shift = await createShift({
    date: toIsoDate("2026-10-01"),
    startTime: toIsoTime("09:00"),
    endTime: toIsoTime("17:00"),
    role: "front-desk",
  });

  expect(shift).toMatchObject({
    employeeId: null,
    role: "front-desk",
    date: "2026-10-01",
    startTime: "09:00",
    endTime: "17:00",
  });

  expect(typeof shift.id).toBe("number");
});

it("throws an API error for an unknown error code", async () => {
  server.use(failures.unknownErrorCode);

  await expect(
    createShift({
      date: toIsoDate("2026-10-01"),
      startTime: toIsoTime("09:00"),
      endTime: toIsoTime("17:00"),
      role: "front-desk",
    }),
  ).rejects.toEqual({
    code: "TEAPOT_UNAVAILABLE",
    message: "Unrecognised.",
  });
});

it("throws a known SHIFT_IN_PAST error", async () => {
  await expect(
    createShift({
      date: toIsoDate("2020-01-01"),
      startTime: toIsoTime("09:00"),
      endTime: toIsoTime("17:00"),
      role: "front-desk",
    }),
  ).rejects.toEqual({
    code: "SHIFT_IN_PAST",
    message: "That date is in the past.",
  });
});

it("recognizes known API error codes", () => {
  const error: ApiError = {
    code: "SHIFT_IN_PAST",
    message: "That date is in the past.",
  };

  expect(isKnownError(error)).toBe(true);
});

it("rejects unknown API error codes as known errors", () => {
  const error: ApiError = {
    code: "TEAPOT_UNAVAILABLE",
    message: "Unrecognised.",
  };

  expect(isKnownError(error)).toBe(false);
});

it("recognizes an API error shape", () => {
  expect(
    isApiError({
      code: "SHIFT_IN_PAST",
      message: "That date is in the past.",
    }),
  ).toBe(true);
});

it("rejects non-API errors", () => {
  expect(isApiError(new Error("Something went wrong."))).toBe(false);
});