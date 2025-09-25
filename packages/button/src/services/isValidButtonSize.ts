import { ButtonSizeType } from "../types"

/**
 * Type guard for checking if a value is a valid button size
 * @param size - Value to check
 * @returns True if valid button size
 */
const isValidButtonSize = (size: any): size is ButtonSizeType => {
  return [1, 2, 3, 4].includes(size)
}

export default isValidButtonSize