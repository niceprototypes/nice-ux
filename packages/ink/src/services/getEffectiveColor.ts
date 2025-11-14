import { StatusType } from "../types"

/**
 * Status colors that are in the statusColor object (nice-styles v3.0.0+)
 */
const STATUS_COLORS = ["active", "error", "success", "warning"] as const

/**
 * Determines the effective color to use
 *
 * Returns the status-based color if status is provided, otherwise returns
 * the custom color value.
 *
 * For nice-styles v3.0.0+:
 * - Status colors (active, error, success, warning) use --status-color-*
 * - Shade variants (darker, dark, default, light, lighter) use --content-color-*
 * - Extended colors (disabled, highlighted, primary, secondary) use --content-color-*
 *
 * @param color - User-provided custom color
 * @param status - Status type for semantic colors
 * @returns Effective color value or undefined
 */
const getEffectiveColor = (
  color: string | undefined,
  status: StatusType | undefined
): string | undefined => {
  if (status) {
    // Use statusColor for core status colors (nice-styles v3.0.0+)
    if (STATUS_COLORS.includes(status as typeof STATUS_COLORS[number])) {
      return `var(--status-color-${status})`
    }
    // Use contentColor for shade variants and extended colors
    return `var(--content-color-${status})`
  }
  return color
}

export default getEffectiveColor