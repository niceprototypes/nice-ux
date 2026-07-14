import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../components/PreviewCell"
import type { TokenTable } from "./types"

export const borderColor = {
  name: "borderColor",
  description: "Stroke color tokens for outlines and dividers, including semantic status borders (success, highlight, warning, error, link) tuned to stand out against their backgroundColor fills.",
  variants: ["base", "dark", "darker", "success", "highlight", "warning", "error", "link"],
  preview: (variant) => (
    <PreviewCell
      backgroundColor={getToken("backgroundColor")}
      borderColor={getToken("borderColor", variant)}
      height={getToken("cellHeight", "larger")}
    />
  ),
} satisfies TokenTable
