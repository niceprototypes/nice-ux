/**
 * nice-react-button - A flexible and customizable React button component
 *
 * @description
 * A comprehensive button component with built-in theming support, icon integration,
 * and accessibility features. Designed to work seamlessly with the nice-react ecosystem.
 *
 * @author Nice Prototypes
 * @version 1.0.0
 * @license MIT
 */

// Main component export
export { default } from "./components/Button"
export { default as Button } from "./components/Button"

// Component exports
export { default as ButtonIcon } from "./components/ButtonIcon"

// Type exports
export type {
  ButtonProps,
  ButtonSizeType,
  ButtonStatusType,
  ButtonStateType,
  ButtonTheme,
  IconComponentProps,
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
  shouldRenderIcon,
} from "./utils"

// Style exports for advanced customization
export {
  ButtonOuter,
  ButtonInner,
  ButtonText,
  getStateStyles,
  getStatusStyles,
} from "./components/Button.styles"