import { getToken } from "nice-react-styles"
import DemoDots from "../../../../components/DemoDots"
import type { TokenTable } from "./types"

export const gap = {
  name: "gap",
  description: "Spacing tokens for flex/grid gaps and margins between items.",
  variants: ["none", "smaller", "small", "base", "large", "larger"],
  preview: (variant) => (
    <DemoDots
      gap={variant}
      dots={[
        {
          color: getToken("color", "error"),
          width: getToken("size", "smaller"),
          height: getToken("size", "smaller"),
        },
        {
          color: getToken("color", "link"),
          width: getToken("size", "smaller"),
          height: getToken("size", "smaller"),
        },
      ]}
    />
  ),
} satisfies TokenTable
