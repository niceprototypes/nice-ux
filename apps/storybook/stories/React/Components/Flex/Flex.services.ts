import { getReactToken } from "nice-react-styles"

export const twoDots = [
  {
    color: getReactToken("foregroundColor", "error"),
    height: getReactToken("cellHeight", "smaller"),
    width: getReactToken("cellHeight", "smaller"),
  },
  {
    color: getReactToken("foregroundColor", "warning"),
    height: getReactToken("cellHeight", "smaller"),
    width: getReactToken("cellHeight", "smaller"),
  },
]

export const threeDots = [
  ...twoDots,
  {
    color: getReactToken("foregroundColor", "link"),
    height: getReactToken("cellHeight", "smaller"),
    width: getReactToken("cellHeight", "smaller"),
  },
]
