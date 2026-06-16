import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "./TokenTable.types"

export const borderRadius = {
  name: "borderRadius",
  description: (
    <>
      Corner rounding tokens from <code>smaller</code> to <code>larger</code>.
    </>
  ),
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: (variant) => (
    <Flex
      grow={1}
      style={{
        backgroundColor: getToken("backgroundColor", "dark"),
        height: getToken("cellHeight", variant),
        border:`1px solid ${getToken("borderColor")}`,
        borderRadius: getToken("borderRadius", variant),
      }}
    />
  ),
} satisfies TokenTable