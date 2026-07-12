import styled from "styled-components"
import Flex from "nice-react-flex"
import { getBreakpoint, getToken, BREAKPOINT_TABLET } from "nice-react-styles"
import type { CellHeightType, BorderWidthType, BorderColorType } from "nice-react-styles"
import type { ButtonBorderRadiusType, ButtonStatusType } from "./Button.types"
import { getButtonToken } from "../../tokens/getButtonToken"

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $backgroundImage?: string
  $borderColor?: BorderColorType
  $borderRadius: ButtonBorderRadiusType
  $borderWidth: BorderWidthType
  $disabled: boolean
  $isHovered: boolean
  $isFocused: boolean
  $isPressed: boolean
  $size: CellHeightType
  $hasPadding: boolean
  $square: boolean
  $status: ButtonStatusType
  $filled: boolean
  $inlined: boolean
}>`
  /* Reset */
  position: relative;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  outline: none;
  text-align: center;
  text-decoration: none;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  -webkit-tap-highlight-color: transparent;

  /* The nested icon's color flows through a button-scoped token layer:
     --np--button--icon--color (default currentColor) feeds the icon's own
     --np--icon--color here. So by default the icon tracks the button's resolved
     color across every status/theme, and overriding --np--button--icon--color
     recolors button icons without touching the global --np--icon--color (which all
     other icons read). */
  --np--icon--color: ${getButtonToken(["icon", "color", "base"])};

  /* Icon size flows through the same button-scoped layer: the icon is pinned to
     its "base" size (so it reads --np--icon--size), which is reassigned here to
     --np--button--icon--size at the button's own $size. That token defaults to the
     --np--font-size scale — the same scale the label reads via getToken("fontSize",
     $size) — so the icon matches the label's font size at every button size;
     overriding --np--button--icon--size[--variant] resizes button icons without
     touching the global --np--icon--size (which all other icons read). Defaulting
     the token to the --np--font-size scale rather than var(--np--icon--size) avoids
     a custom-property cycle, since --np--icon--size is the var we reassign. */
  ${({ $size = "base" }) => `--np--icon--size: ${getButtonToken(["icon", "size", $size])};`}

  ${({
    $inlined,
    $square,
    $size,
    $hasPadding,
    $filled,
    $status,
    $borderWidth,
    $borderRadius,
    $backgroundImage,
    $borderColor,
    $disabled,
  }) =>
    !$inlined &&
    `
    /* Element-scoped resolved height. Reassigned per $size on this element, so a
       calc() over it reads the live chosen height instead of the frozen :root
       token value (which is always base — substitution resolves at :root). */
    --np--button--height: ${getButtonToken("size", $size)};
    /* The content gap lives on the inner ButtonContent flex. Default horizontal
       padding is size-derived (--np--button--spacing); when a padding prop is set
       it moves to the flex (see ButtonContent) and the button switches to
       min-height so non-zero vertical padding can grow it past the base height. */
    ${$hasPadding ? "min-height" : "height"}: var(--np--button--height);
    width: 100%;
    padding: ${$square || $hasPadding ? "0" : `0 ${getButtonToken("spacing", $size)}`};
    font-weight: ${getToken("fontWeight", "base")};
    /* Colors derive from the status's semantic color (status name maps 1:1 to a
       --np--color variant). When filled, that color fills the background and
       border and the label/icon flip to --np--color--inverse; otherwise it is an
       outline — transparent fill, status-colored border and label. Both are
       theme-aware via the core tokens' cascade, so no per-theme overrides here. */
    background-color: ${$filled ? getToken("color", $status) : "transparent"};
    color: ${$filled ? getToken("color", "base", { inverse: true }) : getToken("color", $status)};
    border-style: solid;
    border-width: ${getButtonToken("borderWidth", $borderWidth)};
    border-color: ${getToken("borderColor", $status === "disabled" ? "base" : $status)};
    border-radius: ${$borderRadius === "rounded" ? "calc(var(--np--button--height) / 2)" : getButtonToken("borderRadius", $borderRadius)};
    transition: all 0.15s ease-in-out;
    ${$backgroundImage ? `background-image: ${$backgroundImage};` : ""}
    ${$borderColor ? `border-color: ${getButtonToken("borderColor", $borderColor)};` : ""}
  `}

  ${({ $inlined, $square, $size }) =>
    !$inlined &&
    `
    ${getBreakpoint(`${BREAKPOINT_TABLET}+`)} {
      width: ${$square ? getButtonToken("size", $size) : "auto"};
    }
  `}

  /* Inlined (as="a"): strip the button chrome — no fill, border, height, or
     size-derived padding is emitted (the block above is skipped) — leaving an
     inline-flex, content-width, link-colored anchor that flows in text. The
     icon/label + any padding prop still render via ButtonContent. */
  ${({ $inlined }) =>
    $inlined &&
    `
    width: auto;
    color: ${getToken("color", "link")};
  `}
`

/**
 * Inner content container: a nice-react-flex row holding the icon(s) + label,
 * centered inside StyledButton. It owns the icon/label gap (kept as
 * calc(fontSize/2) so it tracks the label size exactly, as before) and — via the
 * Flex `padding` prop passed from Button — the modern shorthand padding. Square
 * (icon-only) buttons collapse the gap to zero.
 */
export const ButtonContent = styled(Flex)<{
  $size: CellHeightType
  $square: boolean
}>`
  gap: ${({ $square, $size }) => ($square ? "0" : `0 calc(${getToken("fontSize", $size)} / 2)`)};
`
