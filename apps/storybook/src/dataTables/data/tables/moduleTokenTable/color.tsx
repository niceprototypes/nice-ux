import { getToken } from "nice-react-styles"
import PreviewCell from "../../../../components/PreviewCell"
import ThemeSplit from "../../../../components/ThemeSplit"
import { ColorSample } from "../../styles"
import type { TokenTable } from "./types"

export const color = {
  name: "color",
  description: (
    <>
      Text and icon color tokens, including semantic states (<code>success</code>,{" "}
      <code>highlight</code>, <code>warning</code>, <code>error</code>).
    </>
  ),
  variants: ["lightest", "lighter", "light", "base", "disabled", "link", "success", "highlight", "warning", "error"],
  // One swatch, rendered under both themes by ThemeSplit. The reads are
  // unpinned: each half is a real nested theme, so the cascade resolves them.
  // The surface is pinned alongside the sample because a colour alone is not
  // legible — night text on a day-lit cell is near-white on near-white.
  preview: (variant) => (
    <ThemeSplit>
      <PreviewCell
        backgroundColor={getToken("backgroundColor", "base")}
        height={getToken("size", "large")}
        borderRadius={getToken("borderRadius", "small")}
        alignItems="center"
        justifyContent="flex-start"
      >
        <ColorSample size="large" $color={getToken("color", variant)}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </ColorSample>
      </PreviewCell>
    </ThemeSplit>
  ),
} satisfies TokenTable
