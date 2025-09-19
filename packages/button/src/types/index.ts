import * as React from "react"

/**
 * Defines the size of the button component
 * Maps to predefined CSS variable heights
 */
export type ButtonSizeType = 1 | 2 | 3 | 4

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
export type ButtonStateType = "success" | "error" | "warning" | "active" | "default" | "disabled"

/**
 * Theme configuration for customizing button appearance
 */
export interface ButtonTheme {
  /** CSS variable overrides for colors */
  colors?: {
    primary?: string
    secondary?: string
    success?: string
    error?: string
    warning?: string
  }
  /** CSS variable names for theming */
  cssVariables?: {
    contentColor?: string
    contentColorInverse?: string
    backgroundColor?: string
    backgroundColorInverse?: string
    borderColor?: string
    borderWidth?: string
  }
}


/**
 * Main props interface for the Button component
 */
export interface ButtonProps {
  /**
   * Size of the button (1-4, smallest to largest)
   * @default 3
   */
  size?: ButtonSizeType

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
   * Theme configuration for customizing appearance
   */
  theme?: ButtonTheme

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
   * Custom border radius in pixels for all corners
   * If not provided, defaults to pill shape (50% of button height)
   */
  borderRadius?: number
}