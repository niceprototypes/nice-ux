import { getDaysInMonth } from "./getDaysInMonth"
import { getWeekday } from "./getWeekday"
import { toIsoDate } from "./toIsoDate"

/**
 * Builds the week rows of a month grid. Each row has seven cells, starting on
 * `firstDayOfWeek`; cells outside the month are null (rendered as empty cells).
 *
 * @param year - Full year
 * @param month - Zero-based month
 * @param firstDayOfWeek - 0 = Sunday … 6 = Saturday
 * @returns Rows of ISO dates or null
 */
export function getMonthGrid(year: number, month: number, firstDayOfWeek: number): (string | null)[][] {
  const first = toIsoDate(year, month, 1)
  const leading = (getWeekday(first) - firstDayOfWeek + 7) % 7
  const days = getDaysInMonth(year, month)
  const cells: (string | null)[] = []
  for (let i = 0; i < leading; i++) cells.push(null)
  for (let day = 1; day <= days; day++) cells.push(toIsoDate(year, month, day))
  while (cells.length % 7 !== 0) cells.push(null)
  const rows: (string | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))
  return rows
}
