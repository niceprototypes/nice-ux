import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import type { TokenTable } from "../TokenTable.types"

export const brandColor = {
  name: "brandColor",
  description: "Brand identity colors. Placeholder palette — base (indigo) and secondary (cyan); static across day/night.",
  variants: ["base", "secondary"],
  preview: (variant) => (
    <Flex
      grow={1}
      style={{
        backgroundColor: getToken("brandColor", variant),
        height: getToken("cellHeight", "large"),
        borderRadius: getToken("borderRadius", "small"),
      }}
    />
  ),
} satisfies TokenTable