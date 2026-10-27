import { parseIsoDate } from "./parseIsoDate"
import { toIsoDate } from "./toIsoDate"
import { getDaysInMonth } from "./getDaysInMonth"

/**
 * Adds a number of months (negative to subtract) to an ISO date. The day is
 * clamped to the target month's length (Jan 31 + 1 month → Feb 28/29).
 *
 * @param value - ISO `YYYY-MM-DD` string
 * @param months - Months to add (12 per year)
 * @returns The resulting ISO date
 */
export function addMonths(value: string, months: number): string {
  const parts = parseIsoDate(value)
  if (!parts) return value
  const target = new Date(Date.UTC(2000, 0, 1))
  target.setUTCFullYear(parts.year, parts.month + months, 1)
  const year = target.getUTCFullYear()
  const month = target.getUTCMonth()
  return toIsoDate(year, month, Math.min(parts.day, getDaysInMonth(year, month)))
}
