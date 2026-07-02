import { getToken } from "nice-react-styles"
import DemoDots from "../../../../../src/components/DemoDots"
import { threeDots } from "../Flex.services"
import type { ComponentExample } from "./examples.types"

// Uneven-height dots so cross-axis alignment reads at a glance; the baseline row
// needs a differing-height set for the text-baseline reference.
const baselineDots = [
  { color: getToken("color", "error"), height: getToken("cellHeight", "small"), width: getToken("cellHeight", "smaller") },
  { color: getToken("color", "warning"), height: getToken("cellHeight", "smaller"), width: getToken("cellHeight", "smaller") },
  { color: getToken("color", "link"), height: getToken("cellHeight"), width: getToken("cellHeight", "smaller") },
]

// No height → the item stretches to fill the cross axis (the `stretch` demo).
const stretchDots = [
  { color: getToken("color", "error"), width: getToken("cellHeight", "smaller") },
  { color: getToken("color", "warning"), width: getToken("cellHeight", "smaller") },
  { color: getToken("color", "link"), width: getToken("cellHeight", "smaller") },
]

const dotsFor = (variant: string) =>
  variant === "baseline" ? baselineDots : variant === "stretch" ? stretchDots : threeDots

export const alignItems = {
  name: "alignItems",
  description: "Aligns items along the cross axis.",
  variants: ["flex-start", "flex-end", "center", "baseline", "stretch"],
  default: "stretch",
  preview: variant => <DemoDots alignItems={variant} dots={dotsFor(variant)} height="6rem" bordered />,
  code: variant => `<Flex alignItems="${variant}" />`,
} satisfies ComponentExample
