import DemoDots from "../../../../../src/components/DemoDots"
import { twoDots } from "../Flex.services"
import type { ComponentExample } from "./examples.types"

export const spacing = {
  name: "spacing",
  description: "Applies inner spacing to the flex container using gap tokens.",
  variants: ["smaller", "small", "base", "large", "larger"],
  // The default flex container has no spacing, so no shown variant is the default.
  default: "none",
  preview: variant => <DemoDots spacing={variant} dots={twoDots} bordered />,
  code: variant => `<Flex spacing="${variant}" />`,
} satisfies ComponentExample
