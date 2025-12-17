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
 * Main props interface for the Button component
 */
export interface ButtonProps {
  onClick: () => void
  status?: ButtonStatusType
  size?: CellHeightType
  state?: ButtonStateType
  icon?: IconNameType
  disabled?: boolean
  children?: React.ReactNode
  className?: string
  type?: ButtonElementType
  "aria-label"?: string
  "data-testid"?: string
  antialiased?: boolean
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
  export type Props = ButtonProps
}

export default ButtonTypes
