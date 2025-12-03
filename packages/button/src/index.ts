/**
 * nice-react-button - A flexible and customizable React button component
 *
 * @description
 * A comprehensive button component with nice-styles integration,
 * icon support, and accessibility features.
 * Designed to work seamlessly with the nice-react ecosystem.
 *
 * @author Nice Prototypes
 * @version 4.0.0
 * @license MIT
 */

// Main component export
export { default } from "./components/Button"

// Global styles export
export { default as GlobalButtonStyles } from "./styles/GlobalButtonStyles"

// Type exports
export type {
  ButtonProps,
  ButtonStatusType,
  ButtonStateType,
  ButtonModeType,
} from "./types"

// Service exports
export { default as isValidButtonSize } from "./services/isValidButtonSize"
export { default as isValidButtonStatus } from "./services/isValidButtonStatus"
export { default as isValidButtonState } from "./services/isValidButtonState"

// Style exports for advanced customization
export { ButtonOuter, ButtonInner, ButtonText } from "./components/Button.styles"