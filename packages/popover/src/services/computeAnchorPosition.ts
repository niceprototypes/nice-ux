import type {
  PopoverAlignType,
  PopoverAnchorRectType,
  PopoverAnchorType,
  PopoverBoundsType,
  PopoverCoordinatesType,
  PopoverOffsetType,
  PopoverPositionType,
  PopoverSizeType,
} from "../components/Popover/Popover.types"

// Cross-axis translate per alignment. "center" pulls the element back by half
// its own size; "end" by its full size, so its trailing edge meets the anchor's.
const CROSS_TRANSLATE: Record<PopoverAlignType, string> = {
  start: "0",
  center: "-50%",
  end: "-100%",
}

// CROSS_TRANSLATE as a fraction of the element's size, for measuring its box.
const CROSS_FRACTION: Record<PopoverAlignType, number> = {
  start: 0,
  center: -0.5,
  end: -1,
}

const OPPOSITE: Record<PopoverPositionType, PopoverPositionType> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
}

/** Viewport-relative edges of the placed element. */
type Box = { top: number; left: number; right: number; bottom: number }

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
 * Anchor point and translate for one side of the anchor, with no viewport check.
 *
 * @param r - Anchor rectangle
 * @param position - Side of the anchor
 * @param align - Cross-axis alignment
 * @param offset - Main-axis gap in px
 * @returns Inline style values for the element
 */
const place = (
  r: PopoverAnchorRectType,
  position: PopoverPositionType,
  align: PopoverAlignType,
  offset: PopoverOffsetType
): PopoverCoordinatesType => {
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

/**
 * The element's box once `coords` and its translate are applied.
 *
 * @param coords - Output of `place`
 * @param position - Side the coordinates were placed on
 * @param align - Cross-axis alignment
 * @param size - Element size
 * @returns The element's viewport-relative edges
 */
const boxOf = (
  coords: PopoverCoordinatesType,
  position: PopoverPositionType,
  align: PopoverAlignType,
  size: PopoverSizeType
): Box => {
  const vertical = position === "top" || position === "bottom"
  const fractionX = vertical ? CROSS_FRACTION[align] : position === "left" ? -1 : 0
  const fractionY = vertical ? (position === "top" ? -1 : 0) : CROSS_FRACTION[align]
  const left = coords.left + fractionX * size.width
  const top = coords.top + fractionY * size.height
  return { top, left, right: left + size.width, bottom: top + size.height }
}

/**
 * How far in px the box crosses the viewport edge on its own side of the anchor.
 * Zero or less means it fits.
 */
const mainOverflow = (box: Box, position: PopoverPositionType, viewport: PopoverSizeType): number => {
  switch (position) {
    case "top":
      return -box.top
    case "bottom":
      return box.bottom - viewport.height
    case "left":
      return -box.left
    default:
      return box.right - viewport.width
  }
}

/**
 * Shift in px that moves the span [start, end] inside [0, extent]. When the
 * span is longer than the extent, the start edge stays visible.
 */
const clampShift = (start: number, end: number, extent: number): number => {
  if (start < 0) return -start
  if (end > extent) return Math.max(extent - end, -start)
  return 0
}

/**
 * Computes inline `top` / `left` / `transform` for a `position: fixed` element
 * placed on `position`'s side of `anchor`, `offset` px away, aligned on the
 * cross axis per `align`. Pure — no DOM reads.
 *
 * `top` / `left` locate the anchor point on the anchor's edge; `transform`
 * shifts the element so its near edge touches that point. Alignment is
 * physical ("start" = left / top).
 *
 * With `bounds`, the element stays in the viewport: when it overflows on its
 * side and the opposite side overflows less, it flips to the opposite side;
 * then `top` (left / right) or `left` (top / bottom) shifts it along the cross
 * axis back inside the viewport.
 *
 * @param anchor - Viewport-relative anchor rectangle (e.g. a DOMRect) or point
 * @param position - Side of the anchor to place the element on
 * @param align - Cross-axis alignment against the anchor
 * @param offset - Gap in px between anchor and element along the main axis
 * @param bounds - Element and viewport sizes, to flip and shift into the viewport
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
  offset: PopoverOffsetType,
  bounds?: PopoverBoundsType
): PopoverCoordinatesType {
  const r = toRect(anchor)
  const preferred = place(r, position, align, offset)
  if (!bounds) return preferred
  const { size, viewport } = bounds

  // Flip: take the opposite side only when it overflows less.
  let side = position
  let coords = preferred
  const overflow = mainOverflow(boxOf(preferred, position, align, size), position, viewport)
  if (overflow > 0) {
    const flipped = OPPOSITE[position]
    const flippedCoords = place(r, flipped, align, offset)
    if (mainOverflow(boxOf(flippedCoords, flipped, align, size), flipped, viewport) < overflow) {
      side = flipped
      coords = flippedCoords
    }
  }

  // Shift along the cross axis.
  const box = boxOf(coords, side, align, size)
  if (side === "top" || side === "bottom") {
    return { ...coords, left: coords.left + clampShift(box.left, box.right, viewport.width) }
  }
  return { ...coords, top: coords.top + clampShift(box.top, box.bottom, viewport.height) }
}
