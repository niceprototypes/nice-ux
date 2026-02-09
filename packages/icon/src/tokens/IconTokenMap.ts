import { createTokens, mapCoreToken, getToken, type ComponentTokens } from "nice-react-styles"

export const IconTokenMap = {
  size: mapCoreToken("fontSize"),
  color: mapCoreToken("foregroundColor"),
  strokeWidth: {
    small: getToken("borderWidth", "base").var,
    base: getToken("borderWidth", "base").var,
    large: getToken("borderWidth", "large").var,
  },
  spinningAnimationDuration: {
    base: getToken("animationDuration", "base").var,
  },
  viewBox: {
    base: "0 0 16 16",
  },
} as const

export const iconTokens: ComponentTokens<typeof IconTokenMap> = createTokens(IconTokenMap, "icon")