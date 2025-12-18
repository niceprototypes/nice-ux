import { getToken } from "nice-styles"

export const IconTokenMap = {
  size: {
    name: "size",
    items: {
      smaller: getToken("fontSize", "smaller").value,
      small: getToken("fontSize", "small").value,
      base: getToken("fontSize", "base").value,
      large: getToken("fontSize", "large").value,
      larger: getToken("fontSize", "larger").value,
    }
  },
  color: {
    name: "color",
    items: {
      lighter: getToken("foregroundColor", "lighter").value,
      light: getToken("foregroundColor", "light").value,
      medium: getToken("foregroundColor", "medium").value,
      heavy: getToken("foregroundColor", "heavy").value,
      base: getToken("foregroundColor", "base").value,
      disabled: getToken("foregroundColor", "disabled").value,
      link: getToken("foregroundColor", "link").value,
      success: getToken("foregroundColor", "success").value,
      warning: getToken("foregroundColor", "warning").value,
      error: getToken("foregroundColor", "error").value,
    }
  },
  strokeWidth: {
    name: "stroke-width",
    items: {
      small: getToken("borderWidth", "base").value,
      base: getToken("borderWidth", "base").value,
      large: getToken("borderWidth", "large").value,
    }
  },
  spinningAnimationDuration: {
    name: "spinning-animation-duration",
    items: {
      base: getToken("animationDuration", "base").value,
    }
  },
  viewBox: {
    name: "view-box",
    items: {
      base: "0 0 16 16",
    }
  }
} as const