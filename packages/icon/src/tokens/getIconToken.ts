import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--icon--…)` reference. */
export function getIconToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("icon", nameOrPath, variantOrMode)
  }
  return getComponentToken("icon", nameOrPath, variantOrMode, mode)
}

/** Returns the bare CSS variable name. */
export function getIconTokenKey(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("icon", nameOrPath, variantOrMode)
  }
  return getComponentTokenKey("icon", nameOrPath, variantOrMode, mode)
}

/** Returns the raw underlying value. */
export function getIconTokenValue(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("icon", nameOrPath, variantOrMode)
  }
  return getComponentTokenValue("icon", nameOrPath, variantOrMode, mode)
}
