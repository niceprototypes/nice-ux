import type * as React from "react"
import type { ColorTokenProp, FontSizeType, ColorType, ThemeType } from "nice-react-styles"
import { iconNames } from "../../constants"

export type IconNameType = (typeof iconNames)[number]
export type IconSizeType = FontSizeType
export type IconColorType = ColorType
export type IconStrokeWidthType = "small" | "base" | "large"
export type IconColorPropertyType = "color" | "background-color" | "stroke" | "border-color" | "fill"
export type IconOutlinedType = boolean

/**
 * IconVariantType
 *
 * The icon variant to render — a variant stem an icon ships in nice-icons.
 * "base" is the default (outline in currentColor); "fill" is the filled version;
 * icons may add more (e.g. "3d"). Open string so project-specific variants are
 * accepted: an unknown variant is validated at runtime — the resolver renders "base"
 * and warns instead of failing.
 */
export type IconVariantType = "base" | "fill" | (string & {})
export type IconUrlType = string
export type IconViewBoxType = string
export type IconClassNameType = string

/**
 * IconStrokeScalingType
 *
 * Whether the stroke width scales with the icon size. Applies to every SVG shape element
 * (path, circle, rect, line, polyline, polygon, ellipse) inside the icon.
 *
 * Values:
 * - false (default): the stroke keeps the width set by `strokeWidth` at any icon size —
 *   shapes get `vector-effect: non-scaling-stroke`
 * - true: no `vector-effect` is set; the stroke scales with the icon (thicker at larger sizes)
 */
export type IconStrokeScalingType = boolean

/**
 * IconDarkAntialiasingType
 *
 * Whether the stroke thins for dark mode. Light strokes on a dark ground look heavier than dark
 * on light (the irradiation effect), so the stroke width is multiplied by the stroke-width
 * scale (`icon.strokeWidthScale`, which follows the root `strokeWidthScale`: 1 in day, 0.9 in
 * night). Same pattern as theming: the nearest theme gives the default, the prop overrides it.
 *
 * Values:
 * - unset (default): follow the theme — the nearest `<Theme>` / `data-theme` pin, the icon's own
 *   `theme`, else the OS preference: ×1 in day, ×0.9 in night
 * - true: thin in any theme (the night scale)
 * - false: never thin (the plain stroke width)
 */
export type IconDarkAntialiasingType = boolean

/**
 * IconAnimationType
 *
 * Named animation to apply to the icon. Prepared for future animations
 * (e.g. "bounce"); presently the only valid value is "spin".
 */
export type IconAnimationType = "spin"

/**
 * IconAnimationDurationType
 *
 * Icon animation speed. Maps to the `--np--icon--animation-duration--*`
 * tokens, which run one step slower than base element durations
 * (fast 240ms / base 480ms / slow 960ms).
 */
export type IconAnimationDurationType = "fast" | "base" | "slow"

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
  /** Variant to render — "base" (default outline), "fill", or any variant the icon ships */
  variant?: IconVariantType
  /**
   * @deprecated Use `variant` instead. `outlined` maps to `variant="fill"` (true)
   * or `variant="base"` (false); an explicit `variant` always takes precedence.
   */
  outlined?: IconOutlinedType
  url?: IconUrlType
  color?: ColorTokenProp<IconColorType>
  size?: IconSizeType
  viewBox?: IconViewBoxType
  strokeWidth?: IconStrokeWidthType
  className?: IconClassNameType
  /**
   * Scale the stroke width with the icon size; false keeps it fixed (vector-effect: non-scaling-stroke)
   * @default false
   */
  strokeScaling?: IconStrokeScalingType
  /**
   * Thin the stroke for dark mode: unset follows the theme, true forces it, false turns it off
   * @default undefined (follow the theme)
   */
  darkAntialiasing?: IconDarkAntialiasingType
  /** Force day or night theme */
  theme?: ThemeType
  /** Inline styles applied to the root element */
  style?: React.CSSProperties
  /** Enable vendor icon resolution */
  vendor?: IconVendorType
  /** Render a custom vendor component with token styling */
  vendorComponent?: IconVendorComponentType
  /** Named animation to apply (currently only "spin") */
  animation?: IconAnimationType
  /** Animation speed — icon duration token variant (default "base") */
  animationDuration?: IconAnimationDurationType
}

const IconTypes = {} as const

namespace IconTypes {
  export type Name = IconNameType
  export type Size = IconSizeType
  export type Color = IconColorType
  export type StrokeWidth = IconStrokeWidthType
  export type ColorProperty = IconColorPropertyType
  export type Variant = IconVariantType
  export type Outlined = IconOutlinedType
  export type Url = IconUrlType
  export type ViewBox = IconViewBoxType
  export type ClassName = IconClassNameType
  export type StrokeScaling = IconStrokeScalingType
  export type DarkAntialiasing = IconDarkAntialiasingType
  export type Vendor = IconVendorType
  export type VendorComponent = IconVendorComponentType
  export type Animation = IconAnimationType
  export type AnimationDuration = IconAnimationDurationType
  export type Props = IconProps
}

export default IconTypes