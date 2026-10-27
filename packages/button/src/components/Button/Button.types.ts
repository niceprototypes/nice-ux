import * as React from "react"
import { AnimationDurationType, SizeType, BorderWidthType, BorderColorType, ColorTokenProp, FontWeightType, ThemeType, TokenAddress } from "@niceprototypes/styles"
import type { ButtonIconNameType } from "../ButtonIcon/ButtonIcon.types"
import type { FlexJustifyContentType, FlexSpacingType } from "@niceprototypes/flex"

/**
 * Border radius variants for the button
 */
export type ButtonBorderRadiusType = "none" | "small" | "base" | "large" | "rounded"

/**
 * ButtonBorderColorType
 *
 * @token Re-export of BorderColorType from @niceprototypes/styles. Token-bound —
 * raw CSS color strings are not accepted.
 */
export type ButtonBorderColorType = BorderColorType

/**
 * ButtonPaddingType
 *
 * Internal padding of the button content, as a CSS-like shorthand of gap tokens
 * (1–4 values following CSS padding order, e.g. "none base larger") — the
 * @niceprototypes/flex padding standard. Overrides the default size-derived
 * horizontal padding.
 */
export type ButtonPaddingType = FlexSpacingType

/**
 * ButtonJustifyContentType
 *
 * How the icon(s) and label are placed along the button — the @niceprototypes/flex
 * justifyContent standard. Anything but "center" stretches the content row to
 * the button's width, so "space-between" puts an icon at each edge with the
 * label between.
 *
 * Values:
 * - "flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"
 */
export type ButtonJustifyContentType = FlexJustifyContentType

/**
 * ButtonInteractionStateType
 *
 * An interaction state that per-state props (`ghost`, `iconColor`) can target. Exactly one
 * applies at a time, the first that matches of: active, focus, hover, rest.
 *
 * Values:
 * - "rest": none of the states below
 * - "hover": the pointer is over the button
 * - "focus": keyboard focus (:focus-visible)
 * - "active": the button is being pressed (:active)
 */
export type ButtonInteractionStateType = "rest" | "hover" | "focus" | "active"

/**
 * ButtonGhostStatesType
 *
 * Which interaction states are ghosted; a state left out is not.
 */
export type ButtonGhostStatesType = Partial<Record<ButtonInteractionStateType, boolean>>

/**
 * ButtonGhostType
 *
 * Where the button renders as ghost: transparent background and border, so only its label
 * and icons show. A filled button's label takes its status color while ghosted, since the
 * inverse color would vanish without the fill. A disabled button shows its rest setting
 * whatever the pointer does. Has no effect on the inlined (link) layout, which has no
 * chrome.
 *
 * Values:
 * - true: ghost at rest; hover, focus and press show the normal colors
 * - false: never ghost
 * - ButtonGhostStatesType: ghost in each state set to true
 */
export type ButtonGhostType = boolean | ButtonGhostStatesType

/**
 * ButtonColorTokenType
 *
 * A color token, as a token address from the color or border-color groups: `"color"`,
 * `"color:light"`, `"color:link"`, `"borderColor"`, `"borderColor:stronger"`, and their
 * `:inverse` forms. Shared by the per-state color props (`color`, `iconColor`).
 */
export type ButtonColorTokenType = Extract<TokenAddress, `color${string}` | `borderColor${string}`>

/**
 * ButtonColorStatesType
 *
 * A color per interaction state; a state left out keeps the prop's default.
 */
export type ButtonColorStatesType = Partial<Record<ButtonInteractionStateType, ButtonColorTokenType>>

/**
 * ButtonColorType
 *
 * The color of the button's label (and of anything drawn in its text color, such as icons
 * without an iconColor). Unset, it is the status color: `color` at the status, or the inverse
 * base color when filled. A disabled button shows its rest color whatever the pointer does.
 * Applies in the inlined (link) layout too.
 *
 * Values:
 * - ButtonColorTokenType: that color in every state
 * - ButtonColorStatesType: a color per state
 */
export type ButtonColorType = ButtonColorTokenType | ButtonColorStatesType

/**
 * ButtonIconColorType
 *
 * The color of the button's icons: one color token in every state, or one per state. A state
 * left out keeps the default icon color (the `button.icon.color` state tokens). A disabled
 * button shows its rest color whatever the pointer does. Applies in the inlined (link) layout
 * too.
 */
export type ButtonIconColorType = ButtonColorType

/**
 * ButtonAnimationDurationType
 *
 * How long the button's transitions (colors, border, background) take, from the
 * `button.animationDuration` component tokens. Each follows the root animationDuration variant
 * of the same name, except `base`: Button's base is the root's `fast`, keeping its transitions
 * quick by default.
 *
 * Values:
 * - "none": no transition (0s)
 * - "base": the default; the root `fast` duration
 * - "faster", "fast", "slow", "slower": the root animation durations of the same name
 */
export type ButtonAnimationDurationType = "none" | AnimationDurationType

/**
 * Interactive status of the button (semantic variant).
 * Affects styling based on context. Named `status` because `state` collides with
 * React's component-state convention.
 */
export type ButtonStatusType = "base" | "disabled" | "error" | "success" | "warning"

/**
 * Whether the button renders filled. When true, the current status's semantic
 * color fills the background and border and the label/icon flip to
 * `--np--color--inverse`; when false (default) the button is an outline —
 * transparent fill with a status-colored border and label.
 */
export type ButtonFilledType = boolean

/**
 * ButtonWeightType
 *
 * Re-export of FontWeightType from @niceprototypes/styles.
 * Font weight of the button label, forwarded to the underlying Ink.
 */
export type ButtonWeightType = FontWeightType

/**
 * ButtonGrowType
 *
 * Flex grow factor of the button's root element, mirroring @niceprototypes/flex's
 * `grow` prop: emits `flex-grow: {value}` paired with `flex-basis: 0`, so
 * sibling buttons in a flex container size from their grow ratios rather than
 * their label widths (equal values render equal widths). Only takes effect when
 * the parent is a flex container. The label and icons stay centred.
 */
export type ButtonGrowType = number

/**
 * HTML button type attribute
 */
export type ButtonElementType = "button" | "submit" | "reset"

/**
 * Disabled state type
 */
export type ButtonDisabledType = boolean

/**
 * Antialiased font rendering type
 */
export type ButtonAntialiasedType = boolean

/**
 * ButtonSelectedType
 *
 * Whether the button shows a persistent selected look, for toggle groups, pill
 * filters and tabs. A selected button is never ghosted: `selected` overrides
 * `ghost` in every interaction state. Unfilled, its border reads the
 * `button.selected.borderColor` token; filled, the border stays transparent (the
 * fill already marks it). An explicit `borderColor` prop still wins. Sets no ARIA
 * attribute: pass `aria-pressed` for a toggle, or `role="tab"` with
 * `aria-selected` for a tab.
 */
export type ButtonSelectedType = boolean

/**
 * Whether the button's icon resolves through the vendor icon set
 */
export type ButtonIconVendorType = boolean

/**
 * Whether the button renders with the inlined, chrome-stripped layout (no
 * border/fill/height/size-derived padding, link color) so it flows inline like
 * a link. Independent of `as`: defaults to `true` when `as="a"` and `false`
 * otherwise, but can be set explicitly to inline a `div` or give an anchor the
 * full button chrome.
 */
export type ButtonInlinedType = boolean

/**
 * Element the button renders as, instead of the native `<button>`:
 * - `"a"`: an HTML anchor — defaults `inlined` to `true`, so it flows inline like
 *   a link (`href`/`target` apply); `inlined={false}` gives it the full button
 *   chrome.
 * - `"div"`: a clickable `<div>`, full button chrome by default, with button
 *   semantics added back — `role="button"`, `tabindex`, and Enter/Space
 *   activation (a bare `<div>` has none of these natively). Pass `inlined` to
 *   strip the chrome and render it link-like.
 */
export type ButtonAsType = "a" | "div"

/**
 * ButtonRefType
 *
 * Ref forwarded to the rendered root element. React 19 passes `ref` as a plain
 * prop to function components, so no forwardRef wrapper is involved. The
 * element depends on `as`:
 * - omitted: `HTMLButtonElement`
 * - `"a"`: `HTMLAnchorElement`
 * - `"div"`: `HTMLDivElement`
 */
export type ButtonRefType = React.Ref<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>

/**
 * URL destination when rendered as an anchor (`as="a"`)
 */
export type ButtonHrefType = string

/**
 * Anchor target attribute when rendered as an anchor (`as="a"`)
 */
export type ButtonTargetType = "_blank" | "_self" | "_parent" | "_top"

/**
 * Click handler type
 */
export type ButtonOnClickType = () => void

/**
 * Mouse enter handler type
 */
export type ButtonOnMouseEnterType = (
  e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
) => void

/**
 * Mouse leave handler type
 */
export type ButtonOnMouseLeaveType = (
  e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
) => void

/**
 * CSS class name type
 */
export type ButtonClassNameType = string

/**
 * Aria label type
 */
export type ButtonAriaLabelType = string

/**
 * ButtonAriaExpandedType
 *
 * React's `aria-expanded` attribute type. Whether the element this button
 * controls (e.g. a popover or menu) is currently expanded.
 */
export type ButtonAriaExpandedType = React.AriaAttributes["aria-expanded"]

/**
 * ButtonAriaHasPopupType
 *
 * React's `aria-haspopup` attribute type. The kind of popup the button opens.
 *
 * Values:
 * - boolean / "true" / "false"
 * - "menu" | "listbox" | "tree" | "grid" | "dialog"
 */
export type ButtonAriaHasPopupType = React.AriaAttributes["aria-haspopup"]

/**
 * ButtonAriaControlsType
 *
 * React's `aria-controls` attribute type. Id(s) of the element(s) the button
 * controls.
 */
export type ButtonAriaControlsType = React.AriaAttributes["aria-controls"]

/**
 * ButtonAriaPressedType
 *
 * React's `aria-pressed` attribute type. Pressed state of a toggle button.
 *
 * Values:
 * - boolean / "true" / "false"
 * - "mixed"
 */
export type ButtonAriaPressedType = React.AriaAttributes["aria-pressed"]

/**
 * ButtonRoleType
 *
 * React's `role` attribute type (`React.AriaRole`), forwarded to the root element.
 * Overrides the `role="button"` that `as="div"` sets; e.g. `role="tab"` for a tab.
 */
export type ButtonRoleType = React.AriaRole

/**
 * ButtonAriaSelectedType
 *
 * React's `aria-selected` attribute type. Selected state of an element in a
 * selectable container, e.g. a `role="tab"` button.
 *
 * Values:
 * - boolean / "true" / "false"
 */
export type ButtonAriaSelectedType = React.AriaAttributes["aria-selected"]

/**
 * ButtonAriaCurrentType
 *
 * React's `aria-current` attribute type. Marks the current item in a set, e.g.
 * the current page in pagination or the current link in a nav.
 *
 * Values:
 * - boolean / "true" / "false"
 * - "page" | "step" | "location" | "date" | "time"
 */
export type ButtonAriaCurrentType = React.AriaAttributes["aria-current"]

/**
 * ButtonFormType
 *
 * The `id` of the `<form>` the native `<button>` belongs to, so a button rendered
 * outside the form (e.g. a dialog footer) can submit it. Only applied to the
 * native button; ignored when `as="a"` or `as="div"`.
 */
export type ButtonFormType = string

/**
 * ButtonTabIndexType
 *
 * The root element's `tabIndex`, e.g. -1 for the inactive tabs of a roving
 * tabindex. Overrides the `tabIndex` 0 that `as="div"` sets; a disabled button
 * keeps -1 (anchor, div) or its native `disabled` (button) instead.
 */
export type ButtonTabIndexType = number

/**
 * ButtonIdType
 *
 * The root element's `id`, e.g. for a tab panel's `aria-labelledby`.
 */
export type ButtonIdType = string

/**
 * Test ID type
 */
export type ButtonTestIdType = string

/**
 * Main props interface for the Button component
 */
export interface ButtonProps {
  onClick?: ButtonOnClickType

  /**
   * Render the button filled (status color as background + border, label/icon in
   * `--np--color--inverse`) instead of the default outline.
   * @default false
   */
  filled?: ButtonFilledType
  size?: SizeType

  /**
   * Internal padding of the content, as a CSS-like shorthand of gap tokens (1–4
   * values, e.g. "none base larger"), applied via @niceprototypes/flex. Overrides the
   * default size-derived horizontal padding; when set, non-zero vertical values
   * grow the button beyond its base height.
   */
  padding?: ButtonPaddingType

  /**
   * Flex grow factor of the root element (`flex-grow` + `flex-basis: 0`, as
   * @niceprototypes/flex `grow`). Applies to every `as`; needs a flex-container
   * parent. Unset emits no flex-grow.
   */
  grow?: ButtonGrowType

  /**
   * Placement of the icon(s) and label along the button (@niceprototypes/flex
   * justifyContent); anything but "center" stretches them across its width.
   * @default "center"
   */
  justifyContent?: ButtonJustifyContentType

  /**
   * Transparent background and border: `true` at rest only, or per interaction state
   * @default false
   */
  ghost?: ButtonGhostType

  /**
   * Persistent selected look: never ghosted (overrides `ghost`), border from the
   * `button.selected.borderColor` token when unfilled. Sets no ARIA attribute.
   * @default false
   */
  selected?: ButtonSelectedType

  /**
   * Duration of the button's transitions; "none" turns them off
   * @default "base"
   */
  animationDuration?: ButtonAnimationDurationType

  /**
   * Color of the label: one color token, or one per interaction state
   * @default the status color
   */
  color?: ButtonColorType

  /**
   * Color of the icons: one color token, or one per interaction state
   * @default the `button.icon.color` token (the button's own text color)
   */
  iconColor?: ButtonIconColorType
  status?: ButtonStatusType
  /** Icon rendered before the label (left side): a built-in name, or a vendor name with `iconVendor` */
  iconLeft?: ButtonIconNameType
  /** Icon rendered after the label (right side): a built-in name, or a vendor name with `iconVendor` */
  iconRight?: ButtonIconNameType
  /** Resolve the icon(s) through the vendor icon set (passed to Icon's `vendor` prop) */
  iconVendor?: ButtonIconVendorType

  /**
   * Render with the inlined, chrome-stripped, link-like layout regardless of
   * element. Defaults to `true` when `as="a"`, `false` otherwise — set it
   * explicitly to inline a `div` or give an anchor the full button chrome.
   */
  inlined?: ButtonInlinedType
  /** Font weight of the label, forwarded to the underlying Ink */
  weight?: ButtonWeightType
  disabled?: ButtonDisabledType
  children?: React.ReactNode
  className?: ButtonClassNameType
  type?: ButtonElementType
  "aria-label"?: ButtonAriaLabelType
  /** Forwarded to the root element */
  "aria-expanded"?: ButtonAriaExpandedType
  /** Forwarded to the root element */
  "aria-haspopup"?: ButtonAriaHasPopupType
  /** Forwarded to the root element */
  "aria-controls"?: ButtonAriaControlsType
  /** Forwarded to the root element */
  "aria-pressed"?: ButtonAriaPressedType
  /** Forwarded to the root element */
  "aria-selected"?: ButtonAriaSelectedType
  /** Forwarded to the root element */
  "aria-current"?: ButtonAriaCurrentType
  /** Id of the form the native `<button>` submits; ignored when `as` is set */
  form?: ButtonFormType
  /** Forwarded to the root element; overrides `as="div"`'s `role="button"` */
  role?: ButtonRoleType
  /** Forwarded to the root element; overrides `as="div"`'s 0, ignored while disabled */
  tabIndex?: ButtonTabIndexType
  /** Forwarded to the root element */
  id?: ButtonIdType
  "data-testid"?: ButtonTestIdType
  antialiased?: ButtonAntialiasedType
  borderWidth?: BorderWidthType

  /**
   * Border radius of the button
   * @default "base"
   */
  borderRadius?: ButtonBorderRadiusType

  /** Override background image (CSS value, gradient, or url reference) */
  backgroundImage?: string

  /** @token Token-bound — accepts BorderColorType variants only. */
  borderColor?: ColorTokenProp<ButtonBorderColorType>

  /** Pin token resolution to a specific theme instead of responding to media query */
  theme?: ThemeType

  /** Called when mouse enters the button */
  onMouseEnter?: ButtonOnMouseEnterType

  /** Called when mouse leaves the button */
  onMouseLeave?: ButtonOnMouseLeaveType

  /** Inline styles applied to the root element */
  style?: React.CSSProperties

  /**
   * Render as a different element instead of `<button>`. `"a"` renders an HTML
   * anchor, inlined by default (no border/fill/height/padding, link color) so it
   * flows inline like a link. `"div"` renders a clickable `<div>` with full
   * button chrome and button semantics (`role="button"`, tabindex, Enter/Space
   * activation). The inlined layout is controlled by `inlined`, which defaults
   * from this but can be set explicitly on either element: `inlined={false}`
   * gives an anchor the full button chrome.
   */
  as?: ButtonAsType

  /**
   * Ref to the rendered root element: `<button>` by default, `<a>` when
   * `as="a"`, `<div>` when `as="div"`.
   */
  ref?: ButtonRefType

  /** URL destination when `as="a"` */
  href?: ButtonHrefType

  /** Anchor target attribute when `as="a"` (adds rel="noopener noreferrer" for _blank) */
  target?: ButtonTargetType
}

const ButtonTypes = {} as const

namespace ButtonTypes {
  export type BorderRadius = ButtonBorderRadiusType
  export type BorderColor = ButtonBorderColorType
  export type Padding = ButtonPaddingType
  export type Grow = ButtonGrowType
  export type JustifyContent = ButtonJustifyContentType
  export type Ghost = ButtonGhostType
  export type Selected = ButtonSelectedType
  export type InteractionState = ButtonInteractionStateType
  export type IconColor = ButtonIconColorType
  export type ColorToken = ButtonColorTokenType
  export type ColorStates = ButtonColorStatesType
  export type Color = ButtonColorType
  export type AnimationDuration = ButtonAnimationDurationType
  export type GhostStates = ButtonGhostStatesType
  export type Status = ButtonStatusType
  export type Filled = ButtonFilledType
  export type Weight = ButtonWeightType
  export type Element = ButtonElementType
  export type Disabled = ButtonDisabledType
  export type Antialiased = ButtonAntialiasedType
  export type IconVendor = ButtonIconVendorType
  export type Inlined = ButtonInlinedType
  export type OnClick = ButtonOnClickType
  export type OnMouseEnter = ButtonOnMouseEnterType
  export type OnMouseLeave = ButtonOnMouseLeaveType
  export type As = ButtonAsType
  export type Ref = ButtonRefType
  export type Href = ButtonHrefType
  export type Target = ButtonTargetType
  export type ClassName = ButtonClassNameType
  export type AriaLabel = ButtonAriaLabelType
  export type AriaExpanded = ButtonAriaExpandedType
  export type AriaHasPopup = ButtonAriaHasPopupType
  export type AriaControls = ButtonAriaControlsType
  export type AriaPressed = ButtonAriaPressedType
  export type AriaSelected = ButtonAriaSelectedType
  export type AriaCurrent = ButtonAriaCurrentType
  export type Form = ButtonFormType
  export type Role = ButtonRoleType
  export type TabIndex = ButtonTabIndexType
  export type Id = ButtonIdType
  export type TestId = ButtonTestIdType
  export type Theme = ThemeType
  export type Props = ButtonProps
}

export default ButtonTypes
