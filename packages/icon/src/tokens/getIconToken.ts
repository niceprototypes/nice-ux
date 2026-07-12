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