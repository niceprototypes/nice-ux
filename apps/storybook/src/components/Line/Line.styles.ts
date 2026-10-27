import styled from "styled-components"
import { getToken, type BorderColorType, type SpacingShorthandType } from "nice-react-styles"
import { getSpacingValue, styleSpacing } from "nice-react-flex"

/**
 * Styled `<hr>` for storybook docs.
 *
 * - `$margin` is a gap-token shorthand, parsed the same way as Flex's `margin`
 *   (`"larger none"` → top/bottom `larger`, left/right `none`).
 * - `$color` sets the rule colour from a border-color token.
 */
export const LineStyled = styled.hr<{ $margin: SpacingShorthandType; $color: BorderColorType }>`
  width: 100%;
  border: none;
  border-top: ${getToken("borderWidth", "small")} solid ${({ $color }) => getToken("borderColor", $color)};
  ${({ $margin }) => styleSpacing("margin", getSpacingValue($margin))}
`
