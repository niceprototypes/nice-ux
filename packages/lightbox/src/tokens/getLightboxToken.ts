import { getComponentToken, type TokenResult } from "nice-react-styles"

export function getLightboxToken(name: string, variant?: string, mode?: string): TokenResult {
  return getComponentToken("lightbox", name, variant, mode)
}