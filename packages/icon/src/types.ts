import { IconTokenMap } from "./tokens/IconTokenMap"
import { iconNames } from "./constants"

export type IconNameType = (typeof iconNames)[number]
export type IconSizeType = keyof typeof IconTokenMap.size.items
export type IconColorType = keyof typeof IconTokenMap.color.items
export type IconStrokeWidthType = keyof typeof IconTokenMap.strokeWidth.items
export type IconColorPropertyType = "color" | "background-color" | "stroke" | "border-color" | "fill"
export type IconOutlinedType = boolean
export type IconUrlType = string
export type IconViewBoxType = string
export type IconClassNameType = string
export type IconStrokeScalingType = boolean

export interface IconProps {
  name: IconNameType
  outlined?: IconOutlinedType
  url?: IconUrlType
  color?: IconColorType
  size?: IconSizeType
  viewBox?: IconViewBoxType
  strokeWidth?: IconStrokeWidthType
  className?: IconClassNameType
  strokeScaling?: IconStrokeScalingType
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
  export type Props = IconProps
}

export default IconTypes