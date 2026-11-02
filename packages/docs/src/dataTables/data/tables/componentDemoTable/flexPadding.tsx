import DemoDots from "../../../../components/DemoDots"
import { twoDots } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const flexPadding = {
  name: "padding",
  description: "Applies inner padding to the flex container using a gap-token shorthand (1–4 values).",
  variants: ["smaller", "small", "base", "large", "larger"],
  // The default flex container has no padding, so no shown variant is the default.
  default: "none",
  preview: (variant) => <DemoDots spacing={variant} dots={twoDots} bordered />,
  code: (variant) => `<Flex padding="${variant}" />`,
} satisfies ComponentExample
