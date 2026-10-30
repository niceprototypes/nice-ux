import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, waitFor, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { BorderColorType, GapType, SizeType } from "@niceprototypes/styles"
import { Field } from "@niceprototypes/field"
import { Radio, RadioGroup } from "@niceprototypes/radio"
import type { RadioBackgroundColorType, RadioGroupDirectionType, RadioGroupProps } from "@niceprototypes/radio"

/**
 * Option lists. Union props are typed against the union on disk, so a renamed token fails
 * the build; border colours and themes are read from the token data at runtime.
 */
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const GAP_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly GapType[]
const DIRECTION_OPTIONS = ["row", "column"] as const satisfies readonly RadioGroupDirectionType[]
const BACKGROUND_COLOR_OPTIONS = ["base", "link", "success", "highlight", "warning", "error"] as const satisfies readonly RadioBackgroundColorType[]
const BORDER_COLOR_OPTIONS = Object.keys(themeTokensData.day.borderColor) as BorderColorType[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** The story's options: value → label. */
const PLANS = { free: "Free", pro: "Pro", team: "Team" } as const
const PLAN_VALUES = Object.keys(PLANS) as (keyof typeof PLANS)[]

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * PlaygroundArgs
 *
 * RadioGroupProps plus story args: `disabledOption` sets one Radio's own `disabled`; `inField`
 * wraps the group in a Field built from the `field*` args. With `value` set the group is
 * controlled and `onChange` writes the new value back to the args; unset, it is uncontrolled
 * and starts at `defaultValue`.
 */
type PlaygroundArgs = Omit<RadioGroupProps, "children"> & {
  disabledOption?: string
  inField: boolean
  fieldLabel: string
  fieldDescription: string
  fieldError: string
  fieldInvalid: boolean
}

const meta = {
  title: "Components/Forms/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof RadioGroup>

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

export const Playground: Story = {
  args: {
    "aria-label": "Plan",
    defaultValue: "free",
    onChange: fn(),
    name: "plan",
    disabled: false,
    required: false,
    direction: "column",
    gap: "small",
    size: "base",
    backgroundColor: "base",
    borderColor: "base",
    inField: false,
    fieldLabel: "Plan",
    fieldDescription: "Billed monthly.",
    fieldError: "Pick a plan",
    fieldInvalid: false,
  },
  argTypes: {
    value: optionalSelect(PLAN_VALUES, "State"),
    defaultValue: optionalSelect(PLAN_VALUES, "State"),
    disabled: { control: "boolean", table: { category: "State" } },
    disabledOption: optionalSelect(PLAN_VALUES, "State"),
    required: { control: "boolean", table: { category: "State" } },

    direction: select(DIRECTION_OPTIONS, "Layout"),
    gap: select(GAP_OPTIONS, "Layout"),

    size: select(SIZE_OPTIONS, "Appearance"),
    theme: optionalSelect(THEME_OPTIONS, "Appearance"),
    // Explicit selects override preview.tsx's `color` matcher (a colour picker).
    backgroundColor: select(BACKGROUND_COLOR_OPTIONS, "Appearance"),
    borderColor: select(BORDER_COLOR_OPTIONS, "Appearance"),

    name: { control: "text", table: { category: "Element" } },
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    "aria-labelledby": { control: "text", table: { category: "Accessibility" } },

    inField: { control: "boolean", table: { category: "Field" } },
    fieldLabel: { control: "text", table: { category: "Field" } },
    fieldDescription: { control: "text", table: { category: "Field" } },
    fieldError: { control: "text", table: { category: "Field" } },
    fieldInvalid: { control: "boolean", table: { category: "Field" } },

    onChange: { table: { category: "Events" } },

    ref: HIDDEN,
  },
  render: function Render({
    value,
    defaultValue,
    onChange,
    disabledOption,
    inField,
    fieldLabel,
    fieldDescription,
    fieldError,
    fieldInvalid,
    ...rest
  }) {
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    // Local mirror of `value`: the test runner renders without a manager, so updateArgs
    // alone does not re-render there.
    const [current, setCurrent] = useState(value)
    useEffect(() => setCurrent(value), [value])
    const radios = PLAN_VALUES.map(plan => (
      <Radio key={plan} value={plan} disabled={plan === disabledOption ? true : undefined}>
        {PLANS[plan]}
      </Radio>
    ))
    const group =
      value === undefined ? (
        // Remount when the initial value changes, so the control takes effect.
        <RadioGroup key={String(defaultValue)} {...rest} defaultValue={defaultValue} onChange={onChange}>
          {radios}
        </RadioGroup>
      ) : (
        <RadioGroup
          {...rest}
          value={current}
          onChange={(next, event) => {
            onChange?.(next, event)
            setCurrent(next)
            updateArgs({ value: next })
          }}
        >
          {radios}
        </RadioGroup>
      )
    if (!inField) return group
    return (
      <Field label={fieldLabel} description={fieldDescription} error={fieldError} invalid={fieldInvalid}>
        {group}
      </Field>
    )
  },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getAllByRole("radiogroup")).toHaveLength(1)
    await expect(canvas.getAllByRole("radio")).toHaveLength(PLAN_VALUES.length)
    await expect(canvas.getByRole("radio", { name: "Free" })).toBeChecked()
    // Clicking a label checks its radio and reports (value, event).
    await userEvent.click(canvas.getByText("Team"))
    await expect(canvas.getByRole("radio", { name: "Team" })).toBeChecked()
    await expect(args.onChange).toHaveBeenCalledWith("team", expect.anything())
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

/** The drawn circle: the input's next sibling. */
const circle = (canvasElement: HTMLElement, name: string) =>
  within(canvasElement).getByRole("radio", { name }).nextElementSibling as HTMLElement

export const ArrowKeys: Story = {
  ...Playground,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement)
    canvas.getByRole("radio", { name: "Free" }).focus()
    await userEvent.keyboard("{ArrowDown}")
    await expect(canvas.getByRole("radio", { name: "Pro" })).toBeChecked()
    await expect(canvas.getByRole("radio", { name: "Free" })).not.toBeChecked()
  },
}

export const Controlled: Story = {
  ...Playground,
  args: { ...Playground.args, value: "pro" },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("radio", { name: "Pro" })).toBeChecked()
    await userEvent.click(canvas.getByText("Team"))
    await expect(args.onChange).toHaveBeenCalledWith("team", expect.anything())
    await waitFor(() => expect(canvas.getByRole("radio", { name: "Team" })).toBeChecked())
  },
}

/** A controlled group whose parent ignores onChange: the checked radio stays at `value`. */
export const ControlledFixed: Story = {
  ...Playground,
  args: { ...Playground.args, value: "pro" },
  render: ({ value, onChange, disabledOption: _disabledOption, inField: _inField, ...rest }) => (
    <RadioGroup {...rest} value={value} onChange={onChange}>
      {PLAN_VALUES.map(plan => (
        <Radio key={plan} value={plan}>
          {PLANS[plan]}
        </Radio>
      ))}
    </RadioGroup>
  ),
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText("Team"))
    await expect(args.onChange).toHaveBeenCalledWith("team", expect.anything())
    await expect(canvas.getByRole("radio", { name: "Pro" })).toBeChecked()
    await expect(canvas.getByRole("radio", { name: "Team" })).not.toBeChecked()
  },
}

export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, disabled: true },
  play: async ({ canvasElement, args }) => {
    const radios = within(canvasElement).getAllByRole("radio")
    for (const radio of radios) await expect(radio).toBeDisabled()
    radios[2].click()
    await expect(args.onChange).not.toHaveBeenCalled()
  },
}

export const DisabledOption: Story = {
  ...Playground,
  args: { ...Playground.args, disabledOption: "pro" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("radio", { name: "Free" })).toBeEnabled()
    await expect(canvas.getByRole("radio", { name: "Pro" })).toBeDisabled()
    await expect(canvas.getByRole("radio", { name: "Team" })).toBeEnabled()
  },
}

export const Required: Story = {
  ...Playground,
  args: { ...Playground.args, required: true },
  play: async ({ canvasElement }) => {
    for (const radio of within(canvasElement).getAllByRole("radio")) await expect(radio).toBeRequired()
  },
}

export const InField: Story = {
  ...Playground,
  args: { ...Playground.args, "aria-label": undefined, inField: true, fieldInvalid: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("radiogroup", { name: "Plan" })
    await expect(group).toHaveAttribute("aria-invalid", "true")
    const descriptionId = canvas.getByText("Billed monthly.").closest("[id]")!.id
    await expect(group.getAttribute("aria-describedby")?.split(" ")).toContain(descriptionId)
  },
}

export const Direction: Story = {
  ...Playground,
  args: { ...Playground.args, direction: "row", gap: "large" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(within(canvasElement).getByRole("radiogroup"))
    await expect(style.flexDirection).toBe("row")
    await expect(style.columnGap).toBe(resolveCss(canvasElement, "column-gap", getToken("gap", "large")))
  },
}

export const Size: Story = {
  ...Playground,
  args: { ...Playground.args, size: "larger" },
  play: async ({ canvasElement }) => {
    const control = within(canvasElement).getByRole("radio", { name: "Free" }).parentElement!
    await expect(getComputedStyle(control).width).toBe(resolveCss(canvasElement, "width", getToken("radio.size:larger")))
  },
}

export const BackgroundColor: Story = {
  ...Playground,
  args: { ...Playground.args, backgroundColor: "error" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(circle(canvasElement, "Free")).backgroundColor).toBe(
      resolveCss(canvasElement, "background-color", getToken("radio.backgroundColor:error")),
    )
  },
}

export const BorderColor: Story = {
  ...Playground,
  args: { ...Playground.args, borderColor: "error" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(circle(canvasElement, "Pro")).borderTopColor).toBe(
      resolveCss(canvasElement, "border-top-color", getToken("radio.borderColor:error")),
    )
  },
}
