import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { BorderColorType, SizeType } from "@niceprototypes/styles"
import { Radio, RadioGroup } from "@niceprototypes/radio"
import type { RadioBackgroundColorType, RadioProps } from "@niceprototypes/radio"

/**
 * Option lists. Union props are typed against the union on disk, so a renamed token fails
 * the build; border colours are read from the token data at runtime.
 */
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const BACKGROUND_COLOR_OPTIONS = ["base", "link", "success", "highlight", "warning", "error"] as const satisfies readonly RadioBackgroundColorType[]
const BORDER_COLOR_OPTIONS = Object.keys(themeTokensData.day.borderColor) as BorderColorType[]

/** An unset choice for optional selects; `mapping` turns it into `undefined` (the group's value). */
const NONE = "none"

/**
 * PlaygroundArgs
 *
 * RadioProps plus `checked`: the enclosing RadioGroup starts at this Radio's value when on.
 * A Radio always renders inside a RadioGroup, which owns the checked state.
 */
type PlaygroundArgs = RadioProps & { checked: boolean }

const meta = {
  title: "Components/Forms/Radio",
  // A subcomponent: documented on its parent's page; its stories run as tests only.
  tags: ["!dev"],
  component: Radio,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Radio>

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

export const Playground: Story = {
  args: {
    value: "free",
    children: "Free",
    checked: false,
    disabled: false,
  },
  argTypes: {
    checked: { control: "boolean", table: { category: "State" } },
    disabled: { control: "boolean", table: { category: "State" } },
    value: { control: "text", table: { category: "Content" } },
    children: { control: "text", table: { category: "Content" } },
    size: optionalSelect(SIZE_OPTIONS, "Appearance"),
    // Explicit selects override preview.tsx's `color` matcher (a colour picker).
    backgroundColor: optionalSelect(BACKGROUND_COLOR_OPTIONS, "Appearance"),
    borderColor: optionalSelect(BORDER_COLOR_OPTIONS, "Appearance"),
    id: { control: "text", table: { category: "Element" } },
    ref: { table: { disable: true } },
  },
  render: ({ checked, ...props }) => (
    // Remount when the checked state changes, so the control takes effect.
    <RadioGroup key={String(checked)} aria-label="Plan" defaultValue={checked ? props.value : undefined}>
      <Radio {...props} />
    </RadioGroup>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const radio = within(canvasElement).getByRole("radio", { name: "Free" })
    await expect(radio).toHaveAttribute("value", "free")
    await expect(radio).not.toBeChecked()
    await userEvent.click(within(canvasElement).getByText("Free"))
    await expect(radio).toBeChecked()
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
const circle = (canvasElement: HTMLElement) => within(canvasElement).getByRole("radio").nextElementSibling as HTMLElement

export const Checked: Story = {
  ...Playground,
  args: { ...Playground.args, checked: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("radio")).toBeChecked()
    await expect(circle(canvasElement).firstElementChild).toBeVisible()
  },
}

export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, disabled: true },
  play: async ({ canvasElement }) => {
    const radio = within(canvasElement).getByRole("radio")
    await expect(radio).toBeDisabled()
    radio.click()
    await expect(radio).not.toBeChecked()
  },
}

export const Size: Story = {
  ...Playground,
  args: { ...Playground.args, size: "larger" },
  play: async ({ canvasElement }) => {
    const control = within(canvasElement).getByRole("radio").parentElement!
    await expect(getComputedStyle(control).width).toBe(resolveCss(canvasElement, "width", getToken("radio.size:larger")))
  },
}

export const BackgroundColor: Story = {
  ...Playground,
  args: { ...Playground.args, checked: true, backgroundColor: "success" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(circle(canvasElement)).backgroundColor).toBe(
      resolveCss(canvasElement, "background-color", getToken("radio.backgroundColor:success")),
    )
  },
}

export const BorderColor: Story = {
  ...Playground,
  args: { ...Playground.args, borderColor: "link" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(circle(canvasElement)).borderTopColor).toBe(
      resolveCss(canvasElement, "border-top-color", getToken("radio.borderColor:link")),
    )
  },
}

export const Id: Story = {
  ...Playground,
  args: { ...Playground.args, id: "free-radio" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("radio")).toHaveAttribute("id", "free-radio")
  },
}
