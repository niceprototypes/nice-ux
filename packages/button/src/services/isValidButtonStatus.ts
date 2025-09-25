import { ButtonStatusType } from "../types"

/**
 * Type guard for checking if a value is a valid button status
 * @param status - Value to check
 * @returns True if valid button status
 */
const isValidButtonStatus = (status: any): status is ButtonStatusType => {
  return ["primary", "secondary", "default", "muted", "highlighted"].includes(status)
}

export default isValidButtonStatus