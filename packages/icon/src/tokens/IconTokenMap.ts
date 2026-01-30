import { createTokens, getToken, type ComponentTokens } from "nice-react-styles"

export const IconTokenMap = {
  size: {
    smaller: getToken("fontSize", "smaller").var,
    small: getToken("fontSize", "small").var,
    base: getToken("fontSize", "base").var,
    large: getToken("fontSize", "large").var,
    larger: getToken("fontSize", "larger").var,
  },
  color: {
    lighter: getToken("foregroundColor", "lighter").var,
    light: getToken("foregroundColor", "light").var,
    medium: getToken("foregroundColor", "medium").var,
    heavy: getToken("foregroundColor", "heavy").var,
    base: getToken("foregroundColor", "base").var,
    disabled: getToken("foregroundColor", "disabled").var,
    link: getToken("foregroundColor", "link").var,
    success: getToken("foregroundColor", "success").var,
    warning: getToken("foregroundColor", "warning").var,
    error: getToken("foregroundColor", "error").var,
  },
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