import { getReactToken } from "nice-react-styles"

export const twoDots = [
  {
    color: getReactToken("foregroundColor", "error").var,
    height: getReactToken("cellHeight", "smaller").var,
    width: getReactToken("cellHeight", "smaller").var,
  },
  {
    color: getReactToken("foregroundColor", "warning").var,
    height: getReactToken("cellHeight", "smaller").var,
    width: getReactToken("cellHeight", "smaller").var,
  },
]

export const threeDots = [
  ...twoDots,
  {
    color: getReactToken("foregroundColor", "link").var,
    height: getReactToken("cellHeight", "smaller").var,
    width: getReactToken("cellHeight", "smaller").var,
  },
]
