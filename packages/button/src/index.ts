/**
 * nice-react-button - A flexible and customizable React button component
 *
 * @description
 * A comprehensive button component with built-in theming support, icon integration,
 * and accessibility features. Designed to work seamlessly with the nice-react ecosystem.
 *
 * @author Nice Prototypes
 * @version 2.0.0
 * @license MIT
 */

// Main component export
export { default } from "./components/Button"

// Global styles export
export { default as GlobalButtonStyles } from "./styles/GlobalButtonStyles"

// Type exports
export type {
  ButtonProps,
  ButtonSizeType,
  ButtonStatusType,
  ButtonStateType,
  ButtonModeType,
  ButtonThemes,
  ThemeDesignValues,
  ThemeConfig,
  StateTheme,
  StatusTheme,
  ModeTheme,
} from "./types"

// Service exports
export { default as getCssVariable } from "./services/getCssVariable"
export { default as isValidButtonSize } from "./services/isValidButtonSize"
export { default as isValidButtonStatus } from "./services/isValidButtonStatus"
export { default as isValidButtonState } from "./services/isValidButtonState"

// Style exports for advanced customization
export { ButtonOuter, ButtonInner, ButtonText } from "./components/Button.styles"

// Helper function exports
export { default as getBorderRadius } from "./services/getBorderRadius"
export { default as getThemeStyles } from "./services/getThemeStyles"
export { default as mergeThemeConfig } from "./services/mergeThemeConfig"

// Constants exports
export { defaultThemes } from "./constants/defaultThemes"
