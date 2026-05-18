import { getToken } from "nice-react-styles"

export const twoDots = [
  {
    color: getToken("foregroundColor", "error"),
    height: getToken("cellHeight", "smaller"),
    width: getToken("cellHeight", "smaller"),
  },
  {
    color: getToken("foregroundColor", "warning"),
    height: getToken("cellHeight", "smaller"),
    width: getToken("cellHeight", "smaller"),
  },
]

export const threeDots = [
  ...twoDots,
  {
    color: getToken("foregroundColor", "link"),
    height: getToken("cellHeight", "smaller"),
    width: getToken("cellHeight", "smaller"),
  },
]
