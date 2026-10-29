import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, waitFor, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { BorderColorType, BorderRadiusType, BorderWidthType, SizeType } from "@niceprototypes/styles"
import { iconNames } from "@niceprototypes/icon"
import Checkbox from "@niceprototypes/checkbox"
import type { CheckboxBackgroundColorType, CheckboxProps } from "@niceprototypes/checkbox"

/**
 * Option lists. Union props are typed against the union on disk, so a renamed token fails
 * the build; border colours and themes are read from the token data at runtime.
 */
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const BACKGROUND_COLOR_OPTIONS = ["base", "link", "success", "highlight", "warning", "error"] as const satisfies readonly CheckboxBackgroundColorType[]
const BORDER_RADIUS_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly BorderRadiusType[]
const BORDER_WIDTH_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly BorderWidthType[]
const BORDER_COLOR_OPTIONS = Object.keys(themeTokensData.day.borderColor) as BorderColorType[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * PlaygroundArgs
 *
 * CheckboxProps with the colour props flattened into a variant arg plus a theme-pin arg each,
 * recomposed in `render`, and `controlled`: on, `checked` drives the box and `onChange` writes
 * it back to the args; off, the box is uncontrolled and starts at `defaultChecked`.
 */
type PlaygroundArgs = Omit<CheckboxProps, "backgroundColor" | "borderColor"> & {
  controlled: boolean
  backgroundColor: CheckboxBackgroundColorType
  backgroundColorTheme: string
  borderColor: BorderColorType
  borderColorTheme: string
}

/** A colour variant, or `{ name, theme }` when a theme pin is set. */
const toColorProp = <V extends string>(name: V, theme: string | undefined) =>
  theme && theme !== NONE ? { name, theme } : name

const meta = {
  title: "Components/Forms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Checkbox>

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
    children: "Visible",
    controlled: true,
    checked: false,
    defaultChecked: false,
    onChange: fn(),
    disabled: false,
    size: "base",
    backgroundColor: "link",
    backgroundColorTheme: NONE,
    borderColor: "strong",
    borderColorTheme: NONE,
    borderRadius: "small",
    borderWidth: "base",
    iconName: "check",
    iconVendor: false,
  },
  argTypes: {
    controlled: { control: "boolean", table: { category: "State" } },
    checked: { control: "boolean", table: { category: "State" } },
    defaultChecked: { control: "boolean", table: { category: "State" } },
    disabled: { control: "boolean", table: { category: "State" } },

    children: { control: "text", table: { category: "Content" } },
    iconName: select(iconNames, "Content"),
    iconVendor: { control: "boolean", table: { category: "Content" } },

    size: select(SIZE_OPTIONS, "Appearance"),
    theme: optionalSelect(THEME_OPTIONS, "Appearance"),

    // Explicit selects override preview.tsx's `color` matcher (a colour picker).
    backgroundColor: select(BACKGROUND_COLOR_OPTIONS, "Color"),
    backgroundColorTheme: optionalSelect(THEME_OPTIONS, "Color"),

    borderColor: select(BORDER_COLOR_OPTIONS, "Border"),
    borderColorTheme: optionalSelect(THEME_OPTIONS, "Border"),
    borderRadius: select(BORDER_RADIUS_OPTIONS, "Border"),
    borderWidth: select(BORDER_WIDTH_OPTIONS, "Border"),

    name: { control: "text", table: { category: "Element" } },
    id: { control: "text", table: { category: "Element" } },
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    "aria-labelledby": { control: "text", table: { category: "Accessibility" } },

    onChange: { table: { category: "Events" } },

    ref: HIDDEN,
    className: HIDDEN,
  },
  // Recompose the flattened args; the result is checked against CheckboxProps.
  render: function Render({
    controlled,
    checked,
    defaultChecked,
    onChange,
    backgroundColor,
    backgroundColorTheme,
    borderColor,
    borderColorTheme,
    ...rest
  }) {
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    // Local mirror of `checked`: the test runner renders without a manager, so updateArgs
    // alone does not re-render there.
    const [current, setCurrent] = useState(checked)
    useEffect(() => setCurrent(checked), [checked])
    const props: CheckboxProps = {
      ...rest,
      backgroundColor: toColorProp(backgroundColor, backgroundColorTheme),
      borderColor: toColorProp(borderColor, borderColorTheme),
    }
    if (!controlled) {
      // Remount when the initial state changes, so the control takes effect.
      return <Checkbox key={String(defaultChecked)} {...props} defaultChecked={defaultChecked} onChange={onChange} />
    }
    return (
      <Checkbox
        {...props}
        checked={current}
        onChange={(next, event) => {
          onChange?.(next, event)
          setCurrent(next)
          updateArgs({ checked: next })
        }}
      />
    )
  },
  play: async ({ canvasElement, args, userEvent }) => {
    const checkbox = within(canvasElement).getByRole("checkbox", { name: "Visible" })
    await expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    await expect(args.onChange).toHaveBeenCalledWith(true, expect.anything())
    await waitFor(() => expect(checkbox).toBeChecked())
    // Clicking the label text toggles too.
    await userEvent.click(within(canvasElement).getByText("Visible"))
    await waitFor(() => expect(checkbox).not.toBeChecked())
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

/** The visual box: the input's next sibling. */
const box = (canvasElement: HTMLElement) =>
  within(canvasElement).getByRole("checkbox").nextElementSibling as HTMLElement

export const Checked: Story = {
  ...Playground,
  args: { ...Playground.args, checked: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("checkbox")).toBeChecked()
    await expect(box(canvasElement).querySelector("svg")).toBeVisible()
  },
}

export const Uncontrolled: Story = {
  ...Playground,
  args: { ...Playground.args, controlled: false, defaultChecked: true },
  play: async ({ canvasElement, args, userEvent }) => {
    const checkbox = within(canvasElement).getByRole("checkbox")
    await expect(checkbox).toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
    await expect(args.onChange).toHaveBeenCalledWith(false, expect.anything())
  },
}

export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, disabled: true },
  play: async ({ canvasElement, args }) => {
    const checkbox = within(canvasElement).getByRole("checkbox")
    await expect(checkbox).toBeDisabled()
    checkbox.click()
    await expect(args.onChange).not.toHaveBeenCalled()
    await expect(checkbox).not.toBeChecked()
  },
}

export const AriaLabel: Story = {
  ...Playground,
  args: { ...Playground.args, children: undefined, "aria-label": "Select row" },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole("checkbox", { name: "Select row" })
    // Without children there is no wrapping label.
    await expect(checkbox.closest("label")).toBeNull()
  },
}

export const Name: Story = {
  ...Playground,
  args: { ...Playground.args, name: "visible", id: "visible-checkbox" },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole("checkbox")
    await expect(checkbox).toHaveAttribute("name", "visible")
    await expect(checkbox).toHaveAttribute("id", "visible-checkbox")
  },
}

export const Size: Story = {
  ...Playground,
  args: { ...Playground.args, size: "larger" },
  play: async ({ canvasElement }) => {
    const root = within(canvasElement).getByRole("checkbox").parentElement!
    await expect(getComputedStyle(root).width).toBe(resolveCss(canvasElement, "width", getToken("checkbox.size:larger")))
  },
}

export const BackgroundColor: Story = {
  ...Playground,
  args: { ...Playground.args, checked: true, backgroundColor: "error" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(box(canvasElement)).backgroundColor).toBe(
      resolveCss(canvasElement, "background-color", getToken("checkbox.backgroundColor:error")),
    )
  },
}

export const Border: Story = {
  ...Playground,
  args: { ...Playground.args, borderWidth: "larger", borderRadius: "larger" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(box(canvasElement))
    // Read through `width`: a probe without a border style computes any border width to 0.
    await expect(style.borderTopWidth).toBe(resolveCss(canvasElement, "width", getToken("checkbox.borderWidth:larger")))
    await expect(style.borderTopLeftRadius).toBe(resolveCss(canvasElement, "border-top-left-radius", getToken("checkbox.borderRadius:larger")))
  },
}

export const IconName: Story = {
  ...Playground,
  args: { ...Playground.args, checked: true, iconName: "minus" },
  play: async ({ canvasElement }) => {
    await expect(box(canvasElement).querySelector("svg")).toBeTruthy()
  },
}
