import type {
  PopoverAlignType,
  PopoverAnchorRectType,
  PopoverAnchorType,
  PopoverCoordinatesType,
  PopoverOffsetType,
  PopoverPositionType,
} from "../components/Popover/Popover.types"

// Cross-axis translate per alignment. "center" pulls the element back by half
// its own size; "end" by its full size, so its trailing edge meets the anchor's.
const CROSS_TRANSLATE: Record<PopoverAlignType, string> = {
  start: "0",
  center: "-50%",
  end: "-100%",
}

/**
 * Normalizes a point anchor into a zero-size rectangle, so rect and point
 * anchors share one code path (a point is a rect with no width or height).
 *
 * @param anchor - Anchor rectangle or point
 * @returns The anchor as a rectangle
 */
const toRect = (anchor: PopoverAnchorType): PopoverAnchorRectType => {
  if ("x" in anchor && "y" in anchor && !("width" in anchor)) {
    return { top: anchor.y, bottom: anchor.y, left: anchor.x, right: anchor.x, width: 0, height: 0 }
  }
  return anchor as PopoverAnchorRectType
}

/**
 * Computes inline `top` / `left` / `transform` for a `position: fixed` element
 * placed on `position`'s side of `anchor`, `offset` px away, aligned on the
 * cross axis per `align`. Pure — no DOM reads.
 *
 * `top` / `left` locate the anchor point on the anchor's edge; `transform`
 * shifts the element so its near edge touches that point. For
 * `align: "center"` the output matches @niceprototypes/tooltip's `computeCoords` +
 * `transformFor`. Alignment is physical ("start" = left / top).
 *
 * @param anchor - Viewport-relative anchor rectangle (e.g. a DOMRect) or point
 * @param position - Side of the anchor to place the element on
 * @param align - Cross-axis alignment against the anchor
 * @param offset - Gap in px between anchor and element along the main axis
 * @returns Inline style values for the element
 *
 * @example
 * const coords = computeAnchorPosition(button.getBoundingClientRect(), "bottom", "start", 8)
 * // { top: rect.bottom + 8, left: rect.left, transform: "translate(0, 0)" }
 */
export function computeAnchorPosition(
  anchor: PopoverAnchorType,
  position: PopoverPositionType,
  align: PopoverAlignType,
  offset: PopoverOffsetType
): PopoverCoordinatesType {
  const r = toRect(anchor)
  const cross = CROSS_TRANSLATE[align]

  switch (position) {
    case "bottom": {
      const left = align === "start" ? r.left : align === "end" ? r.right : r.left + r.width / 2
      return { top: r.bottom + offset, left, transform: `translate(${cross}, 0)` }
    }
    case "left": {
      const top = align === "start" ? r.top : align === "end" ? r.bottom : r.top + r.height / 2
      return { top, left: r.left - offset, transform: `translate(-100%, ${cross})` }
    }
    case "right": {
      const top = align === "start" ? r.top : align === "end" ? r.bottom : r.top + r.height / 2
      return { top, left: r.right + offset, transform: `translate(0, ${cross})` }
    }
    default: {
      // top
      const left = align === "start" ? r.left : align === "end" ? r.right : r.left + r.width / 2
      return { top: r.top - offset, left, transform: `translate(${cross}, -100%)` }
    }
  }
}
