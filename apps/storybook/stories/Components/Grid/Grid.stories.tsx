import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { getBreakpoint, getToken, setTokens } from "@niceprototypes/styles"
import type { GapType } from "@niceprototypes/styles"
import { Grid, GridItem } from "@niceprototypes/grid"
import type { GridAlignItemsType, GridAsType, GridItemColSpanType, GridProps } from "@niceprototypes/grid"

/**
 * Story tokens for `minChildWidth`: the prop takes a token value, never an inline literal.
 */
const getStoryToken = setTokens({
  gridStoryMinChildWidth: { small: "120px", base: "200px", large: "320px" },
})
const MIN_CHILD_WIDTH_OPTIONS = ["small", "base", "large"] as const

/** Option lists, typed against the unions on disk so a renamed value fails the build. */
const GAP_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly GapType[]
const ALIGN_ITEMS_OPTIONS = ["start", "end", "center", "baseline", "stretch"] as const satisfies readonly GridAlignItemsType[]
const AS_OPTIONS = ["div", "section", "article", "aside", "main", "nav", "header", "footer", "ul", "ol"] as const satisfies readonly GridAsType[]
const SPAN_FIRST_OPTIONS = [1, 2, "full"] as const satisfies readonly GridItemColSpanType[]

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "unset"

/**
 * PlaygroundArgs
 *
 * GridProps with `minChildWidth` as a story-token variant, plus story args: `itemCount` items,
 * `spanFirst` as the first item's `colSpan`, and `tabletColumns` as a `"tablet+"` override of
 * `columns` through `breakpoints`.
 */
type PlaygroundArgs = Omit<GridProps, "children" | "minChildWidth"> & {
  minChildWidth?: (typeof MIN_CHILD_WIDTH_OPTIONS)[number]
  itemCount: number
  spanFirst: GridItemColSpanType
  tabletColumns?: number
}

const meta = {
  title: "Components/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Grid>

export default meta

type Story = StoryObj<PlaygroundArgs>

const select = (options: readonly (string | number)[], category: string) => ({
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
    columns: 3,
    gap: "base",
    alignItems: "stretch",
    as: "div",
    fit: false,
    itemCount: 6,
    spanFirst: 1,
  },
  argTypes: {
    columns: { control: { type: "number", min: 1 }, table: { category: "Tracks" } },
    minChildWidth: optionalSelect(MIN_CHILD_WIDTH_OPTIONS, "Tracks"),
    rows: { control: { type: "number", min: 1 }, table: { category: "Tracks" } },
    tabletColumns: { control: { type: "number", min: 1 }, table: { category: "Tracks" } },

    gap: select(GAP_OPTIONS, "Spacing"),
    padding: optionalSelect(GAP_OPTIONS, "Spacing"),
    margin: optionalSelect(GAP_OPTIONS, "Spacing"),

    alignItems: select(ALIGN_ITEMS_OPTIONS, "Layout"),
    fit: { control: "boolean", table: { category: "Layout" } },
    as: select(AS_OPTIONS, "Element"),

    itemCount: { control: { type: "number", min: 0 }, table: { category: "Items" } },
    spanFirst: select(SPAN_FIRST_OPTIONS, "Items"),
  },
  render: ({ minChildWidth, itemCount, spanFirst, tabletColumns, as, ...rest }) => {
    // List containers take list items.
    const itemAs = as === "ul" || as === "ol" ? "li" : "div"
    return (
      <Grid
        {...rest}
        as={as}
        minChildWidth={minChildWidth ? getStoryToken("gridStoryMinChildWidth", minChildWidth) : undefined}
        breakpoints={tabletColumns ? { "tablet+": { columns: tabletColumns } } : undefined}
      >
        {Array.from({ length: itemCount }, (_, index) => (
          <GridItem key={index} as={itemAs} colSpan={index === 0 ? spanFirst : undefined}>
            Item {index + 1}
          </GridItem>
        ))}
      </Grid>
    )
  },
  play: async ({ canvasElement }) => {
    const grid = within(canvasElement).getByText("Item 1").parentElement!
    await expect(getComputedStyle(grid).display).toBe("grid")
    await expect(within(canvasElement).getAllByText(/^Item \d$/)).toHaveLength(6)
  },
}

/** The grid element: the first item's parent. */
const gridOf = (canvasElement: HTMLElement) => within(canvasElement).getByText("Item 1").parentElement!

/** Column track count, from the computed `grid-template-columns` (one length per track). */
const trackCount = (element: HTMLElement) => getComputedStyle(element).gridTemplateColumns.split(" ").length

/** The computed value of a CSS property set to `value`, read from a throwaway element in the canvas. */
const resolveCss = (canvasElement: HTMLElement, property: string, value: string) => {
  const probe = document.createElement("div")
  probe.style.setProperty(property, value)
  canvasElement.appendChild(probe)
  const resolved = getComputedStyle(probe).getPropertyValue(property)
  probe.remove()
  return resolved
}

export const Columns: Story = {
  ...Playground,
  args: { ...Playground.args, columns: 3 },
  play: async ({ canvasElement }) => {
    await expect(trackCount(gridOf(canvasElement))).toBe(3)
  },
}

export const MinChildWidth: Story = {
  ...Playground,
  args: { ...Playground.args, columns: 1, minChildWidth: "small" },
  play: async ({ canvasElement }) => {
    const grid = gridOf(canvasElement)
    const minWidth = parseFloat(resolveCss(canvasElement, "width", getStoryToken("gridStoryMinChildWidth", "small")))
    const gap = parseFloat(getComputedStyle(grid).columnGap)
    // auto-fill: as many min-width tracks (plus gaps) as the row holds; `columns` is ignored.
    await expect(trackCount(grid)).toBe(Math.max(1, Math.floor((grid.clientWidth + gap) / (minWidth + gap))))
    await expect(trackCount(grid)).toBeGreaterThan(1)
  },
}

export const Rows: Story = {
  ...Playground,
  args: { ...Playground.args, rows: 2 },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(gridOf(canvasElement)).gridTemplateRows.split(" ")).toHaveLength(2)
  },
}

export const Gap: Story = {
  ...Playground,
  args: { ...Playground.args, gap: "large" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(gridOf(canvasElement))
    const expected = resolveCss(canvasElement, "column-gap", getToken("gap", "large"))
    await expect(style.columnGap).toBe(expected)
    await expect(style.rowGap).toBe(expected)
  },
}

export const Padding: Story = {
  ...Playground,
  args: { ...Playground.args, padding: "large" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(gridOf(canvasElement)).paddingTop).toBe(
      resolveCss(canvasElement, "padding-top", getToken("gap", "large")),
    )
  },
}

export const AlignItems: Story = {
  ...Playground,
  args: { ...Playground.args, alignItems: "center" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(gridOf(canvasElement)).alignItems).toBe("center")
  },
}

export const AsList: Story = {
  ...Playground,
  args: { ...Playground.args, as: "ul" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("list")).toBe(gridOf(canvasElement))
    await expect(canvas.getAllByRole("listitem")).toHaveLength(6)
  },
}

export const Fit: Story = {
  ...Playground,
  args: { ...Playground.args, fit: true },
  play: async ({ canvasElement }) => {
    const grid = gridOf(canvasElement)
    await expect(grid.clientWidth).toBeLessThan(grid.parentElement!.clientWidth)
  },
}

export const SpanFull: Story = {
  ...Playground,
  args: { ...Playground.args, spanFirst: "full" },
  play: async ({ canvasElement }) => {
    const first = within(canvasElement).getByText("Item 1")
    await expect(getComputedStyle(first).gridColumnStart).toBe("1")
    await expect(getComputedStyle(first).gridColumnEnd).toBe("-1")
  },
}

export const SpanTwo: Story = {
  ...Playground,
  args: { ...Playground.args, spanFirst: 2 },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(within(canvasElement).getByText("Item 1")).gridColumnStart).toBe("span 2")
  },
}

/** `breakpoints` override: 4 columns from tablet up, 1 below. */
export const Responsive: Story = {
  ...Playground,
  args: { ...Playground.args, columns: 1, tabletColumns: 4 },
  play: async ({ canvasElement }) => {
    const tabletUp = window.matchMedia(getBreakpoint("tablet+").replace("@media ", "")).matches
    await expect(trackCount(gridOf(canvasElement))).toBe(tabletUp ? 4 : 1)
  },
}
