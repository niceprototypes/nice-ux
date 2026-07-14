import DemoDots from "../../../../components/DemoDots"
import { twoDots } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const flexDirection = {
  name: "direction",
  description: "Sets the main axis of the flex container.",
  variants: ["row", "column"],
  default: "row",
  preview: (variant) => <DemoDots direction={variant} dots={twoDots} />,
  code: (variant) => `<Flex direction="${variant}" />`,
} satisfies ComponentExample
