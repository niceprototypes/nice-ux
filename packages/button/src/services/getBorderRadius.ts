import { getCssVariable } from "../utils"

/**
 * Calculates the border radius for a button based on size and custom radius value.
 *
 * This function provides flexible border radius control for buttons. When no custom
 * radius is specified, it automatically creates a pill-shaped button by setting
 * the radius to 50% of the button's height. When a custom radius is provided,
 * it applies that exact value to all four corners.
 *
 * The default pill effect (50% height) creates smooth, rounded buttons that scale
 * appropriately with different button sizes while maintaining consistent proportions.
 *
 * @param size - The button size (1-4) used to determine default pill radius
 * @param borderRadius - Optional custom border radius CSS value for all corners (e.g., "8px", "0.5rem", "50%")
 * @returns CSS value for border-radius property
 *
 * @example
 * ```tsx
 * // Pill button (default - 50% of height)
 * const pillRadius = getBorderRadius(3)
 * // Result: "calc(var(--cell-height-3) / 2)"
 *
 * // Custom radius button with pixels
 * const customRadius = getBorderRadius(3, "8px")
 * // Result: "8px"
 *
 * // Custom radius button with rem
 * const customRadius = getBorderRadius(3, "0.5rem")
 * // Result: "0.5rem"
 *
 * // Custom radius button with percentage
 * const customRadius = getBorderRadius(3, "25%")
 * // Result: "25%"
 * ```
 */
const getBorderRadius = (size: number, borderRadius?: string): string => {
  if (borderRadius !== undefined) {
    return borderRadius
  }

  // Default to pill shape (50% of button height)
  return `calc(${getCssVariable("cell-height", size)} / 2)`
}

export default getBorderRadius