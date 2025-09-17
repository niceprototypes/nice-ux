/**
 * nice-react-icon - A flexible and customizable React icon component
 *
 * @description
 * A comprehensive icon component with 30+ built-in icons, custom SVG support,
 * status-based theming, and animations. Designed to work seamlessly with the nice-react ecosystem.
 *
 * @author Nice Prototypes
 * @version 1.0.0
 * @license MIT
 */

// Main component export
export { default } from "./components/Icon"
export { default as Icon } from "./components/Icon"

// Type exports
export type {
  IconProps,
  IconNameType,
  IconSizeType,
  IconBorderRadiusType,
  IconVariant,
  StatusType,
  ColorPropertyType,
  IconTheme,
} from "./types"

// Utility exports
export {
  getUiStatus,
  getCssVariable,
  styleFunctionalColor,
  isValidIconSize,
  isValidStatus,
  STATUS_ACTIVE,
  STATUS_SUCCESS,
  STATUS_ERROR,
  STATUS_WARNING,
  STATUS_DEFAULT,
  STATUS_MUTED,
  STATUS_HIGHLIGHTED,
  STATUS_PRIMARY,
  STATUS_SECONDARY,
} from "./utils"

// Style exports for advanced customization
export {
  IconWrapperStyled,
  IconSvgStyled,
} from "./components/Icon.styles"

// Vector/icon exports
export { getIcon } from "./components/vectors"