import type { TokenResult } from "nice-react-styles"
import type { ButtonStatusType, ButtonStateType } from "../components/Button/Button.types"
import { getButtonToken } from "../tokens/getButtonToken"

type StatusTokenParameter = "backgroundColor" | "foregroundColor" | "borderColor"

/**
 * Resolve a button color token from the status/state composition matrix.
 *
 * Uses path-based lookup to walk the nested token tree:
 * ["status", status, state, parameter] → --np--button--status--{status}--{state}--{parameter}
 *
 * When `mode` is provided, the mode suffix is appended to the CSS variable
 * (e.g. --np--button--status--secondary--base--border-color--night).
 */
export function getStatusToken(
  status: ButtonStatusType,
  state: ButtonStateType,
  parameter: StatusTokenParameter,
  mode?: string
): TokenResult {
  return getButtonToken(["status", status, state, parameter], mode)
}