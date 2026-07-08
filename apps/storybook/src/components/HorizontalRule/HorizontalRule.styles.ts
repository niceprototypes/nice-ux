import styled from "styled-components"
import { getConstant, type GapType, type BorderColorType } from "nice-react-styles"

/**
 * Styled `<hr>` for MDX docs.
 *
 * - `$spacing` sets the outer `margin` from a Nice gap token
 *   (`getConstant("gap", …)` → `var(--np--gap--{spacing})`, base → `var(--np--gap)`).
 * - `$color` sets the rule color from a Nice border-color token
 *   (`getConstant("borderColor", …)` → `var(--np--border-color--{color})`, base → `var(--np--border-color)`).
 */
export const HorizontalRuleStyled = styled.hr<{ $spacing: GapType; $color: BorderColorType }>`
  border: none;
  border-top: 1px solid ${({ $color }) => getConstant("borderColor", $color)};
`
