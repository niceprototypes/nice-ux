import * as React from "react"
import { IconProps } from "../types"
import { IconWrapperStyled, ImageStyled } from "./styles"
import { getIcon } from "../services/getIcon"
import { isSpinning } from "../helpers/isSpinning"

/**
 * A flexible and customizable React icon component with built-in icon set
 *
 * Features:
 * - 30+ built-in icons with stroke and outlined variants
 * - Custom SVG URL support
 * - Sizing via nice-styles fontSize tokens
 * - Color via nice-styles foregroundColor tokens
 * - TypeScript support
 *
 * @example
 * ```tsx
 * import Icon from 'nice-react-icon'
 *
 * // Stroke variant (default)
 * <Icon name="arrow" />
 *
 * // Outlined/fill variant
 * <Icon name="arrow" outlined />
 *
 * // Using size tokens (smaller, small, base, large, larger)
 * <Icon name="arrow" size="large" />
 *
 * // Using color tokens (base, success, error, warning, etc.)
 * <Icon name="check" color="success" />
 * ```
 */
const Icon: React.FC<IconProps> = ({
  name = "placeholder",
  outlined = false,
  url,
  color = "base",
  size = "base",
  viewBox = "0 0 16 16",
  strokeWidth = "base",
  className,
  strokeScaling = false,
}) => {
  const SvgIcon = getIcon(name, outlined)
  const spinning = isSpinning(name)

  return (
    <IconWrapperStyled
      $color={color}
      $size={size}
      $outlined={outlined}
      $strokeWidth={strokeWidth}
      $strokeScaling={strokeScaling}
      $spinning={spinning}
      className={className}
    >
      {url
        ? <ImageStyled src={url} alt="" />
        : SvgIcon && <SvgIcon viewBox={viewBox} />}
    </IconWrapperStyled>
  )
}

export default Icon
