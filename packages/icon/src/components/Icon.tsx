import * as React from "react"
import { getIcon } from "./vectors"
import { IconProps } from "../types"
import { IconWrapperStyled, IconSvgStyled } from "./Icon.styles"
import { getUiStatus } from "../utils"

/**
 * A flexible and customizable React icon component with built-in icon set
 *
 * Features:
 * - 30+ built-in icons with fill and stroke variants
 * - Custom SVG URL support
 * - Multiple sizes (1-4)
 * - Status-based theming
 * - Spinning animation
 * - Rotation support
 * - TypeScript support
 *
 * @example
 * ```tsx
 * import Icon from 'nice-react-icon'
 *
 * <Icon
 *   name="arrow"
 *   size={3}
 *   variant="stroke"
 *   color="blue"
 *   rotation={90}
 * />
 * ```
 */
const Icon: React.FC<IconProps> = ({
  name,
  variant = "stroke",
  url,
  color,
  backgroundColor,
  size = 3,
  borderRadius,
  imageSize = "30%",
  status,
  spinning = false,
  rotation = 0,
  strokeWidth = 1,
  isActive = true,
  className,
}) => {
  // Determine color based on status or use provided color or default
  const getIconColor = () => {
    if (color) return color // Use explicitly provided color
    if (status) {
      // Use status-specific icon stroke colors for primary status
      if (status === "primary") return "var(--icon-stroke-color-primary)"
      // For other statuses, use the content color pattern
      return `var(--content-color-${status})`
    }
    // Use primary icon color when active, default when inactive
    return `var(--icon-stroke-color-${isActive ? "primary" : "default"})`
  }

  const statusColor = getIconColor()
  // Auto-spin when status is active or spinning prop is true
  const shouldSpin = spinning || (status ? getUiStatus(status).isActive : false)

  // If URL is provided, use custom SVG
  if (url) {
    return (
      <IconWrapperStyled
        $color={statusColor}
        $backgroundColor={backgroundColor}
        $size={size}
        $borderRadius={borderRadius}
        $imageSize={imageSize}
        $rotation={rotation}
        $variant={variant}
        $strokeWidth={strokeWidth}
        className={className}
      >
        <IconSvgStyled src={url} alt="" />
      </IconWrapperStyled>
    )
  }

  // Show spinner when status is active, otherwise use provided name
  const iconName = status && getUiStatus(status).isActive ? "spinner" : name

  // Otherwise, use built-in icon set
  const Path = iconName ? getIcon(iconName, variant) : null

  return (
    <IconWrapperStyled
      $color={statusColor}
      $backgroundColor={backgroundColor}
      $size={size}
      $borderRadius={borderRadius}
      $imageSize={imageSize}
      $spinning={shouldSpin}
      $rotation={rotation}
      $variant={variant}
      $strokeWidth={strokeWidth}
      className={className}
    >
      {Path && (
        <svg viewBox="0 0 16 16">
          <g>
            <Path />
          </g>
        </svg>
      )}
    </IconWrapperStyled>
  )
}

export default Icon
