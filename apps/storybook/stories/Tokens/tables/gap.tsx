import { getToken } from "nice-react-styles"
import DemoDots from "../../../src/components/DemoDots"
import type { TokenTable } from "./TokenTable.types"

export const gap = {
  name: "gap",
  description: "Spacing tokens for flex/grid gaps and margins between items.",
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: (variant) => (
    <DemoDots
      gap={variant}
      dots={[
        {
          color: getToken("color", { variant: "error" }),
          width: getToken("cellHeight", { variant: "smaller" }),
          height: getToken("cellHeight", { variant: "smaller" }),
        },
        {
          color: getToken("color", { variant: "link" }),
          width: getToken("cellHeight", { variant: "smaller" }),
          height: getToken("cellHeight", { variant: "smaller" }),
        },
      ]}
    />
  ),
} satisfies TokenTable