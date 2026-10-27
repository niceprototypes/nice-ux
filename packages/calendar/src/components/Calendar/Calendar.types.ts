import * as React from "react"
import type { SizeType, ThemeType } from "@niceprototypes/styles"

/**
 * CalendarDateType
 *
 * A calendar date as an ISO 8601 `YYYY-MM-DD` string (e.g. "2026-09-24"). The
 * only date shape that crosses the public API — a JS `Date` is never accepted
 * or returned, because `Date` is Gregorian-only and time-zone-bound, and a
 * calendar-agnostic string can later carry non-Gregorian display without a
 * breaking type change. v1 interprets and displays it in the Gregorian calendar.
 */
export type CalendarDateType = string

/**
 * CalendarValueType
 *
 * Selected date (controlled). `null` means no selection.
 */
export type CalendarValueType = CalendarDateType | null

/**
 * CalendarDefaultValueType
 *
 * Initially selected date (uncontrolled). `null` means no selection.
 */
export type CalendarDefaultValueType = CalendarDateType | null

/**
 * CalendarOnChangeType
 *
 * Called with the ISO date the user selects.
 */
export type CalendarOnChangeType = (value: CalendarDateType) => void

/**
 * CalendarMinType
 *
 * Earliest selectable ISO date (inclusive). Keyboard focus and month navigation
 * stop at it.
 */
export type CalendarMinType = CalendarDateType

/**
 * CalendarMaxType
 *
 * Latest selectable ISO date (inclusive). Keyboard focus and month navigation
 * stop at it.
 */
export type CalendarMaxType = CalendarDateType

/**
 * CalendarIsDateDisabledType
 *
 * Returns true for ISO dates that cannot be selected. Disabled dates stay
 * focusable (`aria-disabled`) so keyboard navigation can move across them.
 */
export type CalendarIsDateDisabledType = (value: CalendarDateType) => boolean

/**
 * CalendarLocaleType
 *
 * BCP 47 language tag for labels, numbering system and week start. Defaults to
 * `useLocale().locale` from @niceprototypes/styles.
 */
export type CalendarLocaleType = string

/**
 * CalendarFirstDayOfWeekType
 *
 * Override for the first day of the week.
 *
 * Values:
 * - 0: Sunday
 * - 1: Monday
 * - 2: Tuesday
 * - 3: Wednesday
 * - 4: Thursday
 * - 5: Friday
 * - 6: Saturday
 */
export type CalendarFirstDayOfWeekType = 0 | 1 | 2 | 3 | 4 | 5 | 6

/**
 * CalendarSizeType
 *
 * Re-export of SizeType from @niceprototypes/styles. Selects the day-cell size from
 * `calendar.cell.size` and the size of the month-navigation buttons.
 *
 * Values:
 * - "smaller", "small", "base", "large", "larger"
 */
export type CalendarSizeType = SizeType

/**
 * CalendarThemeType
 *
 * Re-export of ThemeType from @niceprototypes/styles.
 * Pin token resolution to a specific theme.
 * Extensible for consumer-defined custom themes.
 */
export type CalendarThemeType = ThemeType

/**
 * CalendarAriaLabelType
 *
 * Accessible name of the calendar group.
 */
export type CalendarAriaLabelType = string

/**
 * CalendarClassNameType
 *
 * CSS class name applied to the root element.
 */
export type CalendarClassNameType = string

/**
 * CalendarRefType
 *
 * Ref to the root element (React 19 ref-as-prop).
 */
export type CalendarRefType = React.Ref<HTMLDivElement>

/**
 * CalendarProps
 *
 * Complete prop definition for the Calendar component.
 */
export interface CalendarProps {
  /** Selected ISO date (controlled) */
  value?: CalendarValueType
  /** Initially selected ISO date (uncontrolled) */
  defaultValue?: CalendarDefaultValueType
  /** Called with the selected ISO date */
  onChange?: CalendarOnChangeType
  /** Earliest selectable ISO date (inclusive) */
  min?: CalendarMinType
  /** Latest selectable ISO date (inclusive) */
  max?: CalendarMaxType
  /** Returns true for ISO dates that cannot be selected */
  isDateDisabled?: CalendarIsDateDisabledType
  /** BCP 47 locale @default useLocale().locale */
  locale?: CalendarLocaleType
  /** First day of the week (0 = Sunday … 6 = Saturday) @default from locale */
  firstDayOfWeek?: CalendarFirstDayOfWeekType
  /** Cell and navigation-button size @default "base" */
  size?: CalendarSizeType
  /** Accessible name of the calendar group */
  "aria-label"?: CalendarAriaLabelType
  /** CSS class name applied to the root element */
  className?: CalendarClassNameType
  /** Pin token resolution to a specific theme */
  theme?: CalendarThemeType
  /** Ref to the root element */
  ref?: CalendarRefType
}

// Declaration merging: const + namespace creates an exportable type namespace.
const CalendarTypes = {} as const

namespace CalendarTypes {
  export type Date = CalendarDateType
  export type Value = CalendarValueType
  export type DefaultValue = CalendarDefaultValueType
  export type OnChange = CalendarOnChangeType
  export type Min = CalendarMinType
  export type Max = CalendarMaxType
  export type IsDateDisabled = CalendarIsDateDisabledType
  export type Locale = CalendarLocaleType
  export type FirstDayOfWeek = CalendarFirstDayOfWeekType
  export type Size = CalendarSizeType
  export type Theme = CalendarThemeType
  export type AriaLabel = CalendarAriaLabelType
  export type ClassName = CalendarClassNameType
  export type Ref = CalendarRefType
  export type Props = CalendarProps
}

export default CalendarTypes
