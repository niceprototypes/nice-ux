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
  /** Icon position relative to text */
  iconPosition: "left" | "right"
  /** Icon color */
  color?: string
  /** Whether this is just a spacer (no actual icon) */
  isSpacerOnly?: boolean
}

/**
 * ButtonIcon component handles icon rendering within buttons
 * Uses nice-react-icon for consistent icon rendering
 */
const ButtonIcon: React.FC<ButtonIconProps> = ({
  size,
  icon,
  iconRotation = 0,
  iconPosition,
  color,
  isSpacerOnly = false,
}) => {
  // If this is just a spacer, render icon without name
  if (isSpacerOnly) {
    return (
      <Icon
        size={size as IconSizeType}
        color={color}
      />
    )
  }

  // If no icon name provided, render nothing
  if (!icon) {
    return null
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