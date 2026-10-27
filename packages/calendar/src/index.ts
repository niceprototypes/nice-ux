/**
 * @niceprototypes/calendar — date selection for nice-react.
 *
 * Multi-component package (named exports, no default). `Calendar` is an ISO-date
 * month grid; `DateField` is a picker field built on @niceprototypes/input and
 * @niceprototypes/popover. Dates cross the API only as ISO `YYYY-MM-DD` strings.
 */

export { Calendar, CalendarTypes } from "./components/Calendar"
export type {
  CalendarAriaLabelType,
  CalendarClassNameType,
  CalendarDateType,
  CalendarDefaultValueType,
  CalendarFirstDayOfWeekType,
  CalendarIsDateDisabledType,
  CalendarLocaleType,
  CalendarMaxType,
  CalendarMinType,
  CalendarOnChangeType,
  CalendarProps,
  CalendarRefType,
  CalendarSizeType,
  CalendarThemeType,
  CalendarValueType,
} from "./components/Calendar"

export { DateField, DateFieldTypes } from "./components/DateField"
export type {
  DateFieldDefaultValueType,
  DateFieldIsDateDisabledType,
  DateFieldLocaleType,
  DateFieldMaxType,
  DateFieldMinType,
  DateFieldNameType,
  DateFieldOnChangeType,
  DateFieldProps,
  DateFieldValueType,
} from "./components/DateField"
