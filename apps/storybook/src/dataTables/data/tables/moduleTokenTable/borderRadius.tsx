import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../components/PreviewCell"
import type { TokenTable } from "./types"

export const borderRadius = {
  name: "borderRadius",
  description: (
    <>
      Corner rounding tokens from <code>smaller</code> to <code>larger</code>.
    </>
  ),
  variants: ["smaller", "small", "base", "large", "larger"],
  preview: (variant) => (
    <PreviewCell
      backgroundColor={getToken("backgroundColor", "raised")}
      borderColor={getToken("borderColor")}
      height={getToken("size", variant)}
      borderRadius={getToken("borderRadius", variant)}
    />
  ),
} satisfies TokenTable
