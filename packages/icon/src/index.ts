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

// Type exports
export type {
  IconProps,
  IconNameType,
  IconSizeType,
  IconColorType,
  IconStrokeWidthType,
  IconColorPropertyType,
  IconOutlinedType,
  IconUrlType,
  IconViewBoxType,
  IconClassNameType,
  IconStrokeScalingType,
} from "./types"
export { default as IconTypes } from "./types"

// Constant exports
export { iconNames } from "./constants"

// Token exports
export { IconTokenMap } from "./tokens/IconTokenMap"
export { getIconToken } from "./tokens/getIconToken"

// Service exports
export { getIcon } from "./services"