import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "../TokenTable.types"

// Status fills that have a matching status borderColor token to outline them.
const STATUS = ["success", "highlight", "warning", "error", "link"]

export const backgroundColor = {
  name: "backgroundColor",
  description: "Surface color tokens for page and container backgrounds, including light/dark state fills (success, highlight, warning, error, link). Status fills are outlined with their matching status borderColor.",
  variants: ["base", "dark", "success", "highlight", "warning", "error", "link"],
  preview: (variant) => (
    <Flex
      grow={1}
      style={{
        backgroundColor: getToken("backgroundColor", variant),
        height: getToken("cellHeight", "large"),
        border: `1px solid ${
          variant === "base"
            ? getToken("borderColor")
            : variant === "dark"
              ? getToken("borderColor")
              : STATUS.includes(variant)
                ? getToken("borderColor", variant)
                : 0
        }`,
        borderRadius: getToken("borderRadius", "small"),
      }}
    />
  ),
} satisfies TokenTable