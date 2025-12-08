import * as React from "react"
import type { CellHeightType, BorderWidthType } from "nice-styles"

/**
 * Interactive state of the button
 * Affects styling and behavior
 */
export type ButtonStateType = "default" | "disabled" | "attention" | "success" | "warning"

/**
 * Main props interface for the Button component
 */
export interface ButtonProps {
  /**
   * Size of the button
   * @default "base"
   */
  size?: CellHeightType

  /**
   * Interactive state of the button
   * @default "default"
   */
  state?: ButtonStateType

  /**
   * Icon name from nice-react-icon to display
   */
  icon?: string

  /**
   * Click handler
   */
  onClick?: () => void

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
}