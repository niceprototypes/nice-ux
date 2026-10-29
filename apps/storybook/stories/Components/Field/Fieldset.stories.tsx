import type { ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { themeTokensData } from "@niceprototypes/styles"
import { Field, Fieldset } from "@niceprototypes/field"
import type { FieldsetProps } from "@niceprototypes/field"
import Input from "@niceprototypes/input"

const THEME_OPTIONS = Object.keys(themeTokensData)

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** `children` presets: the grouped controls (the docs example). */
const CHILDREN_PRESETS: Record<string, ReactNode> = {
  Fields: (
    <>
      <Field label="Street and number">
        <Input autoComplete="street-address" />
      </Field>
      <Field label="Postcode">
        <Input width="10" autoComplete="postal-code" />
      </Field>
    </>
  ),
}

/**
 * PlaygroundArgs
 *
 * FieldsetProps with `children` as a preset name, resolved in `render`.
 */
type PlaygroundArgs = Omit<FieldsetProps, "children"> & { children: string }

const meta = {
  title: "Components/Forms/Field/Fieldset",
  component: Fieldset,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Fieldset>

export default meta

type Story = StoryObj<PlaygroundArgs>

const HIDDEN = { table: { disable: true } }

export const Playground: Story = {
  args: {
    legend: "Delivery address",
    description: "Where the order is delivered.",
    disabled: false,
    children: "Fields",
  },
  argTypes: {
    legend: { control: "text", table: { category: "Content" } },
    description: { control: "text", table: { category: "Content" } },
    children: { control: "select", options: Object.keys(CHILDREN_PRESETS), table: { category: "Content" } },
    disabled: { control: "boolean", table: { category: "State" } },
    theme: { control: "select", options: [NONE, ...THEME_OPTIONS], mapping: { [NONE]: undefined }, table: { category: "Appearance" } },
    ref: HIDDEN,
    className: HIDDEN,
  },
  // Resolve the children preset; an empty description renders nothing. The result is checked against FieldsetProps.
  render: ({ children, description, ...rest }) => {
    const props: FieldsetProps = {
      ...rest,
      description: description || undefined,
      children: CHILDREN_PRESETS[children],
    }
    return <Fieldset {...props} />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("group", { name: "Delivery address" })
    await expect(group).toHaveAccessibleDescription("Where the order is delivered.")
    await expect(within(group).getAllByRole("textbox")).toHaveLength(2)
    await expect(within(group).getByLabelText("Postcode")).toBeEnabled()
  },
}

export const NoDescription: Story = {
  ...Playground,
  args: { ...Playground.args, description: "" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("group", { name: "Delivery address" })).not.toHaveAttribute("aria-describedby")
  },
}

export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, disabled: true },
  play: async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole("group", { name: "Delivery address" })
    await expect(group).toBeDisabled()
    // The native attribute disables every control inside.
    for (const input of within(group).getAllByRole("textbox")) await expect(input).toBeDisabled()
  },
}
