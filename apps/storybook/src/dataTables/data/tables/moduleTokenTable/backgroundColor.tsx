import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../components/PreviewCell"
import ThemeSplit from "../../../../components/ThemeSplit"
import type { TokenTable } from "./types"

export const backgroundColor = {
  name: "backgroundColor",
  description: "Surface color tokens for page and container backgrounds, including the raised surface step and state fills (success, highlight, warning, error, link). Status fills are outlined with their matching status borderColor.",
  variants: ["base", "raised", "success", "highlight", "warning", "error", "link"],
  // Each row is split day | night, both pinned, so the pair reads at once in
  // either theme. base/raised use the neutral border; status fills are outlined
  // by their own matching status borderColor so each fill carries its semantic
  // stroke. Every token in the half is pinned to that half's theme.
  preview: (variant) => (
    <ThemeSplit
      render={theme => (
        <PreviewCell
          backgroundColor={getToken("backgroundColor", variant, { theme })}
          borderColor={
            variant === "base" || variant === "raised"
              ? getToken("borderColor", "base", { theme })
              : getToken("borderColor", variant, { theme })
          }
          height={getToken("size", "large")}
          borderRadius={getToken("borderRadius", "small")}
        />
      )}
    />
  ),
} satisfies TokenTable
