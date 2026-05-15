import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--typography--…)` reference. */
export function getTypographyToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("typography", nameOrPath, variantOrMode)
  }
  return getComponentToken("typography", nameOrPath, variantOrMode, mode)
}

/** Returns the bare CSS variable name (no `var(...)` wrapper). */
export function getTypographyTokenKey(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("typography", nameOrPath, variantOrMode)
  }
  return getComponentTokenKey("typography", nameOrPath, variantOrMode, mode)
}

/** Returns the raw underlying value. */
export function getTypographyTokenValue(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("typography", nameOrPath, variantOrMode)
  }
  return getComponentTokenValue("typography", nameOrPath, variantOrMode, mode)
}
