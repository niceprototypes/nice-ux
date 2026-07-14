import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../components/PreviewCell"
import type { TokenTable } from "./types"

export const backgroundColor = {
  name: "backgroundColor",
  description: "Surface color tokens for page and container backgrounds, including light/dark state fills (success, highlight, warning, error, link). Status fills are outlined with their matching status borderColor.",
  variants: ["base", "dark", "success", "highlight", "warning", "error", "link"],
  // base/dark use the neutral border; status fills are outlined by their own
  // matching status borderColor so each fill carries its semantic stroke.
  preview: (variant) => (
    <PreviewCell
      backgroundColor={getToken("backgroundColor", variant)}
      borderColor={variant === "base" || variant === "dark" ? getToken("borderColor") : getToken("borderColor", variant)}
      height={getToken("cellHeight", "large")}
      borderRadius={getToken("borderRadius", "small")}
    />
  ),
} satisfies TokenTable
