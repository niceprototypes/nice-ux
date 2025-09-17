import * as React from "react"
import { IconComponentProps, ButtonSizeType } from "../types"

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
  /** Custom icon component */
  iconComponent?: React.ComponentType<IconComponentProps>
}

/**
 * ButtonIcon component handles icon rendering within buttons
 * Supports custom icon components or falls back to spacer
 */
const ButtonIcon: React.FC<ButtonIconProps> = ({
  size,
  icon,
  iconRotation = 0,
  iconPosition,
  color,
  isSpacerOnly = false,
  iconComponent: IconComponent,
}) => {
  // If no icon component provided, render nothing
  if (!IconComponent) {
    return null
  }

  // If this is just a spacer, render icon component without name
  if (isSpacerOnly) {
    return (
      <IconComponent
        size={size}
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
    <IconComponent
      name={icon}
      size={size}
      color={color}
      rotation={iconRotation}
      strokeWidth={2}
    />
  )
}

export default ButtonIcon