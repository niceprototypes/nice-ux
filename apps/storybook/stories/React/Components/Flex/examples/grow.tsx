import { getToken } from "nice-react-styles"
import DemoDots from "../../../../../src/components/DemoDots"
import type { ComponentExample } from "./examples.types"

// Two items in a bordered track: the first grows by the row's factor, the second
// always grows by 1. At factor 0 the first item keeps a fixed width so the second
// takes all the free space; above 0 it shares space proportionally.
const growDots = (factor: number) => [
  {
    color: getToken("color", "error"),
    height: getToken("cellHeight", "smaller"),
    grow: factor,
    ...(factor === 0 ? { width: getToken("cellHeight", "smaller") } : {}),
  },
  { color: getToken("color", "link"), height: getToken("cellHeight", "smaller"), grow: 1 },
]

const growCode = (factor: string) =>
  `<Flex>\n  <Flex grow={${factor}} />\n  <Flex grow={1} />\n</Flex>`

export const grow = {
  name: "grow",
  description: "Controls how much a flex item grows relative to its siblings.",
  variants: ["0", "1", "2"],
  default: "0",
  preview: variant => <DemoDots bordered width="12rem" dots={growDots(Number(variant))} />,
  code: variant => growCode(variant),
} satisfies ComponentExample
