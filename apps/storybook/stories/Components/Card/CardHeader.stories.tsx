import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Card, CardHeader } from "@niceprototypes/card"
import type { CardHeaderProps } from "@niceprototypes/card"
import type { InkAsType } from "@niceprototypes/ink"

/** Heading levels for `titleProps.as`. */
const TITLE_AS_OPTIONS = ["h1", "h2", "h3", "h4"] as const satisfies readonly InkAsType[]

/**
 * PlaygroundArgs
 *
 * CardHeaderProps with `end` as text and `titleProps.as` flattened to `titleAs`.
 */
type PlaygroundArgs = Omit<CardHeaderProps, "end" | "titleProps"> & {
  end: string
  titleAs: (typeof TITLE_AS_OPTIONS)[number]
}

const meta = {
  title: "Components/CardHeader",
  component: CardHeader,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CardHeader>

export default meta

type Story = StoryObj<PlaygroundArgs>

/** The header row: the card's only child (the canvas also holds the StylesProvider decorator's nodes). */
const headerOf = (canvasElement: HTMLElement) =>
  within(canvasElement).getByRole("heading", { name: "Plan" }).parentElement!.parentElement!

export const Playground: Story = {
  args: {
    title: "Plan",
    description: "Billed monthly.",
    end: "Active",
    titleAs: "h3",
  },
  argTypes: {
    title: { control: "text", table: { category: "Content" } },
    description: { control: "text", table: { category: "Content" } },
    end: { control: "text", table: { category: "Content" } },
    children: { control: "text", table: { category: "Content" } },
    titleAs: { control: "select", options: TITLE_AS_OPTIONS, table: { category: "Title" } },
    descriptionProps: { table: { disable: true } },
  },
  render: ({ end, titleAs, ...rest }) => (
    <Card>
      <CardHeader {...rest} titleProps={{ as: titleAs }} end={end || undefined} />
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 3, name: "Plan" })).toBeInTheDocument()
    // Title, description, then end, in DOM order.
    await expect(headerOf(canvasElement).textContent).toBe("PlanBilled monthly.Active")
  },
}

export const TitleAs: Story = {
  ...Playground,
  args: { ...Playground.args, titleAs: "h2" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("heading", { level: 2, name: "Plan" })).toBeInTheDocument()
  },
}

export const Children: Story = {
  ...Playground,
  args: { ...Playground.args, children: "Extra" },
  play: async ({ canvasElement }) => {
    await expect(headerOf(canvasElement).textContent).toBe("PlanBilled monthly.ExtraActive")
  },
}
