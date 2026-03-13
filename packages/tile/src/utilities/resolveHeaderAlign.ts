import type { AlignType } from "nice-react-typography"
import type { TileHeaderAlignType } from "../components/Tile/types"

/**
 * Resolves responsive header alignment to a simple alignment value
 * For responsive values, returns the mobile value as the base
 */
export const resolveHeaderAlign = (
  align: TileHeaderAlignType | undefined,
): AlignType => {
  if (!align) return "center"
  if (typeof align === "string") return align
  return align.mobile || "center"
}
