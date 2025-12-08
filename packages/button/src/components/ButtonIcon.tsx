import * as React from "react"
import Icon, { IconNameType, IconSizeType } from "nice-react-icon"
import type { CellHeightType } from "nice-styles"

/**
 * Props for the ButtonIcon component
 */
interface ButtonIconProps {
  /** Size of the icon (matches button size) */
  size: CellHeightType
  /** Icon name/identifier */
  icon?: string
  /** Icon color */
  color?: string
}

/**
 * ButtonIcon component handles icon rendering within buttons
 * Uses nice-react-icon for consistent icon rendering
 */
const ButtonIcon: React.FC<ButtonIconProps> = ({ size, icon, color }) => {
  // If this is just a spacer, render icon without name
  if (!icon) {
    return <Icon size={size as IconSizeType} color={color} />
  }

  // Render the actual icon
  return (
    <Icon
      name={icon as IconNameType}
      size={size as IconSizeType}
      color={color}
      strokeWidth={2}
    />
  )
}

export default ButtonIcon
