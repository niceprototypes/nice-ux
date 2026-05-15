import type { InputStatusType, InputStateType } from "../components/Input/Input.types"
import { getInputToken } from "../tokens/getInputToken"

type StatusTokenParameter = "backgroundColor" | "foregroundColor" | "borderColor" | "placeholderColor"

/**
 * Resolve an input color token from the status/state composition matrix.
 *
 * Path-based lookup: ["status", status, state, parameter]
 *   → --np--input--status--{status}--{state}--{parameter}
 *
 * When `mode` is provided, the mode suffix is appended to the CSS variable.
 *
 * @returns The `var(--np--input--…)` reference string.
 */
export function getStatusToken(
  status: InputStatusType,
  state: InputStateType,
  parameter: StatusTokenParameter,
  mode?: string
): string {
  return getInputToken(["status", status, state, parameter], mode)
}
