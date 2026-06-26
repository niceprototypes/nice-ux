import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../src/components/PreviewCell"
import type { TokenTable } from "../TokenTable.types"

export const borderWidth = {
  name: "borderWidth",
  description: "Stroke thickness tokens for borders and dividers.",
  variants: ["none", "smaller", "small", "base", "large", "larger"],
  // A bordered rectangle (not a single line) so each variant's thickness reads
  // around the whole shape; "none" renders as no border.
  preview: (variant) => (
    <PreviewCell
      height={getToken("cellHeight", "large")}
      borderColor={getToken("color", "light")}
      borderWidth={getToken("borderWidth", variant)}
    />
  ),
} satisfies TokenTable
