import { ButtonStatusType } from "../types"

/**
 * Type guard for checking if a value is a valid button status
 * @param status - Value to check
 * @returns True if valid button status
 */
const isValidButtonStatus = (status: unknown): status is ButtonStatusType => {
  return ["primary", "secondary", "default", "muted", "highlighted"].includes(status as string)
}

export default isValidButtonStatus
