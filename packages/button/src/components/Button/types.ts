import * as React from "react"
import { CellHeightType, BorderWidthType } from "nice-styles"

/**
 * Border radius variants for the button
 */
export type ButtonBorderRadiusType = "small" | "base" | "large"

/**
 * Visual status/variant of the button
 */
export type ButtonStatusType = "primary" | "secondary"

/**
 * Interactive state of the button
 * Affects styling based on context
 */
export type ButtonStateType = "base" | "disabled" | "error" | "success" | "warning"

/**
 * Main props interface for the Button component
 */
export interface ButtonProps {
  /**
   * Click handler
   */
  onClick: () => void

  /**
   * Visual status/variant of the button
   * @default "primary"
   */
  status?: ButtonStatusType

  /**
   * Size of the button
   * @default "base"
   */
  size?: CellHeightType

  /**
   * Interactive state of the button
   * @default "base"
   */
  state?: ButtonStateType

  /**
   * Icon name from nice-react-icon to display
   */
  icon?: string

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Button content/text
   */
  children?: React.ReactNode

  /**
   * Additional CSS class for custom styling
   */
  className?: string

  /**
   * HTML button type
   * @default "button"
   */
  type?: "button" | "submit" | "reset"

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string

  /**
   * Test ID for testing
   */
  "data-testid"?: string

  /**
   * Whether to apply antialiased font rendering to the button text
   * @default undefined
   */
  antialiased?: boolean

  /**
   * Border width of the button
   * @default "base"
   */
  borderWidth?: BorderWidthType

  /**
   * Border radius of the button
   * @default "base"
   */
  borderRadius?: ButtonBorderRadiusType
}
