import { ButtonTheme, ButtonStatusType, ButtonStateType } from "../types"

/**
 * Generates CSS variable reference string
 * @param property - The CSS variable property name
 * @param value - The value to append to the property
 * @param suffix - Optional suffix to append
 * @returns CSS var() reference string
 */
export const getCssVariable = (property: string, value: number, suffix?: string): string => {
  const baseName = `--${property}-${value}`
  return suffix ? `var(${baseName}${suffix})` : `var(${baseName})`
}

/**
 * Default theme configuration for Button component
 * Can be overridden by consuming applications
 */
export const defaultButtonTheme: ButtonTheme = {
  cssVariables: {
    // Content colors
    contentColor: "var(--content-color-2)",
    contentColorInverse: "var(--content-color-1-inverse)",

    // Background colors
    backgroundColor: "transparent",
    backgroundColorInverse: "var(--background-color-1-inverse)",

    // Border colors and width
    borderColor: "var(--border-color-default)",
    borderWidth: "var(--border-width-1)",
  }
}

/**
 * Merges user theme with default theme
 * @param userTheme - User-provided theme configuration
 * @returns Merged theme configuration
 */
export const mergeTheme = (userTheme?: ButtonTheme): ButtonTheme => {
  if (!userTheme) return defaultButtonTheme

  return {
    colors: {
      ...defaultButtonTheme.colors,
      ...userTheme.colors,
    },
    cssVariables: {
      ...defaultButtonTheme.cssVariables,
      ...userTheme.cssVariables,
    },
  }
}

/**
 * Type guard for checking if a value is a valid button size
 * @param size - Value to check
 * @returns True if valid button size
 */
export const isValidButtonSize = (size: any): size is 1 | 2 | 3 | 4 => {
  return [1, 2, 3, 4].includes(size)
}

/**
 * Type guard for checking if a value is a valid button status
 * @param status - Value to check
 * @returns True if valid button status
 */
export const isValidButtonStatus = (status: any): status is ButtonStatusType => {
  return ["primary", "secondary", "default", "muted", "highlighted"].includes(status)
}

/**
 * Type guard for checking if a value is a valid button state
 * @param state - Value to check
 * @returns True if valid button state
 */
export const isValidButtonState = (state: any): state is ButtonStateType => {
  return ["success", "error", "warning", "active", "default", "disabled"].includes(state)
}

/**
 * Gets the appropriate icon color based on button status and theme
 * @param status - Button status
 * @param theme - Theme configuration
 * @returns Color string for the icon
 */
export const getIconColor = (status?: ButtonStatusType, theme?: ButtonTheme): string | undefined => {
  const mergedTheme = mergeTheme(theme)

  switch (status) {
    case "primary":
      return mergedTheme.cssVariables?.contentColorInverse
    case "secondary":
    default:
      // Use default icon color - let icon component decide
      return undefined
  }
}

/**
 * Determines if an icon should be rendered based on children and icon props
 * @param children - Button children (text content)
 * @param icon - Icon name
 * @param iconPosition - Icon position
 * @param position - Position to check ("left" | "right")
 * @returns True if icon should be rendered in the specified position
 */
export const shouldRenderIcon = (
  children: React.ReactNode,
  icon?: string,
  iconPosition?: "left" | "right",
  position?: "left" | "right"
): boolean => {
  return (!!children && !!icon) || (!!icon && iconPosition === position)
}