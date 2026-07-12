import type { ButtonStatusType } from "../components/Button/Button.types"

/**
 * Determines if the button is disabled based on status
 */
export function isDisabled(status: ButtonStatusType): boolean {
  return status === "disabled"
}
