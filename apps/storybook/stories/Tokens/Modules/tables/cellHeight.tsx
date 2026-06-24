import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "../TokenTable.types"

export const cellHeight = {
  name: "cellHeight",
  description: "Vertical rhythm tokens for controls, buttons, and row heights.",
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: (variant) => (
    <Flex
      grow={1}
      direction="column"
      style={{
        backgroundColor: getToken("backgroundColor", "dark"),
        height: getToken("cellHeight", variant),
        border:`1px solid ${getToken("borderColor")}`,
        borderRadius: getToken("borderRadius", "small"),
      }}
    />
  ),
} satisfies TokenTable