import type { ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { themeTokensData } from "@niceprototypes/styles"
import { Field } from "@niceprototypes/field"
import type { FieldProps } from "@niceprototypes/field"
import Input from "@niceprototypes/input"
import Select from "@niceprototypes/select"
import Checkbox from "@niceprototypes/checkbox"

const THEME_OPTIONS = Object.keys(themeTokensData)

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** `children` presets: the controls that apply `useField()`. */
const CHILDREN_PRESETS: Record<string, ReactNode> = {
  Input: <Input />,
  Select: (
    <Select
      options={[
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
      ]}
    />
  ),
  Checkbox: <Checkbox />,
}

/**
 * PlaygroundArgs
 *
 * FieldProps with `children` as a preset name, mapped to the control in `argTypes`.
 */
type PlaygroundArgs = Omit<FieldProps, "children"> & { children: string }

const meta = {
  title: "Components/Forms/Field",
  component: Field,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<PlaygroundArgs>

const HIDDEN = { table: { disable: true } }

export const Playground: Story = {
  args: {
    label: "Email",
    description: "We never share it.",
    error: "",
    invalid: false,
    required: false,
    optionalLabel: "(optional)",
    children: "Input",
  },
  argTypes: {
    label: { control: "text", table: { category: "Content" } },
    description: { control: "text", table: { category: "Content" } },
    error: { control: "text", table: { category: "Content" } },
    optionalLabel: { control: "text", table: { category: "Content" } },
    children: { control: "select", options: Object.keys(CHILDREN_PRESETS), table: { category: "Content" } },
    invalid: { control: "boolean", table: { category: "State" } },
    required: { control: "boolean", table: { category: "State" } },
    theme: { control: "select", options: [NONE, ...THEME_OPTIONS], mapping: { [NONE]: undefined }, table: { category: "Appearance" } },
    id: { control: "text", table: { category: "Element" } },
    ref: HIDDEN,
    className: HIDDEN,
  },
  // Resolve the children preset; empty text args render nothing. The result is checked against FieldProps.
  render: ({ children, description, error, optionalLabel, ...rest }) => {
    const props: FieldProps = {
      ...rest,
      description: description || undefined,
      error: error || undefined,
      optionalLabel: optionalLabel || undefined,
      children: CHILDREN_PRESETS[children],
    }
    return <Field {...props} />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText(/Email/)
    await expect(input).toHaveAccessibleDescription("We never share it.")
    await expect(input).not.toHaveAttribute("aria-invalid")
    await expect(input).not.toBeRequired()
    await expect(canvas.getByText("(optional)")).toBeInTheDocument()
  },
}

export const Invalid: Story = {
  ...Playground,
  args: { ...Playground.args, error: "Enter a valid email.", invalid: true },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText(/Email/)
    await expect(input).toHaveAttribute("aria-invalid", "true")
    await expect(input).toHaveAccessibleDescription("We never share it. Enter a valid email.")
    // The error sits in a polite live region.
    await expect(within(canvasElement).getByText("Enter a valid email.").closest("[aria-live]")).toHaveAttribute("aria-live", "polite")
  },
}

export const Required: Story = {
  ...Playground,
  args: { ...Playground.args, required: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByLabelText("Email")).toBeRequired()
    // A required field shows no optional label.
    await expect(canvas.queryByText("(optional)")).not.toBeInTheDocument()
  },
}

export const Id: Story = {
  ...Playground,
  args: { ...Playground.args, id: "contact-email" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByLabelText(/Email/)).toHaveAttribute("id", "contact-email")
  },
}

export const WithSelect: Story = {
  ...Playground,
  args: { ...Playground.args, label: "Country", description: "", optionalLabel: "", children: "Select", invalid: true },
  play: async ({ canvasElement }) => {
    const control = within(canvasElement).getByLabelText("Country")
    await expect(control).toHaveAttribute("aria-invalid", "true")
  },
}

export const WithCheckbox: Story = {
  ...Playground,
  args: { ...Playground.args, label: "Subscribe", description: "Weekly, no spam.", optionalLabel: "", children: "Checkbox", required: true },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole("checkbox", { name: "Subscribe" })
    await expect(checkbox).toHaveAccessibleDescription("Weekly, no spam.")
    await expect(checkbox).toBeRequired()
  },
}
