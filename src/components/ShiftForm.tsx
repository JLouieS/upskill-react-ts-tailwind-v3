import { useId, useState, useRef } from "react";
import type { CreateShiftRequest, ShiftRole } from "../types/shift";
import { toIsoDate } from '../types/employee';
import { toIsoTime } from '../types/brand';
import { isApiError, isKnownError } from "../types/api";


export type ShiftFormProps = {
  onSubmit: (request: CreateShiftRequest) => Promise<void>;
};

export function ShiftForm({ onSubmit }: ShiftFormProps) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [role, setRole] = useState<ShiftRole>("front-desk");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    date?: string;
    startTime?: string;
    endTime?: string;
  }>({});
  const [submitError, setSubmitError] = useState<string | undefined>();

  const id = useId();
  const dateInputRef = useRef<HTMLInputElement>(null);

  const dateId = `${id}-date`;
  const startId = `${id}-start`;
  const endId = `${id}-end`;
  const roleId = `${id}-role`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: typeof errors = {};

    if (!date) {
      nextErrors.date = "Date is required.";
    }

    if (!startTime) {
      nextErrors.startTime = "Start time is required.";
    }

    if (!endTime) {
      nextErrors.endTime = "End time is required.";
    }

    if (startTime && endTime && endTime <= startTime) {
      nextErrors.endTime = "End time must be after start time.";
    }

    const today = new Date().toISOString().slice(0, 10);

    if (date && date < today) {
      nextErrors.date = "Date cannot be in the past.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError(undefined);
    setIsSubmitting(true);
    try {
      await onSubmit({
        date: toIsoDate(date),
        startTime: toIsoTime(startTime),
        endTime: toIsoTime(endTime),
        role,
      });
      setDate("");
      setStartTime("");
      setEndTime("");
      setRole("front-desk");
    } catch (error) {
      if (isApiError(error)) {
        if (isKnownError(error)) {
          if (error.code === "SHIFT_IN_PAST") {
            setSubmitError(error.message);
            dateInputRef.current?.focus();
          } else if (error.code === "SHIFT_OVERLAP") {
            setSubmitError(
              `${error.message} Conflicting shift: #${error.conflictingShiftId}.`,
            );
          } else if (error.code === "VALIDATION_FAILED") {
            console.error(error);
            setSubmitError("Something went wrong. Please try again.");
          }
        } else {
          setSubmitError("Something went wrong. Please try again.");
        }
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={dateId}>Date</label>
      <input
        ref={dateInputRef}
        id={dateId}
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        aria-describedby={`${dateId}-error`}
      />

      {errors.date && (
        <p id={`${dateId}-error`} role="alert">
          {errors.date}
        </p>
      )}

      <label htmlFor={startId}>Start time</label>
      <input
        id={startId}
        type="time"
        value={startTime}
        onChange={(event) => setStartTime(event.target.value)}
        aria-describedby={`${startId}-error`}
      />

      {errors.startTime && (
        <p id={`${startId}-error`} role="alert">
          {errors.startTime}
        </p>
      )}

      <label htmlFor={endId}>End time</label>
      <input
        id={endId}
        type="time"
        value={endTime}
        onChange={(event) => setEndTime(event.target.value)}
        aria-describedby={`${endId}-error`}
      />

      {errors.endTime && (
        <p id={`${endId}-error`} role="alert">
          {errors.endTime}
        </p>
      )}

      <label htmlFor={roleId}>Role</label>
      <select
        id={roleId}
        value={role}
        onChange={(event) => setRole(event.target.value as ShiftRole)}
      >
        <option value="front-desk">Front desk</option>
        <option value="warehouse">Warehouse</option>
      </select>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create"}
      </button>
      {submitError && (
        <p role="alert">
          {submitError}
        </p>
      )}
    </form>
  );
}