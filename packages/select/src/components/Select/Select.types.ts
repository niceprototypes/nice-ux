import type * as React from "react"
import type {
  InputAsInputProps,
  InputAsSelectProps,
  InputChildrenType,
  InputDefaultValueType,
  InputValueType,
} from "nice-react-input"
import type { SizeType } from "nice-react-styles"

/**
 * SelectNativeType
 *
 * Set true to render the platform `<select>` (Input `as="select"`). Default
 * false renders the custom WAI-ARIA select-only combobox: a read-only Input
 * with `role="combobox"` that opens a Popover holding a `role="listbox"` List.
 */
export type SelectNativeType = boolean

/**
 * SelectOptionStartType
 *
 * Content before the option label in the custom listbox (icon, avatar).
 * Custom mode only — a native `<option>` renders text only.
 */
export type SelectOptionStartType = React.ReactNode

/**
 * SelectOptionEndType
 *
 * Content after the option label in the custom listbox (shortcut, badge).
 * Custom mode only — a native `<option>` renders text only.
 */
export type SelectOptionEndType = React.ReactNode

/**
 * SelectOptionType
 *
 * One entry of the `options` prop: a native `<option>` (native mode) or a
 * `role="option"` ListItem (custom mode).
 * - value: submitted value
 * - label: option text. A native `<option>` renders text only — pass a string
 *   or number. In custom mode an element label renders in the list, but the
 *   trigger text and typeahead use the label only when it is a string or
 *   number (otherwise the value)
 * - disabled: the option is shown but cannot be chosen
 * - start / end: custom-mode slots before / after the label; ignored natively
 */
export type SelectOptionType = {
  value: string
  label: React.ReactNode
  disabled?: boolean
  start?: SelectOptionStartType
  end?: SelectOptionEndType
}

/**
 * SelectOptionsType
 *
 * Options in array order: native `<option>` elements, or listbox options in
 * custom mode. Ignored when `children` is given (children win).
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
 * Re-export of InputChildrenType from nice-react-input. `<option>` /
 * `<optgroup>` elements; take precedence over `options` when both are given.
 * Native mode renders them as-is. Custom mode maps each
 * `<option value disabled>label</option>` to a listbox option (value falls
 * back to the text when `value` is absent); `<optgroup>` is flattened (its
 * options are kept, the grouping is not rendered) and other children are
 * ignored. Prefer `options` in custom mode — it also carries `start` / `end`.
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
 * SelectOnChangeEventType
 *
 * Event passed as `onChange`'s second argument.
 * - native mode: the `<select>` change event
 * - custom mode: the keyboard event on the combobox (Enter, Space, Tab,
 *   Alt+ArrowUp) or the click on the option that made the selection
 */
export type SelectOnChangeEventType =
  | React.ChangeEvent<HTMLSelectElement>
  | React.KeyboardEvent<HTMLInputElement>
  | React.MouseEvent<HTMLLIElement>

/**
 * SelectOnChangeType
 *
 * Change handler: the new value, then the event that caused it. Native mode
 * always passes the `<select>` change event; custom mode passes the keyboard
 * or click event and is called only when the value actually changes.
 */
export type SelectOnChangeType = (
  value: string,
  event?: SelectOnChangeEventType
) => void

/**
 * SelectOwnProps
 *
 * Props Select owns in both modes.
 */
export interface SelectOwnProps {
  /** Options, in order; ignored when `children` is given */
  options?: SelectOptionsType

  /** `<option>` / `<optgroup>` children; win over `options` */
  children?: SelectChildrenType

  /**
   * Shown while the value is empty. Native: text of a first disabled, hidden
   * `<option value="">`. Custom: the combobox's placeholder text
   */
  placeholder?: SelectPlaceholderType

  /**
   * Size variant — field chrome and chevron
   * @default "base"
   */
  size?: SelectSizeType

  /** Controlled value */
  value?: SelectValueType

  /**
   * Uncontrolled initial value. Defaults to `""` when `placeholder` is set,
   * otherwise to the first enabled option (both modes)
   */
  defaultValue?: SelectDefaultValueType

  /** Called with the new value and the event that caused it */
  onChange?: SelectOnChangeType
}

/**
 * SelectNativeProps
 *
 * `native` Select: the platform `<select>`. Every prop of Input's
 * `as="select"` branch passes through to Input unchanged (ref, status,
 * filled, className, theme, …) except `as` (always "select") and `end`
 * (holds the chevron). `multiple` is not supported.
 */
export interface SelectNativeProps
  extends SelectOwnProps,
    Omit<InputAsSelectProps, "as" | "end" | keyof SelectOwnProps> {
  /** Render the platform `<select>` */
  native: true
}

/**
 * SelectCustomProps
 *
 * Custom Select (default): a WAI-ARIA select-only combobox. Every prop of
 * Input's `as="input"` branch passes through to the read-only combobox input
 * unchanged (ref, status, filled, className, theme, id, required, …) except
 * the ones Select sets: `as`, `type`, `end`, `readOnly`, `role` and the
 * combobox `aria-*` attributes. `name` goes on a hidden input carrying the
 * value, not on the combobox.
 */
export interface SelectCustomProps
  extends SelectOwnProps,
    Omit<
      InputAsInputProps,
      | "as"
      | "type"
      | "end"
      | "readOnly"
      | "role"
      | "aria-expanded"
      | "aria-controls"
      | "aria-activedescendant"
      | "aria-haspopup"
      | "aria-autocomplete"
      | keyof SelectOwnProps
    > {
  /**
   * Set true to render the platform `<select>`
   * @default false
   */
  native?: false
}

/**
 * SelectProps
 *
 * Complete prop definition for the Select component — one branch per mode,
 * discriminated on `native`, so `ref` is typed for the element rendered
 * (`HTMLInputElement` custom, `HTMLSelectElement` native).
 */
export type SelectProps = SelectNativeProps | SelectCustomProps

const SelectTypes = {} as const

namespace SelectTypes {
  export type Native = SelectNativeType
  export type OptionStart = SelectOptionStartType
  export type OptionEnd = SelectOptionEndType
  export type OnChangeEvent = SelectOnChangeEventType
  export type OnChange = SelectOnChangeType
  export type OwnProps = SelectOwnProps
  export type NativeProps = SelectNativeProps
  export type CustomProps = SelectCustomProps
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
