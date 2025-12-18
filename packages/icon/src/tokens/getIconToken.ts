import { createTokens } from "nice-react-styles"
import { IconTokenMap } from "./IconTokenMap"

export const { GlobalStyles: IconStyles, getComponentToken: getIconToken } = createTokens(
  "icon",
  IconTokenMap
)