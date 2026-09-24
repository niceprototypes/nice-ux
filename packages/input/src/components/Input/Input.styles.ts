import styled, { css } from "styled-components"
import { getToken, resolveColorProp } from "nice-react-styles"
import type { SizeType, BorderWidthType, ColorTokenProp } from "nice-react-styles"
import type {
  InputAsType,
  InputBackgroundColorType,
  InputBorderColorType,
  InputBorderRadiusType,
  InputStatusType,
  InputWidthType,
} from "./Input.types"

/**
 * Border color: status name maps 1:1 to a core --np--border-color variant.
 * Outline inputs fall back to the base border when disabled; filled inputs have
 * no border unless the status is semantic (error / success / warning).
 */
function getBorderColor(status: InputStatusType, filled: boolean): string {
  if (status === "base" || status === "disabled") {
    return filled ? "transparent" : getToken("borderColor", "base")
  }
  return getToken("borderColor", status)
}

/**
 * Wrapper width. `input.width` numeric variants hold the content width only
 * (`Nch`), so the chrome adds its own size-specific inline padding and border
 * on both sides. `full` (100%) is used as-is.
 */
function getWidth(
  width: InputWidthType,
  size: SizeType,
  borderWidth: BorderWidthType
): string {
  const content = getToken(`input.width:${width}`)
  if (width === "full") return content
  return `calc(${content} + 2 * ${getToken(`input.spacing:${size}`)} + 2 * ${getToken(`input.borderWidth:${borderWidth}`)})`
}

/**
 * Native control inside the field chrome. Transparent and borderless — the
 * wrapper (StyledField) owns every visual of the field — and it grows to fill
 * the space between the start / end slots. Rendered as input, select or
 * textarea via styled-components' `as`.
 */
export const StyledControl = styled.input.withConfig({
  shouldForwardProp: prop => !prop.startsWith("$"),
})<{
  $as: InputAsType
  $disabled: boolean
  $rows?: number
  $size: SizeType
}>`
  /* Reset */
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  box-sizing: border-box;
  font-family: inherit;
  /* Font floor: max(16px, core font size) — below 16px mobile browsers zoom on focus */
  font-size: ${getToken("input.fontSize:base")};
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  -webkit-appearance: none;

  ${({ $as, $disabled, $rows, $size }) => css`
    flex: 1 1 0;
    min-inline-size: 0;
    align-self: stretch;
    font-weight: ${getToken("fontWeight", "base")};
    color: ${getToken("color", $disabled ? "disabled" : "base")};
    cursor: ${$disabled
      ? "not-allowed"
      : $as === "select"
        ? "pointer"
        : "text"};

    ${$as === "textarea"
      ? css`
          /* Grows with content; the first line sits where a single-line input's
             text would (vertically centred in the size token), and min-block-size
             keeps at least $rows lines (HTML default 2) so it never collapses. */
          field-sizing: content;
          resize: vertical;
          line-height: ${getToken("lineHeight", "base")};
          padding-block: calc((${getToken(`input.size:${$size}`)} - 1lh) / 2);
          min-block-size: calc(
            ${$rows ?? 2} * 1lh + ${getToken(`input.size:${$size}`)} - 1lh
          );
        `
      : css`
          line-height: 1;
        `}

    &::placeholder {
      color: ${getToken("color", $disabled ? "disabled" : "lighter")};
      opacity: 1;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration {
      -webkit-appearance: none;
    }
  `}
`

/**
 * Field chrome: the root element. Owns height, padding, border, radius,
 * background, status border colour, width and the focus ring, and lays out
 * start slot → native control → end slot on the inline axis (flex row + gap,
 * so the order mirrors under RTL with no physical left/right).
 */
export const StyledField = styled.div.withConfig({
  shouldForwardProp: prop => !prop.startsWith("$"),
})<{
  $as: InputAsType
  $backgroundColor?: ColorTokenProp<InputBackgroundColorType>
  $borderColor?: ColorTokenProp<InputBorderColorType>
  $borderRadius: InputBorderRadiusType
  $borderWidth: BorderWidthType
  $disabled: boolean
  $filled: boolean
  $size: SizeType
  $status: InputStatusType
  $width: InputWidthType
}>`
  ${({
    $as,
    $size,
    $status,
    $filled,
    $borderWidth,
    $borderRadius,
    $backgroundColor,
    $borderColor,
    $disabled,
    $width,
  }) => css`
    display: flex;
    flex-direction: row;
    align-items: ${$as === "textarea" ? "flex-start" : "center"};
    gap: ${getToken("gap", "small")};
    box-sizing: border-box;
    /* The width token's content part is ch-based; ch resolves against this
       font size, so it matches the control's floored font size. */
    font-size: ${getToken("input.fontSize:base")};
    width: ${getWidth($width, $size, $borderWidth)};
    ${$as === "textarea"
      ? css`
          min-block-size: ${getToken(`input.size:${$size}`)};
        `
      : css`
          block-size: ${getToken(`input.size:${$size}`)};
        `}
    padding-block: 0;
    padding-inline: ${getToken(`input.spacing:${$size}`)};
    background-color: ${getToken(
      "backgroundColor",
      $filled ? "raised" : "base"
    )};
    border-style: solid;
    border-width: ${getToken(`input.borderWidth:${$borderWidth}`)};
    border-color: ${getBorderColor($status, $filled)};
    border-radius: ${getToken(`input.borderRadius:${$borderRadius}`)};
    transition:
      border-color 0.15s ease-in-out,
      background-color 0.15s ease-in-out;
    cursor: ${$disabled ? "not-allowed" : "text"};
    ${$backgroundColor
      ? `background-color: ${resolveColorProp("input", "backgroundColor", $backgroundColor)};`
      : ""}
    ${$borderColor
      ? `border-color: ${resolveColorProp("input", "borderColor", $borderColor)};`
      : ""}

    &:has(> ${StyledControl}:focus) {
      border-color: ${getToken("color", "base")};
    }

    /* Keyboard focus ring. The native control keeps outline: none; the ring is
       drawn on the chrome whenever something inside it has :focus-visible, as
       an outline so it adds no layout — the same look as Button. */
    &:has(:focus-visible) {
      outline: ${getToken("input.focusRing.width:base")} solid
        ${getToken("input.focusRing.color:base")};
      outline-offset: ${getToken("input.focusRing.offset:base")};
    }
  `}
`
