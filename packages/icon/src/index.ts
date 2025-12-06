/**
 * nice-react-icon - A flexible and customizable React icon component
 *
 * @description
 * A comprehensive icon component with 30+ built-in icons, custom SVG support,
 * and animations. Designed to work seamlessly with the nice-react ecosystem.
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
  ColorPropertyType,
} from "./types"

// Style exports for advanced customization
export {
  IconWrapperStyled,
  ImageStyled,
  SpinnerWrapper,
} from "./components/Icon.styles"

// Service exports
export { getIcon } from "./services"