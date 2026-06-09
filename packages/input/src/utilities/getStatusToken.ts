import type { InputStatusType, InputStateType } from "../components/Input/Input.types"
import { getInputToken } from "../tokens/getInputToken"

type StatusTokenParameter = "backgroundColor" | "color" | "borderColor" | "placeholderColor"

/**
 * Resolve an input color token from the status/state composition matrix.
 *
 * Path-based lookup: ["status", status, parameter, state]
 *   → --np--input--status--{status}--{parameter}--{state}
 *
 * Returns the semantic var; theme-awareness happens via cascade — when the
 * input (or an ancestor) sets data-theme on the DOM, the matching
 * [data-theme] rule in tokens.css reassigns the semantic var to the
 * day/night primitive.
 *
 * @returns The `var(--np--input--…)` reference string.
 */
export function getStatusToken(
  status: InputStatusType,
  state: InputStateType,
  parameter: StatusTokenParameter
): string {
  return getInputToken(["status", status, parameter, state])
}
