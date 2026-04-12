import type { FontSizeType, ForegroundColorType, ModeType } from "nice-react-styles"
import { iconNames } from "../../constants"

export type IconNameType = (typeof iconNames)[number]
export type IconSizeType = FontSizeType
export type IconColorType = ForegroundColorType
export type IconStrokeWidthType = "small" | "base" | "large"
export type IconColorPropertyType = "color" | "background-color" | "stroke" | "border-color" | "fill"
export type IconOutlinedType = boolean
export type IconUrlType = string
export type IconViewBoxType = string
export type IconClassNameType = string
export type IconStrokeScalingType = boolean

/**
 * IconVendorType
 *
 * Enables vendor icon resolution for names not found in the custom icon set.
 * Requires nice-react-icon-vendor (or a custom resolver) to be installed and imported.
 */
export type IconVendorType = boolean

/**
 * IconVendorComponentType
 *
 * A React component to render directly inside the Icon wrapper with token styling.
 * Bypasses both the custom icon map and the vendor resolver.
 */
export type IconVendorComponentType = React.ComponentType

export interface IconProps {
  name?: IconNameType | (string & {})
  outlined?: IconOutlinedType
  url?: IconUrlType
  color?: IconColorType
  size?: IconSizeType
  viewBox?: IconViewBoxType
  strokeWidth?: IconStrokeWidthType
  className?: IconClassNameType
  strokeScaling?: IconStrokeScalingType
  /** Force day or night mode */
  mode?: ModeType
  /** Inline styles applied to the root element */
  style?: React.CSSProperties
  /** Enable vendor icon resolution */
  vendor?: IconVendorType
  /** Render a custom vendor component with token styling */
  vendorComponent?: IconVendorComponentType
}

const IconTypes = {} as const

namespace IconTypes {
  export type Name = IconNameType
  export type Size = IconSizeType
  export type Color = IconColorType
  export type StrokeWidth = IconStrokeWidthType
  export type ColorProperty = IconColorPropertyType
  export type Outlined = IconOutlinedType
  export type Url = IconUrlType
  export type ViewBox = IconViewBoxType
  export type ClassName = IconClassNameType
  export type StrokeScaling = IconStrokeScalingType
  export type Vendor = IconVendorType
  export type VendorComponent = IconVendorComponentType
  export type Props = IconProps
}

export default IconTypes