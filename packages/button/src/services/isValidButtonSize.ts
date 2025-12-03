import type { CellHeightType } from "nice-styles"

const VALID_SIZES: CellHeightType[] = ["smaller", "small", "base", "large", "larger"]

/**
 * Type guard for checking if a value is a valid button size
 * @param size - Value to check
 * @returns True if valid button size
 */
const isValidButtonSize = (size: unknown): size is CellHeightType => {
  return VALID_SIZES.includes(size as CellHeightType)
}

export default isValidButtonSize
