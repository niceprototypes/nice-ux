import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect, useState } from "react"
import { useArgs } from "storybook/preview-api"
import { expect, fn, waitFor, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { SizeType } from "@niceprototypes/styles"
import Toggle from "@niceprototypes/toggle"
import type { ToggleProps } from "@niceprototypes/toggle"

const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * PlaygroundArgs
 *
 * ToggleProps plus `controlled`: on, `checked` drives the switch and `onChange` writes it back
 * to the args; off, the switch is uncontrolled and starts at `defaultChecked`.
 */
type PlaygroundArgs = ToggleProps & { controlled: boolean }

const meta = {
  title: "Components/Forms/Toggle",
  component: Toggle,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<PlaygroundArgs>

const HIDDEN = { table: { disable: true } }

export const Playground: Story = {
  args: {
    children: "Notifications",
    controlled: true,
    checked: false,
    defaultChecked: false,
    onChange: fn(),
    disabled: false,
    size: "base",
  },
  argTypes: {
    controlled: { control: "boolean", table: { category: "State" } },
    checked: { control: "boolean", table: { category: "State" } },
    defaultChecked: { control: "boolean", table: { category: "State" } },
    disabled: { control: "boolean", table: { category: "State" } },
    children: { control: "text", table: { category: "Content" } },
    size: { control: "select", options: SIZE_OPTIONS, table: { category: "Appearance" } },
    theme: { control: "select", options: [NONE, ...THEME_OPTIONS], mapping: { [NONE]: undefined }, table: { category: "Appearance" } },
    name: { control: "text", table: { category: "Element" } },
    id: { control: "text", table: { category: "Element" } },
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    "aria-labelledby": { control: "text", table: { category: "Accessibility" } },
    onChange: { table: { category: "Events" } },
    ref: HIDDEN,
    className: HIDDEN,
  },
  render: function Render({ controlled, checked, defaultChecked, onChange, ...rest }) {
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    // Local mirror of `checked`: the test runner renders without a manager, so updateArgs
    // alone does not re-render there.
    const [current, setCurrent] = useState(checked)
    useEffect(() => setCurrent(checked), [checked])
    if (!controlled) {
      // Remount when the initial state changes, so the control takes effect.
      return <Toggle key={String(defaultChecked)} {...rest} defaultChecked={defaultChecked} onChange={onChange} />
    }
    const props: ToggleProps = {
      ...rest,
      checked: current,
      onChange: (next, event) => {
        onChange?.(next, event)
        setCurrent(next)
        updateArgs({ checked: next })
      },
    }
    return <Toggle {...props} />
  },
  play: async ({ canvasElement, args, userEvent }) => {
    const toggle = within(canvasElement).getByRole("switch", { name: "Notifications" })
    await expect(toggle).not.toBeChecked()
    await userEvent.click(toggle)
    await expect(args.onChange).toHaveBeenCalledWith(true, expect.anything())
    await waitFor(() => expect(toggle).toBeChecked())
    // Clicking the label text toggles too.
    await userEvent.click(within(canvasElement).getByText("Notifications"))
    await waitFor(() => expect(toggle).not.toBeChecked())
  },
}

export const Checked: Story = {
  ...Playground,
  args: { ...Playground.args, checked: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("switch")).toBeChecked()
  },
}

export const Uncontrolled: Story = {
  ...Playground,
  args: { ...Playground.args, controlled: false, defaultChecked: true },
  play: async ({ canvasElement, args, userEvent }) => {
    const toggle = within(canvasElement).getByRole("switch")
    await expect(toggle).toBeChecked()
    await userEvent.click(toggle)
    await expect(toggle).not.toBeChecked()
    await expect(args.onChange).toHaveBeenCalledWith(false, expect.anything())
  },
}

export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, disabled: true },
  play: async ({ canvasElement, args }) => {
    const toggle = within(canvasElement).getByRole("switch")
    await expect(toggle).toBeDisabled()
    toggle.click()
    await expect(args.onChange).not.toHaveBeenCalled()
    await expect(toggle).not.toBeChecked()
  },
}

export const AriaLabel: Story = {
  ...Playground,
  args: { ...Playground.args, children: undefined, "aria-label": "Hidden" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("switch", { name: "Hidden" })).toBeInTheDocument()
  },
}

export const Name: Story = {
  ...Playground,
  args: { ...Playground.args, name: "notifications", id: "notifications-toggle" },
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole("switch")
    await expect(toggle).toHaveAttribute("name", "notifications")
    await expect(toggle).toHaveAttribute("id", "notifications-toggle")
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
    // The switch wraps the input; its sibling track takes the toggle.track.width token.
    const track = within(canvasElement).getByRole("switch").nextElementSibling as HTMLElement
    await expect(getComputedStyle(track).width).toBe(resolveCss(canvasElement, "width", getToken("toggle.track.width:larger")))
  },
}
