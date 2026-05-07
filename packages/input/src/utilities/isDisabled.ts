import type { InputStateType } from "../components/Input/Input.types"

/**
 * Determines if the input is disabled based on state.
 */
export function isDisabled(state: InputStateType): boolean {
  return state === "disabled"
}