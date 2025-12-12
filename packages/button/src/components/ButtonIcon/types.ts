import type { IconNameType, IconSizeType } from "nice-react-icon"

/**
 * Props for the ButtonIcon component
 */
export interface ButtonIconProps {
  /** Size of the icon (matches button size) */
  size: IconSizeType
  /** Icon name/identifier */
  icon: IconNameType
  /** Icon color */
  color?: string
}