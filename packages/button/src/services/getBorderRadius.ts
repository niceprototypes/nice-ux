import { getCssVariable } from "../utils"

/**
 * Calculates the border radius for a button based on size and custom radius value.
 *
 * This function provides flexible border radius control for buttons. When no custom
 * radius is specified, it automatically creates a pill-shaped button by setting
 * the radius to 50% of the button's height. When a custom radius is provided,
 * it applies that exact pixel value to all four corners.
 *
 * The default pill effect (50% height) creates smooth, rounded buttons that scale
 * appropriately with different button sizes while maintaining consistent proportions.
 *
 * @param size - The button size (1-4) used to determine default pill radius
 * @param borderRadius - Optional custom border radius in pixels for all corners
 * @returns CSS calc expression for border-radius property
 *
 * @example
 * ```tsx
 * // Pill button (default - 50% of height)
 * const pillRadius = getBorderRadius(3)
 * // Result: "calc(var(--cell-height-3) / 2)"
 *
 * // Custom radius button
 * const customRadius = getBorderRadius(3, 8)
 * // Result: "8px"
 * ```
 */
const getBorderRadius = (size: number, borderRadius?: number): string => {
  if (borderRadius !== undefined) {
    return `${borderRadius}px`
  }

  // Default to pill shape (50% of button height)
  return `calc(${getCssVariable("cell-height", size)} / 2)`
}

export default getBorderRadius