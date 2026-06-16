import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "./TokenTable.types"

export const borderColor = {
  name: "borderColor",
  description: "Stroke color tokens for outlines and dividers.",
  variants: ["base", "dark", "darker"],
  preview: (variant) => (
    <Flex
      grow={1}
      style={{
        backgroundColor: getToken("backgroundColor"),
        height: 0,
        borderBottom:`1px solid ${getToken("borderColor", variant)}`,
        borderRadius: getToken("borderRadius"),
      }}
    />
  ),
} satisfies TokenTable