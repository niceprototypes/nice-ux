import DemoDots from "../../../../../src/components/DemoDots"
import { twoDots } from "../Flex.services"
import type { ComponentExample } from "./examples.types"

export const direction = {
  name: "direction",
  description: "Sets the main axis of the flex container.",
  variants: ["row", "column"],
  default: "row",
  preview: variant => <DemoDots direction={variant} dots={twoDots} />,
  code: variant => `<Flex direction="${variant}" />`,
} satisfies ComponentExample
