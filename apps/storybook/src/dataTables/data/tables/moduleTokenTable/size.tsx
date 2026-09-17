import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../components/PreviewCell"
import type { TokenTable } from "./types"

export const size = {
  name: "size",
  description: "Vertical rhythm tokens for controls, buttons, and row heights.",
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: (variant) => (
    <PreviewCell
      backgroundColor={getToken("backgroundColor", "raised")}
      borderColor={getToken("borderColor")}
      height={getToken("size", variant)}
      borderRadius={getToken("borderRadius", "small")}
    />
  ),
} satisfies TokenTable
