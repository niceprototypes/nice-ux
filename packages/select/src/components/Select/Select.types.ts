import type * as React from "react"
import type {
  InputAsSelectProps,
  InputChildrenType,
  InputDefaultValueType,
  InputValueType,
} from "nice-react-input"
import type { SizeType } from "nice-react-styles"

/**
 * SelectOptionType
 *
 * One entry of the `options` prop, rendered as a native `<option>`.
 * - value: submitted value (`<option value>`)
 * - label: option text. A native `<option>` renders text only — pass a string
 *   or number; elements are not rendered inside a native option.
 * - disabled: the option is shown but cannot be chosen
 */
export type SelectOptionType = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

/**
 * SelectOptionsType
 *
 * Options rendered as native `<option>` elements, in array order. Ignored when
 * `children` is given (children win).
 */
export type SelectOptionsType = ReadonlyArray<SelectOptionType>

/**
 * SelectPlaceholderType
 *
 * Text of a first `<option value="" disabled hidden>`. It is what the select
 * shows while its value is `""` — the initial state when neither `value` nor
 * `defaultValue` is given. Disabled and hidden, so it cannot be picked from the
 * list; a controlled select returns to it by setting `value=""`.
 */
export type SelectPlaceholderType = string

/**
 * SelectChildrenType
 *
 * Re-export of InputChildrenType from nice-react-input. Native `<option>` /
 * `<optgroup>` elements; take precedence over `options` when both are given.
 */
export type SelectChildrenType = InputChildrenType

/**
 * SelectSizeType
 *
 * Re-export of SizeType from nice-styles. Sizes the field chrome (via Input)
 * and the chevron (`select.chevron.size` token).
 *
 * Values:
 * - "smaller", "small", "base", "large", "larger"
 */
export type SelectSizeType = SizeType

/**
 * SelectValueType
 *
 * Re-export of InputValueType from nice-react-input. Controlled value.
 */
export type SelectValueType = InputValueType

/**
 * SelectDefaultValueType
 *
 * Re-export of InputDefaultValueType from nice-react-input. Uncontrolled initial value.
 */
export type SelectDefaultValueType = InputDefaultValueType

/**
 * SelectProps
 *
 * Complete prop definition for the Select component. Every prop of Input's
 * `as="select"` branch passes through to Input unchanged (ref, onChange,
 * status, filled, className, theme, …) except `as` (always "select") and
 * `end` (holds the chevron). `multiple` is not supported.
 */
export interface SelectProps extends Omit<InputAsSelectProps, "as" | "end"> {
  /** Options rendered as native `<option>` elements; ignored when `children` is given */
  options?: SelectOptionsType

  /** Native `<option>` / `<optgroup>` children; win over `options` */
  children?: SelectChildrenType

  /** Text of a first disabled, hidden `<option value="">` shown while the value is empty */
  placeholder?: SelectPlaceholderType

  /**
   * Size variant — field chrome and chevron
   * @default "base"
   */
  size?: SelectSizeType

  /** Controlled value */
  value?: SelectValueType

  /** Uncontrolled initial value; defaults to `""` when `placeholder` is set */
  defaultValue?: SelectDefaultValueType
}

const SelectTypes = {} as const

namespace SelectTypes {
  export type Option = SelectOptionType
  export type Options = SelectOptionsType
  export type Placeholder = SelectPlaceholderType
  export type Children = SelectChildrenType
  export type Size = SelectSizeType
  export type Value = SelectValueType
  export type DefaultValue = SelectDefaultValueType
  export type Props = SelectProps
}

export default SelectTypes
