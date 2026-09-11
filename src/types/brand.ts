export type Brand<T, B extends string> = T & {
  readonly __brand: B;
};

// "09:00" — 24-hour, zero-padded. Not a Date, not minutes-since-midnight.
export type IsoTime = Brand<string, "IsoTime">;

export function toIsoTime(value: string): IsoTime {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) {
    throw new Error(`Not an HH:MM time: ${value}`);
  }
  return value as IsoTime;
}