import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { SizeType } from "@niceprototypes/styles"
import { List, ListItem } from "@niceprototypes/list"
import type { ListItemProps, ListProps } from "@niceprototypes/list"
import Icon, { iconNames } from "@niceprototypes/icon"

/** Option lists. `size` is typed against SizeType on disk; themes are read from the token data. */
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** The item labels from List/Scrollable.mdx; `itemCount` takes the first n. */
const CITIES = ["Amsterdam", "Berlin", "Cairo", "Lagos", "Lisbon", "Madrid", "Nairobi", "Oslo", "Paris", "Rome"]

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** Item indexes as select options, plus NONE. */
const INDEX_OPTIONS = [NONE, ...CITIES.map((_, index) => String(index))]

/**
 * PlaygroundArgs
 *
 * ListProps with `children` replaced by flattened ListItem args, recomposed in `render`:
 * - `itemCount`: how many items render
 * - `itemStart` / `itemEnd`: the start icon and end text on every item
 * - `selectedIndex` / `activeIndex` / `disabledIndex`: the one item in each state
 */
type PlaygroundArgs = Omit<ListProps, "children"> & {
  "aria-label": string
  itemCount: number
  itemStart?: string
  itemEnd?: string
  selectedIndex?: string
  activeIndex?: string
  disabledIndex?: string
  /** Replaced by the item args; hidden from Controls. */
  children?: never
}

const meta = {
  title: "Components/List",
  component: List,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof List>

export default meta

type Story = StoryObj<PlaygroundArgs>

const optionalSelect = (options: readonly string[], category: string) => ({
  control: "select" as const,
  options: [NONE, ...options],
  mapping: { [NONE]: undefined },
  table: { category },
})

const HIDDEN = { table: { disable: true } }

/** The rendered item rows: every `<li>` that is not a divider. */
const items = (canvasElement: HTMLElement) =>
  Array.from(within(canvasElement).getByRole("list", { name: "Cities" }).children).filter(
    item => item.getAttribute("role") !== "presentation",
  ) as HTMLLIElement[]

/** The computed value of a CSS property set to `value`, read from a throwaway element in the canvas. */
const resolveCss = (canvasElement: HTMLElement, property: string, value: string) => {
  const probe = document.createElement("div")
  probe.style.setProperty(property, value)
  canvasElement.appendChild(probe)
  const resolved = getComputedStyle(probe).getPropertyValue(property)
  probe.remove()
  return resolved
}

export const Playground: Story = {
  args: {
    "aria-label": "Cities",
    itemCount: 3,
    scrollable: false,
    size: "base",
    theme: NONE,
    itemStart: NONE,
    itemEnd: "",
    selectedIndex: NONE,
    activeIndex: NONE,
    disabledIndex: NONE,
  },
  argTypes: {
    itemCount: { control: { type: "range", min: 0, max: CITIES.length, step: 1 }, table: { category: "Items" } },
    itemStart: optionalSelect(iconNames, "Items"),
    itemEnd: { control: "text", table: { category: "Items" } },
    selectedIndex: optionalSelect(INDEX_OPTIONS.slice(1), "Items"),
    activeIndex: optionalSelect(INDEX_OPTIONS.slice(1), "Items"),
    disabledIndex: optionalSelect(INDEX_OPTIONS.slice(1), "Items"),

    scrollable: { control: "boolean", table: { category: "List" } },
    size: { control: "select", options: SIZE_OPTIONS, table: { category: "List" } },
    theme: optionalSelect(THEME_OPTIONS, "List"),
    "aria-label": { control: "text", table: { category: "Accessibility" } },

    children: HIDDEN,
    className: HIDDEN,
    ref: HIDDEN,
  },
  // Recompose the flattened item args; each item is checked against ListItemProps.
  render: ({ itemCount, itemStart, itemEnd, selectedIndex, activeIndex, disabledIndex, ...rest }) => (
    <List {...rest}>
      {CITIES.slice(0, itemCount).map((city, index) => {
        const props: ListItemProps = {
          children: city,
          start: itemStart ? <Icon name={itemStart} /> : undefined,
          end: itemEnd || undefined,
          selected: selectedIndex === String(index),
          active: activeIndex === String(index),
          disabled: disabledIndex === String(index),
        }
        return <ListItem key={city} {...props} />
      })}
    </List>
  ),
  play: async ({ canvasElement }) => {
    const rows = items(canvasElement)
    await expect(rows.map(row => row.textContent)).toEqual(CITIES.slice(0, 3))
    // One divider between each pair of items, none at the ends.
    const list = within(canvasElement).getByRole("list", { name: "Cities" })
    await expect(list.querySelectorAll("hr")).toHaveLength(2)
    await expect(list.firstElementChild).toBe(rows[0])
    await expect(list.lastElementChild).toBe(rows[2])
  },
}

export const Empty: Story = {
  ...Playground,
  args: { ...Playground.args, itemCount: 0 },
  play: async ({ canvasElement }) => {
    const list = within(canvasElement).getByRole("list", { name: "Cities" })
    await expect(list.children).toHaveLength(0)
  },
}

export const Scrollable: Story = {
  ...Playground,
  args: { ...Playground.args, itemCount: CITIES.length, scrollable: true },
  play: async ({ canvasElement }) => {
    const list = within(canvasElement).getByRole("list", { name: "Cities" })
    const style = getComputedStyle(list)
    await expect(style.overflowY).toBe("auto")
    await expect(style.maxHeight).toBe(resolveCss(canvasElement, "max-height", getToken("list.maxHeight:base")))
    await expect(list.scrollHeight).toBeGreaterThan(list.clientHeight)
  },
}

export const Sizes: Story = {
  ...Playground,
  args: { ...Playground.args, size: "larger" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(items(canvasElement)[0])
    await expect(style.paddingBlockStart).toBe(
      resolveCss(canvasElement, "padding-block-start", getToken("list.padding.block:larger")),
    )
    await expect(style.paddingInlineStart).toBe(
      resolveCss(canvasElement, "padding-inline-start", getToken("list.padding.inline:larger")),
    )
  },
}

export const StartAndEnd: Story = {
  ...Playground,
  args: { ...Playground.args, itemStart: "heart", itemEnd: "3" },
  play: async ({ canvasElement }) => {
    for (const row of items(canvasElement)) {
      await expect(row.firstElementChild!.querySelector("svg")).toBeTruthy()
      await expect(row.lastElementChild).toHaveTextContent("3")
      await expect(row.children).toHaveLength(3)
    }
  },
}

export const ItemStates: Story = {
  ...Playground,
  args: { ...Playground.args, selectedIndex: "0", activeIndex: "1", disabledIndex: "2" },
  play: async ({ canvasElement }) => {
    const [selected, active, disabled] = items(canvasElement)
    await expect(getComputedStyle(selected).backgroundColor).toBe(
      resolveCss(canvasElement, "background-color", getToken("list.backgroundColor:selected")),
    )
    await expect(getComputedStyle(selected).color).toBe(
      resolveCss(canvasElement, "color", getToken("list.color:selected")),
    )
    await expect(getComputedStyle(active).backgroundColor).toBe(
      resolveCss(canvasElement, "background-color", getToken("list.backgroundColor:active")),
    )
    await expect(disabled).toHaveAttribute("aria-disabled", "true")
    await expect(getComputedStyle(disabled).color).toBe(
      resolveCss(canvasElement, "color", getToken("list.color:disabled")),
    )
  },
}

export const Night: Story = {
  ...Playground,
  args: { ...Playground.args, theme: "night" },
  play: async ({ canvasElement }) => {
    const list = within(canvasElement).getByRole("list", { name: "Cities" })
    await expect(list.closest("[data-theme='night']")).toBeTruthy()
  },
}
