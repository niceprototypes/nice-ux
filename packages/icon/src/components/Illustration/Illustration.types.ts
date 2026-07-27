import type * as React from "react"
import type { ThemeType } from "nice-react-styles"
import type {
  IconSizeType,
  IconVariantType,
  IconViewBoxType,
  IconClassNameType,
  IconAnimationType,
  IconAnimationDurationType,
} from "../Icon/Icon.types"
import { illustrationNames } from "../../constants"

/** Every registered illustration name — the exact union from nice-icons' catalog. */
export type IllustrationNameType = (typeof illustrationNames)[number]

/**
 * IllustrationProps
 *
 * A restricted overload of `IconProps`: an illustration carries its own authored,
 * fixed colors, so every recolor/paint prop Icon exposes (`color`, `strokeWidth`,
 * `strokeScaling`, `outlined`) is intentionally omitted — only sizing, layout,
 * theme, and animation remain. Sizing/animation reuse the icon tokens so an
 * illustration scales and spins consistently with an icon.
 */
export interface IllustrationProps {
  /** Illustration name (e.g. "nice-heart"). */
  name?: IllustrationNameType | (string & {})
  /** Variant to render — "base" (default), or any variant the illustration ships. */
  variant?: IconVariantType
  /** Size token variant (default "base"). Sets root width/height. */
  size?: IconSizeType
  /** Override the SVG viewBox. */
  viewBox?: IconViewBoxType
  /** Class applied to the root element. */
  className?: IconClassNameType
  /** Force day or night theme. */
  theme?: ThemeType
  /** Inline styles applied to the root element. */
  style?: React.CSSProperties
  /** Named animation to apply (currently only "spin"). */
  animation?: IconAnimationType
  /** Animation speed — icon duration token variant (default "base"). */
  animationDuration?: IconAnimationDurationType
}

const IllustrationTypes = {} as const

namespace IllustrationTypes {
  export type Name = IllustrationNameType
  export type Props = IllustrationProps
}

export default IllustrationTypes
