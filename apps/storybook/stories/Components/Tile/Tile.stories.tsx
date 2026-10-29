import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { setTokens, themeTokensData } from "@niceprototypes/styles"
import type {
  BackgroundColorType,
  BackgroundSizeType,
  ColorType,
  FontSizeType,
  FontWeightType,
  GapType,
  LineHeightType,
} from "@niceprototypes/styles"
import type { FlexAlignItemsType, FlexJustifyContentType } from "@niceprototypes/flex"
import type { InkAlignType, InkAsType, InkWordBreakType } from "@niceprototypes/ink"
import Ink from "@niceprototypes/ink"
import { resolveVendorImage } from "@niceprototypes/image-vendor"
import Tile from "@niceprototypes/tile"
import type { TileInkProps, TileProps } from "@niceprototypes/tile"

/** Sizes for the size props' presets and tests. Tile's size props take CSS lengths, not tokens. */
const getToken = setTokens(
  { length: { maxWidth: "480px", minWidth: "240px", minHeight: "320px", maxHeight: "640px" } },
  "tileStory",
)

/**
 * Option lists. Union props are typed against the union on disk, so a renamed token fails
 * the build; colour variants and themes are read from the token data, so none can be missed.
 */
const AS_OPTIONS = ["h1", "h2", "h3", "h4", "p", "span"] as const satisfies readonly InkAsType[]
const ALIGN_OPTIONS = ["left", "center", "right", "justify"] as const satisfies readonly InkAlignType[]
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly FontSizeType[]
const WEIGHT_OPTIONS = ["light", "base", "medium", "semibold", "bold", "extrabold", "black"] as const satisfies readonly FontWeightType[]
const LINE_HEIGHT_OPTIONS = ["single", "condensed", "base", "expanded"] as const satisfies readonly LineHeightType[]
const WORD_BREAK_OPTIONS = ["normal", "break-all", "keep-all", "break-word"] as const satisfies readonly InkWordBreakType[]
const GAP_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly GapType[]
const ALIGN_ITEMS_OPTIONS = ["flex-start", "flex-end", "center", "baseline", "stretch"] as const satisfies readonly FlexAlignItemsType[]
const JUSTIFY_CONTENT_OPTIONS = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"] as const satisfies readonly FlexJustifyContentType[]
const BACKGROUND_SIZE_OPTIONS = ["base", "contain", "cover", "fill", "none", "scale-down"] as const satisfies readonly BackgroundSizeType[]
const BACKGROUND_ATTACHMENT_OPTIONS = ["fixed", "scroll", "local"]
const COLOR_OPTIONS = Object.keys(themeTokensData.day.color) as ColorType[]
const BACKGROUND_COLOR_OPTIONS = Object.keys(themeTokensData.day.backgroundColor) as BackgroundColorType[]
const THEME_OPTIONS = Object.keys(themeTokensData)
const SIZE_PRESETS = {
  maxWidth: getToken("tileStory.length:maxWidth"),
  minWidth: getToken("tileStory.length:minWidth"),
  minHeight: getToken("tileStory.length:minHeight"),
  maxHeight: getToken("tileStory.length:maxHeight"),
}
const IMAGE = resolveVendorImage({ src: "10", width: "800px", height: "600px" }) ?? ""

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** The slot props, each rendered as its own name when switched on. */
const SLOTS = ["contentTop", "contentCenter", "contentLeft", "contentRight", "children"] as const
type SlotName = (typeof SLOTS)[number]

/**
 * PlaygroundArgs
 *
 * TileProps with the object-valued and node props flattened into scalar args, recomposed in
 * `render`:
 * - `titleProps` / `descriptionProps`: one arg per Ink field
 * - `color` / `backgroundColor`: variant plus theme pin and inverse flag
 * - slots: a boolean each, rendering the slot's name
 * - size props: a preset length each
 */
type InkArgs<P extends string> = {
  [K in "As" | "Color" | "Size" | "Weight" | "Align" | "LineHeight" | "WordBreak" | "LineClamp" | "Code" | "Italic" | "Antialiased" as `${P}${K}`]: K extends "Code" | "Italic" | "Antialiased"
    ? boolean
    : K extends "LineClamp"
      ? number
      : string
}

type PlaygroundArgs = Omit<
  TileProps,
  | SlotName
  | "title"
  | "description"
  | "titleProps"
  | "descriptionProps"
  | "color"
  | "backgroundColor"
  | "maxWidth"
  | "minWidth"
  | "minHeight"
  | "maxHeight"
> &
  InkArgs<"title"> &
  InkArgs<"description"> & {
    [K in SlotName]: boolean
  } & {
    title: string
    description: string
    color: string
    colorTheme: string
    colorInverse: boolean
    backgroundColor: string
    backgroundColorTheme: string
    backgroundColorInverse: boolean
    maxWidth: boolean
    minWidth: boolean
    minHeight: boolean
    maxHeight: boolean
  }

const meta = {
  title: "Components/Tile",
  component: Tile,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Tile>

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

const boolean = (category: string) => ({ control: "boolean" as const, table: { category } })
const text = (category: string) => ({ control: "text" as const, table: { category } })

const inkArgTypes = (prefix: "title" | "description") => {
  const category = `${prefix}Props`
  return {
    [`${prefix}As`]: select(AS_OPTIONS, category),
    // Explicit select overrides preview.tsx's `color` matcher (a colour picker).
    [`${prefix}Color`]: select(COLOR_OPTIONS, category),
    [`${prefix}Size`]: select(SIZE_OPTIONS, category),
    [`${prefix}Weight`]: select(WEIGHT_OPTIONS, category),
    [`${prefix}Align`]: select(ALIGN_OPTIONS, category),
    [`${prefix}LineHeight`]: select(LINE_HEIGHT_OPTIONS, category),
    [`${prefix}WordBreak`]: select(WORD_BREAK_OPTIONS, category),
    // 0 is no clamp.
    [`${prefix}LineClamp`]: { control: { type: "number", min: 0, step: 1 }, table: { category } },
    [`${prefix}Code`]: boolean(category),
    [`${prefix}Italic`]: boolean(category),
    [`${prefix}Antialiased`]: boolean(category),
  }
}

/** Recompose one Ink field set; the result is checked against TileInkProps. */
const toInkProps = (args: PlaygroundArgs, prefix: "title" | "description"): TileInkProps => {
  const read = (field: string) => args[`${prefix}${field}` as keyof PlaygroundArgs]
  return {
    as: read("As") as InkAsType,
    color: read("Color") as ColorType,
    size: read("Size") as FontSizeType,
    weight: read("Weight") as FontWeightType,
    align: read("Align") as InkAlignType,
    lineHeight: read("LineHeight") as LineHeightType,
    wordBreak: read("WordBreak") as InkWordBreakType,
    lineClamp: (read("LineClamp") as number) || "none",
    code: read("Code") as boolean,
    italic: read("Italic") as boolean,
    antialiased: read("Antialiased") as boolean,
  }
}

/** A colour prop: the variant alone, or the object form when a theme pin or inverse is set. */
const toColor = <V extends string>(name: string | undefined, theme: string | undefined, inverse: boolean) => {
  if (!name) return undefined
  if (!theme && !inverse) return name as V
  return { name: name as V, theme, inverse }
}

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

/** The Tile root: the nearest ancestor of the title that paints a background. */
const root = (canvasElement: HTMLElement) => {
  let element = within(canvasElement).getByText("Title")
  while (getComputedStyle(element).backgroundColor === "rgba(0, 0, 0, 0)") element = element.parentElement!
  return element
}

const inkArgs = (prefix: "title" | "description", as: InkAsType, color: ColorType, size: FontSizeType, weight: FontWeightType) => ({
  [`${prefix}As`]: as,
  [`${prefix}Color`]: color,
  [`${prefix}Size`]: size,
  [`${prefix}Weight`]: weight,
  [`${prefix}Align`]: "left",
  [`${prefix}LineHeight`]: "base",
  [`${prefix}WordBreak`]: "normal",
  [`${prefix}LineClamp`]: 0,
  [`${prefix}Code`]: false,
  [`${prefix}Italic`]: false,
  [`${prefix}Antialiased`]: false,
})

export const Playground: Story = {
  args: {
    title: "Title",
    description: "Description",
    ...(inkArgs("title", "h2", "base", "large", "bold") as InkArgs<"title">),
    ...(inkArgs("description", "p", "light", "base", "base") as InkArgs<"description">),
    contentTop: false,
    contentCenter: false,
    contentLeft: false,
    contentRight: false,
    children: false,
    padding: NONE,
    gap: NONE,
    maxWidth: false,
    minWidth: false,
    minHeight: false,
    maxHeight: false,
    color: NONE,
    colorTheme: NONE,
    colorInverse: false,
    backgroundColor: NONE,
    backgroundColorTheme: NONE,
    backgroundColorInverse: false,
    backgroundImage: "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    theme: NONE,
  },
  argTypes: {
    title: text("Content"),
    description: text("Content"),
    contentTop: boolean("Slots"),
    contentCenter: boolean("Slots"),
    contentLeft: boolean("Slots"),
    contentRight: boolean("Slots"),
    children: boolean("Slots"),

    ...inkArgTypes("title"),
    ...inkArgTypes("description"),

    padding: optionalSelect(GAP_OPTIONS, "Layout"),
    gap: optionalSelect(GAP_OPTIONS, "Layout"),
    alignItems: optionalSelect(ALIGN_ITEMS_OPTIONS, "Layout"),
    justifyContent: optionalSelect(JUSTIFY_CONTENT_OPTIONS, "Layout"),
    maxWidth: boolean("Layout"),
    minWidth: boolean("Layout"),
    minHeight: boolean("Layout"),
    maxHeight: boolean("Layout"),

    color: optionalSelect(COLOR_OPTIONS, "Color"),
    colorTheme: optionalSelect(THEME_OPTIONS, "Color"),
    colorInverse: boolean("Color"),
    backgroundColor: optionalSelect(BACKGROUND_COLOR_OPTIONS, "Background"),
    backgroundColorTheme: optionalSelect(THEME_OPTIONS, "Background"),
    backgroundColorInverse: boolean("Background"),
    backgroundImage: text("Background"),
    backgroundSize: select(BACKGROUND_SIZE_OPTIONS, "Background"),
    backgroundPosition: text("Background"),
    backgroundAttachment: select(BACKGROUND_ATTACHMENT_OPTIONS, "Background"),
    theme: optionalSelect(THEME_OPTIONS, "Appearance"),

    className: HIDDEN,
    style: HIDDEN,
  },
  // Recompose the flattened args; the result is checked against TileProps.
  render: args => {
    const {
      title,
      description,
      padding,
      gap,
      alignItems,
      justifyContent,
      backgroundImage,
      backgroundSize,
      backgroundPosition,
      backgroundAttachment,
      theme,
    } = args
    const slot = (name: SlotName) => (args[name] ? <Ink>{name}</Ink> : undefined)
    const size = (name: keyof typeof SIZE_PRESETS) => (args[name] ? SIZE_PRESETS[name] : undefined)
    const props: TileProps = {
      title,
      description,
      titleProps: toInkProps(args, "title"),
      descriptionProps: toInkProps(args, "description"),
      contentTop: slot("contentTop"),
      contentCenter: slot("contentCenter"),
      contentLeft: slot("contentLeft"),
      contentRight: slot("contentRight"),
      children: slot("children"),
      padding,
      gap,
      alignItems,
      justifyContent,
      maxWidth: size("maxWidth"),
      minWidth: size("minWidth"),
      minHeight: size("minHeight"),
      maxHeight: size("maxHeight"),
      color: toColor(args.color, args.colorTheme, args.colorInverse),
      backgroundColor: toColor(args.backgroundColor, args.backgroundColorTheme, args.backgroundColorInverse),
      backgroundImage: backgroundImage || undefined,
      backgroundSize,
      backgroundPosition,
      backgroundAttachment,
      theme,
    }
    return <Tile {...props} />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 2, name: "Title" })).toBeInTheDocument()
    await expect(canvas.getByText("Description").tagName).toBe("P")
    await expect(getComputedStyle(root(canvasElement)).backgroundColor).toBe(
      resolveCss(canvasElement, "background-color", getToken("tile.backgroundColor:base")),
    )
  },
}

export const TitleProps: Story = {
  ...Playground,
  args: { ...Playground.args, titleAs: "h1", titleColor: "error", titleSize: "larger", titleItalic: true },
  play: async ({ canvasElement }) => {
    const heading = within(canvasElement).getByRole("heading", { level: 1, name: "Title" })
    const style = getComputedStyle(heading)
    await expect(style.color).toBe(resolveCss(canvasElement, "color", getToken("color", "error")))
    await expect(style.fontSize).toBe(resolveCss(canvasElement, "font-size", getToken("fontSize", "larger")))
    await expect(style.fontStyle).toBe("italic")
  },
}

export const DescriptionProps: Story = {
  ...Playground,
  args: { ...Playground.args, descriptionAs: "span", descriptionWeight: "bold", descriptionCode: true },
  play: async ({ canvasElement }) => {
    const description = within(canvasElement).getByText("Description")
    await expect(description.closest("span, code")).toBeTruthy()
    await expect(getComputedStyle(description).fontFamily).toBe(
      resolveCss(canvasElement, "font-family", getToken("fontFamily", "code")),
    )
  },
}

export const Slots: Story = {
  ...Playground,
  args: { ...Playground.args, contentTop: true, contentCenter: true, contentLeft: true, contentRight: true, children: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const order = ["contentLeft", "contentTop", "Title", "contentCenter", "Description", "children", "contentRight"].map(
      name => canvas.getByText(name),
    )
    // Document order: left, then the content column (top, title, center, description, children), then right.
    for (let index = 1; index < order.length; index++) {
      await expect(order[index - 1].compareDocumentPosition(order[index]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    }
  },
}

export const Colors: Story = {
  ...Playground,
  args: { ...Playground.args, backgroundColor: "highlight", color: "error" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(root(canvasElement))
    await expect(style.backgroundColor).toBe(
      resolveCss(canvasElement, "background-color", getToken("tile.backgroundColor:highlight")),
    )
    await expect(style.color).toBe(resolveCss(canvasElement, "color", getToken("tile.color:error")))
  },
}

export const BackgroundImage: Story = {
  ...Playground,
  args: { ...Playground.args, backgroundImage: `url(${IMAGE})`, backgroundSize: "contain", backgroundPosition: "top" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(root(canvasElement))
    await expect(style.backgroundImage).toContain("url(")
    await expect(style.backgroundSize).toBe(
      resolveCss(canvasElement, "background-size", getToken("tile.backgroundSize:contain")),
    )
    await expect(style.backgroundPositionY).toBe("0%")
  },
}

export const Sizes: Story = {
  ...Playground,
  args: { ...Playground.args, maxWidth: true, minHeight: true, maxHeight: true, minWidth: true },
  play: async ({ canvasElement }) => {
    const tile = getComputedStyle(root(canvasElement))
    await expect(tile.minHeight).toBe(resolveCss(canvasElement, "min-height", SIZE_PRESETS.minHeight))
    await expect(tile.maxHeight).toBe(resolveCss(canvasElement, "max-height", SIZE_PRESETS.maxHeight))
    await expect(tile.minWidth).toBe(resolveCss(canvasElement, "min-width", SIZE_PRESETS.minWidth))
    // maxWidth caps the inner layout, which centres in the tile.
    let layout = within(canvasElement).getByText("Title")
    while (getComputedStyle(layout).maxWidth === "none") layout = layout.parentElement!
    await expect(getComputedStyle(layout).maxWidth).toBe(resolveCss(canvasElement, "max-width", SIZE_PRESETS.maxWidth))
  },
}

export const Spacing: Story = {
  ...Playground,
  args: { ...Playground.args, padding: "larger", gap: "larger" },
  play: async ({ canvasElement }) => {
    const larger = resolveCss(canvasElement, "padding-top", getToken("gap", "larger"))
    let layout = within(canvasElement).getByText("Title")
    while (getComputedStyle(layout).paddingTop !== larger) layout = layout.parentElement!
    await expect(getComputedStyle(layout).paddingLeft).toBe(larger)
  },
}

export const Night: Story = {
  ...Playground,
  args: { ...Playground.args, theme: "night" },
  play: async ({ canvasElement }) => {
    await expect(root(canvasElement).closest("[data-theme='night']")).toBeTruthy()
  },
}
