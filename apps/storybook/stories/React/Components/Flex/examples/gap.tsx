import DemoDots from "../../../../../src/components/DemoDots"
import { threeDots } from "../Flex.services"
import type { ComponentExample } from "./examples.types"

export const gap = {
  name: "gap",
  description: "Sets the spacing between flex items using gap tokens.",
  variants: ["smaller", "small", "base", "large", "larger"],
  // The default flex container has no gap, so no shown variant is the default.
  default: "none",
  preview: variant => <DemoDots gap={variant} dots={threeDots} />,
  code: variant => `<Flex gap="${variant}" />`,
} satisfies ComponentExample
