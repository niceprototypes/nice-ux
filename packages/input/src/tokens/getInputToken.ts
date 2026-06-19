import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--input--…)` reference. */
export function getInputToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("input", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentToken("input", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the bare CSS variable name. */
export function getInputTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("input", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenKey("input", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the raw underlying value. */
export function getInputTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("input", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenValue("input", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}
