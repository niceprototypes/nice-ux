/** The dash measurements, in px, read from the `line.*` tokens. */
export type DashMeasurements = {
  /** Dash thickness (`line.width`) */
  width: number
  /** Rim around each dash (`line.rimWidth`) */
  rimWidth: number
  /** Dash length, rounded ends included (`line.dashLength`) */
  dashLength: number
  /** Space between neighboring rims (`line.gap`) */
  gap: number
}

/**
 * The stroke-dasharray for a closed path of `length`: one dash per repeat, stretched so a whole
 * number of repeats fits the path. The loop then closes without a short dash or a doubled one
 * where the path starts. Round caps add half the stroke width at each end of a dash, so the
 * pattern's dash is the visible length minus the width; the rim stroke shares the pattern and
 * grows its caps by the same amount, so every dash gets an even rim.
 */
export const fitDasharray = (length: number, { width, rimWidth, dashLength, gap }: DashMeasurements): string => {
  const period = dashLength + 2 * rimWidth + gap
  const dash = Math.max(dashLength - width, 0)
  const count = Math.max(1, Math.round(length / period))
  const scale = length / (count * period)
  return `${dash * scale} ${(period - dash) * scale}`
}
