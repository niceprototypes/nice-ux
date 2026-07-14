import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "./types"

export const boxShadow = {
  name: "boxShadow",
  description: "Elevation tokens for cards and floating surfaces.",
  variants: ["base", "large"],
  preview: (variant) => (
    <Flex
      grow={1}
      padding="large"
      style={{
        backgroundColor: getToken("backgroundColor", "dark"),
        border: `1px solid ${getToken("borderColor")}`,
        borderRadius: getToken("borderRadius", "small"),
      }}
    >
      <Flex
        grow={1}
        style={{
          backgroundColor: getToken("backgroundColor"),
          height: getToken("cellHeight", "large"),
          borderRadius: getToken("borderRadius", "small"),
          boxShadow: getToken("boxShadow", variant),
        }}
      />
    </Flex>
  ),
} satisfies TokenTable
