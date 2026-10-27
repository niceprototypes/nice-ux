import { toIsoDate } from "./toIsoDate"

/**
 * Today's date as an ISO string. "Today" is the user's wall-clock date, so this
 * is the one place local date parts are read (`getFullYear` / `getMonth` /
 * `getDate`); every other computation in the package is UTC-based.
 *
 * @returns ISO `YYYY-MM-DD` for the current local date
 */
export function getTodayIso(): string {
  const now = new Date()
  return toIsoDate(now.getFullYear(), now.getMonth(), now.getDate())
}
