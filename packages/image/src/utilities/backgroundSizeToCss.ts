import type { ImageBackgroundSizeType } from "../components/Image/Image.types"

/**
 * Maps ImageBackgroundSizeType to the equivalent CSS background-size value.
 * "fill" maps to "100% 100%" to stretch in both dimensions.
 * "scale-down" maps to "contain" as the closest background-size equivalent.
 * "none" maps to "auto" (none is not valid for CSS background-size).
 *
 * Used for the div rendering path and the img path's URL thumbnail layer; the
 * img itself resolves object-fit via the backgroundSize token directly, since
 * CSS object-fit accepts every value.
 */
export function backgroundSizeToCss(size: ImageBackgroundSizeType): string {
  switch (size) {
    case "fill":
      return "100% 100%"
    case "scale-down":
      return "contain"
    case "none":
      return "auto"
    default:
      return size
  }
}
