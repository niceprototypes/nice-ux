import type * as React from "react"
import type { SizeType, ThemeType } from "@niceprototypes/styles"

/**
 * ListboxOptionStartType
 *
 * Content before the option label (icon, avatar).
 */
export type ListboxOptionStartType = React.ReactNode

/**
 * ListboxOptionEndType
 *
 * Content after the option label (shortcut, badge).
 */
export type ListboxOptionEndType = React.ReactNode

/**
 * ListboxOptionType
 *
 * One `role="option"` row.
 * - value: the value passed to `onChange`
 * - label: option text, rendered through Ink. Typeahead uses the label when it
 *   is a string or number, otherwise the value
 * - disabled: the option is shown but cannot be chosen or made active
 * - start / end: slots before / after the label
 */
export type ListboxOptionType = {
  value: string
  label: React.ReactNode
  disabled?: boolean
  start?: ListboxOptionStartType
  end?: ListboxOptionEndType
}

/**
 * ListboxOptionGroupType
 *
 * A titled `role="group"` of options, named by its title.
 * - label: the group title, rendered through Ink. Keyboard travel and
 *   typeahead skip it
 * - options: the group's options, in order
 */
export type ListboxOptionGroupType = {
  label: React.ReactNode
  options: ReadonlyArray<ListboxOptionType>
}

/**
 * ListboxOptionsType
 *
 * Options and option groups, in array order. Plain options and groups can mix.
 */
export type ListboxOptionsType = ReadonlyArray<ListboxOptionType | ListboxOptionGroupType>

/**
 * ListboxValueType
 *
 * Value of the selected option (`aria-selected="true"`). Undefined, or a value
 * no option has, selects nothing.
 */
export type ListboxValueType = string

/**
 * ListboxOnChangeEventType
 *
 * Event passed as `onChange`'s second argument: the click on an option, or the
 * Enter / Space keydown on a focused Listbox.
 */
export type ListboxOnChangeEventType = React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLUListElement>

/**
 * ListboxOnChangeType
 *
 * Called with the chosen option's value and the event that chose it, on every
 * choice, including the option that is already selected (a combobox closes on
 * it).
 */
export type ListboxOnChangeType = (value: string, event: ListboxOnChangeEventType) => void

/**
 * ListboxActiveValueType
 *
 * Value of the active option: the keyboard / pointer highlight, named by
 * `aria-activedescendant`. `null` is no active option; leaving the prop
 * undefined lets the Listbox track it itself.
 */
export type ListboxActiveValueType = string | null

/**
 * ListboxOnActiveChangeType
 *
 * Called with the option value that became active (pointer move, arrow keys,
 * typeahead, focus), or `null` when the Listbox loses focus.
 */
export type ListboxOnActiveChangeType = (value: ListboxActiveValueType) => void

/**
 * ListboxFocusableType
 *
 * True (default): the Listbox is a tab stop and handles its own keyboard
 * (arrows, Home / End, PageUp / PageDown, Enter / Space, typeahead). False:
 * another element keeps focus and drives `activeValue` (a combobox trigger,
 * as in Select); option presses do not move focus.
 */
export type ListboxFocusableType = boolean

/**
 * ListboxSizeType
 *
 * Re-export of SizeType from @niceprototypes/styles. Label text size (Ink).
 *
 * Values:
 * - "smaller", "small", "base", "large", "larger"
 */
export type ListboxSizeType = SizeType

/**
 * ListboxThemeType
 *
 * Re-export of ThemeType from @niceprototypes/styles. Pins token resolution to
 * a theme for the Listbox and its options.
 */
export type ListboxThemeType = ThemeType

/**
 * ListboxProps
 *
 * Complete prop definition for the Listbox component.
 */
export interface ListboxProps {
  /** Options and option groups, in order */
  options: ListboxOptionsType

  /** Selected value (controlled) */
  value?: ListboxValueType

  /** Called with the chosen value and the event that chose it */
  onChange?: ListboxOnChangeType

  /** Active option value; undefined leaves it to the Listbox */
  activeValue?: ListboxActiveValueType

  /** Called when the active option changes */
  onActiveChange?: ListboxOnActiveChangeType

  /**
   * Tab stop with its own keyboard handling; false when a combobox drives it
   * @default true
   */
  focusable?: ListboxFocusableType

  /**
   * Label text size
   * @default "base"
   */
  size?: ListboxSizeType

  /** Pin token resolution to a theme */
  theme?: ListboxThemeType

  /** Id of the listbox; option ids derive from it (`getListboxOptionId`) */
  id?: string

  /** Accessible name when no visible label names the listbox */
  "aria-label"?: string

  /** Ids of the elements that name the listbox */
  "aria-labelledby"?: string

  /** Ref to the `<ul role="listbox">` */
  ref?: React.Ref<HTMLUListElement>
}

const ListboxTypes = {} as const

namespace ListboxTypes {
  export type OptionStart = ListboxOptionStartType
  export type OptionEnd = ListboxOptionEndType
  export type Option = ListboxOptionType
  export type OptionGroup = ListboxOptionGroupType
  export type Options = ListboxOptionsType
  export type Value = ListboxValueType
  export type OnChangeEvent = ListboxOnChangeEventType
  export type OnChange = ListboxOnChangeType
  export type ActiveValue = ListboxActiveValueType
  export type OnActiveChange = ListboxOnActiveChangeType
  export type Focusable = ListboxFocusableType
  export type Size = ListboxSizeType
  export type Theme = ListboxThemeType
  export type Props = ListboxProps
}

export default ListboxTypes
