import type { CellHeightType } from "nice-styles"

/**
 * Props for the ButtonIcon component
 */
export interface ButtonIconProps {
  /** Size of the icon (matches button size) */
  size: CellHeightType
  /** Icon name/identifier */
  icon?: string
  /** Icon color */
  color?: string
}