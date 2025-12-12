import { createTokens } from "nice-react-styles"

export const IconTokenMap = {
  strokeWidth: {
    name: "stroke-width",
    items: {
      small: "1px",
      base: "1.5px",
      large: "2px",
    }
  },
  spinningAnimationDuration: {
    name: "spinning-animation-duration",
    items: {
      base: "750ms",
    }
  },
  viewBox: {
    name: "view-box",
    items: {
      base: "0 0 16 16",
    }
  }
} as const

export const { GlobalStyles: IconStyles, getComponentToken: getIconToken } = createTokens(
  "icon",
  IconTokenMap
)