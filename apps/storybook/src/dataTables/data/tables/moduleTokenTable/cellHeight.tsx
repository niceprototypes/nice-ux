import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../components/PreviewCell"
import type { TokenTable } from "./types"

export const cellHeight = {
  name: "cellHeight",
  description: "Vertical rhythm tokens for controls, buttons, and row heights.",
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: (variant) => (
    <PreviewCell
      backgroundColor={getToken("backgroundColor", "dark")}
      borderColor={getToken("borderColor")}
      height={getToken("cellHeight", variant)}
      borderRadius={getToken("borderRadius", "small")}
    />
  ),
} satisfies TokenTable
