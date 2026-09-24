import { isoToUtcDate } from "./isoToUtcDate"

/**
 * Day of the week of an ISO date, 0 = Sunday … 6 = Saturday (`getUTCDay`).
 *
 * @param value - ISO `YYYY-MM-DD` string
 * @returns Weekday index
 */
export function getWeekday(value: string): number {
  return isoToUtcDate(value).getUTCDay()
}
