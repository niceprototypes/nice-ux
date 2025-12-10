import { createComponentTokens } from "nice-react-styles"
import { ButtonTokenMap } from "./tokens"

export const { tokens: ButtonTokens, getToken: getButtonToken } = createComponentTokens(
  "button",
  ButtonTokenMap
)