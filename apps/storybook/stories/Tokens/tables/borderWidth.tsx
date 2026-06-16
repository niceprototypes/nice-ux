import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "./TokenTable.types"

export const borderWidth = {
  name: "borderWidth",
  description: "Stroke thickness tokens for borders and dividers.",
  variants: ["small", "base", "large"],
  preview: (variant) => (
    <Flex
      grow={1}
      style={{
        height: 0,
        borderBottom: `${getToken("borderWidth", variant)} solid ${getToken("color", "light")}`,
        borderRadius: getToken("borderRadius"),
      }}
    />
  ),
} satisfies TokenTable