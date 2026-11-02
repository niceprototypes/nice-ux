// Sticky example configs — one ComponentExample per prop, shaped like Toggle's. Each preview is a
// bounded scrolling box (a ScrollProvider root) with its own StickyProvider; scroll the box to move the rows under the bar.
import type * as React from "react"
import { useState } from "react"
import { Sticky, StickyProvider } from "@niceprototypes/scroll"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import { getToken } from "@niceprototypes/styles"
import type { ComponentExample } from "../../dataTables/components/demos/Components"
import ScrollBox from "./ScrollBox"

/** A bar with a background, so the rows scrolling under it stay hidden. */
const Bar = ({ children }: { children: React.ReactNode }) => (
  <Flex
    padding="small"
    style={{ backgroundColor: getToken("backgroundColor", "raised") }}
  >
    <Ink size="small">{children}</Ink>
  </Flex>
)

/** Rows to scroll under the bar. */
const Rows = () => (
  <Flex
    direction="column"
    gap="base"
    padding="small"
  >
    {Array.from({ length: 8 }, (_, index) => (
      <Ink
        key={index}
        size="small"
        color="light"
      >
        Row {index + 1}
      </Ink>
    ))}
  </Flex>
)

/** A Sticky that shows the last value onStickyChange received. */
const ReportingSticky = () => {
  const [isSticky, setIsSticky] = useState<boolean | null>(null)
  return (
    <Sticky onStickyChange={setIsSticky}>
      <Bar>{isSticky === null ? "Header" : `onStickyChange(${isSticky})`}</Bar>
    </Sticky>
  )
}

export const stickyChildren = {
  name: "children",
  description:
    "Content of the bar. Sticky renders it in a fixed wrapper at the top of the viewport and leaves a spacer of the same height in the flow; in a ScrollProvider root it sticks to the root's top instead. Without a StickyProvider it renders the children in place.",
  variants: ["header"],
  default: "header",
  preview: () => (
    <ScrollBox>
      <StickyProvider>
        <Sticky>
          <Bar>Header</Bar>
        </Sticky>
        <Rows />
      </StickyProvider>
    </ScrollBox>
  ),
  code: () => `<StickyProvider>\n  <Sticky>\n    <Header />\n  </Sticky>\n  <Content />\n</StickyProvider>`,
} satisfies ComponentExample

/** The Subheader's order beside a Header at order 1: 0 stacks it above the Header, 2 below. */
const orderVariants = ["0", "2"]

export const stickyOrder = {
  name: "order",
  description:
    "Stacking order among the provider's Sticky elements: lower orders sit above, and each one is offset by the heights of those above it. Here a Header has order 1.",
  variants: orderVariants,
  default: "0",
  preview: variant => {
    const subheaderOrder = Number(variant)
    const bars = [
      { order: 1, label: "Header" },
      { order: subheaderOrder, label: `Subheader, order ${subheaderOrder}` },
    ].sort((a, b) => a.order - b.order)
    return (
      <ScrollBox>
        <StickyProvider>
          {bars.map(bar => (
            <Sticky
              key={bar.label}
              order={bar.order}
            >
              <Bar>{bar.label}</Bar>
            </Sticky>
          ))}
          <Rows />
        </StickyProvider>
      </ScrollBox>
    )
  },
  code: variant =>
    `<StickyProvider>\n  <Sticky order={1}>Header</Sticky>\n  <Sticky order={${variant}}>Subheader</Sticky>\n</StickyProvider>`,
} satisfies ComponentExample

export const stickyOnStickyChange = {
  name: "onStickyChange",
  description:
    "Called with true when the spacer leaves the viewport (the bar is stuck), false when it returns. Scroll the box to move the spacer out of view.",
  variants: ["handler"],
  default: "handler",
  preview: () => (
    <ScrollBox>
      <StickyProvider>
        <ReportingSticky />
        <Rows />
      </StickyProvider>
    </ScrollBox>
  ),
  code: () => `<Sticky onStickyChange={isSticky => setIsSticky(isSticky)}>\n  <Header />\n</Sticky>`,
} satisfies ComponentExample

/** Every Sticky example facet — each one a section of the Sticky docs page. */
export const stickyExamples = {
  children: stickyChildren,
  order: stickyOrder,
  onStickyChange: stickyOnStickyChange,
} satisfies Record<string, ComponentExample>
