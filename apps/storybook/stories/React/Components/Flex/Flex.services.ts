import { getToken } from "nice-react-styles"

export const twoDots = [
  {
    color: getToken("color", "error"),
    height: getToken("cellHeight", "smaller"),
    width: getToken("cellHeight", "smaller"),
  },
  {
    color: getToken("color", "warning"),
    height: getToken("cellHeight", "smaller"),
    width: getToken("cellHeight", "smaller"),
  },
]

export const threeDots = [
  ...twoDots,
  {
    color: getToken("color", "link"),
    height: getToken("cellHeight", "smaller"),
    width: getToken("cellHeight", "smaller"),
  },
]
