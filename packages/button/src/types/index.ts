import * as React from "react"
import type { CellHeightType, FontWeightType, BorderWidthType } from "nice-styles"

/**
 * Visual status/styling variants for the button
 * - primary: Primary action button (usually filled)
 * - secondary: Secondary action button (usually outlined)
 * - default: Default button styling
 * - muted: Subdued button styling
 * - highlighted: Emphasized button styling
 */
export type ButtonStatusType = "primary" | "secondary" | "default" | "muted" | "highlighted"

/**
 * Interactive state of the button
 * Affects styling and behavior
 */
export type ButtonStateType = "default" | "disabled" | "attention" | "success" | "warning"

/**
 * Theme mode for light/dark appearance
 */
export type ButtonModeType = "light" | "dark"

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
   * Theme mode for light/dark appearance
   * @default "light"
   */
  mode?: ButtonModeType

  /**
   * Icon name from nice-react-icon to display
   */
  icon?: string

  /**
   * Rotation of the icon in degrees
   * @default 0
   */
  iconRotation?: number

  /**
   * Position of the icon relative to text
   * @default "right"
   */
  iconPosition?: "left" | "right"

  /**
   * Visual status/variant of the button
   * @default "primary"
   */
  status?: ButtonStatusType

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
   * Whether the button should take full width of container
   * @default false
   */
  fullWidth?: boolean

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
   * Custom border radius override
   */
  borderRadius?: string

  /**
   * Whether to apply antialiased font rendering to the button text
   * @default undefined
   */
  antialiased?: boolean

  /**
   * Custom background color that overrides default styles
   */
  backgroundColor?: string

  /**
   * Custom background image
   */
  backgroundImage?: string

  /**
   * Custom border color that overrides default styles
   */
  borderColor?: string

  /**
   * Whether to remove icon slots when no icons are present
   * @default false
   */
  condensed?: boolean

  /**
   * Font weight of the button text
   * @default "medium"
   */
  fontWeight?: FontWeightType

  /**
   * Border width of the button
   * @default "base"
   */
  borderWidth?: BorderWidthType

  /**
   * Whether the button should have a border
   * @default true
   */
  bordered?: boolean
}