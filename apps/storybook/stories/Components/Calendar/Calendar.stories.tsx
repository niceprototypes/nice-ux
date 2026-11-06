import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, waitFor, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { SizeType } from "@niceprototypes/styles"
import { Calendar } from "@niceprototypes/calendar"
import type { CalendarDateType, CalendarFirstDayOfWeekType, CalendarProps } from "@niceprototypes/calendar"

const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const FIRST_DAY_OF_WEEK_OPTIONS = [0, 1, 2, 3, 4, 5, 6] as const satisfies readonly CalendarFirstDayOfWeekType[]
const LOCALE_OPTIONS = ["en-US", "en-GB", "de-DE", "fr-FR", "ar-EG", "ja-JP"]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** `isDateDisabled` presets: the select picks a predicate by name. */
const IS_DATE_DISABLED_PRESETS: Record<string, CalendarProps["isDateDisabled"]> = {
  [NONE]: undefined,
  weekends: date => [0, 6].includes(new Date(`${date}T00:00:00Z`).getUTCDay()),
}

/** A date control's timestamp (local midnight) as an ISO `YYYY-MM-DD` date. */
const toIso = (timestamp: number | undefined): CalendarDateType | undefined => {
  if (timestamp === undefined || timestamp === null) return undefined
  const date = new Date(timestamp)
  const pad = (value: number) => String(value).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** An ISO date as a date control's timestamp (local midnight). */
const toTimestamp = (iso: CalendarDateType) => {
  const [year, month, day] = iso.split("-").map(Number)
  return new Date(year, month - 1, day).getTime()
}

/**
 * PlaygroundArgs
 *
 * CalendarProps with the dates as date-control timestamps (converted to ISO strings in
 * `render`), `isDateDisabled` as a preset name, and `controlled`: on, `value` drives the
 * selection and `onChange` writes it back to the args; off, the calendar is uncontrolled
 * and starts at `defaultValue`.
 */
type PlaygroundArgs = Omit<CalendarProps, "value" | "defaultValue" | "min" | "max" | "isDateDisabled"> & {
  controlled: boolean
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  isDateDisabled: string
}

const meta = {
  title: "Components/Forms/Calendar",
  component: Calendar,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<PlaygroundArgs>

const select = (options: readonly (string | number)[], category: string) => ({
  control: "select" as const,
  options,
  table: { category },
})

const optionalSelect = (options: readonly (string | number)[], category: string) => ({
  ...select([NONE, ...options], category),
  mapping: { [NONE]: undefined },
})

const HIDDEN = { table: { disable: true } }

/** Selected date in every story: fixed so the visible month and the tests are deterministic. */
const VALUE = "2026-10-15"

export const Playground: Story = {
  args: {
    "aria-label": "Delivery date",
    controlled: true,
    value: toTimestamp(VALUE),
    defaultValue: toTimestamp(VALUE),
    onChange: fn(),
    isDateDisabled: NONE,
    locale: "en-US",
    size: "base",
    previousMonthLabel: "Previous month",
    nextMonthLabel: "Next month",
  },
  argTypes: {
    controlled: { control: "boolean", table: { category: "State" } },
    value: { control: "date", table: { category: "State" } },
    defaultValue: { control: "date", table: { category: "State" } },
    min: { control: "date", table: { category: "Range" } },
    max: { control: "date", table: { category: "Range" } },
    isDateDisabled: select(Object.keys(IS_DATE_DISABLED_PRESETS), "Range"),
    locale: optionalSelect(LOCALE_OPTIONS, "Locale"),
    firstDayOfWeek: optionalSelect(FIRST_DAY_OF_WEEK_OPTIONS, "Locale"),
    size: select(SIZE_OPTIONS, "Appearance"),
    theme: optionalSelect(THEME_OPTIONS, "Appearance"),
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    previousMonthLabel: { control: "text", table: { category: "Accessibility" } },
    nextMonthLabel: { control: "text", table: { category: "Accessibility" } },
    onChange: { table: { category: "Events" } },
    ref: HIDDEN,
    className: HIDDEN,
  },
  // Convert the date-control timestamps and the preset name; the result is checked against CalendarProps.
  render: function Render({ controlled, value, defaultValue, min, max, isDateDisabled, onChange, ...rest }) {
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    // Local mirror of `value`: the test runner renders without a manager, so updateArgs
    // alone does not re-render there.
    const [current, setCurrent] = useState(toIso(value) ?? null)
    useEffect(() => setCurrent(toIso(value) ?? null), [value])
    const props: CalendarProps = {
      ...rest,
      min: toIso(min),
      max: toIso(max),
      isDateDisabled: IS_DATE_DISABLED_PRESETS[isDateDisabled],
    }
    if (!controlled) {
      // Remount when the initial date changes, so the control takes effect.
      return <Calendar key={String(defaultValue)} {...props} defaultValue={toIso(defaultValue) ?? null} onChange={onChange} />
    }
    return (
      <Calendar
        {...props}
        value={current}
        onChange={next => {
          onChange?.(next)
          setCurrent(next)
          updateArgs({ value: toTimestamp(next) })
        }}
      />
    )
  },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("group", { name: "Delivery date" })).toBeInTheDocument()
    await expect(canvas.getByRole("grid", { name: "October 2026" })).toBeInTheDocument()
    await expect(canvas.getByRole("gridcell", { selected: true })).toHaveTextContent("15")
    await userEvent.click(canvas.getByRole("button", { name: "Tuesday, October 20, 2026" }))
    await expect(args.onChange).toHaveBeenCalledWith("2026-10-20")
    await waitFor(() => expect(canvas.getByRole("gridcell", { selected: true })).toHaveTextContent("20"))
  },
}

export const Uncontrolled: Story = {
  ...Playground,
  args: { ...Playground.args, controlled: false },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("gridcell", { selected: true })).toHaveTextContent("15")
    await userEvent.click(canvas.getByRole("button", { name: "Friday, October 2, 2026" }))
    await expect(args.onChange).toHaveBeenCalledWith("2026-10-02")
    await expect(canvas.getByRole("gridcell", { selected: true })).toHaveTextContent("2")
  },
}

export const MonthNavigation: Story = {
  ...Playground,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Next month" }))
    await expect(canvas.getByRole("grid", { name: "November 2026" })).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "Previous month" }))
    await userEvent.click(canvas.getByRole("button", { name: "Previous month" }))
    await expect(canvas.getByRole("grid", { name: "September 2026" })).toBeInTheDocument()
  },
}

export const Keyboard: Story = {
  ...Playground,
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    canvas.getByRole("button", { name: "Thursday, October 15, 2026" }).focus()
    await userEvent.keyboard("{ArrowRight}")
    const friday = canvas.getByRole("button", { name: "Friday, October 16, 2026" })
    await expect(friday).toHaveFocus()
    // The keyboard focus ring reads the calendar.focusRing tokens.
    const probe = document.createElement("div")
    probe.style.outline = `${getToken("calendar.focusRing.width:base")} solid ${getToken("calendar.focusRing.color:base")}`
    probe.style.outlineOffset = getToken("calendar.focusRing.offset:base")
    canvasElement.appendChild(probe)
    const ring = getComputedStyle(friday)
    const expected = getComputedStyle(probe)
    await expect([ring.outlineWidth, ring.outlineColor, ring.outlineOffset]).toEqual([expected.outlineWidth, expected.outlineColor, expected.outlineOffset])
    probe.remove()
    await userEvent.keyboard("{ArrowDown}")
    await expect(canvas.getByRole("button", { name: "Friday, October 23, 2026" })).toHaveFocus()
    await userEvent.keyboard("{PageDown}")
    await expect(canvas.getByRole("grid", { name: "November 2026" })).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Monday, November 23, 2026" })).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await expect(args.onChange).toHaveBeenCalledWith("2026-11-23")
  },
}

export const MinMax: Story = {
  ...Playground,
  args: { ...Playground.args, min: toTimestamp("2026-10-10"), max: toTimestamp("2026-10-20") },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    const before = canvas.getByRole("button", { name: "Friday, October 9, 2026" })
    await expect(before).toHaveAttribute("aria-disabled", "true")
    await expect(canvas.getByRole("button", { name: "Wednesday, October 21, 2026" })).toHaveAttribute("aria-disabled", "true")
    await expect(canvas.getByRole("button", { name: "Saturday, October 10, 2026" })).not.toHaveAttribute("aria-disabled")
    await userEvent.click(before)
    await expect(args.onChange).not.toHaveBeenCalled()
    // Month navigation stops at min / max.
    await expect(canvas.getByRole("button", { name: "Previous month" })).toBeDisabled()
    await expect(canvas.getByRole("button", { name: "Next month" })).toBeDisabled()
  },
}

export const IsDateDisabled: Story = {
  ...Playground,
  args: { ...Playground.args, isDateDisabled: "weekends" },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    const saturday = canvas.getByRole("button", { name: "Saturday, October 17, 2026" })
    await expect(saturday).toHaveAttribute("aria-disabled", "true")
    await expect(canvas.getByRole("button", { name: "Friday, October 16, 2026" })).not.toHaveAttribute("aria-disabled")
    await userEvent.click(saturday)
    await expect(args.onChange).not.toHaveBeenCalled()
  },
}

export const Locale: Story = {
  ...Playground,
  args: { ...Playground.args, locale: "de-DE", previousMonthLabel: "Vorheriger Monat", nextMonthLabel: "Nächster Monat" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("grid", { name: "Oktober 2026" })).toBeInTheDocument()
    // de-DE weeks start on Monday.
    await expect(canvas.getAllByRole("columnheader")[0]).toHaveAttribute("aria-label", "Montag")
    // The month buttons take their names from the label props.
    await expect(canvas.getByRole("button", { name: "Vorheriger Monat" })).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Nächster Monat" })).toBeInTheDocument()
  },
}

export const FirstDayOfWeek: Story = {
  ...Playground,
  args: { ...Playground.args, firstDayOfWeek: 3 },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole("columnheader")[0]).toHaveAttribute("aria-label", "Wednesday")
  },
}

/** The computed value of a CSS property set to `value`, read from a throwaway element in the canvas. */
const resolveCss = (canvasElement: HTMLElement, property: string, value: string) => {
  const probe = document.createElement("div")
  probe.style.setProperty(property, value)
  canvasElement.appendChild(probe)
  const resolved = getComputedStyle(probe).getPropertyValue(property)
  probe.remove()
  return resolved
}

export const Size: Story = {
  ...Playground,
  args: { ...Playground.args, size: "larger" },
  play: async ({ canvasElement }) => {
    const cell = within(canvasElement).getByRole("gridcell", { selected: true })
    await expect(getComputedStyle(cell).height).toBe(resolveCss(canvasElement, "height", getToken("calendar.cell.size:larger")))
  },
}
