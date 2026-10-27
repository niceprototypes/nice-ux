import styled from "styled-components"
import Flex from "@niceprototypes/flex"
import { getToken, resolveColorProp } from "@niceprototypes/styles"
import type { SizeType, BorderWidthType, BorderColorType, ColorTokenProp } from "@niceprototypes/styles"
import type {
  ButtonAnimationDurationType,
  ButtonBorderRadiusType,
  ButtonGrowType,
  ButtonColorStatesType,
  ButtonStatusType,
} from "./Button.types"
import type { ResolvedGhost } from "../../utilities/resolveGhost"
import { stateRules } from "../../utilities/stateRules"

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $backgroundImage?: string
  $borderColor?: ColorTokenProp<BorderColorType>
  $borderRadius: ButtonBorderRadiusType
  $borderWidth: BorderWidthType
  $disabled: boolean
  $isHovered: boolean
  $isPressed: boolean
  $size: SizeType
  $hasPadding: boolean
  $square: boolean
  $status: ButtonStatusType
  $filled: boolean
  $selected: boolean
  $ghost: ResolvedGhost
  $iconColor: ButtonColorStatesType
  $color: ButtonColorStatesType
  $animationDuration: ButtonAnimationDurationType
  $grow?: ButtonGrowType
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

  /* Keyboard focus indicator. Pointer focus keeps outline: none (above);
     :focus-visible only matches when the browser decides focus should be shown,
     e.g. Tab navigation. Drawn as an outline (not a border) so it adds no layout
     and sits outside the button's own border at every status and fill. */
  &:focus-visible {
    outline: ${getToken("button.focusRing.width:base")} solid ${getToken("button.focusRing.color:base")};
    outline-offset: ${getToken("button.focusRing.offset:base")};
  }

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
  --np--icon--color: ${getToken("button.icon.color:base")};

  /* Icon size flows through the same button-scoped layer: the icon is pinned to
     its "base" size (so it reads --np--icon--size), which is reassigned here to
     --np--button--icon--size at the button's own $size. That token defaults to the
     --np--font-size scale — the same scale the label reads via getToken("fontSize",
     $size) — so the icon matches the label's font size at every button size;
     overriding --np--button--icon--size[--variant] resizes button icons without
     touching the global --np--icon--size (which all other icons read). Defaulting
     the token to the --np--font-size scale rather than var(--np--icon--size) avoids
     a custom-property cycle, since --np--icon--size is the var we reassign. */
  ${({ $size = "base" }) => `--np--icon--size: ${getToken(`button.icon.size:${$size}`)};`}

  ${({
    $inlined,
    $square,
    $size,
    $hasPadding,
    $filled,
    $selected,
    $status,
    $borderWidth,
    $borderRadius,
    $backgroundImage,
    $borderColor,
    $disabled,
    $animationDuration,
  }) =>
    !$inlined &&
    `
    /* Element-scoped resolved height. Reassigned per $size on this element, so a
       calc() over it reads the live chosen height instead of the frozen :root
       token value (which is always base — substitution resolves at :root). */
    --np--button--height: ${getToken(`button.size:${$size}`)};
    /* The content gap lives on the inner ButtonContent flex. Default horizontal
       padding is size-derived (--np--button--spacing); when a padding prop is set
       it moves to the flex (see ButtonContent) and the button switches to
       min-height so non-zero vertical padding can grow it past the base height. */
    ${$hasPadding ? "min-height" : "height"}: var(--np--button--height);
    width: ${$square ? getToken(`button.size:${$size}`) : "auto"};
    padding: ${$square || $hasPadding ? "0" : `0 ${getToken(`button.spacing:${$size}`)}`};
    font-weight: ${getToken("fontWeight", "base")};
    /* Colors derive from the status's semantic color (status name maps 1:1 to a
       --np--color variant). When filled, that color fills the background and the
       border goes transparent — the background paints to the border box, so the
       fill shows through it and the button reads as one solid shape without a
       second colour lookup — and the label/icon flip to --np--color--inverse.
       Otherwise it is an outline: transparent fill, with the border coming from
       --np--border-color, whose tints are built to sit quietly beside content
       rather than carry it. Both are theme-aware via the core tokens' cascade,
       so no per-theme overrides here. A selected unfilled button takes the
       button.selected.borderColor token instead; a selected filled one keeps the
       transparent border, the fill already marking it. */
    background-color: ${$filled ? getToken("color", $status) : "transparent"};
    color: ${$filled ? getToken("color", "base", { inverse: true }) : getToken("color", $status)};
    border-style: solid;
    border-width: ${getToken(`button.borderWidth:${$borderWidth}`)};
    border-color: ${$filled ? "transparent" : $selected ? getToken("button.selected.borderColor:base") : getToken("borderColor", $status === "disabled" ? "base" : $status)};
    border-radius: ${$borderRadius === "rounded" ? "calc(var(--np--button--height) / 2)" : getToken(`button.borderRadius:${$borderRadius}`)};
    transition: all ${getToken(`button.animationDuration:${$animationDuration}`)} ${getToken("button.animationEasing:base")};
    ${$backgroundImage ? `background-image: ${$backgroundImage};` : ""}
    ${$borderColor ? `border-color: ${resolveColorProp("button", "borderColor", $borderColor)};` : ""}
  `}

  /* Inlined (as="a"): strip the button chrome — no fill, border, height, or
     size-derived padding is emitted (the block above is skipped) — leaving an
     inline-flex, content-width, link-colored anchor that flows in text. The
     icon/label + any padding prop still render via ButtonContent. border,
     background and padding are reset because a native <button> brings its own
     (an outset border, a grey fill, UA padding) where an <a> or <div> has none. */
  ${({ $inlined, $size = "base" }) =>
    $inlined &&
    `
    border: 0;
    background: none;
    padding: 0;
    width: auto;
    /* Size the anchor element itself (not just the label span) so its em-box and
       inline flow track $size — the same fontSize scale the label reads. */
    font-size: ${getToken("fontSize", $size)};
    color: ${getToken("color", "link")};
  `}

  /* Grow: mirrors @niceprototypes/flex's grow (flex-grow paired with flex-basis: 0),
     so equal-grow siblings in a flex parent share its width by ratio rather than
     by label width. Emitted for every as= element and outside the inlined branch. The
     label/icons stay centred: this element is inline-flex with
     justify-content: center, and ButtonContent is an inline-flex child. */
  ${({ $grow }) => ($grow !== undefined ? `flex-grow: ${$grow}; flex-basis: 0;` : "")}

  /* Ghost: in each ghosted state only the label and icons show — no fill, border or
     background image. A filled button's label leaves the inverse color while ghosted, which
     would vanish on the transparent background. The inlined layout has no chrome to hide. */
  ${({ $ghost, $inlined, $disabled, $status }) => {
    if ($inlined) return ""
    const transparent = `
      background-color: transparent;
      background-image: none;
      border-color: transparent;
      color: ${getToken("color", $status)};
    `
    return stateRules(
      Object.fromEntries(Object.entries($ghost).filter(([, ghosted]) => ghosted).map(([state]) => [state, transparent])),
      $disabled
    )
  }}

  /* Icon color per state from the button.icon.color state tokens: rest is the base set above;
     hover, focus and active read their own variants, which follow base until a project
     overrides them. Emitted before the iconColor prop's rules, so the prop wins. */
  ${({ $disabled }) =>
    stateRules(
      Object.fromEntries(
        (["hover", "focus", "active"] as const).map((state) => [
          state,
          `--np--icon--color: ${getToken(`button.icon.color:${state}`)};`,
        ])
      ),
      $disabled
    )}

  /* Icon color per state from the iconColor prop: reassigns the --np--icon--color the icons
     read. Same selectors as the token rules above and emitted after them, so the prop wins in
     every state it sets; a state it leaves out keeps the token. Applies in the inlined layout too. */
  ${({ $iconColor, $disabled }) =>
    stateRules(
      Object.fromEntries(
        Object.entries($iconColor).map(([state, color]) => [state, `--np--icon--color: ${getToken(color)};`])
      ),
      $disabled
    )}

  /* Label color per state from the color prop. Emitted last, with the same selectors as the
     ghost rules (which set the status color), so the prop wins in every state it sets; a state
     it leaves out keeps the status color. Applies in the inlined layout too. */
  ${({ $color, $disabled }) =>
    stateRules(
      Object.fromEntries(Object.entries($color).map(([state, color]) => [state, `color: ${getToken(color)};`])),
      $disabled
    )}
`

/**
 * Inner content container: a @niceprototypes/flex row holding the icon(s) + label,
 * centered inside StyledButton. It owns the icon/label gap (kept as
 * calc(fontSize/2) so it tracks the label size exactly, as before) and — via the
 * Flex `padding` prop passed from Button — the modern shorthand padding. Square
 * (icon-only) buttons collapse the gap to zero. With `$fill` (a justifyContent
 * other than center) it grows to the button's width, so its justifyContent has
 * room to act.
 */
export const ButtonContent = styled(Flex)<{
  $fill: boolean
  $size: SizeType
  $square: boolean
}>`
  gap: ${({ $square, $size }) => ($square ? "0" : `0 calc(${getToken("fontSize", $size)} / 2)`)};
  ${({ $fill }) => ($fill ? "flex: 1 1 auto;" : "")}
`
