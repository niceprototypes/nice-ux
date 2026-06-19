import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--icon--…)` reference. */
export function getIconToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("icon", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentToken("icon", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the bare CSS variable name. */
export function getIconTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("icon", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenKey("icon", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}

/** Returns the raw underlying value. */
export function getIconTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("icon", { token: nameOrPath, mode: variantOrTheme })
  }
  return getComponentTokenValue("icon", { token: nameOrPath, variant: variantOrTheme, mode: theme })
}
