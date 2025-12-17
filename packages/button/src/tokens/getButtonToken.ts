import { createTokens } from "nice-react-styles"
import { ButtonTokenMap } from "./ButtonTokenMap"

export const { GlobalStyles: ButtonStyles, getComponentToken: getButtonToken } = createTokens(
  "button",
  ButtonTokenMap
)