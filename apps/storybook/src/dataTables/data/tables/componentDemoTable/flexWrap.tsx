import DemoDots from "../../../../components/DemoDots"
import { wrapDotsFor, wrapWidth } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const flexWrap = {
  name: "wrap",
  description: "Controls whether flex items wrap onto multiple lines when they overflow.",
  variants: ["nowrap", "wrap", "wrap-reverse"],
  default: "nowrap",
  preview: (variant) => <DemoDots wrap={variant} dots={wrapDotsFor(variant)} width={wrapWidth} bordered />,
  code: (variant) => `<Flex wrap="${variant}" />`,
} satisfies ComponentExample
