import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { expect, fn, waitFor, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { GapType, SizeType } from "@niceprototypes/styles"
import Tabs from "@niceprototypes/tabs"
import type {
  TabsItemType,
  TabsJustifyContentType,
  TabsProps,
  TabsVariantType,
} from "@niceprototypes/tabs"
import Button from "@niceprototypes/button"

/**
 * Option lists. Union props are typed against the union on disk, so a renamed token fails
 * the build; themes are read from the token data.
 */
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const GAP_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly GapType[]
const JUSTIFY_CONTENT_OPTIONS = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"] as const satisfies readonly TabsJustifyContentType[]
const VARIANT_OPTIONS = ["underline", "pill"] as const satisfies readonly TabsVariantType[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** The pages from Tabs/Items.mdx; `itemCount` takes the first n. */
const PAGES: TabsItemType[] = [
  { id: "page-1", label: "Page 1" },
  { id: "page-2", label: "Page 2" },
  { id: "page-3", label: "Page 3" },
  { id: "page-4", label: "Page 4" },
  { id: "page-5", label: "Page 5" },
]
const ID_OPTIONS = PAGES.map(page => page.id)

/** The `end` preset from Tabs/End.mdx: the add-page button. */
const END_OPTIONS = ["add button"] as const

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * PlaygroundArgs
 *
 * TabsProps with `items` replaced by `itemCount` and `disabledId`, and `end` / `children`
 * replaced by a preset and a panel text, recomposed in `render`. `selected` is controlled
 * through useArgs: a click writes the new id back to the arg. Set it to "none" to leave
 * Tabs uncontrolled, starting at `defaultSelected`.
 */
type PlaygroundArgs = Omit<TabsProps, "items" | "end" | "children"> & {
  itemCount: number
  disabledId?: string
  end?: (typeof END_OPTIONS)[number] | typeof NONE
  children: string
  /** Replaced by `itemCount` and `disabledId`; hidden from Controls. */
  items?: never
}

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Tabs>

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

const HIDDEN = { table: { disable: true } }

/** The computed value of a CSS property set to `value`, read from a throwaway element in the canvas. */
const resolveCss = (canvasElement: HTMLElement, property: string, value: string) => {
  const probe = document.createElement("div")
  probe.style.setProperty(property, value)
  canvasElement.appendChild(probe)
  const resolved = getComputedStyle(probe).getPropertyValue(property)
  probe.remove()
  return resolved
}

const tablist = (canvasElement: HTMLElement) => within(canvasElement).getByRole("tablist", { name: "Pages" })
const tab = (canvasElement: HTMLElement, name: string) => within(tablist(canvasElement)).getByRole("tab", { name })

export const Playground: Story = {
  args: {
    "aria-label": "Pages",
    itemCount: 3,
    disabledId: NONE,
    selected: "page-1",
    defaultSelected: NONE,
    onSelect: fn(),
    end: NONE,
    children: "Panel",
    size: "base",
    variant: "underline",
    gap: NONE,
    theme: NONE,
  },
  argTypes: {
    itemCount: { control: { type: "range", min: 1, max: PAGES.length, step: 1 }, table: { category: "Items" } },
    disabledId: optionalSelect(ID_OPTIONS, "Items"),
    selected: optionalSelect(ID_OPTIONS, "Selection"),
    defaultSelected: optionalSelect(ID_OPTIONS, "Selection"),
    end: optionalSelect(END_OPTIONS, "Content"),
    children: { control: "text", table: { category: "Content" } },

    size: select(SIZE_OPTIONS, "Appearance"),
    variant: select(VARIANT_OPTIONS, "Appearance"),
    theme: optionalSelect(THEME_OPTIONS, "Appearance"),
    justifyContent: optionalSelect(JUSTIFY_CONTENT_OPTIONS, "Layout"),
    gap: optionalSelect(GAP_OPTIONS, "Layout"),

    "aria-label": { control: "text", table: { category: "Accessibility" } },
    onSelect: { table: { category: "Events" } },

    items: HIDDEN,
    className: HIDDEN,
  },
  // Recompose the flattened args; the result is checked against TabsProps.
  render: function Render({ itemCount, disabledId, end, children, onSelect, ...rest }) {
    const [, updateArgs] = useArgs<PlaygroundArgs>()
    // Local mirror of `selected`: the test runner renders without a manager, so updateArgs
    // alone does not re-render there.
    const [selected, setSelected] = useState(rest.selected)
    useEffect(() => setSelected(rest.selected), [rest.selected])
    const props: TabsProps = {
      ...rest,
      selected,
      items: PAGES.slice(0, itemCount).map(page => (page.id === disabledId ? { ...page, disabled: true } : page)),
      end: end ? <Button iconLeft="plus" size="small" aria-label="Add page" /> : undefined,
      children,
      onSelect: (id, event) => {
        onSelect?.(id, event)
        if (rest.selected === undefined) return
        setSelected(id)
        updateArgs({ selected: id })
      },
    }
    // A change of `defaultSelected` only applies on mount, so it remounts Tabs.
    return <Tabs key={rest.defaultSelected} {...props} />
  },
  play: async ({ canvasElement, args, userEvent }) => {
    const tabs = within(tablist(canvasElement)).getAllByRole("tab")
    await expect(tabs.map(item => item.textContent)).toEqual(["Page 1", "Page 2", "Page 3"])
    await expect(tab(canvasElement, "Page 1")).toHaveAttribute("aria-selected", "true")
    const panel = within(canvasElement).getByRole("tabpanel")
    await expect(panel).toHaveTextContent("Panel")
    await expect(panel).toHaveAttribute("aria-labelledby", tab(canvasElement, "Page 1").id)

    // Click: onSelect fires and useArgs writes the id back to `selected`.
    await userEvent.click(tab(canvasElement, "Page 2"))
    await expect(args.onSelect).toHaveBeenLastCalledWith("page-2", expect.objectContaining({ type: "click" }))
    // useArgs writes `selected` back; the re-render is asynchronous.
    await waitFor(() => expect(tab(canvasElement, "Page 2")).toHaveAttribute("aria-selected", "true"))

    // Keyboard: arrows move and select, wrapping; Home and End jump.
    await expect(tab(canvasElement, "Page 2")).toHaveFocus()
    await userEvent.keyboard("{ArrowRight}")
    await expect(tab(canvasElement, "Page 3")).toHaveFocus()
    await waitFor(() => expect(tab(canvasElement, "Page 3")).toHaveAttribute("aria-selected", "true"))
    await userEvent.keyboard("{ArrowRight}")
    await expect(tab(canvasElement, "Page 1")).toHaveFocus()
    await userEvent.keyboard("{End}")
    await expect(tab(canvasElement, "Page 3")).toHaveFocus()
    await userEvent.keyboard("{Home}")
    await waitFor(() => expect(tab(canvasElement, "Page 1")).toHaveAttribute("aria-selected", "true"))
    await expect(args.onSelect).toHaveBeenLastCalledWith("page-1", expect.objectContaining({ type: "keydown" }))
    // Roving tabindex: only the selected tab is in the tab order.
    await expect(tab(canvasElement, "Page 1")).toHaveAttribute("tabindex", "0")
    await expect(tab(canvasElement, "Page 2")).toHaveAttribute("tabindex", "-1")
  },
}

export const Uncontrolled: Story = {
  ...Playground,
  args: { ...Playground.args, selected: NONE, defaultSelected: "page-3" },
  play: async ({ canvasElement, args, userEvent }) => {
    await expect(tab(canvasElement, "Page 3")).toHaveAttribute("aria-selected", "true")
    await userEvent.click(tab(canvasElement, "Page 1"))
    await expect(args.onSelect).toHaveBeenCalledWith("page-1", expect.anything())
    await expect(tab(canvasElement, "Page 1")).toHaveAttribute("aria-selected", "true")
  },
}

export const DisabledItem: Story = {
  ...Playground,
  args: { ...Playground.args, disabledId: "page-2" },
  play: async ({ canvasElement, args, userEvent }) => {
    const disabled = tab(canvasElement, "Page 2")
    await expect(disabled).toHaveAttribute("aria-disabled", "true")
    await expect(getComputedStyle(disabled).opacity).toBe(
      resolveCss(canvasElement, "opacity", getToken("tabs.disabledOpacity:base")),
    )
    await userEvent.click(disabled)
    await expect(args.onSelect).not.toHaveBeenCalled()
    await expect(disabled).toHaveAttribute("aria-selected", "false")
    // Arrow keys skip the disabled tab.
    tab(canvasElement, "Page 1").focus()
    await userEvent.keyboard("{ArrowRight}")
    await expect(tab(canvasElement, "Page 3")).toHaveFocus()
  },
}

export const End: Story = {
  ...Playground,
  args: { ...Playground.args, end: "add button", justifyContent: "space-between" },
  play: async ({ canvasElement }) => {
    const add = within(canvasElement).getByRole("button", { name: "Add page" })
    const row = tablist(canvasElement).parentElement!
    await expect(add.parentElement).toBe(row)
    await expect(getComputedStyle(row).justifyContent).toBe("space-between")
  },
}

export const Gap: Story = {
  ...Playground,
  args: { ...Playground.args, gap: "larger" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(tablist(canvasElement)).columnGap).toBe(
      resolveCss(canvasElement, "column-gap", getToken("gap", "larger")),
    )
  },
}

export const Pill: Story = {
  ...Playground,
  args: { ...Playground.args, variant: "pill", size: "large" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(tab(canvasElement, "Page 1"))
    await expect(style.borderTopStyle).not.toBe("none")
    await expect(style.borderTopLeftRadius).toBe(
      resolveCss(canvasElement, "border-top-left-radius", getToken("tabs.pill.borderRadius:base")),
    )
    await expect(style.fontSize).toBe(resolveCss(canvasElement, "font-size", getToken("tabs.fontSize:large")))
  },
}

export const Night: Story = {
  ...Playground,
  args: { ...Playground.args, theme: "night" },
  play: async ({ canvasElement }) => {
    await expect(tablist(canvasElement).closest("[data-theme='night']")).toBeTruthy()
  },
}
