import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--lightbox--…)` reference. */
export function getLightboxToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("lightbox", nameOrPath, variantOrMode)
  }
  return getComponentToken("lightbox", nameOrPath, variantOrMode, mode)
}

/** Returns the bare CSS variable name. */
export function getLightboxTokenKey(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("lightbox", nameOrPath, variantOrMode)
  }
  return getComponentTokenKey("lightbox", nameOrPath, variantOrMode, mode)
}

/** Returns the raw underlying value. */
export function getLightboxTokenValue(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("lightbox", nameOrPath, variantOrMode)
  }
  return getComponentTokenValue("lightbox", nameOrPath, variantOrMode, mode)
}
