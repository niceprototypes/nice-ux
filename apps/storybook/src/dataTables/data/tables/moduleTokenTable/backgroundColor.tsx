import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../components/PreviewCell"
import ThemeSplit from "../../../../components/ThemeSplit"
import type { TokenTable } from "./types"

export const backgroundColor = {
  name: "backgroundColor",
  description: "Surface color tokens for page and container backgrounds, including the raised surface step and state fills (success, highlight, warning, error, link).",
  variants: ["base", "raised", "success", "highlight", "warning", "error", "link"],
  // One swatch under both themes; the cascade resolves each half.
  preview: (variant) => (
    <ThemeSplit>
      <PreviewCell
        backgroundColor={getToken("backgroundColor", variant)}
        height={getToken("size", "large")}
        borderRadius={getToken("borderRadius", "small")}
      />
    </ThemeSplit>
  ),
} satisfies TokenTable
