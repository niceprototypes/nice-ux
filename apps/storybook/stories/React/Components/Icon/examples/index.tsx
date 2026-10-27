// Icon example configs in the current component-docs pattern — one ComponentExample per
// facet. The other Icon pages still use the legacy layout; facets move here as they migrate.
import Icon from "nice-react-icon"
import Flex from "nice-react-flex"
import { Heart } from "lucide-react"
import { Theme, getToken } from "nice-react-styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** The icon on a day and a night background, side by side. */
const DayAndNight = ({ darkAntialiasing }: { darkAntialiasing?: boolean }) => (
  <span style={{ display: "inline-flex", gap: "0.5em" }}>
    {(["day", "night"] as const).map(theme => (
      <Theme key={theme} name={theme}>
        <span
          style={{
            display: "inline-flex",
            padding: "0.5em",
            borderRadius: "0.5em",
            backgroundColor: getToken("backgroundColor", "base"),
          }}
        >
          <Icon name="message" size="larger" darkAntialiasing={darkAntialiasing} />
        </span>
      </Theme>
    ))}
  </span>
)

const darkAntialiasingVariants: Record<string, { value?: boolean; code: string }> = {
  unset: { code: `<Icon name="message" />` },
  true: { value: true, code: `<Icon name="message" darkAntialiasing />` },
  false: { value: false, code: `<Icon name="message" darkAntialiasing={false} />` },
}

export const iconDarkAntialiasing = {
  name: "darkAntialiasing",
  description:
    "Thins the stroke for dark mode: light strokes on a dark ground look heavier than dark on light. The stroke width is multiplied by icon.strokeWidthScale, which follows the root strokeWidthScale (1 in day, 0.9 in night). Same pattern as theming: unset follows the nearest theme, true thins in any theme, false never thins. Each preview shows a day tile and a night tile.",
  variants: Object.keys(darkAntialiasingVariants),
  default: "unset",
  preview: variant => <DayAndNight darkAntialiasing={darkAntialiasingVariants[variant].value} />,
  code: variant => darkAntialiasingVariants[variant].code,
} satisfies ComponentExample

export const iconOutlined = {
  name: "outlined",
  description:
    "Deprecated: use variant. true maps to variant=\"fill\", false to variant=\"base\"; an explicit variant always takes precedence.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <Icon
      name="message"
      size="larger"
      outlined={variant === "true"}
    />
  ),
  code: variant => (variant === "true" ? `<Icon name="message" outlined />` : `<Icon name="message" />`),
} satisfies ComponentExample

export const iconUrl = {
  name: "url",
  description:
    "Renders an <img> with this source inside the icon wrapper instead of the SVG, at the icon size. Applies when name resolves to a built-in icon.",
  variants: ["none", "/favicon.svg"],
  default: "none",
  preview: variant => (
    <Icon
      name="message"
      size="larger"
      url={variant === "none" ? undefined : variant}
    />
  ),
  code: variant => (variant === "none" ? `<Icon name="message" />` : `<Icon name="message" url="${variant}" />`),
} satisfies ComponentExample

export const iconViewBox = {
  name: "viewBox",
  description: "viewBox of the rendered SVG. Icons are drawn on a 16-unit grid; a larger box shrinks the glyph inside the icon, a smaller one crops it.",
  variants: ["0 0 16 16", "0 0 24 24", "4 4 8 8"],
  default: "0 0 16 16",
  preview: variant => (
    <Icon
      name="message"
      size="larger"
      viewBox={variant}
    />
  ),
  code: variant => (variant === "0 0 16 16" ? `<Icon name="message" />` : `<Icon name="message" viewBox="${variant}" />`),
} satisfies ComponentExample

export const iconTheme = {
  name: "theme",
  description: "Forces day or night token resolution for the icon. Each preview sits on its theme's base background.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => (
    <Theme name={variant}>
      <Flex
        padding="small"
        style={{ backgroundColor: getToken("backgroundColor", "base") }}
      >
        <Icon
          name="message"
          size="larger"
          theme={variant}
        />
      </Flex>
    </Theme>
  ),
  code: variant => `<Icon name="message" theme="${variant}" />`,
} satisfies ComponentExample

export const iconVendorComponent = {
  name: "vendorComponent",
  description:
    "Renders this component inside the icon wrapper, bypassing name and vendor resolution, with the same token styling (color, size, stroke). Here a lucide-react icon.",
  variants: ["Heart"],
  default: "Heart",
  preview: () => (
    <Icon
      vendorComponent={Heart}
      size="larger"
      color="error"
    />
  ),
  code: () => `import { Heart } from "lucide-react"

<Icon vendorComponent={Heart} color="error" />`,
} satisfies ComponentExample

/** Every Icon facet in the current pattern. */
export const iconExamples = {
  darkAntialiasing: iconDarkAntialiasing,
  outlined: iconOutlined,
  url: iconUrl,
  viewBox: iconViewBox,
  theme: iconTheme,
  vendorComponent: iconVendorComponent,
} satisfies Record<string, ComponentExample>
