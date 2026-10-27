import type { ThemeType } from "@niceprototypes/styles"

/**
 * LogoHeightType
 *
 * Height of the logo in pixels. Unset, the logo takes the responsive `logo.height` token, also
 * a unitless pixel count (overridable with setTokens, e.g. `{ logo: { height: { base: 26 } } }`). The heart is that tall and the name `nameHeightScale` of it;
 * the widths follow from their SVGs.
 */
export type LogoHeightType = number

/**
 * LogoGapType
 *
 * Space between the heart and the name in pixels (a unitless number). Defaults to 4.
 */
export type LogoGapType = number

/**
 * LogoNameHeightScaleType
 *
 * The name's height as a fraction of the logo's height (0.6 = 60%); its width follows from
 * its SVG. The heart always takes the full height.
 */
export type LogoNameHeightScaleType = number

/**
 * LogoShowNameType
 *
 * Whether the logo name shows beside the heart. The heart always shows.
 */
export type LogoShowNameType = boolean

/**
 * LogoAriaLabelType
 *
 * Accessible name of the logo, which renders as one image.
 */
export type LogoAriaLabelType = string

/**
 * LogoThemeType
 *
 * Re-export of ThemeType from @niceprototypes/styles.
 * Pin token resolution to a specific theme: the name takes that theme's base text color.
 * The heart keeps its own colors in every theme.
 */
export type LogoThemeType = ThemeType

/**
 * LogoProps
 *
 * Complete prop definition for the Logo component: the crystal heart illustration and the
 * logo name, side by side.
 */
export interface LogoProps {
  /** Height of the logo in pixels (unset: the logo.height token); the width follows */
  height?: LogoHeightType
  /** Show the logo name beside the heart */
  showName?: LogoShowNameType
  /**
   * The name's height as a fraction of the logo's height
   * @default 0.6
   */
  nameHeightScale?: LogoNameHeightScaleType
  /**
   * Space between the heart and the name, in pixels
   * @default 4
   */
  gap?: LogoGapType
  /** Accessible name of the logo */
  "aria-label"?: LogoAriaLabelType
  /** Pin token resolution to a specific theme */
  theme?: LogoThemeType
}

// Declaration merging: const + namespace creates exportable type namespace
const LogoTypes = {} as const

namespace LogoTypes {
  export type Height = LogoHeightType
  export type ShowName = LogoShowNameType
  export type NameHeightScale = LogoNameHeightScaleType
  export type Gap = LogoGapType
  export type AriaLabel = LogoAriaLabelType
  export type Theme = LogoThemeType
  export type Props = LogoProps
}

export default LogoTypes
