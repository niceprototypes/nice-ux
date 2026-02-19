import type { TokenResult } from "nice-styles"
import { getConstant, getInvertedMode } from "nice-styles"
import type { ButtonStatusType, ButtonStateType } from "../components/Button/types"
import { getButtonToken } from "../tokens/getButtonToken"
import { capitalize } from "./capitalize"

type StatusTokenVariant = "backgroundColor" | "foregroundColor" | "borderColor"

/** Map button state names to their foregroundColor variant */
const stateColorMap: Record<ButtonStateType, string> = {
  base: "base",
  disabled: "base",
  error: "error",
  success: "success",
  warning: "warning",
}

/**
 * Resolve a button color token from the status/state composition matrix.
 *
 * Constructs the composite key (e.g. "statusPrimaryBase") and returns
 * the requested color variant from the button token map.
 *
 * When `mode` is provided, bypasses the token lookup and constructs
 * mode-pinned CSS variable references directly via getConstant.
 */
export function getStatusToken(
  status: ButtonStatusType,
  state: ButtonStateType,
  variant: StatusTokenVariant,
  mode?: string
): TokenResult {
  // When mode is provided, construct mode-pinned colors directly
  if (mode) {
    const invertedMode = getInvertedMode(mode)
    const stateColor = stateColorMap[state]

    if (status === "primary") {
      if (variant === "backgroundColor" || variant === "borderColor") {
        const result = getConstant("foregroundColor", stateColor, { mode })
        return { ...result, value: "" }
      }
      // foregroundColor: use inverted mode's base foreground
      const result = getConstant("foregroundColor", "base", { mode: invertedMode })
      return { ...result, value: "" }
    }

    // secondary
    if (variant === "backgroundColor") {
      return { key: "transparent", var: "transparent", value: "" }
    }
    // borderColor or foregroundColor
    const result = getConstant("foregroundColor", stateColor, { mode })
    return { ...result, value: "" }
  }

  const tokenName = `status${capitalize(status)}${capitalize(state)}` as `status${Capitalize<ButtonStatusType>}${Capitalize<ButtonStateType>}`
  return getButtonToken(tokenName, variant)
}