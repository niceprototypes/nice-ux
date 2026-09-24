import { parseIsoDate } from "./parseIsoDate"
import { toIsoDate } from "./toIsoDate"

/**
 * Adds a number of days (negative to subtract) to an ISO date.
 *
 * @param value - ISO `YYYY-MM-DD` string
 * @param days - Days to add
 * @returns The resulting ISO date
 */
export function addDays(value: string, days: number): string {
  const parts = parseIsoDate(value)
  if (!parts) return value
  return toIsoDate(parts.year, parts.month, parts.day + days)
}
