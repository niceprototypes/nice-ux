import * as React from "react"
import Button from "@niceprototypes/button"
import { Theme, useLocale } from "@niceprototypes/styles"
import {
  StyledCalendar,
  StyledCalendarCell,
  StyledCalendarColumnHeader,
  StyledCalendarDay,
  StyledCalendarGrid,
  StyledCalendarHeader,
  StyledCalendarHeading,
} from "./Calendar.styles"
import type { CalendarDateType, CalendarProps } from "./Calendar.types"
import { addDays } from "../../utilities/addDays"
import { addMonths } from "../../utilities/addMonths"
import { clampIsoDate } from "../../utilities/clampIsoDate"
import { getDaysInMonth } from "../../utilities/getDaysInMonth"
import { getMonthGrid } from "../../utilities/getMonthGrid"
import { getTodayIso } from "../../utilities/getTodayIso"
import { getWeekStart } from "../../utilities/getWeekStart"
import { getWeekday } from "../../utilities/getWeekday"
import { isoToUtcDate } from "../../utilities/isoToUtcDate"
import { parseIsoDate } from "../../utilities/parseIsoDate"
import { toIsoDate } from "../../utilities/toIsoDate"

// A known Sunday (UTC). Weekday headers are formatted from the seven days after it.
const REFERENCE_SUNDAY = "2024-01-07"

// Every formatter is pinned to UTC (dates are built at UTC midnight) and to the
// Gregorian calendar (v1). The numbering system still follows the locale.
const formatOptions = (options: Intl.DateTimeFormatOptions): Intl.DateTimeFormatOptions => ({
  ...options,
  timeZone: "UTC",
  calendar: "gregory",
})

/**
 * Calendar
 *
 * Month grid following the ARIA grid pattern. Dates cross the API only as ISO
 * `YYYY-MM-DD` strings; arithmetic is UTC-based and Gregorian (v1).
 *
 * - Week start from `Intl.Locale` week info, with a region-table fallback;
 *   `firstDayOfWeek` overrides it.
 * - Labels from `Intl.DateTimeFormat(locale)`: short weekday headers (full name
 *   in `abbr`), day numbers in the locale's numbering system, and a
 *   month/year heading in an `aria-live="polite"` element that labels the grid.
 * - Roving tabindex: one tabbable day — selected, else today, else the first
 *   enabled day of the visible month; after that, the last focused day.
 * - Keys: ArrowLeft/Right ±1 day (mirrored when `useLocale().direction` is
 *   "rtl"), ArrowUp/Down ±7, Home/End start/end of week, PageUp/PageDown ±1
 *   month, Shift+PageUp/PageDown ±1 year, Enter/Space select. Moving focus off
 *   the visible month changes the month. Focus stops at `min` / `max`.
 *
 * @example
 * ```tsx
 * <Calendar value={date} onChange={setDate} min="2026-01-01" aria-label="Delivery date" />
 * ```
 */
const Calendar: React.FC<CalendarProps> = ({
  value,
  defaultValue = null,
  onChange,
  min,
  max,
  isDateDisabled,
  locale: localeProp,
  firstDayOfWeek,
  size = "base",
  "aria-label": ariaLabel,
  className,
  theme,
  ref,
}) => {
  const { locale: contextLocale, direction } = useLocale()
  const locale = localeProp ?? contextLocale
  const headingId = React.useId()
  const gridRef = React.useRef<HTMLTableElement | null>(null)

  // Selection: controlled when `value` is given; invalid ISO strings count as no selection.
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<CalendarDateType | null>(defaultValue)
  const selectedRaw = isControlled ? value : internalValue
  const selected = parseIsoDate(selectedRaw) ? (selectedRaw as CalendarDateType) : null
  const today = getTodayIso()

  const localeWeekStart = React.useMemo(() => getWeekStart(locale), [locale])
  const weekStart = firstDayOfWeek ?? localeWeekStart

  const isDisabled = React.useCallback(
    (date: CalendarDateType) =>
      (!!min && date < min) || (!!max && date > max) || !!isDateDisabled?.(date),
    [min, max, isDateDisabled]
  )

  // Default tabbable day of a month: selected, else today, else the first enabled day.
  const pickFocus = React.useCallback(
    (year: number, month: number): CalendarDateType => {
      const inMonth = (date: CalendarDateType | null) => {
        const parts = parseIsoDate(date)
        return !!parts && parts.year === year && parts.month === month
      }
      for (const candidate of [selected, today]) {
        if (candidate && inMonth(candidate) && !isDisabled(candidate)) return candidate
      }
      const days = getDaysInMonth(year, month)
      for (let day = 1; day <= days; day++) {
        const date = toIsoDate(year, month, day)
        if (!isDisabled(date)) return date
      }
      return clampIsoDate(toIsoDate(year, month, 1), min, max)
    },
    [selected, today, isDisabled, min, max]
  )

  const [focusedDate, setFocusedDate] = React.useState<CalendarDateType>(() => {
    const start = parseIsoDate(clampIsoDate(selected ?? today, min, max))!
    return pickFocus(start.year, start.month)
  })
  // Set when a key moved focus, so the effect below moves DOM focus to the new day.
  const moveDomFocus = React.useRef(false)

  // A controlled value moved to another month: follow it.
  React.useEffect(() => {
    if (!selected) return
    setFocusedDate((current) =>
      current.slice(0, 7) === selected.slice(0, 7) ? current : clampIsoDate(selected, min, max)
    )
    // Follows value changes only; min / max are read at that moment.
  }, [selected])

  React.useEffect(() => {
    if (!moveDomFocus.current) return
    moveDomFocus.current = false
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focusedDate}"]`)?.focus()
  }, [focusedDate])

  const visible = parseIsoDate(focusedDate)!
  const firstOfMonth = toIsoDate(visible.year, visible.month, 1)
  const rows = getMonthGrid(visible.year, visible.month, weekStart)

  // Formatters
  const headingFormat = React.useMemo(
    () => new Intl.DateTimeFormat(locale, formatOptions({ month: "long", year: "numeric" })),
    [locale]
  )
  const dayFormat = React.useMemo(
    () => new Intl.DateTimeFormat(locale, formatOptions({ day: "numeric" })),
    [locale]
  )
  const fullDateFormat = React.useMemo(
    () => new Intl.DateTimeFormat(locale, formatOptions({ dateStyle: "full" })),
    [locale]
  )
  const weekdays = React.useMemo(() => {
    const short = new Intl.DateTimeFormat(locale, formatOptions({ weekday: "short" }))
    const long = new Intl.DateTimeFormat(locale, formatOptions({ weekday: "long" }))
    return Array.from({ length: 7 }, (_, i) => {
      const date = isoToUtcDate(addDays(REFERENCE_SUNDAY, (weekStart + i) % 7))
      return { short: short.format(date), long: long.format(date) }
    })
  }, [locale, weekStart])

  const select = (date: CalendarDateType) => {
    if (isDisabled(date)) return
    setFocusedDate(date)
    if (!isControlled) setInternalValue(date)
    onChange?.(date)
  }

  const moveFocus = (target: CalendarDateType) => {
    const next = clampIsoDate(target, min, max)
    moveDomFocus.current = true
    setFocusedDate(next)
    // Same day (e.g. clamped at min/max): the effect will not re-run, so refocus here.
    if (next === focusedDate) {
      moveDomFocus.current = false
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${next}"]`)?.focus()
    }
  }

  const onGridKeyDown = (event: React.KeyboardEvent<HTMLTableElement>) => {
    const day = (event.target as HTMLElement).closest?.("[data-date]")
    const current = day?.getAttribute("data-date")
    if (!current) return
    const forward = direction === "rtl" ? -1 : 1
    const offsetInWeek = (getWeekday(current) - weekStart + 7) % 7
    let target: CalendarDateType | null = null

    switch (event.key) {
      case "ArrowRight":
        target = addDays(current, forward)
        break
      case "ArrowLeft":
        target = addDays(current, -forward)
        break
      case "ArrowDown":
        target = addDays(current, 7)
        break
      case "ArrowUp":
        target = addDays(current, -7)
        break
      case "Home":
        target = addDays(current, -offsetInWeek)
        break
      case "End":
        target = addDays(current, 6 - offsetInWeek)
        break
      case "PageUp":
        target = addMonths(current, event.shiftKey ? -12 : -1)
        break
      case "PageDown":
        target = addMonths(current, event.shiftKey ? 12 : 1)
        break
      case "Enter":
      case " ":
        event.preventDefault()
        select(current)
        return
      default:
        return
    }
    event.preventDefault()
    moveFocus(target)
  }

  const goToMonth = (delta: number) => {
    const target = parseIsoDate(addMonths(firstOfMonth, delta))!
    setFocusedDate(pickFocus(target.year, target.month))
  }

  const lastOfPreviousMonth = addDays(firstOfMonth, -1)
  const firstOfNextMonth = addMonths(firstOfMonth, 1)
  const previousDisabled = !!min && lastOfPreviousMonth < min
  const nextDisabled = !!max && firstOfNextMonth > max
  // Carets point along the inline axis, so they swap under RTL.
  const rtl = direction === "rtl"

  const calendar = (
    <StyledCalendar ref={ref} role="group" aria-label={ariaLabel} className={className}>
      <StyledCalendarHeader>
        <Button
          iconLeft={rtl ? "carat-right" : "carat-left"}
          aria-label="Previous month"
          size={size}
          status={previousDisabled ? "disabled" : "base"}
          onClick={() => goToMonth(-1)}
        />
        <StyledCalendarHeading id={headingId} aria-live="polite">
          {headingFormat.format(isoToUtcDate(firstOfMonth))}
        </StyledCalendarHeading>
        <Button
          iconLeft={rtl ? "carat-left" : "carat-right"}
          aria-label="Next month"
          size={size}
          status={nextDisabled ? "disabled" : "base"}
          onClick={() => goToMonth(1)}
        />
      </StyledCalendarHeader>
      <StyledCalendarGrid ref={gridRef} role="grid" aria-labelledby={headingId} onKeyDown={onGridKeyDown}>
        <thead>
          <tr role="row">
            {weekdays.map((weekday) => (
              <StyledCalendarColumnHeader
                key={weekday.long}
                role="columnheader"
                scope="col"
                abbr={weekday.long}
                aria-label={weekday.long}
              >
                {weekday.short}
              </StyledCalendarColumnHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr role="row" key={rowIndex}>
              {row.map((date, cellIndex) => {
                if (!date) return <StyledCalendarCell key={cellIndex} role="gridcell" $size={size} />
                const isSelected = date === selected
                const isToday = date === today
                const disabled = isDisabled(date)
                const utc = isoToUtcDate(date)
                return (
                  <StyledCalendarCell
                    key={cellIndex}
                    role="gridcell"
                    aria-selected={isSelected ? true : undefined}
                    $size={size}
                  >
                    <StyledCalendarDay
                      type="button"
                      data-date={date}
                      tabIndex={date === focusedDate ? 0 : -1}
                      aria-label={fullDateFormat.format(utc)}
                      aria-current={isToday ? "date" : undefined}
                      aria-disabled={disabled ? true : undefined}
                      onClick={() => select(date)}
                      onFocus={() => setFocusedDate(date)}
                      $size={size}
                      $today={isToday}
                      $selected={isSelected}
                      $disabled={disabled}
                    >
                      {dayFormat.format(utc)}
                    </StyledCalendarDay>
                  </StyledCalendarCell>
                )
              })}
            </tr>
          ))}
        </tbody>
      </StyledCalendarGrid>
    </StyledCalendar>
  )

  return theme ? <Theme name={theme}>{calendar}</Theme> : calendar
}

export default Calendar
