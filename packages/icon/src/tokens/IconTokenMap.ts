import { createTokens, type ComponentTokens } from "nice-react-styles"
import { getToken as getStylesToken } from "nice-styles"

export const IconTokenMap = {
  size: {
    smaller: getStylesToken("fontSize", "smaller").value,
    small: getStylesToken("fontSize", "small").value,
    base: getStylesToken("fontSize", "base").value,
    large: getStylesToken("fontSize", "large").value,
    larger: getStylesToken("fontSize", "larger").value,
  },
  color: {
    lighter: getStylesToken("foregroundColor", "lighter").value,
    light: getStylesToken("foregroundColor", "light").value,
    medium: getStylesToken("foregroundColor", "medium").value,
    heavy: getStylesToken("foregroundColor", "heavy").value,
    base: getStylesToken("foregroundColor", "base").value,
    disabled: getStylesToken("foregroundColor", "disabled").value,
    link: getStylesToken("foregroundColor", "link").value,
    success: getStylesToken("foregroundColor", "success").value,
    warning: getStylesToken("foregroundColor", "warning").value,
    error: getStylesToken("foregroundColor", "error").value,
  },
  strokeWidth: {
    small: getStylesToken("borderWidth", "base").value,
    base: getStylesToken("borderWidth", "base").value,
    large: getStylesToken("borderWidth", "large").value,
  },
  spinningAnimationDuration: {
    base: getStylesToken("animationDuration", "base").value,
  },
  viewBox: {
    base: "0 0 16 16",
  },
} as const

export const iconTokens: ComponentTokens<typeof IconTokenMap> = createTokens(IconTokenMap, "icon")