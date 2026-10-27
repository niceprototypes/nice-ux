// Calendar example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in
// `calendarExamples` is the Calendar/Docs-page order; each Calendar/<facet>.mdx
// renders one entry.
import { useState } from "react"
import { Calendar } from "@niceprototypes/calendar"
import Flex from "@niceprototypes/flex"
import { StylesProvider, Theme, getToken } from "@niceprototypes/styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** Controlled calendar that prints the ISO value it holds. */
const ControlledCalendar = () => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div>
      <Calendar
        size="small"
        aria-label="Appointment"
        value={value}
        onChange={setValue}
      />
      <code>value: {JSON.stringify(value)}</code>
    </div>
  )
}

/** ISO string in, boolean out. Parsed at UTC midnight so the weekday does not shift with the time zone. */
const isWeekend = (iso: string) => {
  const day = new Date(`${iso}T00:00:00Z`).getUTCDay()
  return day === 0 || day === 6
}

export const calendarValue = {
  name: "value",
  description:
    "Selected date as an ISO YYYY-MM-DD string, or null for no selection. Passing value makes the calendar controlled and onChange receives the chosen day's ISO string; use defaultValue for an uncontrolled calendar. A controlled value in another month moves the grid to it.",
  variants: ["controlled", "uncontrolled"],
  default: "none",
  preview: variant =>
    variant === "controlled" ? (
      <ControlledCalendar />
    ) : (
      <Calendar
        size="small"
        aria-label="Start date"
        defaultValue="2026-12-31"
      />
    ),
  code: variant =>
    variant === "controlled"
      ? `const [value, setValue] = useState(null)

<Calendar
  size="small"
  aria-label="Appointment"
  value={value}
  onChange={setValue}
/>`
      : `<Calendar
  size="small"
  aria-label="Start date"
  defaultValue="2026-12-31"
/>`,
} satisfies ComponentExample

export const calendarMin = {
  name: "min",
  description:
    "Earliest selectable ISO date, inclusive. Earlier days render disabled, keyboard focus stops at min, and the previous-month button is disabled when every day of that month is before it.",
  variants: ["2026-09-15"],
  default: "none",
  preview: variant => (
    <Calendar
      size="small"
      aria-label="Check-in"
      defaultValue="2026-09-24"
      min={variant}
    />
  ),
  code: variant => `<Calendar size="small" min="${variant}" />`,
} satisfies ComponentExample

export const calendarMax = {
  name: "max",
  description:
    "Latest selectable ISO date, inclusive. Later days render disabled, keyboard focus stops at max, and the next-month button is disabled when every day of that month is after it.",
  variants: ["2026-09-20"],
  default: "none",
  preview: variant => (
    <Calendar
      size="small"
      aria-label="Check-out"
      defaultValue="2026-09-10"
      max={variant}
    />
  ),
  code: variant => `<Calendar size="small" max="${variant}" />`,
} satisfies ComponentExample

export const calendarIsDateDisabled = {
  name: "isDateDisabled",
  description:
    "Called with each day's ISO string; return true to make the day unselectable. Disabled days render dimmed with aria-disabled but stay focusable, so arrow keys move across them. Combines with min / max.",
  variants: ["weekends"],
  default: "none",
  preview: () => (
    <Calendar
      size="small"
      aria-label="Business day"
      defaultValue="2026-09-24"
      isDateDisabled={isWeekend}
    />
  ),
  code: () => `const isWeekend = (iso) => {
  const day = new Date(\`\${iso}T00:00:00Z\`).getUTCDay()
  return day === 0 || day === 6
}

<Calendar size="small" isDateDisabled={isWeekend} />`,
} satisfies ComponentExample

export const calendarLocale = {
  name: "locale",
  description:
    "BCP 47 tag for the month heading, weekday headers, digits, full-date accessible names and the default week start. Defaults to useLocale().locale from @niceprototypes/styles. The calendar system stays Gregorian in v1. The locale alone does not mirror the grid; ar-EG adds an RTL context.",
  variants: ["en-US", "de-DE", "ar-EG"],
  default: "none",
  preview: variant =>
    variant === "ar-EG" ? (
      <div
        dir="rtl"
        lang="ar-EG"
      >
        <StylesProvider locale="ar-EG">
          <Calendar
            size="small"
            aria-label="التاريخ"
            defaultValue="2026-09-24"
          />
        </StylesProvider>
      </div>
    ) : (
      <Calendar
        size="small"
        aria-label="Date"
        locale={variant}
        defaultValue="2026-09-24"
      />
    ),
  code: variant =>
    variant === "ar-EG"
      ? `<div dir="rtl" lang="ar-EG">
  <StylesProvider locale="ar-EG">
    <Calendar size="small" aria-label="التاريخ" />
  </StylesProvider>
</div>`
      : `<Calendar size="small" locale="${variant}" />`,
} satisfies ComponentExample

export const calendarFirstDayOfWeek = {
  name: "firstDayOfWeek",
  description:
    "Overrides the first column: 0 Sunday … 6 Saturday. When omitted the week start comes from the locale (Intl.Locale week info, else a region table). Home / End follow the resolved week start.",
  variants: ["locale", "1"],
  default: "locale",
  preview: variant => (
    <Calendar
      size="small"
      aria-label={variant === "locale" ? "Locale default" : "Monday start"}
      locale="en-US"
      firstDayOfWeek={variant === "1" ? 1 : undefined}
      defaultValue="2026-09-24"
    />
  ),
  code: variant =>
    variant === "1" ? `<Calendar size="small" locale="en-US" firstDayOfWeek={1} />` : `<Calendar size="small" locale="en-US" />`,
} satisfies ComponentExample

export const calendarSize = {
  name: "size",
  description: "Day-cell size (calendar.cell.size) and the size of the month-navigation buttons.",
  variants: ["smaller", "small", "base", "large", "larger"],
  default: "base",
  preview: variant => (
    <Calendar
      size={variant}
      aria-label="Start date"
      defaultValue="2026-12-31"
    />
  ),
  code: variant =>
    variant === "base"
      ? `<Calendar aria-label="Start date" />`
      : `<Calendar size="${variant}" aria-label="Start date" />`,
} satisfies ComponentExample

export const calendarAriaLabel = {
  name: "aria-label",
  description: "Accessible name of the calendar root, a role=\"group\" element.",
  variants: ["Start date"],
  default: "Start date",
  preview: variant => (
    <Calendar
      size="small"
      aria-label={variant}
    />
  ),
  code: variant => `<Calendar aria-label="${variant}" />`,
} satisfies ComponentExample

export const calendarTheme = {
  name: "theme",
  description: "Pins token resolution to a theme. Each preview sits on its theme's base background.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => (
    <Theme name={variant}>
      <Flex
        padding="small"
        style={{ backgroundColor: getToken("backgroundColor", "base") }}
      >
        <Calendar
          size="small"
          aria-label="Start date"
          defaultValue="2026-12-31"
          theme={variant}
        />
      </Flex>
    </Theme>
  ),
  code: variant => `<Calendar aria-label="Start date" theme="${variant}" />`,
} satisfies ComponentExample

/**
 * Wraps a facet's preview in `sb-unstyled` so the docs stylesheet's table-cell
 * padding does not inflate the calendar's own grid cells; with size="small" the
 * grid then fits the demo table's 16em preview column.
 */
const unstyled = <T extends ComponentExample>(example: T): T => ({
  ...example,
  preview: (item: unknown) => <div className="sb-unstyled">{example.preview(item)}</div>,
})

/** Every Calendar example facet — key order is the Calendar/Docs-page order. */
export const calendarExamples = {
  value: unstyled(calendarValue),
  min: unstyled(calendarMin),
  max: unstyled(calendarMax),
  isDateDisabled: unstyled(calendarIsDateDisabled),
  locale: unstyled(calendarLocale),
  firstDayOfWeek: unstyled(calendarFirstDayOfWeek),
  size: unstyled(calendarSize),
  ariaLabel: unstyled(calendarAriaLabel),
  theme: unstyled(calendarTheme),
} satisfies Record<string, ComponentExample>

/** Calendar facets in Docs-page order. */
export const calendarExampleList: ComponentExample[] = Object.values(calendarExamples)
