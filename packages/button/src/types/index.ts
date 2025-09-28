import * as React from "react"
import { ThemeConfig } from "./themes"

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
export type ButtonStateType = "default" | "disabled" | "attention" | "success" | "warning"

/**
 * Theme mode for light/dark appearance
 */
export type ButtonModeType = "light" | "dark"

export * from "./themes"

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
   * Custom border radius for all corners (e.g., "8px", "0.5rem", "50%")
   * If not provided, defaults to pill shape (50% of button height)
   */
  borderRadius?: string

  /**
   * Theme configuration overrides
   * Allows partial overrides of the default theme values
   * @example
   * config={{ light: { primary: { default: { fill: "#666" } } } }}
   */
  config?: ThemeConfig

  /**
   * Whether to apply antialiased font rendering to the button text
   * @default undefined
   */
  antialiased?: boolean

  /**
   * Custom background color that overrides theme styles
   * Works alongside backgroundImage if both are provided
   */
  backgroundColor?: string

  /**
   * Custom background image that overrides theme styles
   * Works alongside backgroundColor if both are provided
   */
  backgroundImage?: string

  /**
   * Custom border color that overrides theme styles
   */
  borderColor?: string

  /**
   * Whether to remove icon slots when no icons are present
   * @default false
   */
  condensed?: boolean

  /**
   * Font weight of the button text (1-4)
   * @default 2
   */
  fontWeight?: 1 | 2 | 3 | 4

  /**
   * Border width of the button (1-4)
   * @default 1
   */
  borderWidth?: 1 | 2 | 3 | 4

  /**
   * Whether the button should have a border
   * @default true
   */
  bordered?: boolean
}
