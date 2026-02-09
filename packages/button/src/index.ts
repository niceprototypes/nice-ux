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

// Token exports
export { ButtonStyles, getButtonToken } from "./tokens"

// Type exports
export type {
  ButtonProps,
  ButtonBorderRadiusType,
  ButtonStatusType,
  ButtonStateType,
} from "./components/Button"
export { default as ButtonTypes } from "./components/Button/types"
