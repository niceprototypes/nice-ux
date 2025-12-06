import * as React from "react"
import { IconProps } from "../types"
import { IconWrapperStyled, ImageStyled } from "./Icon.styles"
import { getIcon } from "../services"

/**
 * A flexible and customizable React icon component with built-in icon set
 *
 * Features:
 * - 30+ built-in icons with fill and stroke variants
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
 * // Fill variant
 * <Icon name="arrow" stroke={false} />
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
  stroke = true,
  url,
  color = "base",
  size = "base",
  viewBox = "0 0 16 16",
  strokeWidth = "base",
  className,
}) => {
  const SvgIcon = getIcon(name, stroke)

  return (
    <IconWrapperStyled
      $color={color}
      $size={size}
      $stroke={stroke}
      $strokeWidth={strokeWidth}
      className={className}
    >
      {url
        ? <ImageStyled src={url} alt="" />
        : SvgIcon && <SvgIcon viewBox={viewBox} />}
    </IconWrapperStyled>
  )
}

export default Icon
