import { getToken } from "nice-react-styles"
import { REFERENCE_Z } from "../../constants"
import type { TokenTable } from "./types"

export const zIndex = {
  name: "zIndex",
  description:
    "Stacking-order (z-index) tokens for layered surfaces — overlays, stickies, tooltips.",
  variants: ["base", "low", "medium", "high", "higher"],
  // Two overlapping squares in one stacking context (the relative container mints
  // it; neither child isolates). The reference holds REFERENCE_Z; the accent
  // carries the row's z-index token, so its render order vs. the reference shows
  // where the variant sits on the scale.
  preview: (variant) => (
    <div
      style={{
        position: "relative",
        width: "72px",
        height: getToken("size", "large"),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: getToken("size", "base"),
          height: getToken("size", "base"),
          zIndex: REFERENCE_Z,
          backgroundColor: getToken("backgroundColor", "raised"),
          border: `1px solid ${getToken("borderColor")}`,
          borderRadius: getToken("borderRadius", "small"),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: getToken("gap", "small"),
          left: getToken("gap", "large"),
          width: getToken("size", "base"),
          height: getToken("size", "base"),
          zIndex: getToken("zIndex", variant),
          backgroundColor: getToken("color", "link"),
          borderRadius: getToken("borderRadius", "small"),
        }}
      />
    </div>
  ),
} satisfies TokenTable
