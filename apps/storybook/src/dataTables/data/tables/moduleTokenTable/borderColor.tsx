import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../components/PreviewCell"
import ThemeSplit from "../../../../components/ThemeSplit"
import type { TokenTable } from "./types"

export const borderColor = {
  name: "borderColor",
  description: "Stroke color tokens for outlines and dividers. subtle recedes into the surface, strong and stronger advance from it, and the semantic statuses (success, highlight, warning, error, link) are tuned to stand out against their backgroundColor fills.",
  variants: ["base", "subtle", "strong", "stronger", "success", "highlight", "warning", "error", "link"],
  // The stroke colour shown as a fill, so it reads directly rather than as a
  // hairline. One swatch under both themes; the cascade resolves each half.
  preview: (variant) => (
    <ThemeSplit>
      <PreviewCell
        backgroundColor={getToken("borderColor", variant)}
        height={getToken("size", "large")}
        borderRadius={getToken("borderRadius", "small")}
      />
    </ThemeSplit>
  ),
} satisfies TokenTable
