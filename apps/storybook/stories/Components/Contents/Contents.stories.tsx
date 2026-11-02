import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, waitFor, within } from "storybook/test"
import Contents from "@niceprototypes/contents"
import type { ContentsItemsType, ContentsProps } from "@niceprototypes/contents"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import LifecycleStory from "@niceprototypes/docs/components/LifecycleStory"
import { getToken } from "@niceprototypes/docs/nice/tokens"

/** A component docs page's outline: Docs, Tokens, then props, one nested level under Props. */
const ITEMS: ContentsItemsType = [
  { id: "contents-docs", label: "Docs" },
  { id: "contents-tokens", label: "Tokens" },
  {
    id: "contents-props",
    label: "Props",
    items: [
      { id: "contents-size", label: "size" },
      { id: "contents-color", label: "color" },
      { id: "contents-disabled", label: "disabled" },
    ],
  },
  { id: "contents-examples", label: "Examples" },
]

/** Every id, depth-first, for the `activeId` select. */
const IDS = ["contents-docs", "contents-tokens", "contents-props", "contents-size", "contents-color", "contents-disabled", "contents-examples"]

/** Every section of `ITEMS`, depth-first. */
const flatten = (items: ContentsItemsType): ContentsItemsType =>
  items.flatMap(item => [item, ...(item.items ? flatten(item.items) : [])])

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** Body copy that gives each section enough height to scroll past. */
const PARAGRAPH =
  "Each section is a target of the Contents nav beside it. Scroll the page: the row of the section whose top has passed the upper quarter of the viewport takes the active colour and the indicator bar. Click a row: the page scrolls smoothly to its section."

/** The page Contents describes: one section per row, then Contents in a sticky column. */
const Page = (props: ContentsProps) => (
  <Flex gap="larger">
    <Flex direction="column" gap="larger" grow={1}>
      {flatten(props.items).map(item => (
        <section key={item.id} id={item.id} style={{ scrollMarginTop: getToken("docs", "barHeight") }}>
          <Flex direction="column" gap="base">
            <Ink as="h2">{item.label}</Ink>
            {[0, 1, 2].map(index => (
              <Ink key={index} as="p" color="light">
                {PARAGRAPH}
              </Ink>
            ))}
          </Flex>
        </section>
      ))}
    </Flex>
    <Flex as="aside" direction="column" shrink={0} style={{ width: getToken("docs", "contentsWidth") }}>
      <Contents {...props} />
    </Flex>
  </Flex>
)

const meta = {
  title: "Components/Contents",
  component: Contents,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Contents>

export default meta

type Story = StoryObj<ContentsProps>

export const Playground: Story = {
  args: {
    items: ITEMS,
    heading: "Contents",
    activeId: undefined,
    "aria-label": undefined,
    onActiveChange: fn(),
  },
  argTypes: {
    items: { control: "object", table: { category: "Content" } },
    heading: { control: "text", table: { category: "Content" } },
    activeId: {
      control: "select",
      options: [NONE, ...IDS],
      mapping: { [NONE]: undefined },
      table: { category: "State" },
    },
    "aria-label": { control: "text", table: { category: "Accessibility" } },
    onActiveChange: { table: { category: "Events" } },
  },
  render: args => <Page {...args} />,
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    const nav = canvas.getByRole("navigation", { name: "Contents" })
    await expect(within(nav).getAllByRole("list")).toHaveLength(2)
    await expect(within(nav).getByRole("link", { name: "size" })).toHaveAttribute("href", "#contents-size")

    // Scroll-spy starts on the first section.
    await waitFor(() => expect(within(nav).getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "location"))

    // A click scrolls to the section and makes it active.
    await userEvent.click(within(nav).getByRole("link", { name: "color" }))
    await expect(within(nav).getByRole("link", { name: "color" })).toHaveAttribute("aria-current", "location")
    await expect(args.onActiveChange).toHaveBeenLastCalledWith("contents-color")
    await waitFor(() => expect(document.scrollingElement!.scrollTop).toBeGreaterThan(0))
  },
}

/** `heading` replaces the heading text and the nav's name. */
export const Heading: Story = {
  ...Playground,
  args: { ...Playground.args, heading: "On this page" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("navigation", { name: "On this page" })).toBeInTheDocument()
  },
}

/** `aria-label` names the nav instead of the heading. */
export const AriaLabel: Story = {
  ...Playground,
  args: { ...Playground.args, "aria-label": "Page content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("navigation", { name: "Page content" })).toBeInTheDocument()
    await expect(canvas.getByText("Contents")).toBeInTheDocument()
  },
}

/** A controlled `activeId` pins the highlight: aria-current, the active colour and the indicator bar. */
export const ActiveId: Story = {
  ...Playground,
  args: { ...Playground.args, activeId: "contents-disabled" },
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole("navigation", { name: "Contents" })
    const active = within(nav).getByRole("link", { name: "disabled" })
    await expect(active).toHaveAttribute("aria-current", "location")
    await expect(within(nav).getByRole("link", { name: "Docs" })).not.toHaveAttribute("aria-current")
    await expect(getComputedStyle(active, "::before").content).not.toBe("none")
    await expect(getComputedStyle(active).color).not.toBe(getComputedStyle(within(nav).getByRole("link", { name: "Docs" })).color)
  },
}

/** `items` nests: a nested row is indented further than its parent. */
export const Items: Story = {
  ...Playground,
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole("navigation", { name: "Contents" })
    const parent = within(nav).getByRole("link", { name: "Props" })
    const child = within(nav).getByRole("link", { name: "size" })
    await expect(parseFloat(getComputedStyle(child).paddingInlineStart)).toBeGreaterThan(
      parseFloat(getComputedStyle(parent).paddingInlineStart),
    )
  },
}

/** The highlight walking down the outline, as scroll-spy moves it while a reader scrolls. */
export const Lifecycle: Story = {
  args: Playground.args,
  render: args => (
    <LifecycleStory
      steps={IDS.map(id => ({ label: `${id.replace("contents-", "")} in view`, props: { activeId: id } }))}
      render={({ activeId }) => <Contents {...args} activeId={activeId} />}
    />
  ),
}
