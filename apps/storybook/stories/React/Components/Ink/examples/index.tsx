// Ink example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `inkExamples`
// is the Ink/Docs-page order; each Ink/<facet>.mdx renders one entry.
import Ink from "nice-react-ink"
import Flex from "nice-react-flex"
import { Theme, getToken } from "nice-react-styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

const paragraph =
  "Nice Prototypes builds design systems and the components that consume them, so every product starts from the same tokens."

const url = "https://niceprototypes.com/ui/?path=/docs/components-ink--docs"

export const inkChildren = {
  name: "children",
  description: "Text content or child elements, rendered inside the element chosen by as.",
  variants: ["text", "elements"],
  default: "text",
  preview: variant =>
    variant === "elements" ? (
      <Ink>
        Read the <a href="#guide">guide</a> first.
      </Ink>
    ) : (
      <Ink>Read the guide first.</Ink>
    ),
  code: variant =>
    variant === "elements"
      ? `<Ink>\n  Read the <a href="#guide">guide</a> first.\n</Ink>`
      : `<Ink>Read the guide first.</Ink>`,
} satisfies ComponentExample

export const inkTheme = {
  name: "theme",
  description:
    "Pins token resolution to a theme instead of responding to the media query. Each preview sits on its theme's base background.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => (
    <Theme name={variant}>
      <Flex
        padding="small"
        style={{ backgroundColor: getToken("backgroundColor", "base") }}
      >
        <Ink theme={variant}>Read the guide first.</Ink>
      </Flex>
    </Theme>
  ),
  code: variant => `<Ink theme="${variant}">Read the guide first.</Ink>`,
} satisfies ComponentExample

export const inkLineClamp = {
  name: "lineClamp",
  description:
    "Truncates the text after this many lines with an ellipsis (CSS line-clamp). \"none\", or no value, shows all content.",
  variants: ["none", "1", "2"],
  default: "none",
  preview: variant => <Ink lineClamp={variant === "none" ? "none" : Number(variant)}>{paragraph}</Ink>,
  code: variant => (variant === "none" ? `<Ink>{paragraph}</Ink>` : `<Ink lineClamp={${variant}}>{paragraph}</Ink>`),
} satisfies ComponentExample

export const inkWordBreak = {
  name: "wordBreak",
  description:
    "Line break behavior for overflowing text (CSS word-break). break-all breaks between any two characters, which keeps a long URL inside its container; keep-all prevents breaks in CJK text; break-word is deprecated in CSS in favor of overflow-wrap.",
  variants: ["normal", "break-all", "keep-all", "break-word"],
  default: "normal",
  preview: variant => <Ink wordBreak={variant}>{url}</Ink>,
  code: variant => (variant === "normal" ? `<Ink>{url}</Ink>` : `<Ink wordBreak="${variant}">{url}</Ink>`),
} satisfies ComponentExample

/** Every new Ink example facet — key order is the Ink/Docs-page order. */
export const inkExamples = {
  children: inkChildren,
  theme: inkTheme,
  lineClamp: inkLineClamp,
  wordBreak: inkWordBreak,
} satisfies Record<string, ComponentExample>

/** Ink facets in Docs-page order. */
export const inkExampleList: ComponentExample[] = Object.values(inkExamples)
