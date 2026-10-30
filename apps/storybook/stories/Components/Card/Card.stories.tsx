import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { BorderRadiusType, GapType } from "@niceprototypes/styles"
import { Card, CardBody, CardFooter, CardHeader } from "@niceprototypes/card"
import type { CardBackgroundColorType, CardProps, CardVariantType } from "@niceprototypes/card"

/** Option lists, typed against the unions on disk so a renamed token fails the build. */
const VARIANT_OPTIONS = ["outline", "elevated", "filled"] as const satisfies readonly CardVariantType[]
const GAP_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly GapType[]
const BORDER_RADIUS_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly BorderRadiusType[]
const BACKGROUND_COLOR_OPTIONS = ["base", "raised", "success", "highlight", "warning", "error", "link"] as const satisfies readonly CardBackgroundColorType[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** An unset choice for optional selects; `mapping` turns it into `undefined` (the token default). */
const NONE = "unset"

/**
 * PlaygroundArgs
 *
 * CardProps plus story args: `clickable` sets `onClick` (the `onCardClick` spy), `title` and
 * `description` fill a CardHeader, `showFooter` adds a CardFooter.
 */
type PlaygroundArgs = Omit<CardProps, "children" | "onClick"> & {
  clickable: boolean
  onCardClick: CardProps["onClick"]
  title: string
  description: string
  showFooter: boolean
}

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Card>

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
    variant: "outline",
    clickable: false,
    onCardClick: fn(),
    disabled: false,
    title: "Plan",
    description: "Billed monthly.",
    showFooter: false,
  },
  argTypes: {
    variant: select(VARIANT_OPTIONS, "Appearance"),
    // Explicit select overrides preview.tsx's `color` matcher (a colour picker).
    backgroundColor: optionalSelect(BACKGROUND_COLOR_OPTIONS, "Appearance"),
    borderRadius: optionalSelect(BORDER_RADIUS_OPTIONS, "Appearance"),
    theme: optionalSelect(THEME_OPTIONS, "Appearance"),
    padding: optionalSelect(GAP_OPTIONS, "Spacing"),
    gap: optionalSelect(GAP_OPTIONS, "Spacing"),

    clickable: { control: "boolean", table: { category: "Interaction" } },
    href: { control: "text", table: { category: "Interaction" } },
    selected: { control: "boolean", table: { category: "Interaction" } },
    disabled: { control: "boolean", table: { category: "Interaction" } },

    title: { control: "text", table: { category: "Content" } },
    description: { control: "text", table: { category: "Content" } },
    showFooter: { control: "boolean", table: { category: "Content" } },

    onCardClick: { table: { category: "Events" } },
    ref: { table: { disable: true } },
  },
  render: ({ clickable, onCardClick, title, description, showFooter, ...rest }) => (
    <Card {...rest} onClick={clickable ? onCardClick : undefined}>
      <CardHeader title={title} description={description} />
      <CardBody>Body</CardBody>
      {showFooter ? <CardFooter>Footer</CardFooter> : null}
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const card = within(canvasElement).getByText("Body").parentElement!
    await expect(card.tagName).toBe("DIV")
    await expect(within(card).getByRole("heading", { name: "Plan" })).toBeInTheDocument()
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

/** The card root: CardBody's parent (the canvas also holds the StylesProvider decorator's nodes). */
const cardOf = (canvasElement: HTMLElement) => within(canvasElement).getByText("Body").parentElement!

export const Outline: Story = {
  ...Playground,
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(cardOf(canvasElement))
    await expect(style.borderTopColor).toBe(resolveCss(canvasElement, "border-top-color", getToken("card.borderColor:base")))
    await expect(style.boxShadow).toBe("none")
  },
}

export const Elevated: Story = {
  ...Playground,
  args: { ...Playground.args, variant: "elevated" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(cardOf(canvasElement))
    await expect(style.boxShadow).toBe(resolveCss(canvasElement, "box-shadow", getToken("card.boxShadow:elevated")))
    await expect(style.borderTopColor).toBe("rgba(0, 0, 0, 0)")
  },
}

export const Filled: Story = {
  ...Playground,
  args: { ...Playground.args, variant: "filled" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(cardOf(canvasElement))
    await expect(style.backgroundColor).toBe(
      resolveCss(canvasElement, "background-color", getToken("card.backgroundColor:raised")),
    )
    await expect(style.borderTopColor).toBe("rgba(0, 0, 0, 0)")
  },
}

export const Clickable: Story = {
  ...Playground,
  args: { ...Playground.args, clickable: true },
  play: async ({ canvasElement, args, userEvent }) => {
    const button = within(canvasElement).getByRole("button", { name: /Plan/ })
    await expect(button).not.toHaveAttribute("aria-pressed")
    await userEvent.click(button)
    button.focus()
    await userEvent.keyboard("{Enter}")
    await expect(args.onCardClick).toHaveBeenCalledTimes(2)
  },
}

export const Selected: Story = {
  ...Playground,
  args: { ...Playground.args, clickable: true, selected: true },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: /Plan/, pressed: true })
    await expect(getComputedStyle(button).borderTopColor).toBe(
      resolveCss(canvasElement, "border-top-color", getToken("card.borderColor:selected")),
    )
  },
}

export const Href: Story = {
  ...Playground,
  args: { ...Playground.args, href: "#plans" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("link", { name: /Plan/ })).toHaveAttribute("href", "#plans")
  },
}

export const Disabled: Story = {
  ...Playground,
  args: { ...Playground.args, clickable: true, disabled: true },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button", { name: /Plan/ })
    await expect(button).toBeDisabled()
    button.click()
    await expect(args.onCardClick).not.toHaveBeenCalled()
  },
}

export const Spacing: Story = {
  ...Playground,
  args: { ...Playground.args, padding: "larger", gap: "small", borderRadius: "none" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(cardOf(canvasElement))
    await expect(style.paddingTop).toBe(resolveCss(canvasElement, "padding-top", getToken("gap", "larger")))
    await expect(style.rowGap).toBe(resolveCss(canvasElement, "row-gap", getToken("gap", "small")))
    await expect(style.borderTopLeftRadius).toBe("0px")
  },
}

export const BackgroundColor: Story = {
  ...Playground,
  args: { ...Playground.args, backgroundColor: "success" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(cardOf(canvasElement)).backgroundColor).toBe(
      resolveCss(canvasElement, "background-color", getToken("card.backgroundColor:success")),
    )
  },
}

export const ShowFooter: Story = {
  ...Playground,
  args: { ...Playground.args, showFooter: true },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(within(canvasElement).getByText("Footer")).justifyContent).toBe("flex-end")
  },
}
