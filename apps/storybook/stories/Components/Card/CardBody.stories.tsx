import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Card, CardBody, CardFooter } from "@niceprototypes/card"
import type { CardBodyProps } from "@niceprototypes/card"

const meta = {
  title: "Components/CardBody",
  // A subcomponent: documented on its parent's page; its stories run as tests only.
  tags: ["!dev"],
  component: CardBody,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CardBody>

export default meta

type Story = StoryObj<CardBodyProps>

export const Playground: Story = {
  args: {
    children: "Body",
  },
  argTypes: {
    children: { control: "text", table: { category: "Content" } },
  },
  render: args => (
    <Card>
      <CardBody {...args} />
      <CardFooter>Footer</CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement).getByText("Body")
    // The body takes the card's spare height.
    await expect(getComputedStyle(body).flexGrow).toBe("1")
  },
}
