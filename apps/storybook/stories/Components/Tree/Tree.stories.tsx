import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, waitFor, within } from "storybook/test"
import { getToken, type ColorType } from "@niceprototypes/styles"
import Icon from "@niceprototypes/icon"
import Ink from "@niceprototypes/ink"
import Tree from "@niceprototypes/tree"
import type { TreeNodeType, TreeProps } from "@niceprototypes/tree"

/** Option lists. Union props are typed against the union on disk, so a renamed token fails the build. */
const COLOR_OPTIONS = [
  "base",
  "light",
  "lighter",
  "lightest",
  "disabled",
  "link",
  "success",
  "highlight",
  "warning",
  "error",
] as const satisfies readonly ColorType[]

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * The Storybook sidebar with Components / Forms / Checkbox / checked open: a folder is
 * `[name, rows]`, a leaf is its name. Collapsed folders hold one Docs page.
 */
type Outline = ReadonlyArray<string | readonly [string, Outline]>
const DOCS: Outline = ["Docs"]
const CHECKBOX: Outline = [
  "Docs", "Tokens", "aria-label", "backgroundColor", "borderColor", "borderRadius", "borderWidth", "checked",
  "children", "defaultChecked", "disabled", "iconName", "iconVendor", "name", "onChange", "size", "theme",
  "Playground", "Checked", "Uncontrolled", "Disabled", "Aria Label", "Name", "Size", "Background Color", "Border",
  "Icon Name",
]
const FORMS: Outline = [
  ["Button", DOCS], ["Calendar", DOCS], ["Checkbox", CHECKBOX], ["DateField", DOCS], ["Field", DOCS],
  ["Form", DOCS], ["Input", DOCS], ["Listbox", DOCS], ["RadioGroup", DOCS], ["Select", DOCS], ["Toggle", DOCS],
  ["Radio", DOCS],
]
const COMPONENTS: Outline = [
  "Docs", ["Forms", FORMS],
  ...["Card", "Code", "Dialog", "Flex", "Grid", "Icon", "Image", "Ink", "Lightbox", "Line", "List", "Logo",
    "Popover", "Scroll", "Slider", "Tabs", "Tile", "Tooltip", "CardBody", "CardFooter", "CardHeader", "GridItem",
    "Illustration"].map(name => [name, DOCS] as const),
]
const SIDEBAR: Outline = [
  ["Basics", DOCS], ["Manifest", DOCS], ["Scenarios", DOCS], ["Tokens", DOCS], ["Components", COMPONENTS],
  ["Bindings", DOCS], ["Storybook", DOCS], ["Configuration", DOCS], ["CLI", DOCS],
]
const ACTIVE_ID = "components/forms/checkbox/checked"

/**
 * Build the nodes from an outline, `levels` deep; a folder at the last level becomes a link, and with
 * `folderLinks` every folder carries a url too.
 */
const toItems = (
  outline: Outline,
  levels: number,
  icons: boolean,
  slot: string,
  folderLinks: boolean,
  parent = "",
): TreeNodeType[] =>
  outline.map(entry => {
    const [name, rows] = typeof entry === "string" ? [entry, undefined] : entry
    const id = `${parent}${name.toLowerCase()}`
    const node: TreeNodeType = {
      id,
      name,
      icon: rows && icons ? <Icon name="folder-closed" /> : null,
      status: id === ACTIVE_ID ? "active" : undefined,
      children: id === ACTIVE_ID && slot ? <Ink size="small">{slot}</Ink> : undefined,
    }
    if (rows && levels > 1) {
      const items = toItems(rows, levels - 1, icons, slot, folderLinks, `${id}/`)
      return folderLinks ? { ...node, url: `#${id}`, items } : { ...node, items }
    }
    return { ...node, url: `#${id}` }
  })

/** The folder ids, for the `expandedIds` control. */
const FOLDER_IDS = ["basics", "components", "components/forms", "components/forms/checkbox", "components/card"]

/**
 * PlaygroundArgs
 *
 * TreeProps plus the data controls: `levels` (depth of the sidebar outline), `icons`
 * (folder icons on or off), `slot` (text in the active row's `children` slot) and `folderLinks`
 * (every folder also a link: no toggle, its sub-list follows the open folder ids).
 * `items` is built in `render`.
 */
type PlaygroundArgs = Omit<TreeProps, "items"> & {
  levels: number
  icons: boolean
  slot: string
  folderLinks: boolean
}

const meta = {
  title: "Components/Tree",
  component: Tree,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Tree>

export default meta

type Story = StoryObj<PlaygroundArgs>

export const Playground: Story = {
  args: {
    "aria-label": "Sidebar",
    levels: 4,
    icons: true,
    slot: "",
    folderLinks: false,
    onExpandedChange: fn(),
    onSelect: fn(),
  },
  argTypes: {
    levels: { control: { type: "range", min: 1, max: 4, step: 1 }, table: { category: "Content" } },
    icons: { control: "boolean", table: { category: "Content" } },
    slot: { control: "text", table: { category: "Content" } },
    folderLinks: { control: "boolean", table: { category: "Content" } },

    expandedIds: { control: "check", options: FOLDER_IDS, table: { category: "State" } },
    defaultExpandedIds: { control: "check", options: FOLDER_IDS, table: { category: "State" } },

    activeColor: {
      control: "select",
      options: [NONE, ...COLOR_OPTIONS],
      mapping: { [NONE]: undefined },
      table: { category: "Appearance" },
    },

    "aria-label": { control: "text", table: { category: "Accessibility" } },

    onExpandedChange: { table: { category: "Events" } },
    onSelect: { table: { category: "Events" } },
  },
  render: ({ levels, icons, slot, folderLinks, onSelect, ...rest }) => (
    <Tree
      {...rest}
      items={toItems(SIDEBAR, levels, icons, slot, folderLinks)}
      onSelect={(node, event) => {
        // Keep the story on its page
        event.preventDefault()
        onSelect?.(node, event)
      }}
    />
  ),
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("navigation", { name: "Sidebar" })).toBeInTheDocument()

    // The active node's ancestors start open; the active leaf is the current page.
    const components = canvas.getByRole("button", { name: "Components" })
    await expect(components).toHaveAttribute("aria-expanded", "true")
    await expect(canvas.getByRole("button", { name: "Basics" })).toHaveAttribute("aria-expanded", "false")
    await expect(canvas.getByRole("link", { name: "checked" })).toHaveAttribute("aria-current", "page")

    // Pointer: a folder click toggles it.
    const basics = canvas.getByRole("button", { name: "Basics" })
    await userEvent.click(basics)
    await expect(basics).toHaveAttribute("aria-expanded", "true")
    await expect(args.onExpandedChange).toHaveBeenLastCalledWith(expect.arrayContaining(["basics"]), expect.anything())
    await expect(within(basics.closest("li") as HTMLElement).getByRole("link", { name: "Docs" })).toBeVisible()
    await userEvent.click(basics)
    await expect(basics).toHaveAttribute("aria-expanded", "false")

    // Keyboard (disclosure pattern): Tab moves between rows, Enter and Space toggle a folder.
    basics.focus()
    await userEvent.tab()
    const manifest = canvas.getByRole("button", { name: "Manifest" })
    await expect(manifest).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await expect(manifest).toHaveAttribute("aria-expanded", "true")
    await userEvent.keyboard(" ")
    await expect(manifest).toHaveAttribute("aria-expanded", "false")

    // A leaf link reports its node.
    await userEvent.click(canvas.getByRole("link", { name: "children" }))
    await expect(args.onSelect).toHaveBeenLastCalledWith(expect.objectContaining({ id: "components/forms/checkbox/children" }), expect.anything())
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

/** The row around a link or folder button. */
const row = (target: HTMLElement) => target.parentElement as HTMLElement

/** The active path takes the active colour and weight; other rows recede to `color:lighter`. */
export const Active: Story = {
  ...Playground,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = resolveCss(canvasElement, "color", getToken("color", "link"))
    for (const target of [
      canvas.getByRole("button", { name: "Components" }),
      canvas.getByRole("button", { name: "Forms" }),
      canvas.getByRole("button", { name: "Checkbox" }),
      canvas.getByRole("link", { name: "checked" }),
    ]) {
      await expect(getComputedStyle(row(target)).color).toBe(link)
      await expect(getComputedStyle(row(target)).fontWeight).toBe(
        resolveCss(canvasElement, "font-weight", getToken("fontWeight", "semibold")),
      )
    }
    await expect(getComputedStyle(row(canvas.getByRole("button", { name: "Basics" }))).color).toBe(
      resolveCss(canvasElement, "color", getToken("color", "lighter")),
    )
  },
}

/** `activeColor` recolours the active path. */
export const ActiveColor: Story = {
  ...Playground,
  args: { ...Playground.args, activeColor: "success" },
  play: async ({ canvasElement }) => {
    const target = within(canvasElement).getByRole("link", { name: "checked" })
    await expect(getComputedStyle(row(target)).color).toBe(
      resolveCss(canvasElement, "color", getToken("color", "success")),
    )
  },
}

/** Controlled: `expandedIds` decides which folders are open; a toggle only reports. */
export const Controlled: Story = {
  ...Playground,
  args: { ...Playground.args, expandedIds: ["basics"] },
  play: async ({ canvasElement, args, userEvent }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "Basics" })).toHaveAttribute("aria-expanded", "true")
    const components = canvas.getByRole("button", { name: "Components" })
    await expect(components).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(components)
    await expect(args.onExpandedChange).toHaveBeenLastCalledWith(["basics", "components"], expect.anything())
    await expect(components).toHaveAttribute("aria-expanded", "false")
  },
}

/** No icons: folder and leaf rows start at the label. */
export const NoIcons: Story = {
  ...Playground,
  args: { ...Playground.args, icons: false },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("navigation").querySelector("svg")).toBeNull()
  },
}

/** `levels: 1`: the folders lose their rows and become links; nothing is active. */
export const OneLevel: Story = {
  ...Playground,
  args: { ...Playground.args, levels: 1 },
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole("navigation")
    const tree = within(nav)
    await expect(tree.queryAllByRole("button")).toHaveLength(0)
    await expect(tree.getAllByRole("link")).toHaveLength(SIDEBAR.length)
    await expect(nav.querySelector("[aria-current]")).toBeNull()
  },
}

/** A node's `children` render inside its row, after the label. */
export const Slot: Story = {
  ...Playground,
  args: { ...Playground.args, slot: "New" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(() => expect(row(canvas.getByRole("link", { name: "checked" }))).toHaveTextContent("checkedNew"))
  },
}

/** `folderLinks`: every folder is a link with no toggle; the open folders (the active node's ancestors) stay open. */
export const FolderLinks: Story = {
  ...Playground,
  args: { ...Playground.args, folderLinks: true },
  play: async ({ canvasElement, args, userEvent }) => {
    const tree = within(within(canvasElement).getByRole("navigation"))
    await expect(tree.queryAllByRole("button")).toHaveLength(0)
    await expect(tree.getByRole("link", { name: "checked" })).toBeVisible()
    await userEvent.click(tree.getByRole("link", { name: "Components" }))
    await expect(args.onSelect).toHaveBeenLastCalledWith(expect.objectContaining({ id: "components" }), expect.anything())
    await expect(tree.getByRole("link", { name: "checked" })).toBeVisible()
  },
}
