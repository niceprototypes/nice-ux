import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "./TokenTable.types"

export const backgroundColor = {
  name: "backgroundColor",
  description: "Surface color tokens for page and container backgrounds, including light/dark state fills (success, warning, error, link).",
  variants: ["base", "dark", "success", "warning", "error", "link"],
  preview: (variant) => (
    <Flex
      grow={1}
      style={{
        backgroundColor: getToken("backgroundColor", { variant }),
        height: getToken("cellHeight", { variant: "large" }),
        border: `1px solid ${variant === "base" ? getToken("borderColor") : 0}`,
        borderRadius: getToken("borderRadius"),
      }}
    />
  ),
} satisfies TokenTable