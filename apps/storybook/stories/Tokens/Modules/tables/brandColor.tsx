import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../src/components/PreviewCell"
import type { TokenTable } from "../TokenTable.types"

export const brandColor = {
  name: "brandColor",
  description: "Brand identity colors. Placeholder palette — base (indigo) and secondary (cyan); static across day/night.",
  variants: ["base", "secondary"],
  preview: (variant) => (
    <PreviewCell
      backgroundColor={getToken("brandColor", variant)}
      height={getToken("cellHeight", "large")}
      borderRadius={getToken("borderRadius", "small")}
    />
  ),
} satisfies TokenTable
