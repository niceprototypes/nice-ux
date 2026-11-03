import { breakpointKeyMatches, parseBreakpointKey, useBreakpoint } from "@niceprototypes/styles"
import type { TreeSizeType } from "../components/Tree/Tree.types"

/** Labels drop to the small size from this breakpoint up, unless a size is set. */
const SMALL_LABELS = parseBreakpointKey("laptop+")

/**
 * The label size a Tree renders at: `size` when set; unset, base below the laptop breakpoint and
 * small from it up. For content beside a Tree that matches its labels (a search field above it).
 */
export const useTreeSize = (size?: TreeSizeType): TreeSizeType => {
  const small = breakpointKeyMatches(SMALL_LABELS, useBreakpoint())
  return size ?? (small ? "small" : "base")
}
