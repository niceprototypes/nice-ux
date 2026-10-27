// Tile example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `tileExamples`
// is the Tile/Docs-page order; each Tile/<facet>.mdx renders one entry.
import Tile from "@niceprototypes/tile"
import Icon from "@niceprototypes/icon"
import Button from "@niceprototypes/button"
import { Theme, getToken } from "@niceprototypes/styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

const image = `url("/rasters/og-image.png")`
const gradient = `linear-gradient(135deg, ${getToken("backgroundColor", "link")}, ${getToken("backgroundColor", "success")})`

export const tileChildren = {
  name: "children",
  description: "Content rendered below the title and description block, in a Flex spaced from it by gap.",
  variants: ["none", "Button"],
  default: "none",
  preview: variant => (
    <Tile
      title="Title"
      description="Description"
    >
      {variant === "Button" ? <Button>Get started</Button> : null}
    </Tile>
  ),
  code: variant =>
    variant === "Button"
      ? `<Tile title="Title" description="Description">\n  <Button>Get started</Button>\n</Tile>`
      : `<Tile title="Title" description="Description" />`,
} satisfies ComponentExample

export const tileContentTop = {
  name: "contentTop",
  description: "Content rendered above the title.",
  variants: ["none", "Icon"],
  default: "none",
  preview: variant => (
    <Tile
      contentTop={variant === "Icon" ? <Icon name="star" size="large" /> : undefined}
      title="Title"
      description="Description"
    />
  ),
  code: variant =>
    variant === "Icon"
      ? `<Tile contentTop={<Icon name="star" size="large" />} title="Title" description="Description" />`
      : `<Tile title="Title" description="Description" />`,
} satisfies ComponentExample

export const tileTitleProps = {
  name: "titleProps",
  description: "Ink props applied to the title (every Ink prop except children), e.g. size, weight or color.",
  variants: ["none", "size + color"],
  default: "none",
  preview: variant => (
    <Tile
      title="Title"
      titleProps={variant === "none" ? undefined : { size: "larger", color: "link" }}
      description="Description"
    />
  ),
  code: variant =>
    variant === "none"
      ? `<Tile title="Title" description="Description" />`
      : `<Tile\n  title="Title"\n  titleProps={{ size: "larger", color: "link" }}\n  description="Description"\n/>`,
} satisfies ComponentExample

export const tileDescriptionProps = {
  name: "descriptionProps",
  description: "Ink props applied to the description (every Ink prop except children), e.g. color or italic.",
  variants: ["none", "color + italic"],
  default: "none",
  preview: variant => (
    <Tile
      title="Title"
      description="Description"
      descriptionProps={variant === "none" ? undefined : { color: "lighter", italic: true }}
    />
  ),
  code: variant =>
    variant === "none"
      ? `<Tile title="Title" description="Description" />`
      : `<Tile\n  title="Title"\n  description="Description"\n  descriptionProps={{ color: "lighter", italic: true }}\n/>`,
} satisfies ComponentExample

export const tileMaxWidth = {
  name: "maxWidth",
  description: "Max-width of the inner content column, as a CSS length or \"none\" (no cap).",
  variants: ["none", "8em"],
  default: "none",
  preview: variant => (
    <Tile
      title="Title"
      description="A description long enough to wrap when the column is capped."
      maxWidth={variant}
    />
  ),
  code: variant =>
    variant === "none" ? `<Tile title="Title" description="…" />` : `<Tile title="Title" description="…" maxWidth="${variant}" />`,
} satisfies ComponentExample

export const tileMinWidth = {
  name: "minWidth",
  description: "Minimum width of the outer tile box, as a CSS length string.",
  variants: ["none", "14em"],
  default: "none",
  preview: variant => (
    <Tile
      title="Title"
      minWidth={variant === "none" ? undefined : variant}
    />
  ),
  code: variant => (variant === "none" ? `<Tile title="Title" />` : `<Tile title="Title" minWidth="${variant}" />`),
} satisfies ComponentExample

export const tileMinHeight = {
  name: "minHeight",
  description: "Minimum height of the outer tile box, as a CSS length string.",
  variants: ["none", "10em"],
  default: "none",
  preview: variant => (
    <Tile
      title="Title"
      minHeight={variant === "none" ? undefined : variant}
    />
  ),
  code: variant => (variant === "none" ? `<Tile title="Title" />` : `<Tile title="Title" minHeight="${variant}" />`),
} satisfies ComponentExample

export const tileMaxHeight = {
  name: "maxHeight",
  description: "Maximum height of the outer tile box, as a CSS length string.",
  variants: ["none", "6em"],
  default: "none",
  preview: variant => (
    <Tile
      title="Title"
      description="Description"
      maxHeight={variant === "none" ? undefined : variant}
    />
  ),
  code: variant =>
    variant === "none" ? `<Tile title="Title" description="Description" />` : `<Tile title="Title" description="Description" maxHeight="${variant}" />`,
} satisfies ComponentExample

export const tileAlignItems = {
  name: "alignItems",
  description: "Cross-axis alignment of the content, passed to the layout Flex and the content block.",
  variants: ["flex-start", "center", "flex-end", "baseline", "stretch"],
  preview: variant => (
    <Tile
      title="Title"
      description="Description"
      alignItems={variant}
    />
  ),
  code: variant => `<Tile title="Title" description="Description" alignItems="${variant}" />`,
} satisfies ComponentExample

export const tileJustifyContent = {
  name: "justifyContent",
  description: "Main-axis distribution of the content, passed to the layout Flex and the content block. Visible when the tile is taller than its content.",
  variants: ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
  preview: variant => (
    <Tile
      title="Title"
      description="Description"
      minHeight="10em"
      justifyContent={variant}
    />
  ),
  code: variant => `<Tile title="Title" description="Description" minHeight="10em" justifyContent="${variant}" />`,
} satisfies ComponentExample

export const tileGap = {
  name: "gap",
  description: "Gap token variant spacing children from the title and description block.",
  variants: ["none", "smaller", "small", "base", "large", "larger"],
  // Unset by default: no variant is flagged.
  default: "",
  preview: variant => (
    <Tile
      title="Title"
      description="Description"
      gap={variant}
    >
      <Button>Get started</Button>
    </Tile>
  ),
  code: variant => `<Tile title="Title" description="Description" gap="${variant}">\n  <Button>Get started</Button>\n</Tile>`,
} satisfies ComponentExample

export const tileBackgroundImage = {
  name: "backgroundImage",
  description:
    "CSS background-image value — a url() reference or a gradient. Setting it applies backgroundSize, backgroundPosition and backgroundAttachment, with no-repeat.",
  variants: ["url", "gradient"],
  default: "url",
  preview: variant => (
    <Tile
      title="Title"
      backgroundImage={variant === "gradient" ? gradient : image}
      minHeight="8em"
      theme="night"
    />
  ),
  code: variant =>
    variant === "gradient"
      ? `<Tile title="Title" backgroundImage={gradient} />`
      : `<Tile title="Title" backgroundImage='${image}' />`,
} satisfies ComponentExample

export const tileBackgroundPosition = {
  name: "backgroundPosition",
  description: "CSS background-position of backgroundImage. Applies only with backgroundImage.",
  variants: ["center", "top left", "bottom right"],
  default: "center",
  preview: variant => (
    <Tile
      title="Title"
      backgroundImage={image}
      backgroundSize="none"
      backgroundAttachment="scroll"
      backgroundPosition={variant}
      minHeight="8em"
      theme="night"
    />
  ),
  code: variant => `<Tile backgroundImage={image} backgroundSize="none" backgroundPosition="${variant}" />`,
} satisfies ComponentExample

export const tileBackgroundSize = {
  name: "backgroundSize",
  description: "Background size of backgroundImage, from the tile.backgroundSize tokens. Applies only with backgroundImage.",
  variants: ["base", "contain", "cover", "fill", "none", "scale-down"],
  default: "cover",
  preview: variant => (
    <Tile
      title="Title"
      backgroundImage={image}
      backgroundAttachment="scroll"
      backgroundSize={variant}
      minHeight="8em"
      theme="night"
    />
  ),
  code: variant => `<Tile backgroundImage={image} backgroundSize="${variant}" />`,
} satisfies ComponentExample

export const tileBackgroundAttachment = {
  name: "backgroundAttachment",
  description:
    "CSS background-attachment of backgroundImage, applied in landscape orientation only. Default fixed: the image stays put while the page scrolls.",
  variants: ["fixed", "scroll"],
  default: "fixed",
  preview: variant => (
    <Tile
      title="Title"
      backgroundImage={image}
      backgroundAttachment={variant}
      minHeight="8em"
      theme="night"
    />
  ),
  code: variant =>
    variant === "fixed" ? `<Tile backgroundImage={image} />` : `<Tile backgroundImage={image} backgroundAttachment="${variant}" />`,
} satisfies ComponentExample

export const tileColor = {
  name: "color",
  description: "Text color of the tile box, from the tile.color tokens. Content that does not set its own color inherits it.",
  variants: ["base", "light", "lighter", "lightest", "disabled", "link", "success", "highlight", "warning", "error"],
  preview: variant => (
    <Tile color={variant}>
      <span>Inherited text</span>
    </Tile>
  ),
  code: variant => (variant === "base" ? `<Tile>…</Tile>` : `<Tile color="${variant}">…</Tile>`),
} satisfies ComponentExample

export const tileTheme = {
  name: "theme",
  description: "Pins token resolution to a theme; the tile takes that theme's tile.backgroundColor and tile.color.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => (
    <Theme name={variant}>
      <Tile
        title="Title"
        description="Description"
        theme={variant}
      />
    </Theme>
  ),
  code: variant => `<Tile title="Title" description="Description" theme="${variant}" />`,
} satisfies ComponentExample

/** Every new Tile example facet — key order is the Tile/Docs-page order. */
export const tileExamples = {
  children: tileChildren,
  contentTop: tileContentTop,
  titleProps: tileTitleProps,
  descriptionProps: tileDescriptionProps,
  maxWidth: tileMaxWidth,
  minWidth: tileMinWidth,
  minHeight: tileMinHeight,
  maxHeight: tileMaxHeight,
  alignItems: tileAlignItems,
  justifyContent: tileJustifyContent,
  gap: tileGap,
  backgroundImage: tileBackgroundImage,
  backgroundPosition: tileBackgroundPosition,
  backgroundSize: tileBackgroundSize,
  backgroundAttachment: tileBackgroundAttachment,
  color: tileColor,
  theme: tileTheme,
} satisfies Record<string, ComponentExample>

/** Tile facets in Docs-page order. */
export const tileExampleList: ComponentExample[] = Object.values(tileExamples)
