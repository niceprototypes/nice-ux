import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "../TokenTable.types"

export const borderColor = {
  name: "borderColor",
  description: "Stroke color tokens for outlines and dividers, including semantic status borders (success, highlight, warning, error, link) tuned to stand out against their backgroundColor fills.",
  variants: ["base", "dark", "darker", "success", "highlight", "warning", "error", "link"],
  preview: (variant) => (
    <Flex
      grow={1}
      style={{
        backgroundColor: getToken("backgroundColor"),
        height: getToken("cellHeight", "larger"),
        border:`1px solid ${getToken("borderColor", variant)}`,
        borderRadius: getToken("borderRadius"),
      }}
    />
  ),
} satisfies TokenTable