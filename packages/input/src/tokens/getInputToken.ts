import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--input--…)` reference. */
export function getInputToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("input", nameOrPath, variantOrMode)
  }
  return getComponentToken("input", nameOrPath, variantOrMode, mode)
}

/** Returns the bare CSS variable name. */
export function getInputTokenKey(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("input", nameOrPath, variantOrMode)
  }
  return getComponentTokenKey("input", nameOrPath, variantOrMode, mode)
}

/** Returns the raw underlying value. */
export function getInputTokenValue(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("input", nameOrPath, variantOrMode)
  }
  return getComponentTokenValue("input", nameOrPath, variantOrMode, mode)
}
