import type * as React from "react"
import type { SizeType, ThemeType } from "nice-react-styles"

/**
 * ToggleCheckedType
 *
 * Whether the switch is on (controlled). Pair it with `onChange`.
 */
export type ToggleCheckedType = boolean

/**
 * ToggleDefaultCheckedType
 *
 * Whether the switch starts on (uncontrolled).
 */
export type ToggleDefaultCheckedType = boolean

/**
 * ToggleOnChangeType
 *
 * Change handler: the new on/off value first, then the native change event.
 */
export type ToggleOnChangeType = (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void

/**
 * ToggleDisabledType
 *
 * Whether the switch is disabled.
 */
export type ToggleDisabledType = boolean

/**
 * ToggleSizeType
 *
 * Re-export of SizeType from nice-styles.
 * Track and thumb size, from the `toggle.track.*` and `toggle.thumb.size` component tokens.
 *
 * Values:
 * - "smaller"
 * - "small"
 * - "base": default
 * - "large"
 * - "larger"
 */
export type ToggleSizeType = SizeType

/**
 * ToggleChildrenType
 *
 * Visible label next to the switch. Without it, pass `aria-label`.
 */
export type ToggleChildrenType = React.ReactNode

/**
 * ToggleAriaLabelType
 *
 * Accessible name for a switch with no visible label.
 */
export type ToggleAriaLabelType = string

/**
 * ToggleAriaLabelledByType
 *
 * id(s) of the element(s) that name the switch, instead of `children` or `aria-label`.
 */
export type ToggleAriaLabelledByType = string

/**
 * ToggleIdType
 *
 * id of the native checkbox.
 */
export type ToggleIdType = string

/**
 * ToggleNameType
 *
 * Form field name of the native checkbox.
 */
export type ToggleNameType = string

/**
 * ToggleRefType
 *
 * Ref to the native `<input type="checkbox" role="switch">` (React 19 ref-as-prop — no forwardRef).
 */
export type ToggleRefType = React.Ref<HTMLInputElement>

/**
 * ToggleClassNameType
 *
 * CSS class name applied to the root element.
 */
export type ToggleClassNameType = string

/**
 * ToggleThemeType
 *
 * Re-export of ThemeType from nice-styles.
 * Pin token resolution to a specific theme.
 */
export type ToggleThemeType = ThemeType

/**
 * ToggleProps
 *
 * Complete prop definition for the Toggle component: an on/off switch rendered as a native
 * `<input type="checkbox" role="switch">` inside a `<label>`.
 */
export interface ToggleProps {
  /** On/off value (controlled) */
  checked?: ToggleCheckedType
  /** Initial on/off value (uncontrolled) */
  defaultChecked?: ToggleDefaultCheckedType
  /** Change handler: new value, then the native event */
  onChange?: ToggleOnChangeType
  /** Disabled state */
  disabled?: ToggleDisabledType
  /** Track and thumb size */
  size?: ToggleSizeType
  /** Visible label next to the switch */
  children?: ToggleChildrenType
  /** Accessible name when there is no visible label */
  "aria-label"?: ToggleAriaLabelType
  /** id(s) of the element(s) that name the switch */
  "aria-labelledby"?: ToggleAriaLabelledByType
  /** id of the native checkbox */
  id?: ToggleIdType
  /** Form field name of the native checkbox */
  name?: ToggleNameType
  /** Ref to the native `<input type="checkbox" role="switch">` */
  ref?: ToggleRefType
  /** CSS class name applied to the root element */
  className?: ToggleClassNameType
  /** Pin token resolution to a specific theme */
  theme?: ToggleThemeType
}

// Declaration merging: const + namespace creates exportable type namespace
const ToggleTypes = {} as const

namespace ToggleTypes {
  export type Checked = ToggleCheckedType
  export type DefaultChecked = ToggleDefaultCheckedType
  export type OnChange = ToggleOnChangeType
  export type Disabled = ToggleDisabledType
  export type Size = ToggleSizeType
  export type Children = ToggleChildrenType
  export type AriaLabel = ToggleAriaLabelType
  export type AriaLabelledBy = ToggleAriaLabelledByType
  export type Id = ToggleIdType
  export type Name = ToggleNameType
  export type Ref = ToggleRefType
  export type ClassName = ToggleClassNameType
  export type Theme = ToggleThemeType
  export type Props = ToggleProps
}

export default ToggleTypes
