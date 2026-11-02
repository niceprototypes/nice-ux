import DemoDots from "../../../../components/DemoDots"
import { threeDots } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const flexJustifyContent = {
  name: "justifyContent",
  description: "Distributes items along the main axis.",
  variants: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
  default: "flex-start",
  preview: (variant) => <DemoDots justifyContent={variant} dots={threeDots} width="12rem" bordered />,
  code: (variant) => `<Flex justifyContent="${variant}" />`,
} satisfies ComponentExample
