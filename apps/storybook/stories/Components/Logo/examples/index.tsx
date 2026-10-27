// Logo example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `logoExamples` is the
// Logo/Docs-page order; each Logo/<facet>.mdx renders one entry.
import Logo from "@niceprototypes/logo"
import { Theme, getToken } from "@niceprototypes/styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

export const logoHeight = {
  name: "height",
  description:
    "Height of the logo in pixels. Defaults to the responsive logo.height token (64px phone, 56px tablet, 48px laptop+), which setTokens can override. The name is nameHeightScale of that height (0.6 by default); the width follows from the pieces' SVG viewBoxes.",
  variants: ["logo.height", "32", "48"],
  default: "logo.height",
  preview: variant => (variant === "logo.height" ? <Logo /> : <Logo height={Number(variant)} />),
  code: variant => (variant === "logo.height" ? `<Logo />` : `<Logo height={${variant}} />`),
} satisfies ComponentExample

export const logoShowName = {
  name: "showName",
  description: "Shows the logo name beside the heart. The heart always shows.",
  variants: ["true", "false"],
  default: "true",
  preview: variant => <Logo height={48} showName={variant === "true"} />,
  code: variant => (variant === "true" ? `<Logo height={48} />` : `<Logo height={48} showName={false} />`),
} satisfies ComponentExample

export const logoNameHeightScale = {
  name: "nameHeightScale",
  description: "The name's height as a fraction of the logo's height; its width follows from its SVG. The heart always takes the full height.",
  variants: ["0.6", "0.75"],
  default: "0.6",
  preview: variant => <Logo height={48} nameHeightScale={Number(variant)} />,
  code: variant => (variant === "0.6" ? `<Logo height={48} />` : `<Logo height={48} nameHeightScale={${variant}} />`),
} satisfies ComponentExample

export const logoGap = {
  name: "gap",
  description: "Space between the heart and the name, in pixels. Defaults to 4.",
  variants: ["4", "10"],
  default: "4",
  preview: variant => <Logo height={48} gap={Number(variant)} />,
  code: variant => (variant === "4" ? `<Logo height={48} />` : `<Logo height={48} gap={${variant}} />`),
} satisfies ComponentExample

export const logoAriaLabel = {
  name: "aria-label",
  description: "Accessible name of the logo, which renders as one image (role=\"img\"). Defaults to \"Nice Prototypes\".",
  variants: ["Nice Prototypes", "Nice Prototypes home"],
  default: "Nice Prototypes",
  preview: variant => <Logo aria-label={variant} />,
  code: variant => (variant === "Nice Prototypes" ? `<Logo />` : `<Logo aria-label="${variant}" />`),
} satisfies ComponentExample

export const logoTheme = {
  name: "theme",
  description:
    "Pins token resolution to a theme. The name takes that theme's base text color, light in night; the heart keeps its own colors. Each preview sits on its theme's base background.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => (
    <Theme name={variant}>
      <span
        style={{
          display: "inline-flex",
          padding: "0.75em",
          borderRadius: "0.5em",
          backgroundColor: getToken("backgroundColor", "base"),
        }}
      >
        <Logo height={48} theme={variant} />
      </span>
    </Theme>
  ),
  code: variant => `<Logo height={48} theme="${variant}" />`,
} satisfies ComponentExample

/** Every Logo example facet — key order is the Logo/Docs-page order. */
export const logoExamples = {
  height: logoHeight,
  showName: logoShowName,
  nameHeightScale: logoNameHeightScale,
  gap: logoGap,
  ariaLabel: logoAriaLabel,
  theme: logoTheme,
} satisfies Record<string, ComponentExample>

/** Logo facets in Docs-page order. */
export const logoExampleList: ComponentExample[] = Object.values(logoExamples)
