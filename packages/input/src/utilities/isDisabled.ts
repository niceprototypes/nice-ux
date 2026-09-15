import type { InputStatusType } from "../components/Input/Input.types"

/**
 * Determines if the input is disabled based on status.
 */
export function isDisabled(status: InputStatusType): boolean {
  return status === "disabled"
}
