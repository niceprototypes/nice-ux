import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--icon--…)` reference. */
export function getIconToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("icon", nameOrPath, variantOrTheme)
  }
  return getComponentToken("icon", nameOrPath, variantOrTheme, theme)
}

/** Returns the bare CSS variable name. */
export function getIconTokenKey(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("icon", nameOrPath, variantOrTheme)
  }
  return getComponentTokenKey("icon", nameOrPath, variantOrTheme, theme)
}

/** Returns the raw underlying value. */
export function getIconTokenValue(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("icon", nameOrPath, variantOrTheme)
  }
  return getComponentTokenValue("icon", nameOrPath, variantOrTheme, theme)
}
