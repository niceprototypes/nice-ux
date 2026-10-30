import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, waitFor, within } from "storybook/test"
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
import type { ImageAsType, ImageFetchPriorityType, ImageLoadingType, ImageProps } from "@niceprototypes/image"

/** Option lists, typed against the unions on disk so a renamed token fails the build. */
const AS_OPTIONS = ["img", "div"] as const satisfies readonly ImageAsType[]
const BACKGROUND_SIZE_OPTIONS = ["base", "contain", "cover", "fill", "none", "scale-down"] as const satisfies readonly BackgroundSizeType[]
const BORDER_RADIUS_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly BorderRadiusType[]
const BORDER_WIDTH_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly BorderWidthType[]
const BORDER_COLOR_OPTIONS = ["base", "subtle", "strong", "stronger", "success", "highlight", "warning", "error", "link"] as const satisfies readonly BorderColorType[]
const BREAKPOINT_OPTIONS = ["phone", "tablet", "laptop", "desktop"] as const satisfies readonly BreakpointName[]
const THEME_OPTIONS = Object.keys(themeTokensData)
const LOADING_OPTIONS = ["eager", "lazy"] as const satisfies readonly ImageLoadingType[]
const FETCH_PRIORITY_OPTIONS = ["high", "low", "auto"] as const satisfies readonly ImageFetchPriorityType[]

/** The Storybook static image. */
const PHOTO = "/rasters/og-image.png"

/** PHOTO's 16px thumbnail, from `nicely thumbnails apps/storybook/public/rasters`. */
const PHOTO_THUMBNAIL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAMAAAAM9FwAAAABrVBMVEUTEyU2Hyk5Jy8gFCEkGCEdGCMSEyISFB4SFCAPEhkZFR8aEyInJC8oFiYSERwbGCI0HCkqHC4ZFCMtFCQfIC0gIy8fIikvEyI1JDAVEyURFRsnJDAlHCgpJTMVEyYzJzcpEiUUEyYqIzQ5NT0wLzcqKDoeGyQnJDQ2N0IYFSs3GCkoKi0XFic7FCA+FSQjEiUzGzM3OT8tNDglFykeEygcHyQtJC0xEyUmJitZPi82MyxoOi4nFC5xPjomJiwyHy8dIyY2GiswMjhnRTVnNCh9OjlaOlYcHyYdISVoJR9CHDVXRU5EPTBEGilZHyFiMCiGOjJMHiQxGCcqMnk8Om9tM1VUMG9tMzJAIDF9ME8vNDEyRGsUGyVbT0MgOHQTGyY0T2NRUD4pNDUdQmU6VlpaKzRqJ2yDOB4ZHVs9KnpAJDsdPW11LyckHklYI2l/PCcdMjc4UFBpInZSVj5AIGhhLEcgQ15HJEVcLChYJ046V1MhPldXLjNWJXpDIj1+MR8/T0GgQyl/KVGAMUBiIjN7IWRkIzdwHmSHKEyQKGGGI2OXMEhBGzGdNUeNNDAJyyzLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAoUlEQVQI12OoLkvOjgvOrC3Kq2zq7GptZyisSkmIDglLK8nIzWru7e5gaChOjPV2C40sLa+ryW/sa2MoSIrycbZ1DQhPrUivz2npYYiP8XCwsrR28Y8I9PTz9QpicHeyszDSNrN3tDHX09UyMGYwNdRQUVbT0TTRVxAXFpCQYZASExWRllVXVZIX5GVk4uFn4GTnYGNgUJSTFOJmZmHl4gMAevknqlc8skkAAAAASUVORK5CYII="

/** A src that never loads (404), so the thumbnail stays painted. */
const PENDING = "/rasters/pending.png"

/** `thumbnail` presets: unset, PHOTO's generated thumbnail, or the explicit opt-out. */
const THUMBNAIL_PRESETS = { none: undefined, generated: PHOTO_THUMBNAIL, false: false } as const

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
type PlaygroundArgs = Omit<ImageProps, "borderColor" | "renderImage" | "thumbnail"> & {
  renderImage: keyof typeof RENDER_IMAGE_PRESETS
  thumbnail: keyof typeof THUMBNAIL_PRESETS
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
    thumbnail: "none",
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

    // Painted (blurred) until the full image loads; "false" is the explicit opt-out.
    thumbnail: { control: "select", options: Object.keys(THUMBNAIL_PRESETS), table: { category: "Loading" } },
    loading: optionalSelect(LOADING_OPTIONS, "Loading"),
    fetchPriority: optionalSelect(FETCH_PRIORITY_OPTIONS, "Loading"),

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
      thumbnail,
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
      thumbnail: THUMBNAIL_PRESETS[thumbnail],
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

/** The computed background-image of the image element. */
const backgroundOf = (canvasElement: HTMLElement) => getComputedStyle(image(canvasElement)).backgroundImage

export const ThumbnailPending: Story = {
  ...Playground,
  args: { ...Playground.args, src: PENDING, thumbnail: "generated", width: "240px", aspectRatio: "1200/680" },
  play: async ({ canvasElement }) => {
    // The full image never loads, so the blurred thumbnail stays on the same <img>.
    await expect(image(canvasElement)).toHaveAttribute("decoding", "async")
    await expect(backgroundOf(canvasElement)).toContain("data:image/svg+xml")
    await expect(decodeURIComponent(backgroundOf(canvasElement))).toContain("feGaussianBlur")
  },
}

export const ThumbnailLoaded: Story = {
  ...Playground,
  args: { ...Playground.args, thumbnail: "generated", width: "240px", aspectRatio: "1200/680" },
  play: async ({ canvasElement }) => {
    await waitFor(() => expect((image(canvasElement) as HTMLImageElement).complete).toBe(true))
    await waitFor(() => expect(backgroundOf(canvasElement)).toBe("none"))
  },
}

export const ThumbnailFalse: Story = {
  ...Playground,
  args: { ...Playground.args, src: PENDING, thumbnail: "false" },
  play: async ({ canvasElement }) => {
    await expect(backgroundOf(canvasElement)).toBe("none")
  },
}

export const ThumbnailDiv: Story = {
  ...Playground,
  args: { ...Playground.args, as: "div", thumbnail: "generated", width: "240px", aspectRatio: "1200/680" },
  play: async ({ canvasElement }) => {
    // Layered under the full image until a probe of the src loads, then only the full image remains.
    await waitFor(() => expect(backgroundOf(canvasElement)).not.toContain("data:image/svg+xml"))
    await expect(backgroundOf(canvasElement)).toContain(PHOTO)
  },
}

export const ThumbnailDivPending: Story = {
  ...Playground,
  args: { ...Playground.args, as: "div", src: PENDING, thumbnail: "generated", width: "240px", aspectRatio: "1200/680" },
  play: async ({ canvasElement }) => {
    await expect(backgroundOf(canvasElement)).toContain(PENDING)
    await expect(backgroundOf(canvasElement)).toContain("data:image/svg+xml")
  },
}

export const Loading: Story = {
  ...Playground,
  args: { ...Playground.args, loading: "lazy", fetchPriority: "low" },
  play: async ({ canvasElement }) => {
    await expect(image(canvasElement)).toHaveAttribute("loading", "lazy")
    await expect(image(canvasElement)).toHaveAttribute("fetchpriority", "low")
  },
}
