import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { themeTokensData } from "@niceprototypes/styles"
import Button from "@niceprototypes/button"
import Input from "@niceprototypes/input"
import Form from "@niceprototypes/form"
import type { FormOnSubmitType } from "@niceprototypes/form"

const THEME_OPTIONS = Object.keys(themeTokensData)
const AUTO_COMPLETE_OPTIONS = ["on", "off"]

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** `children` presets: a required email field and a submit button. */
const CHILDREN_PRESETS = {
  field: (
    <>
      <Input type="email" name="email" aria-label="Email" required />
      <Button type="submit">Submit</Button>
    </>
  ),
}

const HIDDEN = { table: { disable: true } }

const meta = {
  title: "Components/Forms/Form",
  component: Form,
  parameters: {
    layout: "padded",
  },
  args: {
    children: "field",
    onSubmit: fn(),
    preventDefault: true,
    noValidate: false,
  },
  argTypes: {
    children: { control: "select", options: Object.keys(CHILDREN_PRESETS), mapping: CHILDREN_PRESETS },
    onSubmit: { table: { category: "Events" } },
    preventDefault: { control: "boolean" },
    noValidate: { control: "boolean" },
    autoComplete: { control: "select", options: [NONE, ...AUTO_COMPLETE_OPTIONS], mapping: { [NONE]: undefined } },
    name: { control: "text" },
    theme: { control: "select", options: [NONE, ...THEME_OPTIONS], mapping: { [NONE]: undefined } },
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    "aria-describedby": { control: "text", table: { category: "Accessibility" } },
    ref: HIDDEN,
    className: HIDDEN,
    style: HIDDEN,
    id: HIDDEN,
    "data-testid": HIDDEN,
  },
} satisfies Meta<typeof Form>

export default meta

type Story = StoryObj<typeof meta>

const EMAIL = "ada@example.com"

export const Playground: Story = {
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole("textbox", { name: "Email" }), EMAIL)
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }))
    await expect(args.onSubmit).toHaveBeenCalledTimes(1)
  },
}

/** Native constraint validation blocks submission of the empty required field. */
export const Validation: Story = {
  play: async ({ canvasElement, args, userEvent }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Submit" }))
    await expect(args.onSubmit).not.toHaveBeenCalled()
  },
}

export const NoValidate: Story = {
  args: { noValidate: true },
  play: async ({ canvasElement, args, userEvent }) => {
    await expect(canvasElement.querySelector("form")).toHaveAttribute("novalidate")
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Submit" }))
    await expect(args.onSubmit).toHaveBeenCalledTimes(1)
  },
}

/** Whether Form had prevented the submit event when `onSubmit` received it. */
let receivedPrevented: boolean | undefined

/**
 * preventDefault off: Form leaves the event alone. The handler records that, then prevents
 * the navigation itself so the canvas stays loaded.
 */
const recordAndPrevent: FormOnSubmitType = event => {
  receivedPrevented = event.isDefaultPrevented()
  event.preventDefault()
}

export const NativeSubmit: Story = {
  args: { preventDefault: false, onSubmit: fn(recordAndPrevent) },
  play: async ({ canvasElement, args, userEvent }) => {
    receivedPrevented = undefined
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole("textbox", { name: "Email" }), EMAIL)
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }))
    await expect(args.onSubmit).toHaveBeenCalledTimes(1)
    await expect(receivedPrevented).toBe(false)
  },
}

export const PreventDefault: Story = {
  args: { onSubmit: fn(recordAndPrevent) },
  play: async ({ canvasElement, userEvent }) => {
    receivedPrevented = undefined
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole("textbox", { name: "Email" }), EMAIL)
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }))
    await expect(receivedPrevented).toBe(true)
  },
}

export const Attributes: Story = {
  args: { name: "signup", autoComplete: "off", "aria-label": "Sign up", "aria-describedby": "signup-hint" },
  play: async ({ canvasElement }) => {
    const form = within(canvasElement).getByRole("form", { name: "Sign up" })
    await expect(form).toHaveAttribute("name", "signup")
    await expect(form).toHaveAttribute("autocomplete", "off")
    await expect(form).toHaveAttribute("aria-describedby", "signup-hint")
  },
}

export const Theme: Story = {
  args: { theme: "night" },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("form")?.closest("[data-theme]")).toHaveAttribute("data-theme", "night")
  },
}
