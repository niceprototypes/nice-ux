import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, waitFor, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { BackgroundColorType, BorderColorType, BorderWidthType, SizeType } from "@niceprototypes/styles"
import { Field } from "@niceprototypes/field"
import Icon from "@niceprototypes/icon"
import { DateField } from "@niceprototypes/calendar"
import type { CalendarDateType, DateFieldProps } from "@niceprototypes/calendar"
import type { InputBorderRadiusType, InputGhostStatesType, InputStatusType, InputWidthType } from "@niceprototypes/input"

/**
 * Option lists. Union props are typed against the union on disk, so a renamed token fails
 * the build; border colours and themes are read from the token data at runtime.
 */
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const STATUS_OPTIONS = ["base", "disabled", "error", "success", "warning"] as const satisfies readonly InputStatusType[]
const BORDER_RADIUS_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly InputBorderRadiusType[]
const BORDER_WIDTH_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly BorderWidthType[]
const BACKGROUND_COLOR_OPTIONS = ["base", "raised", "success", "highlight", "warning", "error", "link"] as const satisfies readonly BackgroundColorType[]
const BORDER_COLOR_OPTIONS = Object.keys(themeTokensData.day.borderColor) as BorderColorType[]
const WIDTH_OPTIONS = ["2", "3", "4", "5", "10", "20", "full"] as const satisfies readonly InputWidthType[]
const LOCALE_OPTIONS = ["en-US", "en-GB", "de-DE", "fr-FR", "ar-EG", "ja-JP"]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** `isDateDisabled` presets: the select picks a predicate by name. */
const IS_DATE_DISABLED_PRESETS: Record<string, DateFieldProps["isDateDisabled"]> = {
  [NONE]: undefined,
  weekends: date => [0, 6].includes(new Date(`${date}T00:00:00Z`).getUTCDay()),
}

/** `start` slot presets. */
const START_PRESETS: Record<string, DateFieldProps["start"]> = {
  [NONE]: undefined,
  icon: <Icon name="calendar" />,
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

/** A colour variant, or `{ name, theme }` when a theme pin is set. */
const toColorProp = <V extends string>(name: V | undefined, theme: string | undefined) =>
  name === undefined ? undefined : theme && theme !== NONE ? { name, theme } : name

/**
 * PlaygroundArgs
 *
 * DateFieldProps with:
 * - the dates as date-control timestamps, converted to ISO strings in `render`
 * - `isDateDisabled` and `start` as preset names
 * - `ghost` as one boolean per interaction state
 * - the colour props as a variant plus a theme pin each
 * - `controlled`: on, `value` drives the field and `onChange` writes it back to the args;
 *   off, the field is uncontrolled and starts at `defaultValue`
 */
type PlaygroundArgs = Omit<
  DateFieldProps,
  "value" | "defaultValue" | "min" | "max" | "isDateDisabled" | "start" | "ghost" | "backgroundColor" | "borderColor"
> & {
  controlled: boolean
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  isDateDisabled: string
  start: string
  ghostRest: boolean
  ghostHover: boolean
  ghostFocus: boolean
  backgroundColor?: BackgroundColorType
  backgroundColorTheme: string
  borderColor?: BorderColorType
  borderColorTheme: string
}

const toGhost = (states: Required<InputGhostStatesType>): DateFieldProps["ghost"] => {
  const { rest, hover, focus } = states
  if (!hover && !focus) return rest
  return states
}

const meta = {
  title: "Components/Forms/DateField",
  component: DateField,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DateField>

export default meta

type Story = StoryObj<PlaygroundArgs>

const select = (options: readonly string[], category: string) => ({
  control: "select" as const,
  options,
  table: { category },
})

const optionalSelect = (options: readonly string[], category: string) => ({
  ...select([NONE, ...options], category),
  mapping: { [NONE]: undefined },
})

const HIDDEN = { table: { disable: true } }

/** Selected date in every story: fixed so the visible month and the tests are deterministic. */
const VALUE = "2026-10-15"

export const Playground: Story = {
  args: {
    "aria-label": "Start date",
    controlled: true,
    value: toTimestamp(VALUE),
    defaultValue: toTimestamp(VALUE),
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onKeyDown: fn(),
    isDateDisabled: NONE,
    locale: "en-US",
    start: NONE,
    size: "base",
    disabled: false,
    required: false,
    filled: false,
    ghostRest: false,
    ghostHover: false,
    ghostFocus: false,
    borderRadius: "base",
    borderWidth: "base",
    backgroundColorTheme: NONE,
    borderColorTheme: NONE,
    triggerLabel: "Choose date",
    previousMonthLabel: "Previous month",
    nextMonthLabel: "Next month",
  },
  argTypes: {
    controlled: { control: "boolean", table: { category: "State" } },
    value: { control: "date", table: { category: "State" } },
    defaultValue: { control: "date", table: { category: "State" } },
    disabled: { control: "boolean", table: { category: "State" } },
    required: { control: "boolean", table: { category: "State" } },

    min: { control: "date", table: { category: "Range" } },
    max: { control: "date", table: { category: "Range" } },
    isDateDisabled: select(Object.keys(IS_DATE_DISABLED_PRESETS), "Range"),

    locale: optionalSelect(LOCALE_OPTIONS, "Locale"),

    placeholder: { control: "text", table: { category: "Content" } },
    start: select(Object.keys(START_PRESETS), "Content"),

    size: select(SIZE_OPTIONS, "Appearance"),
    status: optionalSelect(STATUS_OPTIONS, "Appearance"),
    filled: { control: "boolean", table: { category: "Appearance" } },
    width: optionalSelect(WIDTH_OPTIONS, "Appearance"),
    theme: optionalSelect(THEME_OPTIONS, "Appearance"),

    ghostRest: { control: "boolean", table: { category: "Ghost" } },
    ghostHover: { control: "boolean", table: { category: "Ghost" } },
    ghostFocus: { control: "boolean", table: { category: "Ghost" } },

    // Explicit selects override preview.tsx's `color` matcher (a colour picker).
    backgroundColor: optionalSelect(BACKGROUND_COLOR_OPTIONS, "Color"),
    backgroundColorTheme: optionalSelect(THEME_OPTIONS, "Color"),

    borderColor: optionalSelect(BORDER_COLOR_OPTIONS, "Border"),
    borderColorTheme: optionalSelect(THEME_OPTIONS, "Border"),
    borderRadius: select(BORDER_RADIUS_OPTIONS, "Border"),
    borderWidth: select(BORDER_WIDTH_OPTIONS, "Border"),

    name: { control: "text", table: { category: "Element" } },
    id: { control: "text", table: { category: "Element" } },
    autoFocus: { control: "boolean", table: { category: "Element" } },
    autoComplete: { control: "text", table: { category: "Element" } },
    dir: optionalSelect(["ltr", "rtl", "auto"], "Element"),
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    "aria-describedby": { control: "text", table: { category: "Accessibility" } },
    triggerLabel: { control: "text", table: { category: "Accessibility" } },
    previousMonthLabel: { control: "text", table: { category: "Accessibility" } },
    nextMonthLabel: { control: "text", table: { category: "Accessibility" } },

    onChange: { table: { category: "Events" } },
    onFocus: { table: { category: "Events" } },
    onBlur: { table: { category: "Events" } },
    onKeyDown: { table: { category: "Events" } },

    role: HIDDEN,
    "aria-expanded": HIDDEN,
    "aria-controls": HIDDEN,
    "aria-activedescendant": HIDDEN,
    "aria-haspopup": HIDDEN,
    "aria-autocomplete": HIDDEN,
    rows: HIDDEN,
    children: HIDDEN,
    ref: HIDDEN,
    className: HIDDEN,
    style: HIDDEN,
    "data-testid": HIDDEN,
  },
  // Recompose the converted args; the result is checked against DateFieldProps.
  render: function Render({
    controlled,
    value,
    defaultValue,
    min,
    max,
    isDateDisabled,
    start,
    ghostRest,
    ghostHover,
    ghostFocus,
    backgroundColor,
    backgroundColorTheme,
    borderColor,
    borderColorTheme,
    onChange,
    ...rest
  }) {
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    // Local mirror of `value`: the test runner renders without a manager, so updateArgs
    // alone does not re-render there.
    const [current, setCurrent] = useState(toIso(value) ?? null)
    useEffect(() => setCurrent(toIso(value) ?? null), [value])
    const props: DateFieldProps = {
      ...rest,
      min: toIso(min),
      max: toIso(max),
      isDateDisabled: IS_DATE_DISABLED_PRESETS[isDateDisabled],
      start: START_PRESETS[start],
      ghost: toGhost({ rest: ghostRest, hover: ghostHover, focus: ghostFocus }),
      backgroundColor: toColorProp(backgroundColor, backgroundColorTheme),
      borderColor: toColorProp(borderColor, borderColorTheme),
    }
    if (!controlled) {
      // Remount when the initial date changes, so the control takes effect.
      return <DateField key={String(defaultValue)} {...props} defaultValue={toIso(defaultValue) ?? null} onChange={onChange} />
    }
    return (
      <DateField
        {...props}
        value={current}
        onChange={next => {
          onChange?.(next)
          setCurrent(next)
          updateArgs({ value: next === null ? undefined : toTimestamp(next) })
        }}
      />
    )
  },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Start date" })
    await expect(input).toHaveValue("Oct 15, 2026")
    await expect(input).toHaveAttribute("readonly")
    await userEvent.click(canvas.getByRole("button", { name: "Choose date" }))
    // The popover renders in a portal on document.body.
    const dialog = await within(document.body).findByRole("dialog", { name: "Choose date" })
    await waitFor(() => expect(within(dialog).getByRole("button", { name: "Thursday, October 15, 2026" })).toHaveFocus())
    await userEvent.click(within(dialog).getByRole("button", { name: "Tuesday, October 20, 2026" }))
    await expect(args.onChange).toHaveBeenCalledWith("2026-10-20")
    await waitFor(() => expect(input).toHaveValue("Oct 20, 2026"))
    await waitFor(() => expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument())
  },
}

export const Uncontrolled: Story = {
  ...Playground,
  args: { ...Playground.args, controlled: false, defaultValue: undefined, placeholder: "Pick a date" },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Start date" })
    await expect(input).toHaveValue("")
    await expect(input).toHaveAttribute("placeholder", "Pick a date")
    await userEvent.click(canvas.getByRole("button", { name: "Choose date" }))
    const dialog = await within(document.body).findByRole("dialog", { name: "Choose date" })
    // No value: the visible month is the current one, so pick its first enabled day.
    const day = within(dialog).getAllByRole("button").find(button => button.hasAttribute("data-date"))!
    await userEvent.click(day)
    await expect(args.onChange).toHaveBeenCalledWith(day.dataset.date)
    await expect(input).not.toHaveValue("")
  },
}

export const Escape: Story = {
  ...Playground,
  play: async ({ canvasElement, args, userEvent }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Choose date" }))
    await within(document.body).findByRole("dialog", { name: "Choose date" })
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument())
    await expect(args.onChange).not.toHaveBeenCalled()
  },
}

export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("textbox", { name: "Start date" })).toBeDisabled()
    await expect(canvas.getByRole("button", { name: "Choose date" })).toBeDisabled()
  },
}

export const StatusDisabled: Story = {
  ...Playground,
  args: { ...Playground.args, status: "disabled" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button", { name: "Choose date" })).toBeDisabled()
  },
}

export const Name: Story = {
  ...Playground,
  args: { ...Playground.args, name: "start" },
  play: async ({ canvasElement }) => {
    // The ISO value rides on a hidden input; the visible input has no name.
    const hidden = canvasElement.querySelector<HTMLInputElement>('input[type="hidden"][name="start"]')
    await expect(hidden?.value).toBe(VALUE)
    await expect(within(canvasElement).getByRole("textbox")).not.toHaveAttribute("name")
  },
}

export const Locale: Story = {
  ...Playground,
  args: { ...Playground.args, locale: "de-DE" },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("textbox")).toHaveValue("15.10.2026")
    await userEvent.click(canvas.getByRole("button", { name: "Choose date" }))
    const dialog = await within(document.body).findByRole("dialog", { name: "Choose date" })
    await expect(within(dialog).getByRole("grid", { name: "Oktober 2026" })).toBeInTheDocument()
  },
}

export const MinMax: Story = {
  ...Playground,
  args: { ...Playground.args, min: toTimestamp("2026-10-10"), max: toTimestamp("2026-10-20"), isDateDisabled: "weekends" },
  play: async ({ canvasElement, args, userEvent }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Choose date" }))
    const dialog = within(await within(document.body).findByRole("dialog", { name: "Choose date" }))
    await expect(dialog.getByRole("button", { name: "Friday, October 9, 2026" })).toHaveAttribute("aria-disabled", "true")
    await expect(dialog.getByRole("button", { name: "Wednesday, October 21, 2026" })).toHaveAttribute("aria-disabled", "true")
    const saturday = dialog.getByRole("button", { name: "Saturday, October 17, 2026" })
    await expect(saturday).toHaveAttribute("aria-disabled", "true")
    await userEvent.click(saturday)
    await expect(args.onChange).not.toHaveBeenCalled()
  },
}

export const Required: Story = {
  ...Playground,
  args: { ...Playground.args, required: true, id: "start-date" },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox")
    await expect(input).toBeRequired()
    await expect(input).toHaveAttribute("id", "start-date")
  },
}

export const InvalidField: Story = {
  ...Playground,
  decorators: [
    Story => (
      <Field label="Start date" invalid error="Pick a start date">
        <Story />
      </Field>
    ),
  ],
  args: { ...Playground.args, "aria-label": undefined },
  play: async ({ canvasElement }) => {
    // With no status set, the invalid Field's error status reaches the input.
    const input = within(canvasElement).getByRole("textbox", { name: "Start date" })
    await expect(input).toHaveAttribute("aria-invalid", "true")
    await expect(within(canvasElement).getByText("Pick a start date")).toBeInTheDocument()
    const probe = document.createElement("div")
    probe.style.borderColor = getToken("input.borderColor:error")
    canvasElement.appendChild(probe)
    await expect(getComputedStyle(input.parentElement!).borderTopColor).toBe(getComputedStyle(probe).borderTopColor)
    probe.remove()
  },
}

export const Labels: Story = {
  ...Playground,
  args: { ...Playground.args, locale: "de-DE", triggerLabel: "Datum wählen", previousMonthLabel: "Vorheriger Monat", nextMonthLabel: "Nächster Monat" },
  play: async ({ canvasElement, userEvent }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Datum wählen" }))
    const dialog = within(await within(document.body).findByRole("dialog", { name: "Datum wählen" }))
    await expect(await dialog.findByRole("button", { name: "Vorheriger Monat" })).toBeInTheDocument()
    await expect(dialog.getByRole("button", { name: "Nächster Monat" })).toBeInTheDocument()
  },
}
