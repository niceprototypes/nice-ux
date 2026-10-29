import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type {
  BackgroundSizeType,
  BorderColorType,
  BorderRadiusType,
  BorderWidthType,
  BreakpointName,
  ChannelValue,
  ColorTokenProp,
} from "@niceprototypes/styles"
import Image from "@niceprototypes/image"
import type { ImageAsType, ImageProps } from "@niceprototypes/image"

/** Option lists, typed against the unions on disk so a renamed token fails the build. */
const AS_OPTIONS = ["img", "div"] as const satisfies readonly ImageAsType[]
const BACKGROUND_SIZE_OPTIONS = ["base", "contain", "cover", "fill", "none", "scale-down"] as const satisfies readonly BackgroundSizeType[]
const BORDER_RADIUS_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly BorderRadiusType[]
const BORDER_WIDTH_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly BorderWidthType[]
const BORDER_COLOR_OPTIONS = ["base", "subtle", "strong", "stronger", "success", "highlight", "warning", "error", "link"] as const satisfies readonly BorderColorType[]
const BREAKPOINT_OPTIONS = ["phone", "tablet", "laptop", "desktop"] as const satisfies readonly BreakpointName[]
const THEME_OPTIONS = Object.keys(themeTokensData)

/** The Storybook static image. */
const PHOTO = "/rasters/og-image.png"

/** `renderImage` presets: a plain img with the resolved src and alt. */
const plainImage = fn((src: string, alt: string) => <img src={src} alt={alt} data-render-image="" />)
const RENDER_IMAGE_PRESETS = { none: undefined, "plain img": plainImage }

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * ImageProps with `borderColor` flattened into one scalar arg per field (variant, theme pin,
 * breakpoint pin, inverse, one transform channel each) and `renderImage` as a preset name,
 * recomposed in `render`.
 */
type PlaygroundArgs = Omit<ImageProps, "borderColor" | "renderImage"> & {
  renderImage: keyof typeof RENDER_IMAGE_PRESETS
  borderColor?: BorderColorType
  borderColorTheme?: string
  borderColorBreakpoint?: BreakpointName
  borderColorInverse: boolean
  borderColorHue: string
  borderColorSaturation: string
  borderColorLightness: string
  borderColorAlpha: string
}

/** A transform channel from its text control: empty is unchanged, a bare number replaces, anything else is an adjustment ("+10", "*0.5"). */
const toChannel = (value: string): ChannelValue => {
  if (value.trim() === "") return null
  const number = Number(value)
  return Number.isNaN(number) ? value.trim() : number
}

/** The variant alone when no effect is set, else the object form. */
const toBorderColor = ({
  borderColor,
  borderColorTheme,
  borderColorBreakpoint,
  borderColorInverse,
  borderColorHue,
  borderColorSaturation,
  borderColorLightness,
  borderColorAlpha,
}: PlaygroundArgs): ColorTokenProp<BorderColorType> | undefined => {
  if (!borderColor) return undefined
  const transform = [borderColorHue, borderColorSaturation, borderColorLightness, borderColorAlpha].map(toChannel)
  const transformed = transform.some(channel => channel !== null)
  if (!borderColorTheme && !borderColorBreakpoint && !borderColorInverse && !transformed) return borderColor
  return {
    name: borderColor,
    theme: borderColorTheme,
    breakpoint: borderColorBreakpoint,
    inverse: borderColorInverse || undefined,
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
  title: "Components/Image",
  component: Image,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Image>

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

const image = (canvasElement: HTMLElement) => within(canvasElement).getByRole("img", { name: "Nice Prototypes" })

export const Playground: Story = {
  args: {
    as: "img",
    src: PHOTO,
    alt: "Nice Prototypes",
    width: "",
    height: "",
    aspectRatio: "",
    backgroundPosition: "",
    bordered: false,
    vendor: false,
    renderImage: "none",
    children: "",
    borderColorInverse: false,
    borderColorHue: "",
    borderColorSaturation: "",
    borderColorLightness: "",
    borderColorAlpha: "",
  },
  argTypes: {
    as: { control: "select", options: AS_OPTIONS, table: { category: "Content" } },
    src: { control: "text", table: { category: "Content" } },
    alt: { control: "text", table: { category: "Content" } },
    // Rendered inside the container when as="div".
    children: { control: "text", table: { category: "Content" } },
    renderImage: { control: "select", options: Object.keys(RENDER_IMAGE_PRESETS), table: { category: "Content" } },
    // Routes src/width/height through the registered resolver (@niceprototypes/image-vendor; src is an id).
    vendor: { control: "boolean", table: { category: "Content" } },

    width: { control: "text", table: { category: "Layout" } },
    height: { control: "text", table: { category: "Layout" } },
    aspectRatio: { control: "text", table: { category: "Layout" } },
    backgroundSize: optionalSelect(BACKGROUND_SIZE_OPTIONS, "Layout"),
    backgroundPosition: { control: "text", table: { category: "Layout" } },

    borderRadius: optionalSelect(BORDER_RADIUS_OPTIONS, "Border"),
    bordered: { control: "boolean", table: { category: "Border" } },
    borderWidth: optionalSelect(BORDER_WIDTH_OPTIONS, "Border"),
    // Explicit selects override preview.tsx's `color` matcher (a colour picker).
    borderColor: optionalSelect(BORDER_COLOR_OPTIONS, "Border"),
    borderColorTheme: optionalSelect(THEME_OPTIONS, "Border"),
    borderColorBreakpoint: optionalSelect(BREAKPOINT_OPTIONS, "Border"),
    borderColorInverse: { control: "boolean", table: { category: "Border" } },
    borderColorHue: { control: "text", table: { category: "Border" } },
    borderColorSaturation: { control: "text", table: { category: "Border" } },
    borderColorLightness: { control: "text", table: { category: "Border" } },
    borderColorAlpha: { control: "text", table: { category: "Border" } },

    theme: optionalSelect(THEME_OPTIONS, "Appearance"),

    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  // Recompose the flattened args; empty text controls are unset. The result is checked against ImageProps.
  render: args => {
    const {
      borderColorTheme,
      borderColorBreakpoint,
      borderColorInverse,
      borderColorHue,
      borderColorSaturation,
      borderColorLightness,
      borderColorAlpha,
      renderImage,
      width,
      height,
      aspectRatio,
      backgroundPosition,
      children,
      ...rest
    } = args
    const props: ImageProps = {
      ...rest,
      width: width || undefined,
      height: height || undefined,
      aspectRatio: aspectRatio || undefined,
      backgroundPosition: backgroundPosition || undefined,
      borderColor: toBorderColor(args),
      renderImage: RENDER_IMAGE_PRESETS[renderImage],
      children: children || undefined,
    }
    return <Image {...props} />
  },
  play: async ({ canvasElement }) => {
    const element = image(canvasElement)
    await expect(element.tagName).toBe("IMG")
    await expect(element).toHaveAttribute("src", PHOTO)
  },
}

export const Sizing: Story = {
  ...Playground,
  args: { ...Playground.args, width: "240px", aspectRatio: "1", backgroundSize: "cover", backgroundPosition: "top" },
  play: async ({ canvasElement }) => {
    const element = image(canvasElement)
    const { width, height } = element.getBoundingClientRect()
    await expect(width).toBe(240)
    await expect(height).toBe(240)
    await expect(getComputedStyle(element).objectFit).toBe("cover")
  },
}

export const Div: Story = {
  ...Playground,
  args: { ...Playground.args, as: "div", width: "240px", aspectRatio: "16/9", children: "Caption" },
  play: async ({ canvasElement }) => {
    const element = image(canvasElement)
    await expect(element.tagName).toBe("DIV")
    await expect(getComputedStyle(element).backgroundImage).toContain(PHOTO)
    await expect(element).toHaveTextContent("Caption")
  },
}

export const Bordered: Story = {
  ...Playground,
  args: { ...Playground.args, bordered: true, borderWidth: "large", borderColor: "error", borderRadius: "large" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(image(canvasElement))
    await expect(style.borderTopStyle).toBe("solid")
    await expect(style.borderTopWidth).toBe(resolveCss(canvasElement, "padding-top", getToken("image.borderWidth:large")))
    await expect(style.borderTopColor).toBe(resolveCss(canvasElement, "color", getToken("image.borderColor:error")))
    await expect(style.borderTopLeftRadius).toBe(
      resolveCss(canvasElement, "border-top-left-radius", getToken("image.borderRadius:large")),
    )
  },
}

export const RenderImage: Story = {
  ...Playground,
  args: { ...Playground.args, renderImage: "plain img" },
  play: async ({ canvasElement }) => {
    await expect(plainImage).toHaveBeenCalledWith(PHOTO, "Nice Prototypes")
    await expect(image(canvasElement)).toHaveAttribute("data-render-image")
  },
}

export const Vendor: Story = {
  ...Playground,
  args: { ...Playground.args, vendor: true, src: "622", width: "200px", height: "120px" },
  play: async ({ canvasElement }) => {
    // The resolver turns the id into a URL.
    await expect(image(canvasElement).getAttribute("src")).not.toBe("622")
  },
}

export const Theme: Story = {
  ...Playground,
  args: { ...Playground.args, theme: "night" },
  play: async ({ canvasElement }) => {
    await expect(image(canvasElement).closest('[data-theme="night"]')).not.toBeNull()
  },
}
