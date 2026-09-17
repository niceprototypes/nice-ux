import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../components/PreviewCell"
import ThemeSplit from "../../../../components/ThemeSplit"
import type { TokenTable } from "./types"

export const borderColor = {
  name: "borderColor",
  description: "Stroke color tokens for outlines and dividers. subtle recedes into the surface, strong and stronger advance from it, and the semantic statuses (success, highlight, warning, error, link) are tuned to stand out against their backgroundColor fills.",
  variants: ["base", "subtle", "strong", "stronger", "success", "highlight", "warning", "error", "link"],
  // Split day | night, both pinned. The fill is pinned too, so each stroke is
  // judged against the surface it actually sits on in that theme.
  preview: (variant) => (
    <ThemeSplit
      render={theme => (
        <PreviewCell
          backgroundColor={getToken("backgroundColor", "base", { theme })}
          borderColor={getToken("borderColor", variant, { theme })}
          height={getToken("size", "large")}
        />
      )}
    />
  ),
} satisfies TokenTable
