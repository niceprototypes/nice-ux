import type { IconProps } from "nice-react-icon"
import type { ThemeType } from "nice-react-styles"
import type { ButtonIconVendorType } from "../Button/Button.types"

/**
 * ButtonIconNameType
 *
 * Icon name, the same type as nice-react-icon's `name` prop: a built-in icon name
 * (autocompleted), or any other string such as a vendor (Lucide) name, which
 * resolves when the button sets `iconVendor`.
 */
export type ButtonIconNameType = NonNullable<IconProps["name"]>

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
