import type { ButtonStatusType, ButtonStateType } from "../components/Button/Button.types"
import { getButtonToken } from "../tokens/getButtonToken"

type StatusTokenParameter = "backgroundColor" | "color" | "borderColor"

/**
 * Resolve a button color token from the status/state composition matrix.
 *
 * Uses path-based lookup to walk the nested token tree:
 * ["status", status, parameter, state] → --np--button--status--{status}--{parameter}--{state}
 *
 * The returned semantic var is theme-aware via cascade — when the button (or
 * an ancestor) sets data-theme on the DOM, the matching [data-theme] rule
 * in tokens.css reassigns the semantic var to the day/night primitive.
 *
 * @returns The `var(--np--button--…)` reference string.
 */
export function getStatusToken(
  status: ButtonStatusType,
  state: ButtonStateType,
  parameter: StatusTokenParameter
): string {
  return getButtonToken(["status", status, parameter, state])
}
