import * as React from "react"
import Icon from "nice-react-icon"
import type { ButtonIconProps } from "./ButtonIcon.types"

/**
 * ButtonIcon
 *
 * The icon inside a Button. Both "base" props resolve through --np--icon--size /
 * --np--icon--color, which StyledButton reassigns to the button-scoped
 * --np--button--icon--size / --np--button--icon--color. So by default the icon
 * tracks the button's size and color, and either token can be overridden to
 * resize/recolor button icons without touching the global icon tokens.
 */
const ButtonIcon: React.FC<ButtonIconProps> = ({ name, vendor = false, theme }) => (
  <Icon name={name} vendor={vendor} size="base" color="base" theme={theme} />
)

export default ButtonIcon
