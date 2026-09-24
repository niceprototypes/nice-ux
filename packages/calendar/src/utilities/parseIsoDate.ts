/**
 * Calendar date parts. `month` is zero-based (0 = January), matching
 * `Date.UTC` / `getUTCMonth`.
 */
export interface IsoDateParts {
  year: number
  month: number
  day: number
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

/**
 * Parses an ISO `YYYY-MM-DD` string into Gregorian date parts. Returns null for
 * anything that is not a real calendar date (wrong shape, month 13, Feb 30).
 * Validation round-trips through `Date.UTC`, so no local time zone is involved.
 *
 * @param value - Candidate ISO date string
 * @returns Date parts, or null when invalid
 */
export function parseIsoDate(value: string | null | undefined): IsoDateParts | null {
  if (!value) return null
  const match = ISO_DATE.exec(value)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month, day))
  date.setUTCFullYear(year) // Date.UTC maps years 0–99 to 1900–1999
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) {
    return null
  }
  return { year, month, day }
}
