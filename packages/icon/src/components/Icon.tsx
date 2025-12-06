import * as React from "react"
import { IconProps } from "../types"
import { IconWrapperStyled, ImageStyled, SpinnerWrapper } from "./Icon.styles"
import { getEffectiveIcon } from "../services"

/**
 * A flexible and customizable React icon component with built-in icon set
 *
 * Features:
 * - 30+ built-in icons with fill and stroke variants
 * - Custom React component support via renderImage
 * - Custom SVG URL support
 * - Sizing via nice-styles fontSize tokens
 * - Color via nice-styles foregroundColor tokens
 * - Spinning animation
 * - Rotation support
 * - TypeScript support
 *
 * @example
 * ```tsx
 * import Icon from 'nice-react-icon'
 *
 * // Using size tokens (smaller, small, base, large, larger)
 * <Icon name="arrow" size="large" />
 *
 * // Using color tokens (base, success, error, warning, etc.)
 * <Icon name="check" color="success" />
 *
 * // Custom stroke width (base, large)
 * <Icon name="arrow" strokeWidth="large" />
 *
 * // Custom render function with access to imageSize
 * <Icon
 *   renderImage={(imageSize) => (
 *     <MyCustomComponent style={{ width: imageSize }} />
 *   )}
 *   size="base"
 *   imageSize="50%"
 * />
 * ```
 */
const Icon: React.FC<IconProps> = ({
  name = "placeholder",
  variant = "stroke",
  url,
  renderImage,
  color = "base",
  backgroundColor,
  size = "base",
  borderRadius,
  imageSize = "100%",
  viewBox = "0 0 16 16",
  spinning = false,
  rotation = 0,
  strokeWidth = "base",
  className,
}) => {
  const SvgIcon = getEffectiveIcon({ name, variant })

  return (
    <IconWrapperStyled
      $color={color}
      $backgroundColor={backgroundColor}
      $size={size}
      $borderRadius={borderRadius}
      $imageSize={imageSize}
      $rotation={rotation}
      $variant={variant}
      $strokeWidth={strokeWidth}
      className={className}
    >
      <SpinnerWrapper $spinning={spinning}>
        {renderImage
          ? renderImage(imageSize)
          : url
            ? <ImageStyled src={url} alt="" />
            : SvgIcon && <SvgIcon viewBox={viewBox} />}
      </SpinnerWrapper>
    </IconWrapperStyled>
  )
}

export default Icon