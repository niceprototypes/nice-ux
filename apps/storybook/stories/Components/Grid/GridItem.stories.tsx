import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Grid, GridItem } from "@niceprototypes/grid"
import type { GridItemAsType, GridItemProps } from "@niceprototypes/grid"

const AS_OPTIONS = ["div", "section", "article", "aside", "li"] as const satisfies readonly GridItemAsType[]

/**
 * PlaygroundArgs
 *
 * GridItemProps with `colSpan` split into `full` and a numeric span, recomposed in `render`.
 * The item renders first in a three-column Grid of three items.
 */
type PlaygroundArgs = Omit<GridItemProps, "colSpan"> & { colSpan: number; full: boolean }

const meta = {
  title: "Components/GridItem",
  // A subcomponent: documented on its parent's page; its stories run as tests only.
  tags: ["!dev"],
  component: GridItem,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof GridItem>

export default meta

type Story = StoryObj<PlaygroundArgs>

export const Playground: Story = {
  args: {
    children: "Item",
    colSpan: 1,
    full: false,
    rowSpan: 1,
    as: "div",
  },
  argTypes: {
    colSpan: { control: { type: "number", min: 1 }, table: { category: "Span" } },
    full: { control: "boolean", table: { category: "Span" } },
    rowSpan: { control: { type: "number", min: 1 }, table: { category: "Span" } },
    as: { control: "select", options: AS_OPTIONS, table: { category: "Element" } },
    children: { control: "text", table: { category: "Content" } },
  },
  render: ({ colSpan, full, as, ...rest }) => (
    <Grid as={as === "li" ? "ul" : "div"} columns={3}>
      <GridItem {...rest} as={as} colSpan={full ? "full" : colSpan} />
      <GridItem as={as}>Second</GridItem>
      <GridItem as={as}>Third</GridItem>
    </Grid>
  ),
  play: async ({ canvasElement }) => {
    const item = within(canvasElement).getByText("Item")
    await expect(getComputedStyle(item).gridColumnStart).toBe("span 1")
  },
}

export const ColSpan: Story = {
  ...Playground,
  args: { ...Playground.args, colSpan: 2 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(getComputedStyle(canvas.getByText("Item")).gridColumnStart).toBe("span 2")
    // Two of three tracks: the item is wider than the next one.
    await expect(canvas.getByText("Item").clientWidth).toBeGreaterThan(canvas.getByText("Second").clientWidth)
  },
}

export const Full: Story = {
  ...Playground,
  args: { ...Playground.args, full: true },
  play: async ({ canvasElement }) => {
    const item = within(canvasElement).getByText("Item")
    await expect(item.clientWidth).toBe(item.parentElement!.clientWidth)
  },
}

export const RowSpan: Story = {
  ...Playground,
  args: { ...Playground.args, rowSpan: 2 },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(within(canvasElement).getByText("Item")).gridRowStart).toBe("span 2")
  },
}

export const AsListItem: Story = {
  ...Playground,
  args: { ...Playground.args, as: "li" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole("listitem")).toHaveLength(3)
  },
}
