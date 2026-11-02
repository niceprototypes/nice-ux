import DemoDots from "../../../../components/DemoDots"
import { growDots, growCode } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const flexGrow = {
  name: "grow",
  description: "Controls how much a flex item grows relative to its siblings.",
  variants: ["0", "1", "2"],
  default: "0",
  preview: (variant) => <DemoDots bordered width="12rem" dots={growDots(Number(variant))} />,
  code: (variant) => growCode(variant),
} satisfies ComponentExample
