import {
  getComponentToken,
  getComponentTokenKey,
  getComponentTokenValue,
} from "nice-react-styles"

/** Returns the `var(--np--image--…)` reference. */
export function getImageToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentToken("image", nameOrPath, variantOrMode)
  }
  return getComponentToken("image", nameOrPath, variantOrMode, mode)
}

/** Returns the bare CSS variable name. */
export function getImageTokenKey(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenKey("image", nameOrPath, variantOrMode)
  }
  return getComponentTokenKey("image", nameOrPath, variantOrMode, mode)
}

/** Returns the raw underlying value. */
export function getImageTokenValue(nameOrPath: string | string[], variantOrMode?: string, mode?: string): string {
  if (Array.isArray(nameOrPath)) {
    return getComponentTokenValue("image", nameOrPath, variantOrMode)
  }
  return getComponentTokenValue("image", nameOrPath, variantOrMode, mode)
}
