import { getToken } from "nice-react-styles"

export const twoDots = [
  {
    color: getToken("color", { variant: "error" }),
    height: getToken("cellHeight", { variant: "smaller" }),
    width: getToken("cellHeight", { variant: "smaller" }),
  },
  {
    color: getToken("color", { variant: "warning" }),
    height: getToken("cellHeight", { variant: "smaller" }),
    width: getToken("cellHeight", { variant: "smaller" }),
  },
]

export const threeDots = [
  ...twoDots,
  {
    color: getToken("color", { variant: "link" }),
    height: getToken("cellHeight", { variant: "smaller" }),
    width: getToken("cellHeight", { variant: "smaller" }),
  },
]
