import type { InputAsInputProps } from "@niceprototypes/input"
import type {
  CalendarDateType,
  CalendarIsDateDisabledType,
  CalendarLocaleType,
  CalendarMaxType,
  CalendarMinType,
  CalendarNextMonthLabelType,
  CalendarPreviousMonthLabelType,
} from "../Calendar/Calendar.types"

/**
 * DateFieldValueType
 *
 * Selected ISO `YYYY-MM-DD` date (controlled). `null` means empty.
 */
export type DateFieldValueType = CalendarDateType | null

/**
 * DateFieldDefaultValueType
 *
 * Initial ISO `YYYY-MM-DD` date (uncontrolled). `null` means empty.
 */
export type DateFieldDefaultValueType = CalendarDateType | null

/**
 * DateFieldOnChangeType
 *
 * Called with the new ISO date. Typed `string | null` so clearing can be added
 * without a type change; v1 (picker-only) only ever passes a date string.
 */
export type DateFieldOnChangeType = (value: CalendarDateType | null) => void

/**
 * DateFieldMinType
 *
 * Re-export of CalendarMinType. Earliest selectable ISO date (inclusive).
 */
export type DateFieldMinType = CalendarMinType

/**
 * DateFieldMaxType
 *
 * Re-export of CalendarMaxType. Latest selectable ISO date (inclusive).
 */
export type DateFieldMaxType = CalendarMaxType

/**
 * DateFieldIsDateDisabledType
 *
 * Re-export of CalendarIsDateDisabledType. Returns true for ISO dates that
 * cannot be selected.
 */
export type DateFieldIsDateDisabledType = CalendarIsDateDisabledType

/**
 * DateFieldLocaleType
 *
 * Re-export of CalendarLocaleType. BCP 47 locale for the displayed value and
 * the calendar. Defaults to `useLocale().locale`.
 */
export type DateFieldLocaleType = CalendarLocaleType

/**
 * DateFieldNameType
 *
 * Form field name. Carried by a hidden input whose value is the ISO date, so
 * native `FormData` receives `YYYY-MM-DD`, not the formatted display text.
 */
export type DateFieldNameType = string

/**
 * DateFieldTriggerLabelType
 *
 * Accessible name of the calendar button and of the popover it opens, in the field's language.
 */
export type DateFieldTriggerLabelType = string

/**
 * DateFieldPreviousMonthLabelType
 *
 * Re-export of CalendarPreviousMonthLabelType. Accessible name of the calendar's previous-month button.
 */
export type DateFieldPreviousMonthLabelType = CalendarPreviousMonthLabelType

/**
 * DateFieldNextMonthLabelType
 *
 * Re-export of CalendarNextMonthLabelType. Accessible name of the calendar's next-month button.
 */
export type DateFieldNextMonthLabelType = CalendarNextMonthLabelType

/**
 * Input props DateField owns, and the text-entry props that do nothing on its
 * read-only input (constraint validation, the virtual keyboard, spell check,
 * autofill direction, password reveal).
 */
type DateFieldOmittedInputProps =
  | "as"
  | "type"
  | "end"
  | "value"
  | "defaultValue"
  | "onChange"
  | "name"
  | "readOnly"
  | "maxLength"
  | "minLength"
  | "pattern"
  | "inputMode"
  | "enterKeyHint"
  | "spellCheck"
  | "dirName"
  | "passwordReveal"

/**
 * DateFieldProps
 *
 * Complete prop definition for the DateField component: every Input prop
 * except the ones DateField owns and the text-entry props that do nothing on a
 * picker. The visible input is always read-only in v1.
 */
export interface DateFieldProps extends Omit<InputAsInputProps, DateFieldOmittedInputProps> {
  /** Selected ISO date (controlled) */
  value?: DateFieldValueType
  /** Initial ISO date (uncontrolled) */
  defaultValue?: DateFieldDefaultValueType
  /** Called with the selected ISO date */
  onChange?: DateFieldOnChangeType
  /** Earliest selectable ISO date (inclusive) */
  min?: DateFieldMinType
  /** Latest selectable ISO date (inclusive) */
  max?: DateFieldMaxType
  /** Returns true for ISO dates that cannot be selected */
  isDateDisabled?: DateFieldIsDateDisabledType
  /** BCP 47 locale @default useLocale().locale */
  locale?: DateFieldLocaleType
  /** Form field name (on the hidden ISO input) */
  name?: DateFieldNameType
  /** Accessible name of the calendar button and its popover @default "Choose date" */
  triggerLabel?: DateFieldTriggerLabelType
  /** Accessible name of the calendar's previous-month button @default "Previous month" */
  previousMonthLabel?: DateFieldPreviousMonthLabelType
  /** Accessible name of the calendar's next-month button @default "Next month" */
  nextMonthLabel?: DateFieldNextMonthLabelType
}

// Declaration merging: const + namespace creates an exportable type namespace.
const DateFieldTypes = {} as const

namespace DateFieldTypes {
  export type Value = DateFieldValueType
  export type DefaultValue = DateFieldDefaultValueType
  export type OnChange = DateFieldOnChangeType
  export type Min = DateFieldMinType
  export type Max = DateFieldMaxType
  export type IsDateDisabled = DateFieldIsDateDisabledType
  export type Locale = DateFieldLocaleType
  export type Name = DateFieldNameType
  export type TriggerLabel = DateFieldTriggerLabelType
  export type PreviousMonthLabel = DateFieldPreviousMonthLabelType
  export type NextMonthLabel = DateFieldNextMonthLabelType
  export type Props = DateFieldProps
}

export default DateFieldTypes
