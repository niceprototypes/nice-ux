import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { BreakpointName, ChannelValue, ColorTokenProp, FontSizeType, FontWeightType, LineHeightType } from "@niceprototypes/styles"
import Ink from "@niceprototypes/ink"
import type {
  InkAlignType,
  InkAsType,
  InkColorType,
  InkDecorationType,
  InkLetterSpacingType,
  InkMaxWidthType,
  InkProps,
  InkWordBreakType,
} from "@niceprototypes/ink"

/** Option lists, typed against the unions on disk so a renamed token fails the build. */
const AS_OPTIONS = ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "a", "li", "blockquote", "cite", "mark", "s"] as const satisfies readonly InkAsType[]
const ALIGN_OPTIONS = ["left", "center", "right", "justify"] as const satisfies readonly InkAlignType[]
const COLOR_OPTIONS = ["base", "light", "lighter", "lightest", "disabled", "link", "success", "highlight", "warning", "error"] as const satisfies readonly InkColorType[]
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly FontSizeType[]
const WEIGHT_OPTIONS = ["light", "base", "medium", "semibold", "bold", "extrabold", "black"] as const satisfies readonly FontWeightType[]
const LINE_HEIGHT_OPTIONS = ["single", "condensed", "base", "expanded"] as const satisfies readonly LineHeightType[]
const WORD_BREAK_OPTIONS = ["normal", "break-all", "keep-all", "break-word"] as const satisfies readonly InkWordBreakType[]
const LETTER_SPACING_OPTIONS = ["tight", "base", "wide", "wider"] as const satisfies readonly InkLetterSpacingType[]
const MAX_WIDTH_OPTIONS = ["prose", "wide", "full"] as const satisfies readonly InkMaxWidthType[]
const DECORATION_OPTIONS = ["none", "underline", "line-through", "overline"] as const satisfies readonly InkDecorationType[]
const BREAKPOINT_OPTIONS = ["phone", "tablet", "laptop", "desktop"] as const satisfies readonly BreakpointName[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * InkProps with the `color` object flattened into one scalar arg per field
 * (variant, theme pin, breakpoint pin, inverse, one transform channel each), recomposed in `render`.
 */
type PlaygroundArgs = Omit<InkProps, "color"> & {
  color?: InkColorType
  colorTheme?: string
  colorBreakpoint?: BreakpointName
  colorInverse: boolean
  colorHue: string
  colorSaturation: string
  colorLightness: string
  colorAlpha: string
}

/** A transform channel from its text control: empty is unchanged, a bare number replaces, anything else is an adjustment ("+10", "*0.5"). */
const toChannel = (value: string): ChannelValue => {
  if (value.trim() === "") return null
  const number = Number(value)
  return Number.isNaN(number) ? value.trim() : number
}

/** The variant alone when no effect is set, else the object form. */
const toColor = ({
  color,
  colorTheme,
  colorBreakpoint,
  colorInverse,
  colorHue,
  colorSaturation,
  colorLightness,
  colorAlpha,
}: PlaygroundArgs): ColorTokenProp<InkColorType> | undefined => {
  if (!color) return undefined
  const transform = [colorHue, colorSaturation, colorLightness, colorAlpha].map(toChannel)
  const transformed = transform.some(channel => channel !== null)
  if (!colorTheme && !colorBreakpoint && !colorInverse && !transformed) return color
  return {
    name: color,
    theme: colorTheme,
    breakpoint: colorBreakpoint,
    inverse: colorInverse || undefined,
    transform: transformed ? transform : undefined,
  }
}

const optionalSelect = (options: readonly string[], category?: string) => ({
  control: "select" as const,
  options: [NONE, ...options],
  mapping: { [NONE]: undefined },
  table: { category },
})

const meta = {
  title: "Components/Ink",
  component: Ink,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Ink>

export default meta

type Story = StoryObj<PlaygroundArgs>

/** The computed value of a CSS property set to `value`, read from a throwaway element appended to `canvasElement` (font-relative units resolve against its font). */
const resolveCss = (canvasElement: HTMLElement, property: string, value: string) => {
  const probe = document.createElement("div")
  probe.style.setProperty(property, value)
  canvasElement.appendChild(probe)
  const resolved = getComputedStyle(probe).getPropertyValue(property)
  probe.remove()
  return resolved
}

const TEXT = "The quick brown fox jumps over the lazy dog."

const ink = (canvasElement: HTMLElement) => within(canvasElement).getByText(TEXT)

export const Playground: Story = {
  args: {
    children: TEXT,
    as: "span",
    code: false,
    italic: false,
    truncate: false,
    legibilityOptimized: false,
    colorInverse: false,
    colorHue: "",
    colorSaturation: "",
    colorLightness: "",
    colorAlpha: "",
  },
  argTypes: {
    children: { control: "text" },
    as: { control: "select", options: AS_OPTIONS },
    size: optionalSelect(SIZE_OPTIONS),
    weight: optionalSelect(WEIGHT_OPTIONS),
    lineHeight: optionalSelect(LINE_HEIGHT_OPTIONS),
    align: optionalSelect(ALIGN_OPTIONS),
    wordBreak: optionalSelect(WORD_BREAK_OPTIONS),
    letterSpacing: optionalSelect(LETTER_SPACING_OPTIONS),
    maxWidth: optionalSelect(MAX_WIDTH_OPTIONS),
    // "none" is a decoration value here, so the unset choice is a separate entry.
    decoration: { control: "select", options: ["unset", ...DECORATION_OPTIONS], mapping: { unset: undefined } },
    lineClamp: { control: { type: "number", min: 1 } },
    truncate: { control: "boolean" },
    code: { control: "boolean" },
    italic: { control: "boolean" },
    href: { control: "text" },
    // Unset: on for a night theme pin.
    antialiased: { control: "boolean" },
    legibilityOptimized: { control: "boolean" },
    theme: optionalSelect(THEME_OPTIONS),
    id: { control: "text" },

    // Explicit selects override preview.tsx's `color` matcher (a colour picker).
    color: optionalSelect(COLOR_OPTIONS, "Color"),
    colorTheme: optionalSelect(THEME_OPTIONS, "Color"),
    colorBreakpoint: optionalSelect(BREAKPOINT_OPTIONS, "Color"),
    colorInverse: { control: "boolean", table: { category: "Color" } },
    colorHue: { control: "text", table: { category: "Color" } },
    colorSaturation: { control: "text", table: { category: "Color" } },
    colorLightness: { control: "text", table: { category: "Color" } },
    colorAlpha: { control: "text", table: { category: "Color" } },

    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  // Recompose the flattened color args; the result is checked against InkProps.
  render: args => {
    const { colorTheme, colorBreakpoint, colorInverse, colorHue, colorSaturation, colorLightness, colorAlpha, ...rest } = args
    const props: InkProps = { ...rest, color: toColor(args) }
    return <Ink {...props} />
  },
  play: async ({ canvasElement }) => {
    await expect(ink(canvasElement).tagName).toBe("SPAN")
    await expect(getComputedStyle(ink(canvasElement)).fontSize).toBe(resolveCss(canvasElement, "font-size", getToken("ink.fontSize:base")))
  },
}

export const As: Story = {
  ...Playground,
  args: { ...Playground.args, as: "h1" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("heading", { level: 1, name: TEXT })).toBeInTheDocument()
  },
}

export const Color: Story = {
  ...Playground,
  args: { ...Playground.args, color: "error" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(ink(canvasElement)).color).toBe(resolveCss(canvasElement, "color", getToken("ink.color:error")))
  },
}

export const ColorTransform: Story = {
  ...Playground,
  args: { ...Playground.args, color: "link", colorAlpha: "0.5" },
  play: async ({ canvasElement }) => {
    const expected = resolveCss(canvasElement, "color", getToken("ink.color:link", { transform: [null, null, null, 0.5] }))
    await expect(getComputedStyle(ink(canvasElement)).color).toBe(expected)
  },
}

export const Typography: Story = {
  ...Playground,
  args: { ...Playground.args, size: "larger", weight: "bold", lineHeight: "expanded", align: "center", italic: true },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(ink(canvasElement))
    await expect(style.fontSize).toBe(resolveCss(canvasElement, "font-size", getToken("ink.fontSize:larger")))
    await expect(style.fontWeight).toBe(resolveCss(canvasElement, "font-weight", getToken("ink.fontWeight:bold")))
    await expect(style.textAlign).toBe("center")
    await expect(style.fontStyle).toBe("italic")
  },
}

export const Code: Story = {
  ...Playground,
  args: { ...Playground.args, code: true },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(ink(canvasElement)).fontFamily).toBe(
      resolveCss(canvasElement, "font-family", getToken("ink.fontFamily:code")),
    )
  },
}

export const LineClamp: Story = {
  ...Playground,
  args: { ...Playground.args, as: "p", lineClamp: 1 },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(ink(canvasElement)).getPropertyValue("-webkit-line-clamp")).toBe("1")
  },
}

export const WordBreak: Story = {
  ...Playground,
  args: { ...Playground.args, wordBreak: "break-all" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(ink(canvasElement)).wordBreak).toBe("break-all")
  },
}

export const Theme: Story = {
  ...Playground,
  args: { ...Playground.args, theme: "night" },
  play: async ({ canvasElement }) => {
    await expect(ink(canvasElement).closest('[data-theme="night"]')).not.toBeNull()
  },
}

export const Id: Story = {
  ...Playground,
  args: { ...Playground.args, id: "anchor" },
  play: async ({ canvasElement }) => {
    await expect(ink(canvasElement)).toHaveAttribute("id", "anchor")
  },
}

export const Link: Story = {
  ...Playground,
  args: { ...Playground.args, as: "a", href: "#ink" },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: TEXT })
    await expect(link).toHaveAttribute("href", "#ink")
    await expect(getComputedStyle(link).color).toBe(resolveCss(canvasElement, "color", getToken("ink.color:link")))
  },
}

export const LetterSpacing: Story = {
  ...Playground,
  args: { ...Playground.args, letterSpacing: "wide" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(ink(canvasElement)).letterSpacing).toBe(
      resolveCss(ink(canvasElement), "letter-spacing", getToken("ink.letterSpacing:wide")),
    )
  },
}

export const MaxWidth: Story = {
  ...Playground,
  args: { ...Playground.args, as: "p", maxWidth: "prose" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(ink(canvasElement)).maxWidth).toBe(resolveCss(ink(canvasElement), "max-width", getToken("ink.maxWidth:prose")))
  },
}

export const Decoration: Story = {
  ...Playground,
  args: { ...Playground.args, decoration: "underline" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(ink(canvasElement)).textDecorationLine).toBe("underline")
  },
}

export const Truncate: Story = {
  ...Playground,
  args: { ...Playground.args, truncate: true },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(ink(canvasElement))
    await expect(style.textOverflow).toBe("ellipsis")
    await expect(style.whiteSpace).toBe("nowrap")
  },
}
