import { getToken } from "nice-react-styles"
import DemoDots from "../../../../src/components/DemoDots"
import type { TokenTable } from "../TokenTable.types"

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
          width: getToken("cellHeight", "smaller"),
          height: getToken("cellHeight", "smaller"),
        },
        {
          color: getToken("color", "link"),
          width: getToken("cellHeight", "smaller"),
          height: getToken("cellHeight", "smaller"),
        },
      ]}
    />
  ),
} satisfies TokenTable