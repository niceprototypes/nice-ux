import type { IconNameType } from "nice-react-icon"
import type { ThemeType } from "nice-react-styles"
import type { ButtonIconVendorType } from "../Button/Button.types"

/**
 * ButtonIconNameType
 *
 * Icon name, resolved by nice-react-icon (built-in, or vendor when `vendor`).
 */
export type ButtonIconNameType = IconNameType

/**
 * ButtonIconProps
 *
 * Props for the icon rendered inside a Button (iconLeft / iconRight).
 */
export interface ButtonIconProps {
  /** Icon name */
  name: ButtonIconNameType

  /** Resolve the name through the vendor icon set */
  vendor?: ButtonIconVendorType

  /** Theme pin passed through from the Button */
  theme?: ThemeType
}
