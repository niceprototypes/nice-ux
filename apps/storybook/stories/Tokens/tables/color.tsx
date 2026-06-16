import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "./TokenTable.types"

export const color = {
  name: "color",
  description: (
    <>
      Text and icon color tokens, including semantic states (<code>success</code>,{" "}
      <code>warning</code>, <code>error</code>).
    </>
  ),
  variants: ["lightest", "lighter", "light", "base", "disabled", "link", "success", "warning", "error"],
  preview: (variant) => (
    <Flex
      style={{
        width: getToken("cellHeight", "smaller"),
        height: getToken("cellHeight", "smaller"),
        backgroundColor: getToken("color", variant),
        borderRadius: "50%",
      }}
    />
  ),
} satisfies TokenTable