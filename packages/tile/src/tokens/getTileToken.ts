import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--tile--…)` reference. */
export function getTileToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("tile", nameOrPath, variantOrMode)
  }
  return getComponentToken("tile", nameOrPath, variantOrMode, mode)
}

/** Returns the bare CSS variable name. */
export function getTileTokenKey(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("tile", nameOrPath, variantOrMode)
  }
  return getComponentTokenKey("tile", nameOrPath, variantOrMode, mode)
}

/** Returns the raw underlying value. */
export function getTileTokenValue(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("tile", nameOrPath, variantOrMode)
  }
  return getComponentTokenValue("tile", nameOrPath, variantOrMode, mode)
}
