import * as React from "react"
import Icon, { IconNameType, IconSizeType } from "nice-react-icon"
import { ButtonSizeType } from "../types"

/**
 * Props for the ButtonIcon component
 */
interface ButtonIconProps {
  /** Size of the icon (matches button size) */
  size: ButtonSizeType
  /** Icon name/identifier */
  icon?: string
  /** Icon rotation in degrees */
  iconRotation?: number
  /** Icon color */
  color?: string
  /** Whether this is just a spacer (no actual icon) */
  isSpacerOnly?: boolean
}

/**
 * ButtonIcon component handles icon rendering within buttons
 * Uses nice-react-icon for consistent icon rendering
 */
const ButtonIcon: React.FC<ButtonIconProps> = ({ size, icon, iconRotation = 0, color }) => {
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
      rotation={iconRotation}
      strokeWidth={2}
    />
  )
}

export default ButtonIcon
