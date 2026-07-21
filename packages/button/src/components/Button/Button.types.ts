import * as React from "react"
import { CellHeightType, BorderWidthType, BorderColorType, FontWeightType, ThemeType } from "nice-react-styles"
import { IconNameType } from "nice-react-icon"
import type { FlexSpacingType } from "nice-react-flex"

/**
 * Border radius variants for the button
 */
export type ButtonBorderRadiusType = "none" | "small" | "base" | "large" | "rounded"

/**
 * ButtonBorderColorType
 *
 * @token Re-export of BorderColorType from nice-styles. Token-bound —
 * raw CSS color strings are not accepted.
 */
export type ButtonBorderColorType = BorderColorType

/**
 * ButtonPaddingType
 *
 * Internal padding of the button content, as a CSS-like shorthand of gap tokens
 * (1–4 values following CSS padding order, e.g. "none base larger") — the
 * nice-react-flex padding standard. Overrides the default size-derived
 * horizontal padding.
 */
export type ButtonPaddingType = FlexSpacingType

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
 * Re-export of FontWeightType from nice-styles.
 * Font weight of the button label, forwarded to the underlying Ink.
 */
export type ButtonWeightType = FontWeightType

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
 * - `"a"`: an HTML anchor — forces the inlined, chrome-stripped layout so it
 *   flows inline like a link (`href`/`target` apply).
 * - `"div"`: a clickable `<div>`, full button chrome by default, with button
 *   semantics added back — `role="button"`, `tabindex`, and Enter/Space
 *   activation (a bare `<div>` has none of these natively). Pass `inlined` to
 *   strip the chrome and render it link-like.
 */
export type ButtonAsType = "a" | "div"

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
  e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
) => void

/**
 * Mouse leave handler type
 */
export type ButtonOnMouseLeaveType = (
  e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
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
  size?: CellHeightType

  /**
   * Internal padding of the content, as a CSS-like shorthand of gap tokens (1–4
   * values, e.g. "none base larger"), applied via nice-react-flex. Overrides the
   * default size-derived horizontal padding; when set, non-zero vertical values
   * grow the button beyond its base height.
   */
  padding?: ButtonPaddingType
  status?: ButtonStatusType
  /** Icon rendered before the label (left side) */
  iconLeft?: IconNameType
  /** Icon rendered after the label (right side) */
  iconRight?: IconNameType
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
  borderColor?: ButtonBorderColorType

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
   * from this but can be set explicitly on either element.
   */
  as?: ButtonAsType

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
  export type Href = ButtonHrefType
  export type Target = ButtonTargetType
  export type ClassName = ButtonClassNameType
  export type AriaLabel = ButtonAriaLabelType
  export type TestId = ButtonTestIdType
  export type Theme = ThemeType
  export type Props = ButtonProps
}

export default ButtonTypes
