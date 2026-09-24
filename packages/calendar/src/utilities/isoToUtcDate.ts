import { parseIsoDate } from "./parseIsoDate"

/**
 * Converts an ISO date string to a `Date` at 00:00 UTC, for formatting with
 * `Intl.DateTimeFormat({ timeZone: "UTC" })`. Internal only — `Date` never
 * crosses the public API.
 *
 * @param value - ISO `YYYY-MM-DD` string (must be valid)
 * @returns Date at UTC midnight of that day
 */
export function isoToUtcDate(value: string): Date {
  const parts = parseIsoDate(value)
  const date = new Date(Date.UTC(2000, 0, 1))
  if (parts) date.setUTCFullYear(parts.year, parts.month, parts.day)
  return date
}
