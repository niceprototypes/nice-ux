// Lightbox example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `lightboxExamples`
// is the Lightbox/Docs-page order; each Lightbox/<facet>.mdx renders one entry.
import Lightbox from "nice-react-lightbox"
import Ink from "nice-react-ink"
import { resolveVendorImage } from "nice-react-image-vendor"
import { DemoImage } from "../Lightbox.styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

const image = resolveVendorImage({ src: "10", width: "800px", height: "600px" }) ?? ""

export const lightboxChildren = {
  name: "children",
  description:
    "The trigger: content rendered in place, which opens the overlay on click. It is wrapped in an element with role=\"button\". Required.",
  variants: ["image", "text"],
  default: "image",
  preview: variant => (
    <Lightbox
      imageUrl={image}
      alt="Mountain landscape"
    >
      {variant === "text" ? (
        <Ink color="link">View photo</Ink>
      ) : (
        <DemoImage
          src={image}
          alt="Mountain landscape"
        />
      )}
    </Lightbox>
  ),
  code: variant =>
    variant === "text"
      ? `<Lightbox imageUrl={url} alt="Mountain landscape">\n  <Ink color="link">View photo</Ink>\n</Lightbox>`
      : `<Lightbox imageUrl={url} alt="Mountain landscape">\n  <img src={url} />\n</Lightbox>`,
} satisfies ComponentExample

export const lightboxImageUrl = {
  name: "imageUrl",
  description: "URL of the image shown fullscreen in the overlay. It can differ from the trigger, e.g. a larger rendition. Required.",
  variants: ["URL"],
  default: "URL",
  preview: () => (
    <Lightbox
      imageUrl={image}
      alt="Mountain landscape"
    >
      <DemoImage
        src={image}
        alt="Mountain landscape"
      />
    </Lightbox>
  ),
  code: () => `<Lightbox imageUrl="/photo-large.jpg" alt="Mountain landscape">\n  …\n</Lightbox>`,
} satisfies ComponentExample

export const lightboxAlt = {
  name: "alt",
  description: "Alt text of the fullscreen image in the overlay. Defaults to \"\" (decorative).",
  variants: ["none", "text"],
  default: "none",
  preview: variant => (
    <Lightbox
      imageUrl={image}
      alt={variant === "text" ? "Mountain landscape" : undefined}
    >
      <DemoImage
        src={image}
        alt="Mountain landscape"
      />
    </Lightbox>
  ),
  code: variant =>
    variant === "text"
      ? `<Lightbox imageUrl={url} alt="Mountain landscape">\n  …\n</Lightbox>`
      : `<Lightbox imageUrl={url}>\n  …\n</Lightbox>`,
} satisfies ComponentExample

/** Every new Lightbox example facet — key order is the Lightbox/Docs-page order. */
export const lightboxExamples = {
  children: lightboxChildren,
  imageUrl: lightboxImageUrl,
  alt: lightboxAlt,
} satisfies Record<string, ComponentExample>

/** Lightbox facets in Docs-page order. */
export const lightboxExampleList: ComponentExample[] = Object.values(lightboxExamples)
