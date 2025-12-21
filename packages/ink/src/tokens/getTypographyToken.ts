import { createTokens } from "nice-react-styles"
import { TypographyTokenMap } from "./TypographyTokenMap"

export const { GlobalStyles: TypographyStyles, getComponentToken: getTypographyToken } = createTokens(
  "typography",
  TypographyTokenMap
)