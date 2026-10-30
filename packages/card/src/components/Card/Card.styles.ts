import styled, { css } from "styled-components"
import { getToken, resolveColorProp } from "@niceprototypes/styles"
import type { ColorTokenProp } from "@niceprototypes/styles"
import { getGapSize, getSpacingValue, styleSpacing } from "@niceprototypes/flex"
import type {
  CardBackgroundColorType,
  CardBorderRadiusType,
  CardGapType,
  CardPaddingType,
  CardVariantType,
} from "./Card.types"

interface StyledCardProps {
  $variant: CardVariantType
  $padding?: CardPaddingType
  $gap?: CardGapType
  $borderRadius?: CardBorderRadiusType
  $backgroundColor: ColorTokenProp<CardBackgroundColorType>
  $selected: boolean
  $interactive: boolean
  $disabled: boolean
}

/** Border colour: selected wins; outline shows the base border; elevated and filled hide it. */
const borderColor = ({ $variant, $selected }: StyledCardProps) => {
  if ($selected) return getToken("card.borderColor:selected")
  return $variant === "outline" ? getToken("card.borderColor:base") : "transparent"
}

/** Hover on an enabled link or button card: elevated deepens its shadow, the others strengthen the border. */
const hover = ({ $variant, $selected }: StyledCardProps) =>
  $variant === "elevated"
    ? css`
        box-shadow: ${getToken("card.boxShadow:hover")};
      `
    : $selected
      ? ""
      : css`
          border-color: ${getToken("card.hover.borderColor:base")};
        `

/**
 * The card root, rendered as `<div>`, `<a>` or `<button>` (`as`). A column flex container;
 * native link and button styling is reset so every root looks the same.
 */
export const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  font: inherit;
  color: inherit;
  text-align: inherit;
  text-decoration: none;
  appearance: none;
  gap: ${({ $gap }) => ($gap ? getGapSize($gap) : getToken("card.gap:base"))};
  ${({ $padding }) =>
    $padding ? styleSpacing("padding", getSpacingValue($padding)) : `padding: ${getToken("card.padding:base")};`}
  background-color: ${({ $backgroundColor }) => resolveColorProp("card", "backgroundColor", $backgroundColor)};
  border-style: solid;
  border-width: ${getToken("card.borderWidth:base")};
  border-color: ${borderColor};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? getToken("borderRadius", $borderRadius) : getToken("card.borderRadius:base")};
  box-shadow: ${({ $variant }) => ($variant === "elevated" ? getToken("card.boxShadow:elevated") : "none")};
  cursor: ${({ $interactive, $disabled }) => ($disabled ? "not-allowed" : $interactive ? "pointer" : "auto")};
  opacity: ${({ $disabled }) => ($disabled ? getToken("card.disabledOpacity:base") : 1)};

  /* A button sizes to its content by default; stretch it like the div and link roots. */
  &:is(button) {
    width: 100%;
  }

  ${props =>
    props.$interactive && !props.$disabled
      ? css`
          &:hover {
            ${hover(props)}
          }
        `
      : ""}

  &:focus-visible {
    outline: ${getToken("card.focusRing.width:base")} solid ${getToken("card.focusRing.color:base")};
    outline-offset: ${getToken("card.focusRing.offset:base")};
  }
`
