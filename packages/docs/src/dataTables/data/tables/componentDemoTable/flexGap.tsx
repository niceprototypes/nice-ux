import DemoDots from "../../../../components/DemoDots"
import { threeDots } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const flexGap = {
  name: "gap",
  description: "Sets the spacing between flex items using gap tokens.",
  variants: ["smaller", "small", "base", "large", "larger"],
  // The default flex container has no gap, so no shown variant is the default.
  default: "none",
  preview: (variant) => <DemoDots gap={variant} dots={threeDots} />,
  code: (variant) => `<Flex gap="${variant}" />`,
} satisfies ComponentExample
