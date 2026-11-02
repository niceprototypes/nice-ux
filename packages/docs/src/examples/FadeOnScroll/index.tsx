// FadeOnScroll example configs — one ComponentExample per prop, shaped like Toggle's. Each preview
// scrolls a box (a ScrollProvider root) with the line in the middle, so it fades through its range.
import { FadeOnScroll } from "@niceprototypes/scroll"
import type { FadeOnScrollProps } from "@niceprototypes/scroll"
import Ink from "@niceprototypes/ink"
import type { ComponentExample } from "../../dataTables/components/demos/Components"
import ScrollBox, { SCROLL_BOX_HEIGHT } from "../Sticky/ScrollBox"

const CONTENT = "Scroll the box"

/** Room above and below the line, so it can enter and leave the box. */
const Room = () => <div style={{ blockSize: SCROLL_BOX_HEIGHT }} />

/** FadeOnScroll around one line of text, with `props` over the defaults, in a scrolling box. */
const Fade = (props: Omit<FadeOnScrollProps, "children">) => (
  <ScrollBox>
    <Room />
    <FadeOnScroll {...props}>
      <Ink>{CONTENT}</Ink>
    </FadeOnScroll>
    <Room />
  </ScrollBox>
)

/** A numeric prop's facet: each variant is passed as that prop; the default variant is left out of the code. */
const numericExample = (
  prop: Exclude<keyof FadeOnScrollProps, "children" | "className">,
  description: string,
  variants: string[],
  defaultValue: string,
) =>
  ({
    name: prop,
    description,
    variants,
    default: defaultValue,
    preview: (variant: string) => <Fade {...{ [prop]: Number(variant) }} />,
    code: (variant: string) =>
      variant === defaultValue
        ? `<FadeOnScroll>\n  <Ink>${CONTENT}</Ink>\n</FadeOnScroll>`
        : `<FadeOnScroll ${prop}={${variant}}>\n  <Ink>${CONTENT}</Ink>\n</FadeOnScroll>`,
  }) satisfies ComponentExample

export const fadeOnScrollChildren = {
  name: "children",
  description:
    "Content to fade. Its opacity follows the wrapper's position in the viewport: 0 with the wrapper's top at the viewport's bottom edge, 100 at its top edge. Needs a ScrollProvider above it.",
  variants: ["text"],
  default: "text",
  preview: () => <Fade />,
  code: () => `<ScrollProvider>\n  <FadeOnScroll>\n    <Ink>${CONTENT}</Ink>\n  </FadeOnScroll>\n</ScrollProvider>`,
} satisfies ComponentExample

export const fadeOnScrollStartPosition = numericExample(
  "startPosition",
  "Viewport position (percent) where the fade in begins; below it the content holds startOpacity.",
  ["0", "25", "40"],
  "0",
)

export const fadeOnScrollPeakPosition = numericExample(
  "peakPosition",
  "Viewport position (percent) where the content reaches peakOpacity, between the fade in and the fade out.",
  ["25", "50", "75"],
  "50",
)

export const fadeOnScrollEndPosition = numericExample(
  "endPosition",
  "Viewport position (percent) where the fade out completes; past it the content holds endOpacity.",
  ["75", "100"],
  "100",
)

export const fadeOnScrollStartOpacity = numericExample(
  "startOpacity",
  "Opacity before startPosition.",
  ["0", "0.25", "0.5"],
  "0",
)

export const fadeOnScrollPeakOpacity = numericExample(
  "peakOpacity",
  "Opacity at peakPosition.",
  ["0.5", "1"],
  "1",
)

export const fadeOnScrollEndOpacity = numericExample(
  "endOpacity",
  "Opacity after endPosition.",
  ["0", "0.5", "1"],
  "0",
)

/** Every FadeOnScroll example facet — each one a section of the FadeOnScroll docs page. */
export const fadeOnScrollExamples = {
  children: fadeOnScrollChildren,
  startPosition: fadeOnScrollStartPosition,
  peakPosition: fadeOnScrollPeakPosition,
  endPosition: fadeOnScrollEndPosition,
  startOpacity: fadeOnScrollStartOpacity,
  peakOpacity: fadeOnScrollPeakOpacity,
  endOpacity: fadeOnScrollEndOpacity,
} satisfies Record<string, ComponentExample>
