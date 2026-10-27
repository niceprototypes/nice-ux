import type * as React from "react"
import type {
  BorderColorType,
  BorderRadiusType,
  BorderWidthType,
  ColorTokenProp,
  SizeType,
  ThemeType,
} from "@niceprototypes/styles"
import type { IconProps, IconVendorType } from "@niceprototypes/icon"

/**
 * CheckboxCheckedType
 *
 * Whether the checkbox is checked (controlled). Pair it with `onChange`.
 */
export type CheckboxCheckedType = boolean

/**
 * CheckboxDefaultCheckedType
 *
 * Whether the checkbox starts checked (uncontrolled).
 */
export type CheckboxDefaultCheckedType = boolean

/**
 * CheckboxOnChangeType
 *
 * Change handler: the new checked value first, then the native change event.
 */
export type CheckboxOnChangeType = (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void

/**
 * CheckboxDisabledType
 *
 * Whether the checkbox is disabled.
 */
export type CheckboxDisabledType = boolean

/**
 * CheckboxSizeType
 *
 * Re-export of SizeType from @niceprototypes/styles.
 * Box and check-icon size, from the `checkbox.size` and `checkbox.icon.size` component tokens.
 *
 * Values:
 * - "smaller"
 * - "small"
 * - "base": default
 * - "large"
 * - "larger"
 */
export type CheckboxSizeType = SizeType

/**
 * CheckboxBackgroundColorType
 *
 * Fill of the box when checked, from the `checkbox.backgroundColor` component tokens, which
 * default to the root text colors (a solid fill, as on a filled Button).
 *
 * Values:
 * - "base": the base text color
 * - "link": default
 * - "success"
 * - "highlight"
 * - "warning"
 * - "error"
 */
export type CheckboxBackgroundColorType = "base" | "link" | "success" | "highlight" | "warning" | "error"

/**
 * CheckboxBorderColorType
 *
 * Re-export of BorderColorType from @niceprototypes/styles.
 * Border of the box when unchecked, from the `checkbox.borderColor` component tokens.
 */
export type CheckboxBorderColorType = BorderColorType

/**
 * CheckboxBorderRadiusType
 *
 * Re-export of BorderRadiusType from @niceprototypes/styles.
 * Corner radius of the box, from the `checkbox.borderRadius` component tokens.
 */
export type CheckboxBorderRadiusType = BorderRadiusType

/**
 * CheckboxBorderWidthType
 *
 * Re-export of BorderWidthType from @niceprototypes/styles.
 * Border width of the box, from the `checkbox.borderWidth` component tokens.
 */
export type CheckboxBorderWidthType = BorderWidthType

/**
 * CheckboxIconNameType
 *
 * Re-export of Icon's `name` prop type from @niceprototypes/icon.
 * Icon drawn in the box when checked: a built-in @niceprototypes/icon name (type-checked), or any
 * string, so vendor (Lucide, PascalCase) names resolve when `iconVendor` is set.
 *
 * Values:
 * - "check": default
 * - any other built-in icon name (IconNameType)
 * - a vendor icon name, with `iconVendor`
 */
export type CheckboxIconNameType = NonNullable<IconProps["name"]>

/**
 * CheckboxIconVendorType
 *
 * Re-export of IconVendorType from @niceprototypes/icon.
 * Whether `iconName` resolves through the vendor icon set (passed to Icon's `vendor` prop).
 * Requires @niceprototypes/icon-vendor (or a custom resolver) to be registered.
 *
 * Values:
 * - false: default, built-in icon set only
 * - true: names not in the built-in set resolve through the vendor resolver
 */
export type CheckboxIconVendorType = IconVendorType

/**
 * CheckboxChildrenType
 *
 * Visible label next to the box; the root becomes a `<label>` around the native checkbox, so
 * clicking the label text toggles it. Without it, pass `aria-label`.
 */
export type CheckboxChildrenType = React.ReactNode

/**
 * CheckboxAriaLabelType
 *
 * Accessible name of the checkbox when it has no visible label (`children`).
 */
export type CheckboxAriaLabelType = string

/**
 * CheckboxAriaLabelledByType
 *
 * id(s) of the element(s) that name the checkbox, instead of `children` or `aria-label`.
 */
export type CheckboxAriaLabelledByType = string

/**
 * CheckboxIdType
 *
 * id of the native checkbox.
 */
export type CheckboxIdType = string

/**
 * CheckboxNameType
 *
 * Form field name of the native checkbox.
 */
export type CheckboxNameType = string

/**
 * CheckboxRefType
 *
 * Ref to the native `<input type="checkbox">` (React 19 ref-as-prop — no forwardRef).
 */
export type CheckboxRefType = React.Ref<HTMLInputElement>

/**
 * CheckboxClassNameType
 *
 * CSS class name applied to the root element.
 */
export type CheckboxClassNameType = string

/**
 * CheckboxThemeType
 *
 * Re-export of ThemeType from @niceprototypes/styles.
 * Pin token resolution to a specific theme.
 */
export type CheckboxThemeType = ThemeType

/**
 * CheckboxProps
 *
 * Complete prop definition for the Checkbox component: a native `<input type="checkbox">`,
 * visually replaced by a token-driven box with a @niceprototypes/icon check. Name it with visible
 * `children`, or with `aria-label` or `aria-labelledby`.
 */
export interface CheckboxProps {
  /** Checked value (controlled) */
  checked?: CheckboxCheckedType
  /** Initial checked value (uncontrolled) */
  defaultChecked?: CheckboxDefaultCheckedType
  /** Change handler: new value, then the native event */
  onChange?: CheckboxOnChangeType
  /** Disabled state */
  disabled?: CheckboxDisabledType
  /** Box and check size */
  size?: CheckboxSizeType
  /** @token Fill when checked. Token-bound — accepts CheckboxBackgroundColorType variants only. */
  backgroundColor?: ColorTokenProp<CheckboxBackgroundColorType>
  /** @token Border when unchecked. Token-bound — accepts BorderColorType variants only. */
  borderColor?: ColorTokenProp<CheckboxBorderColorType>
  /** Corner radius of the box */
  borderRadius?: CheckboxBorderRadiusType
  /** Border width of the box */
  borderWidth?: CheckboxBorderWidthType
  /**
   * Icon drawn in the box when checked
   * @default "check"
   */
  iconName?: CheckboxIconNameType
  /**
   * Resolve `iconName` through the vendor icon set (passed to Icon's `vendor` prop)
   * @default false
   */
  iconVendor?: CheckboxIconVendorType
  /** Visible label next to the box */
  children?: CheckboxChildrenType
  /** Accessible name when there is no visible label */
  "aria-label"?: CheckboxAriaLabelType
  /** id(s) of the element(s) that name the checkbox */
  "aria-labelledby"?: CheckboxAriaLabelledByType
  /** id of the native checkbox */
  id?: CheckboxIdType
  /** Form field name of the native checkbox */
  name?: CheckboxNameType
  /** Ref to the native `<input type="checkbox">` */
  ref?: CheckboxRefType
  /** CSS class name applied to the root element */
  className?: CheckboxClassNameType
  /** Pin token resolution to a specific theme */
  theme?: CheckboxThemeType
}

// Declaration merging: const + namespace creates exportable type namespace
const CheckboxTypes = {} as const

namespace CheckboxTypes {
  export type Checked = CheckboxCheckedType
  export type DefaultChecked = CheckboxDefaultCheckedType
  export type OnChange = CheckboxOnChangeType
  export type Disabled = CheckboxDisabledType
  export type Size = CheckboxSizeType
  export type BackgroundColor = CheckboxBackgroundColorType
  export type BorderColor = CheckboxBorderColorType
  export type BorderRadius = CheckboxBorderRadiusType
  export type BorderWidth = CheckboxBorderWidthType
  export type IconName = CheckboxIconNameType
  export type IconVendor = CheckboxIconVendorType
  export type Children = CheckboxChildrenType
  export type AriaLabel = CheckboxAriaLabelType
  export type AriaLabelledBy = CheckboxAriaLabelledByType
  export type Id = CheckboxIdType
  export type Name = CheckboxNameType
  export type Ref = CheckboxRefType
  export type ClassName = CheckboxClassNameType
  export type Theme = CheckboxThemeType
  export type Props = CheckboxProps
}

export default CheckboxTypes
