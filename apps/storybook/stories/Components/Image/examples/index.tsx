// Image example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `imageExamples`
// is the Image/Docs-page order; each Image/<facet>.mdx renders one entry.
import Image from "@niceprototypes/image"
import Ink from "@niceprototypes/ink"
import Flex from "@niceprototypes/flex"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

const photo = "/rasters/og-image.png"

export const imageSrc = {
  name: "src",
  description:
    "Image source URL, used as-is. With vendor, src (with width and height) is routed through the registered vendor resolver, so it can be an id instead of a URL.",
  variants: ["URL", "vendor id"],
  default: "URL",
  preview: variant =>
    variant === "vendor id" ? (
      <Image
        vendor
        src="622"
        alt="Vendor image"
        width="200px"
        height="120px"
        backgroundSize="cover"
      />
    ) : (
      <Image
        src={photo}
        alt="Nice Prototypes"
        width="200px"
      />
    ),
  code: variant =>
    variant === "vendor id"
      ? `<Image vendor src="622" alt="Vendor image" width="200px" height="120px" />`
      : `<Image src="${photo}" alt="Nice Prototypes" width="200px" />`,
} satisfies ComponentExample

export const imageAlt = {
  name: "alt",
  description:
    "Alternative text. On the default <img> it is the alt attribute; with as=\"div\" the div gets role=\"img\" and alt becomes its aria-label.",
  variants: ["img", "div"],
  default: "img",
  preview: variant =>
    variant === "div" ? (
      <Image
        as="div"
        src={photo}
        alt="Nice Prototypes"
        width="200px"
        aspectRatio="1200/680"
      />
    ) : (
      <Image
        src={photo}
        alt="Nice Prototypes"
        width="200px"
      />
    ),
  code: variant =>
    variant === "div"
      ? `<Image as="div" src="${photo}" alt="Nice Prototypes" />`
      : `<Image src="${photo}" alt="Nice Prototypes" />`,
} satisfies ComponentExample

export const imageWidth = {
  name: "width",
  description: "Width of the image container, as a CSS length string.",
  variants: ["120px", "200px"],
  default: "120px",
  preview: variant => (
    <Image
      src={photo}
      alt="Nice Prototypes"
      width={variant}
    />
  ),
  code: variant => `<Image src="${photo}" alt="Nice Prototypes" width="${variant}" />`,
} satisfies ComponentExample

export const imageHeight = {
  name: "height",
  description: "Height of the image container, as a CSS length string. With a fixed width and height, backgroundSize decides how the image fits.",
  variants: ["60px", "120px"],
  default: "60px",
  preview: variant => (
    <Image
      src={photo}
      alt="Nice Prototypes"
      width="200px"
      height={variant}
      backgroundSize="cover"
    />
  ),
  code: variant => `<Image src="${photo}" alt="Nice Prototypes" width="200px" height="${variant}" backgroundSize="cover" />`,
} satisfies ComponentExample

export const imageAspectRatio = {
  name: "aspectRatio",
  description: "Aspect ratio of the image container, as a CSS aspect-ratio value; the height follows from the width.",
  variants: ["16/9", "1/1"],
  default: "16/9",
  preview: variant => (
    <Image
      src={photo}
      alt="Nice Prototypes"
      width="160px"
      aspectRatio={variant}
      backgroundSize="cover"
    />
  ),
  code: variant => `<Image src="${photo}" alt="Nice Prototypes" width="160px" aspectRatio="${variant}" backgroundSize="cover" />`,
} satisfies ComponentExample

export const imageChildren = {
  name: "children",
  description: "Content rendered inside the background-image div, on top of the image. Applies only with as=\"div\".",
  variants: ["text"],
  default: "text",
  preview: () => (
    <Image
      as="div"
      vendor
      src="622"
      alt="Vendor image"
      width="200px"
      height="120px"
      backgroundSize="cover"
    >
      <Flex padding="small">
        <Ink
          theme="night"
          weight="semibold"
        >
          Overlay
        </Ink>
      </Flex>
    </Image>
  ),
  code: () => `<Image as="div" vendor src="622" alt="Vendor image" width="200px" height="120px">
  <Ink theme="night">Overlay</Ink>
</Image>`,
} satisfies ComponentExample

/** Every new Image example facet — key order is the Image/Docs-page order. */
export const imageExamples = {
  src: imageSrc,
  alt: imageAlt,
  width: imageWidth,
  height: imageHeight,
  aspectRatio: imageAspectRatio,
  children: imageChildren,
} satisfies Record<string, ComponentExample>

/** Image facets in Docs-page order. */
export const imageExampleList: ComponentExample[] = Object.values(imageExamples)
