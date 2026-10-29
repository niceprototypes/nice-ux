import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { getToken } from "@niceprototypes/styles"
import type { GapType, SizeType, WithBreakpointsProps } from "@niceprototypes/styles"
import Flex from "@niceprototypes/flex"
import type {
  FlexAlignItemsType,
  FlexAsType,
  FlexJustifyContentType,
  FlexProps,
  FlexWrapType,
} from "@niceprototypes/flex"

/** Option lists, typed against the unions on disk so a renamed token fails the build. */
const AS_OPTIONS = ["div", "nav", "header", "section", "footer", "main", "article", "aside", "ul", "ol", "li"] as const satisfies readonly FlexAsType[]
const GAP_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly GapType[]
const HEIGHT_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly SizeType[]
const ALIGN_ITEMS_OPTIONS = ["flex-start", "flex-end", "center", "baseline", "stretch"] as const satisfies readonly FlexAlignItemsType[]
const JUSTIFY_CONTENT_OPTIONS = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"] as const satisfies readonly FlexJustifyContentType[]
const WRAP_OPTIONS = ["nowrap", "wrap", "wrap-reverse"] as const satisfies readonly FlexWrapType[]

/** `children` presets: N text items. */
const items = (count: number) => Array.from({ length: count }, (_, index) => <span key={index}>Item {index + 1}</span>)
const CHILDREN_PRESETS = { "1 item": items(1), "3 items": items(3), "6 items": items(6) }

/** Flex's props (with `breakpoints`) and `children` as a preset name, mapped back to the nodes in `render`. */
type PlaygroundArgs = Omit<WithBreakpointsProps<FlexProps>, "children"> & { children: keyof typeof CHILDREN_PRESETS }

const optionalSelect = (options: readonly string[]) => ({
  control: "select" as const,
  options: ["none", ...options],
  mapping: { none: undefined },
})

const meta = {
  title: "Components/Flex",
  component: Flex,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Flex>

export default meta

type Story = StoryObj<PlaygroundArgs>

/** The computed value of a CSS property set to `value`, read from a throwaway element in the canvas. */
const resolveCss = (canvasElement: HTMLElement, property: string, value: string) => {
  const probe = document.createElement("div")
  probe.style.setProperty(property, value)
  canvasElement.appendChild(probe)
  const resolved = getComputedStyle(probe).getPropertyValue(property)
  probe.remove()
  return resolved
}

const root = (canvasElement: HTMLElement) => within(canvasElement).getByText("Item 1").parentElement!

export const Playground: Story = {
  args: {
    children: "3 items",
    as: "div",
    gap: "base",
    direction: "row",
    fit: false,
    inlined: false,
  },
  argTypes: {
    children: { control: "select", options: Object.keys(CHILDREN_PRESETS) },
    as: { control: "select", options: AS_OPTIONS },
    gap: optionalSelect(GAP_OPTIONS),
    direction: { control: "select", options: ["row", "column"] },
    alignItems: optionalSelect(ALIGN_ITEMS_OPTIONS),
    justifyContent: optionalSelect(JUSTIFY_CONTENT_OPTIONS),
    grow: { control: "number" },
    shrink: { control: "number" },
    wrap: optionalSelect(WRAP_OPTIONS),
    fit: { control: "boolean" },
    inlined: { control: "boolean" },
    // CSS-like shorthand of 1–4 gap tokens, e.g. "small base".
    padding: { control: "text" },
    margin: { control: "text" },
    height: optionalSelect(HEIGHT_OPTIONS),
    // Per-breakpoint prop overrides (withBreakpoints), e.g. { "tablet+": { direction: "column" } }.
    breakpoints: { control: "object" },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  render: ({ children, ...rest }) => <Flex {...rest}>{CHILDREN_PRESETS[children]}</Flex>,
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(root(canvasElement))
    await expect(style.display).toBe("flex")
    await expect(style.flexDirection).toBe("row")
    await expect(style.columnGap).toBe(resolveCss(canvasElement, "column-gap", getToken("gap:base")))
  },
}

export const Column: Story = {
  ...Playground,
  args: { ...Playground.args, direction: "column", gap: "large" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(root(canvasElement))
    await expect(style.flexDirection).toBe("column")
    await expect(style.rowGap).toBe(resolveCss(canvasElement, "row-gap", getToken("gap:large")))
  },
}

export const Alignment: Story = {
  ...Playground,
  args: { ...Playground.args, alignItems: "center", justifyContent: "space-between", wrap: "wrap" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(root(canvasElement))
    await expect(style.alignItems).toBe("center")
    await expect(style.justifyContent).toBe("space-between")
    await expect(style.flexWrap).toBe("wrap")
  },
}

export const GrowShrink: Story = {
  ...Playground,
  args: { ...Playground.args, grow: 1, shrink: 0 },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(root(canvasElement))
    await expect(style.flexGrow).toBe("1")
    await expect(style.flexShrink).toBe("0")
  },
}

export const Spacing: Story = {
  ...Playground,
  args: { ...Playground.args, padding: "small large", margin: "base" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(root(canvasElement))
    await expect(style.paddingTop).toBe(resolveCss(canvasElement, "padding-top", getToken("gap:small")))
    await expect(style.paddingLeft).toBe(resolveCss(canvasElement, "padding-left", getToken("gap:large")))
    await expect(style.marginBottom).toBe(resolveCss(canvasElement, "margin-bottom", getToken("gap:base")))
  },
}

export const Height: Story = {
  ...Playground,
  args: { ...Playground.args, height: "larger" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(root(canvasElement)).height).toBe(resolveCss(canvasElement, "height", getToken("size:larger")))
  },
}

export const Fit: Story = {
  ...Playground,
  args: { ...Playground.args, fit: true },
  play: async ({ canvasElement }) => {
    const element = root(canvasElement)
    await expect(element.getBoundingClientRect().width).toBeLessThan(element.parentElement!.getBoundingClientRect().width)
  },
}

export const Inlined: Story = {
  ...Playground,
  args: { ...Playground.args, inlined: true },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(root(canvasElement)).display).toBe("inline-flex")
  },
}

export const As: Story = {
  ...Playground,
  args: { ...Playground.args, as: "nav" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("navigation")).toBe(root(canvasElement))
  },
}

export const Breakpoints: Story = {
  ...Playground,
  // The phone breakpoint key matches only below the tablet width; "phone+" matches every viewport.
  args: { ...Playground.args, breakpoints: { "phone+": { direction: "column" } } },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(root(canvasElement)).flexDirection).toBe("column")
  },
}
