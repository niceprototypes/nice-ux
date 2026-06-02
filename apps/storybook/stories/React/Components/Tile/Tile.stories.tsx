import type { Meta, StoryObj } from "@storybook/react-vite"
import type {
  ColorType,
  FontSizeType,
  FontWeightType,
  LineHeightType,
} from "nice-react-styles"
import type { TypographyAlignType, TypographyAsType } from "nice-react-typography"
import Tile from "nice-react-tile"

/**
 * Token option lists for the Playground controls.
 *
 * `satisfies readonly <Union>[]` pins each array to the live token union from
 * nice-styles / nice-react-typography — if a token is renamed or removed there,
 * this file fails to compile rather than silently shipping a dead control value.
 * Sourced from nice-styles/src/generated/types.ts and Typography.types.ts; do
 * not hand-edit the values without re-reading those sources.
 */
const AS_OPTIONS = ["h1", "h2", "h3", "h4", "p", "span"] as const satisfies readonly TypographyAsType[]
const ALIGN_OPTIONS = ["left", "center", "right", "justify"] as const satisfies readonly TypographyAlignType[]
const COLOR_OPTIONS = ["base", "light", "lighter", "lightest", "disabled", "link", "success", "warning", "error"] as const satisfies readonly ColorType[]
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly FontSizeType[]
const WEIGHT_OPTIONS = ["light", "base", "medium", "semibold", "bold", "extrabold", "black"] as const satisfies readonly FontWeightType[]
const LINE_HEIGHT_OPTIONS = ["single", "condensed", "base", "expanded"] as const satisfies readonly LineHeightType[]

/**
 * PlaygroundArgs
 *
 * Synthetic, flattened args for the Tile Playground. The nested object props
 * `titleProps` / `descriptionProps` are exploded into one scalar arg per
 * Typography field so each gets its own typed dropdown control, then
 * recomposed back into the objects in `render`. Add a new field here +
 * matching argType + render line to expose a new sub-prop control.
 */
interface PlaygroundArgs {
  title: string
  description: string

  titleAs: TypographyAsType
  titleColor: ColorType
  titleSize: FontSizeType
  titleWeight: FontWeightType
  titleAlign: TypographyAlignType
  titleLineHeight: LineHeightType
  titleCode: boolean

  descriptionAs: TypographyAsType
  descriptionColor: ColorType
  descriptionSize: FontSizeType
  descriptionWeight: FontWeightType
  descriptionAlign: TypographyAlignType
  descriptionLineHeight: LineHeightType
  descriptionCode: boolean
}

const meta = {
  title: "React/Components/Tile",
  component: Tile,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Tile>

export default meta

type Story = StoryObj<PlaygroundArgs>

/** Build a select argType in a category — keeps the argTypes block scannable. */
const select = (
  options: readonly string[],
  category: string,
): { control: "select"; options: readonly string[]; table: { category: string } } => ({
  control: "select",
  options,
  table: { category },
})

export const Playground: Story = {
  args: {
    title: "Title",
    description: "Description",

    titleAs: "h2",
    titleColor: "base",
    titleSize: "large",
    titleWeight: "bold",
    titleAlign: "left",
    titleLineHeight: "base",
    titleCode: false,

    descriptionAs: "p",
    descriptionColor: "light",
    descriptionSize: "base",
    descriptionWeight: "base",
    descriptionAlign: "left",
    descriptionLineHeight: "base",
    descriptionCode: false,
  },
  argTypes: {
    title: { control: "text", table: { category: "Content" } },
    description: { control: "text", table: { category: "Content" } },

    titleAs: select(AS_OPTIONS, "titleProps"),
    // Explicit select overrides preview.tsx's `color`-name matcher (which would
    // otherwise force a color-picker control on any arg ending in "color").
    titleColor: select(COLOR_OPTIONS, "titleProps"),
    titleSize: select(SIZE_OPTIONS, "titleProps"),
    titleWeight: select(WEIGHT_OPTIONS, "titleProps"),
    titleAlign: select(ALIGN_OPTIONS, "titleProps"),
    titleLineHeight: select(LINE_HEIGHT_OPTIONS, "titleProps"),
    titleCode: { control: "boolean", table: { category: "titleProps" } },

    descriptionAs: select(AS_OPTIONS, "descriptionProps"),
    descriptionColor: select(COLOR_OPTIONS, "descriptionProps"),
    descriptionSize: select(SIZE_OPTIONS, "descriptionProps"),
    descriptionWeight: select(WEIGHT_OPTIONS, "descriptionProps"),
    descriptionAlign: select(ALIGN_OPTIONS, "descriptionProps"),
    descriptionLineHeight: select(LINE_HEIGHT_OPTIONS, "descriptionProps"),
    descriptionCode: { control: "boolean", table: { category: "descriptionProps" } },
  },
  // Recompose the flattened scalar args into the real nested object props.
  // The object literals are checked against TileProps' titleProps/descriptionProps
  // types, so an invalid arg→prop mapping fails the build here.
  render: ({
    title,
    description,
    titleAs,
    titleColor,
    titleSize,
    titleWeight,
    titleAlign,
    titleLineHeight,
    titleCode,
    descriptionAs,
    descriptionColor,
    descriptionSize,
    descriptionWeight,
    descriptionAlign,
    descriptionLineHeight,
    descriptionCode,
  }) => (
    <Tile
      title={title}
      description={description}
      titleProps={{
        as: titleAs,
        color: titleColor,
        size: titleSize,
        weight: titleWeight,
        align: titleAlign,
        lineHeight: titleLineHeight,
        code: titleCode,
      }}
      descriptionProps={{
        as: descriptionAs,
        color: descriptionColor,
        size: descriptionSize,
        weight: descriptionWeight,
        align: descriptionAlign,
        lineHeight: descriptionLineHeight,
        code: descriptionCode,
      }}
    />
  ),
}
