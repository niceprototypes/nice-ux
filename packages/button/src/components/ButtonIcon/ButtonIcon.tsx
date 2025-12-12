import * as React from "react"
import Icon from "nice-react-icon"
import { ButtonIconProps } from "./types"

/**
 * ButtonIcon component handles icon rendering within buttons
 * Uses nice-react-icon for consistent icon rendering
 */
const ButtonIcon: React.FC<ButtonIconProps> = ({ size, icon, color }) => {
  return <Icon name={icon} size={size} color={color} />
}

export default ButtonIcon
