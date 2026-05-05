import * as React from "react"
import { CellHeightType, BorderWidthType, ModeType } from "nice-react-styles"
import { IconNameType } from "nice-react-icon"

/**
 * Border radius variants for the button
 */
export type ButtonBorderRadiusType = "small" | "base" | "large"

/**
 * Interactive state of the button
 * Affects styling based on context
 */
export type ButtonStateType = "base" | "disabled" | "error" | "success" | "warning"

/**
 * Visual status/variant of the button
 */
export type ButtonStatusType = "primary" | "secondary"

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
 * Whether the button renders as an anchor element
 */
export type ButtonLinkType = boolean

/**
 * URL destination when rendered as a link
 */
export type ButtonHrefType = string

/**
 * Anchor target attribute
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
  status?: ButtonStatusType
  size?: CellHeightType
  state?: ButtonStateType
  icon?: IconNameType
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

  /** Override border color (CSS value or var reference) */
  borderColor?: string

  /** Pin token resolution to a specific mode instead of responding to media query */
  mode?: ModeType

  /** Called when mouse enters the button */
  onMouseEnter?: ButtonOnMouseEnterType

  /** Called when mouse leaves the button */
  onMouseLeave?: ButtonOnMouseLeaveType

  /** Inline styles applied to the root element */
  style?: React.CSSProperties

  /** Render as an anchor element instead of a button */
  link?: ButtonLinkType

  /** URL destination when link is true */
  href?: ButtonHrefType

  /** Anchor target attribute when link is true */
  target?: ButtonTargetType
}

const ButtonTypes = {} as const

namespace ButtonTypes {
  export type BorderRadius = ButtonBorderRadiusType
  export type State = ButtonStateType
  export type Status = ButtonStatusType
  export type Element = ButtonElementType
  export type Disabled = ButtonDisabledType
  export type Antialiased = ButtonAntialiasedType
  export type OnClick = ButtonOnClickType
  export type OnMouseEnter = ButtonOnMouseEnterType
  export type OnMouseLeave = ButtonOnMouseLeaveType
  export type Link = ButtonLinkType
  export type Href = ButtonHrefType
  export type Target = ButtonTargetType
  export type ClassName = ButtonClassNameType
  export type AriaLabel = ButtonAriaLabelType
  export type TestId = ButtonTestIdType
  export type Mode = ModeType
  export type Props = ButtonProps
}

export default ButtonTypes
