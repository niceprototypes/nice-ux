/**
 * Builds an ISO `YYYY-MM-DD` string from Gregorian parts. Out-of-range parts
 * roll over (month 12 → January of the next year, day 0 → last day of the
 * previous month), computed with `Date.UTC` so no local time zone is involved.
 *
 * @param year - Full year
 * @param month - Zero-based month (0 = January)
 * @param day - Day of month
 * @returns ISO date string
 */
export function toIsoDate(year: number, month: number, day: number): string {
  const date = new Date(Date.UTC(2000, 0, 1))
  date.setUTCFullYear(year, month, day)
  const y = date.getUTCFullYear()
  const m = date.getUTCMonth() + 1
  const d = date.getUTCDate()
  return `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
}
