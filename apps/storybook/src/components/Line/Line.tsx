import * as React from "react"
import { type BorderColorType, type SpacingShorthandType } from "nice-react-styles"
import { LineStyled } from "./Line.styles"

interface LineProps {
  /** Outer margin as a gap-token shorthand (1–4 values), like Flex's `margin`. @default "none" */
  margin?: SpacingShorthandType
  /** Rule colour, as a border-color token. @default "base" */
  color?: BorderColorType
}

/**
 * The storybook divider: an `<hr>` whose colour and margin come from tokens.
 * Use it in place of `<hr />` and the markdown thematic break (`---`).
 */
const Line: React.FC<LineProps> = ({ margin = "none", color = "base" }) => (
  <LineStyled $margin={margin} $color={color} />
)

export default Line
