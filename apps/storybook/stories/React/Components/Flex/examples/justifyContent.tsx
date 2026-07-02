import DemoDots from "../../../../../src/components/DemoDots"
import { threeDots } from "../Flex.services"
import type { ComponentExample } from "./examples.types"

export const justifyContent = {
  name: "justifyContent",
  description: "Distributes items along the main axis.",
  variants: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
  default: "flex-start",
  preview: variant => <DemoDots justifyContent={variant} dots={threeDots} width="12rem" bordered />,
  code: variant => `<Flex justifyContent="${variant}" />`,
} satisfies ComponentExample
