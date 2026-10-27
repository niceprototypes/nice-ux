// Tooltip example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `tooltipExamples`
// is the Tooltip/Docs-page order; each Tooltip/<facet>.mdx renders one entry.
import Tooltip from "@niceprototypes/tooltip"
import Button from "@niceprototypes/button"
import Icon from "@niceprototypes/icon"
import Flex from "@niceprototypes/flex"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

export const tooltipContent = {
  name: "content",
  description: "Content shown in the bubble: text or any React node. Required.",
  variants: ["text", "node"],
  default: "text",
  preview: variant => (
    <Tooltip
      content={
        variant === "node" ? (
          <Flex gap="small">
            <Icon name="star" />
            Saved to favorites
          </Flex>
        ) : (
          "Saved to favorites"
        )
      }
    >
      <Button>Hover me</Button>
    </Tooltip>
  ),
  code: variant =>
    variant === "node"
      ? `<Tooltip\n  content={\n    <Flex gap="small">\n      <Icon name="star" />\n      Saved to favorites\n    </Flex>\n  }\n>\n  <Button>Hover me</Button>\n</Tooltip>`
      : `<Tooltip content="Saved to favorites">\n  <Button>Hover me</Button>\n</Tooltip>`,
} satisfies ComponentExample

export const tooltipChildren = {
  name: "children",
  description: "The trigger the tooltip is attached to and activated from. Required.",
  variants: ["Button", "Icon"],
  default: "Button",
  preview: variant => (
    <Tooltip content="Help">{variant === "Icon" ? <Icon name="star" /> : <Button>Hover me</Button>}</Tooltip>
  ),
  code: variant =>
    variant === "Icon"
      ? `<Tooltip content="Help">\n  <Icon name="star" />\n</Tooltip>`
      : `<Tooltip content="Help">\n  <Button>Hover me</Button>\n</Tooltip>`,
} satisfies ComponentExample

export const tooltipAnchor = {
  name: "anchor",
  description:
    "What the bubble is positioned against: the trigger's bounding rect, or the pointer position captured at activation. cursor is one-shot — the bubble does not follow the pointer.",
  variants: ["trigger", "cursor"],
  default: "trigger",
  preview: variant => (
    <Tooltip
      content={`Anchor: ${variant}`}
      anchor={variant}
    >
      <Button>Hover me</Button>
    </Tooltip>
  ),
  code: variant =>
    variant === "trigger"
      ? `<Tooltip content="…">\n  <Button>Hover me</Button>\n</Tooltip>`
      : `<Tooltip content="…" anchor="${variant}">\n  <Button>Hover me</Button>\n</Tooltip>`,
} satisfies ComponentExample

/** Every new Tooltip example facet — key order is the Tooltip/Docs-page order. */
export const tooltipExamples = {
  content: tooltipContent,
  children: tooltipChildren,
  anchor: tooltipAnchor,
} satisfies Record<string, ComponentExample>

/** Tooltip facets in Docs-page order. */
export const tooltipExampleList: ComponentExample[] = Object.values(tooltipExamples)
