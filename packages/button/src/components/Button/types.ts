import * as React from "react"
import { CellHeightType, BorderWidthType } from "nice-styles"
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
 * Click handler type
 */
export type ButtonOnClickType = () => void

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
  onClick: ButtonOnClickType
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
  export type ClassName = ButtonClassNameType
  export type AriaLabel = ButtonAriaLabelType
  export type TestId = ButtonTestIdType
  export type Props = ButtonProps
}

export default ButtonTypes
