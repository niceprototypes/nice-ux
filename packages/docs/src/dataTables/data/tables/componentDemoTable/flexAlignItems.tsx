import DemoDots from "../../../../components/DemoDots"
import { alignItemsDotsFor } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const flexAlignItems = {
  name: "alignItems",
  description: "Aligns items along the cross axis.",
  variants: ["flex-start", "flex-end", "center", "baseline", "stretch"],
  default: "stretch",
  preview: (variant) => <DemoDots alignItems={variant} dots={alignItemsDotsFor(variant)} height="6rem" bordered />,
  code: (variant) => `<Flex alignItems="${variant}" />`,
} satisfies ComponentExample
