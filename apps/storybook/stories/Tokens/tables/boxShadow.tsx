import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "./TokenTable.types"

export const boxShadow = {
  name: "boxShadow",
  description: "Elevation tokens for cards and floating surfaces.",
  variants: ["base", "large"],
  preview: (variant) => (
    <Flex
      grow={1}
      spacing="large"
      style={{
        backgroundColor: getToken("backgroundColor", { variant: "dark" }),
        border:`1px solid ${getToken("borderColor")}`,
        borderRadius: getToken("borderRadius", { variant: "small" }),
      }}
    >
      <Flex
        grow={1}
        style={{
          backgroundColor: getToken("backgroundColor"),
          height: getToken("cellHeight", { variant: "large" }),
          borderRadius: getToken("borderRadius", { variant: "small" }),
          boxShadow: getToken("boxShadow", { variant }),
        }}
      />
    </Flex>
  ),
} satisfies TokenTable