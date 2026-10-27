import type { BorderColorType, ThemeType } from "nice-react-styles"

/**
 * LineColorType
 *
 * Re-export of BorderColorType from nice-styles.
 * Dash color, from the `line.borderColor` component tokens (which default to the root
 * border colors).
 */
export type LineColorType = BorderColorType

/**
 * LineCornerType
 *
 * One corner's radius in px: a number for a circular corner, or `[horizontal, vertical]` for
 * an elliptical one.
 */
export type LineCornerType = number | [horizontal: number, vertical: number]

/**
 * LineRadiusType
 *
 * Corner radii of the frame.
 *
 * Values:
 * - "element": the parent element's own border radii, every corner (default)
 * - Element: that element's own border radii (when Line is laid over an element it isn't
 *   inside, such as an overlay box)
 * - number: one radius in px for all four corners
 * - [topLeft, topRight, bottomRight, bottomLeft]: one LineCornerType per corner
 */
export type LineRadiusType = "element" | Element | number | [LineCornerType, LineCornerType, LineCornerType, LineCornerType]

/**
 * LineClassNameType
 *
 * CSS class name applied to the root element.
 */
export type LineClassNameType = string

/**
 * LineThemeType
 *
 * Re-export of ThemeType from nice-styles.
 * Pin token resolution to a specific theme.
 */
export type LineThemeType = ThemeType

/**
 * LineProps
 *
 * Complete prop definition for the Line component. Line frames its nearest positioned
 * ancestor and is not a divider: its parent must be positioned (relative, absolute, fixed or
 * sticky), or Line frames a far ancestor, up to the whole viewport.
 */
export interface LineProps {
  /** Dash color variant */
  color?: LineColorType
  /** Corner radii; defaults to the parent element's own */
  radius?: LineRadiusType
  /** CSS class name applied to the root element */
  className?: LineClassNameType
  /** Pin token resolution to a specific theme */
  theme?: LineThemeType
}

// Declaration merging: const + namespace creates exportable type namespace
const LineTypes = {} as const

namespace LineTypes {
  export type Color = LineColorType
  export type Corner = LineCornerType
  export type Radius = LineRadiusType
  export type ClassName = LineClassNameType
  export type Theme = LineThemeType
  export type Props = LineProps
}

export default LineTypes
