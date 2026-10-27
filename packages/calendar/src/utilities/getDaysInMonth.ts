/**
 * Number of days in a Gregorian month.
 *
 * @param year - Full year
 * @param month - Zero-based month (0 = January)
 * @returns Days in the month (28–31)
 */
export function getDaysInMonth(year: number, month: number): number {
  const date = new Date(Date.UTC(2000, 0, 1))
  date.setUTCFullYear(year, month + 1, 0)
  return date.getUTCDate()
}
