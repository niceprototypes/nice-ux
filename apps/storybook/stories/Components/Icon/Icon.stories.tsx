import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Heart, Star } from "lucide-react"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { BreakpointName, ChannelValue, ColorTokenProp, FontSizeType } from "@niceprototypes/styles"
import Icon, { iconNames } from "@niceprototypes/icon"
import type { IconAnimationDurationType, IconColorType, IconProps, IconStrokeWidthType } from "@niceprototypes/icon"
import { iconVariants } from "@niceprototypes/icon/svg"

/**
 * Option lists. Names and variants are read from the icon catalog; the other unions are typed
 * against the unions on disk so a renamed token fails the build. `name` also lists Lucide names,
 * which resolve only with `vendor` (@niceprototypes/icon-vendor).
 */
const VENDOR_NAME_OPTIONS = ["TrendingDown", "Sparkles"]
const NAME_OPTIONS = [...iconNames, ...VENDOR_NAME_OPTIONS]
const VARIANT_OPTIONS = [...new Set(Object.values(iconVariants).flat())]
const COLOR_OPTIONS = ["base", "light", "lighter", "lightest", "disabled", "link", "success", "highlight", "warning", "error"] as const satisfies readonly IconColorType[]
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly FontSizeType[]
const STROKE_WIDTH_OPTIONS = ["small", "base", "large"] as const satisfies readonly IconStrokeWidthType[]
const ANIMATION_DURATION_OPTIONS = ["fast", "base", "slow"] as const satisfies readonly IconAnimationDurationType[]
const BREAKPOINT_OPTIONS = ["phone", "tablet", "laptop", "desktop"] as const satisfies readonly BreakpointName[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** `vendorComponent` presets: Lucide components rendered inside the token-styled wrapper. */
const VENDOR_COMPONENT_PRESETS = { none: undefined, Heart, Star }

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * IconProps with the `color` object flattened into one scalar arg per field (variant, theme
 * pin, breakpoint pin, inverse, one transform channel each), `darkAntialiasing` as a
 * three-way choice and `vendorComponent` as a preset name, recomposed in `render`.
 */
type PlaygroundArgs = Omit<IconProps, "color" | "darkAntialiasing" | "vendorComponent"> & {
  darkAntialiasing: "theme" | "on" | "off"
  vendorComponent: keyof typeof VENDOR_COMPONENT_PRESETS
  color?: IconColorType
  colorTheme?: string
  colorBreakpoint?: BreakpointName
  colorInverse: boolean
  colorHue: string
  colorSaturation: string
  colorLightness: string
  colorAlpha: string
}

const DARK_ANTIALIASING = { theme: undefined, on: true, off: false }

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
}: PlaygroundArgs): ColorTokenProp<IconColorType> | undefined => {
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
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Icon>

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

/** The story's own root: the canvas also holds a stylesheet link and the Storybook toolbar after it. */
const story = (canvasElement: HTMLElement) => canvasElement.querySelector<HTMLElement>(":scope > :not(link)")!
const svg = (canvasElement: HTMLElement) => story(canvasElement).querySelector("svg")!
const shape = (canvasElement: HTMLElement) => svg(canvasElement).querySelector("path, circle, rect, line, polyline, polygon, ellipse")!

export const Playground: Story = {
  args: {
    name: "arrow-right",
    variant: "base",
    outlined: false,
    url: "",
    size: "larger",
    viewBox: "0 0 16 16",
    strokeWidth: "base",
    strokeScaling: false,
    darkAntialiasing: "theme",
    vendor: false,
    vendorComponent: "none",
    animationDuration: "base",
    colorInverse: false,
    colorHue: "",
    colorSaturation: "",
    colorLightness: "",
    colorAlpha: "",
  },
  argTypes: {
    name: { control: "select", options: NAME_OPTIONS, table: { category: "Content" } },
    variant: { control: "select", options: VARIANT_OPTIONS, table: { category: "Content" } },
    // Deprecated: true maps to variant "fill" when variant is unset.
    outlined: { control: "boolean", table: { category: "Content" } },
    url: { control: "text", table: { category: "Content" } },
    viewBox: { control: "text", table: { category: "Content" } },
    vendor: { control: "boolean", table: { category: "Content" } },
    vendorComponent: { control: "select", options: Object.keys(VENDOR_COMPONENT_PRESETS), table: { category: "Content" } },

    size: { control: "select", options: SIZE_OPTIONS, table: { category: "Appearance" } },
    strokeWidth: { control: "select", options: STROKE_WIDTH_OPTIONS, table: { category: "Appearance" } },
    strokeScaling: { control: "boolean", table: { category: "Appearance" } },
    darkAntialiasing: { control: "select", options: Object.keys(DARK_ANTIALIASING), table: { category: "Appearance" } },
    theme: optionalSelect(THEME_OPTIONS, "Appearance"),
    animation: optionalSelect(["spin"], "Appearance"),
    animationDuration: { control: "select", options: ANIMATION_DURATION_OPTIONS, table: { category: "Appearance" } },

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
  // Recompose the flattened args; an empty url is unset. The result is checked against IconProps.
  render: args => {
    const {
      colorTheme,
      colorBreakpoint,
      colorInverse,
      colorHue,
      colorSaturation,
      colorLightness,
      colorAlpha,
      darkAntialiasing,
      vendorComponent,
      url,
      ...rest
    } = args
    const props: IconProps = {
      ...rest,
      url: url || undefined,
      color: toColor(args),
      darkAntialiasing: DARK_ANTIALIASING[darkAntialiasing],
      vendorComponent: VENDOR_COMPONENT_PRESETS[vendorComponent],
    }
    return <Icon {...props} />
  },
  play: async ({ canvasElement }) => {
    const wrapper = svg(canvasElement).parentElement!
    await expect(getComputedStyle(wrapper).width).toBe(resolveCss(canvasElement, "width", getToken("icon.size:larger")))
    await expect(svg(canvasElement)).toHaveAttribute("viewBox", "0 0 16 16")
    // Base variant: stroked, unfilled, fixed stroke width.
    const style = getComputedStyle(shape(canvasElement))
    await expect(style.fill).toBe("none")
    await expect(style.vectorEffect).toBe("non-scaling-stroke")
  },
}

export const Color: Story = {
  ...Playground,
  args: { ...Playground.args, color: "error" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(shape(canvasElement)).stroke).toBe(
      resolveCss(canvasElement, "color", getToken("icon.color:error")),
    )
  },
}

export const Fill: Story = {
  ...Playground,
  args: { ...Playground.args, variant: "fill" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(shape(canvasElement)).stroke).toBe("none")
  },
}

export const Outlined: Story = {
  ...Playground,
  args: { ...Playground.args, variant: undefined, outlined: true },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(shape(canvasElement)).stroke).toBe("none")
  },
}

export const StrokeWidth: Story = {
  ...Playground,
  args: { ...Playground.args, strokeWidth: "large", darkAntialiasing: "off" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(shape(canvasElement)).strokeWidth).toBe(
      resolveCss(canvasElement, "stroke-width", getToken("icon.strokeWidth:large")),
    )
  },
}

export const StrokeScaling: Story = {
  ...Playground,
  args: { ...Playground.args, strokeScaling: true },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(shape(canvasElement)).vectorEffect).toBe("none")
  },
}

export const ViewBox: Story = {
  ...Playground,
  args: { ...Playground.args, viewBox: "0 0 32 32" },
  play: async ({ canvasElement }) => {
    await expect(svg(canvasElement)).toHaveAttribute("viewBox", "0 0 32 32")
  },
}

export const Url: Story = {
  ...Playground,
  args: { ...Playground.args, url: "/favicon.svg" },
  play: async ({ canvasElement }) => {
    await expect(story(canvasElement).querySelector("img")).toHaveAttribute("src", "/favicon.svg")
  },
}

export const Spin: Story = {
  ...Playground,
  args: { ...Playground.args, animation: "spin", animationDuration: "slow" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(svg(canvasElement))
    await expect(style.animationName).not.toBe("none")
    await expect(style.animationDuration).toBe(
      resolveCss(canvasElement, "animation-duration", getToken("icon.animationDuration:slow")),
    )
  },
}

export const Vendor: Story = {
  ...Playground,
  args: { ...Playground.args, name: "TrendingDown", vendor: true },
  play: async ({ canvasElement }) => {
    // Lucide icons draw on a 24-unit grid; the fallback circle uses the 16-unit one.
    await expect(svg(canvasElement)).toHaveAttribute("viewBox", "0 0 24 24")
  },
}

export const VendorComponent: Story = {
  ...Playground,
  args: { ...Playground.args, vendorComponent: "Heart", color: "link" },
  play: async ({ canvasElement }) => {
    await expect(svg(canvasElement)).toHaveClass("lucide-heart")
    await expect(getComputedStyle(svg(canvasElement).parentElement!).color).toBe(
      resolveCss(canvasElement, "color", getToken("icon.color:link")),
    )
  },
}

export const Theme: Story = {
  ...Playground,
  args: { ...Playground.args, theme: "night" },
  play: async ({ canvasElement }) => {
    await expect(svg(canvasElement).closest('[data-theme="night"]')).not.toBeNull()
  },
}
