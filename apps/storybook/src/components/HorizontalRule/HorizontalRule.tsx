import * as React from "react"
import { type GapType, type BorderColorType } from "nice-react-styles"
import { HorizontalRuleStyled } from "./HorizontalRule.styles"

interface HorizontalRuleProps {
  /** Outer margin around the rule, as a Nice gap token. @default "base" */
  spacing?: GapType
  /** Rule color, as a Nice border-color token. @default "base" */
  color?: BorderColorType
}

/**
 * A horizontal rule for MDX docs. Renders an `<hr>` whose margin is driven by a
 * Nice gap token and whose color is driven by a Nice border-color token. Replaces
 * the markdown thematic break (`---`) so the divider is token-styled and themable.
 */
const HorizontalRule: React.FC<HorizontalRuleProps> = ({ spacing = "base", color = "base" }) => (
  <HorizontalRuleStyled $spacing={spacing} $color={color} />
)

export default HorizontalRule