import { getToken } from "nice-react-styles"
import type { TokenTable } from "../TokenTable.types"

// A neutral reference layer the variant square stacks against. Fixed between the
// `low` (10) and `medium` (100) tiers, so scanning down the rows shows the accent
// square cross from behind the reference (base, low) to in front of it (medium,
// high, higher) — making the layering scale's ordering legible one row at a time.
const REFERENCE_Z = 50

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
        height: getToken("cellHeight", "large"),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: getToken("cellHeight", "base"),
          height: getToken("cellHeight", "base"),
          zIndex: REFERENCE_Z,
          backgroundColor: getToken("backgroundColor", "dark"),
          border: `1px solid ${getToken("borderColor")}`,
          borderRadius: getToken("borderRadius", "small"),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: getToken("gap", "small"),
          left: getToken("gap", "large"),
          width: getToken("cellHeight", "base"),
          height: getToken("cellHeight", "base"),
          zIndex: getToken("zIndex", variant),
          backgroundColor: getToken("color", "link"),
          borderRadius: getToken("borderRadius", "small"),
        }}
      />
    </div>
  ),
} satisfies TokenTable