import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Card, CardFooter } from "@niceprototypes/card"
import type { CardFooterJustifyContentType, CardFooterProps } from "@niceprototypes/card"

const JUSTIFY_CONTENT_OPTIONS = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
] as const satisfies readonly CardFooterJustifyContentType[]

const meta = {
  title: "Components/CardFooter",
  // A subcomponent: documented on its parent's page; its stories run as tests only.
  tags: ["!dev"],
  component: CardFooter,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CardFooter>

export default meta

type Story = StoryObj<CardFooterProps>

export const Playground: Story = {
  args: {
    children: "Footer",
    justifyContent: "flex-end",
  },
  argTypes: {
    children: { control: "text", table: { category: "Content" } },
    justifyContent: { control: "select", options: JUSTIFY_CONTENT_OPTIONS, table: { category: "Layout" } },
  },
  render: args => (
    <Card>
      <CardFooter {...args} />
    </Card>
  ),
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(within(canvasElement).getByText("Footer")).justifyContent).toBe("flex-end")
  },
}

export const JustifyContent: Story = {
  ...Playground,
  args: { ...Playground.args, justifyContent: "space-between" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(within(canvasElement).getByText("Footer")).justifyContent).toBe("space-between")
  },
}
