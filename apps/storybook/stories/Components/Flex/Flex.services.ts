import { getToken } from "nice-styles"

export const twoDots = [
  {
    color: getToken("foregroundColor", "error").var,
    height: getToken("cellHeight", "smaller").var,
    width: getToken("cellHeight", "smaller").var,
  },
  {
    color: getToken("foregroundColor", "warning").var,
    height: getToken("cellHeight", "smaller").var,
    width: getToken("cellHeight", "smaller").var,
  },
]

export const threeDots = [
  ...twoDots,
  {
    color: getToken("foregroundColor", "link").var,
    height: getToken("cellHeight", "smaller").var,
    width: getToken("cellHeight", "smaller").var,
  },
]
