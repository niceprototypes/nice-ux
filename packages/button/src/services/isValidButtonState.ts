import { ButtonStateType } from "../types"

/**
 * Type guard for checking if a value is a valid button state
 * @param state - Value to check
 * @returns True if valid button state
 */
const isValidButtonState = (state: any): state is ButtonStateType => {
  return ["default", "disabled", "attention", "success", "warning"].includes(state)
}

export default isValidButtonState