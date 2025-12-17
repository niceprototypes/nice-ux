import type { ButtonStateType } from "../components/Button/types"

/**
 * Determines if the button is disabled based on state
 */
export function isDisabled(state: ButtonStateType): boolean {
  return state === "disabled"
}