// Line example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `lineExamples` is the
// Line/Docs-page order; each Line/<facet>.mdx renders one entry.
import type { CSSProperties, ReactNode } from "react"
import Line, { type LineRadiusType } from "@niceprototypes/line"
import { Theme, getToken } from "@niceprototypes/styles"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

/** A positioned box for Line to frame. */
const Frame = ({ style, children }: { style?: CSSProperties; children: ReactNode }) => (
  <div style={{ position: "relative", width: "12em", height: "5em", ...style }}>{children}</div>
)

export const lineColor = {
  name: "color",
  description:
    "Dash color, one of the border-color variants. Read from the line.borderColor component tokens, which default to the root border colors.",
  variants: ["base", "subtle", "strong", "stronger", "success", "highlight", "warning", "error", "link"],
  default: "base",
  preview: variant => (
    <Frame style={{ borderRadius: 12 }}>
      <Line color={variant} />
    </Frame>
  ),
  code: variant => (variant === "base" ? `<Line />` : `<Line color="${variant}" />`),
} satisfies ComponentExample

const radiusVariants: Record<string, { radius: LineRadiusType; boxRadius?: string; code: string }> = {
  element: { radius: "element", boxRadius: "16px 4px", code: `<Line />` },
  square: { radius: 0, boxRadius: "16px", code: `<Line radius={0} />` },
  uniform: { radius: 12, code: `<Line radius={12} />` },
  "per corner": { radius: [24, 0, 24, 0], code: `<Line radius={[24, 0, 24, 0]} />` },
  elliptical: { radius: [[40, 20], [40, 20], [40, 20], [40, 20]], code: `<Line radius={[[40, 20], [40, 20], [40, 20], [40, 20]]} />` },
}

export const lineRadius = {
  name: "radius",
  description:
    "Corner radii. By default the parent element's own (every corner, percentages and elliptical radii included); or another element's own, when Line is laid over an element it isn't inside; otherwise one radius, or one per corner from top left, clockwise.",
  variants: Object.keys(radiusVariants),
  default: "element",
  preview: variant => (
    <Frame style={{ borderRadius: radiusVariants[variant].boxRadius }}>
      <Line radius={radiusVariants[variant].radius} />
    </Frame>
  ),
  code: variant => radiusVariants[variant].code,
} satisfies ComponentExample

export const lineTheme = {
  name: "theme",
  description:
    "Pins token resolution to a theme, so the dash takes that theme's line.borderColor. Each preview sits on its theme's base background.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => (
    <Theme name={variant}>
      <Frame style={{ backgroundColor: getToken("backgroundColor", "base") }}>
        <Line theme={variant} />
      </Frame>
    </Theme>
  ),
  code: variant => `<Line theme="${variant}" />`,
} satisfies ComponentExample

/** Every Line example facet — key order is the Line/Docs-page order. */
export const lineExamples = {
  color: lineColor,
  radius: lineRadius,
  theme: lineTheme,
} satisfies Record<string, ComponentExample>

/** Line facets in Docs-page order. */
export const lineExampleList: ComponentExample[] = Object.values(lineExamples)
