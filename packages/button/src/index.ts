/**
 * nice-react-button - A flexible and customizable React button component
 *
 * @description
 * A comprehensive button component with built-in theming support, icon integration,
 * and accessibility features. Designed to work seamlessly with the nice-react ecosystem.
 *
 * @author Nice Prototypes
 * @version 1.1.0
 * @license MIT
 */

// Main component export
export { default } from "./components/Button"

// Type exports
export type {
  ButtonProps,
  ButtonSizeType,
  ButtonStatusType,
  ButtonStateType,
  ButtonTheme,
} from "./types"

// Utility exports
export {
  getCssVariable,
  defaultButtonTheme,
  mergeTheme,
  isValidButtonSize,
  isValidButtonStatus,
  isValidButtonState,
  getIconColor,
} from "./utils"

// Style exports for advanced customization
export {
  ButtonOuter,
  ButtonInner,
  ButtonText,
} from "./components/Button.styles"

// Helper function exports
export { default as getStateStyles } from "./services/getStateStyles"
export { default as getStatusStyles } from "./services/getStatusStyles"
export { default as getBorderRadius } from "./services/getBorderRadius"