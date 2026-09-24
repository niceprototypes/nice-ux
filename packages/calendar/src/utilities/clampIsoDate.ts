/**
 * Clamps an ISO date to an optional [min, max] range. ISO `YYYY-MM-DD` strings
 * with four-digit years compare correctly as strings.
 *
 * @param value - ISO date
 * @param min - Earliest allowed ISO date
 * @param max - Latest allowed ISO date
 * @returns The clamped ISO date
 */
export function clampIsoDate(value: string, min?: string | null, max?: string | null): string {
  if (min && value < min) return min
  if (max && value > max) return max
  return value
}
