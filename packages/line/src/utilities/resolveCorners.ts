import type { LineRadiusType } from "../components/Line/Line.types"

/** A corner's horizontal and vertical radius in px. */
export type Corner = { x: number; y: number }

/** Top-left, top-right, bottom-right, bottom-left. */
export type Corners = [Corner, Corner, Corner, Corner]

const CORNER_PROPERTIES = [
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-right-radius",
  "border-bottom-left-radius",
] as const

/** One length of a computed radius: px, or a percentage of `size`. */
const toPx = (length: string, size: number) =>
  length.endsWith("%") ? (parseFloat(length) / 100) * size : parseFloat(length) || 0

/** A computed corner radius ("16px", "50%", "10px 20px") as horizontal and vertical px. */
const parseCorner = (value: string, width: number, height: number): Corner => {
  const [horizontal, vertical = horizontal] = value.trim().split(/\s+/)
  return { x: toPx(horizontal, width), y: toPx(vertical, height) }
}

/**
 * The frame's corners in px for a `width` × `height` box: from the `radius` prop, or an
 * element's own computed radii (`parent` for "element", or the Element given). Radii that don't fit are scaled down together, as the browser
 * does for border-radius (CSS Backgrounds 3, "Overlapping Curves").
 */
export const resolveCorners = (radius: LineRadiusType, parent: Element | null, width: number, height: number): Corners => {
  let corners: Corners
  if (radius === "element" || radius instanceof Element) {
    const element = radius === "element" ? parent : radius
    const style = element ? getComputedStyle(element) : undefined
    corners = CORNER_PROPERTIES.map((property) => parseCorner(style?.getPropertyValue(property) ?? "0", width, height)) as Corners
  } else if (typeof radius === "number") {
    corners = [0, 1, 2, 3].map(() => ({ x: radius, y: radius })) as Corners
  } else {
    corners = radius.map((corner) => (typeof corner === "number" ? { x: corner, y: corner } : { x: corner[0], y: corner[1] })) as Corners
  }

  const [topLeft, topRight, bottomRight, bottomLeft] = corners
  const ratios = [
    width / (topLeft.x + topRight.x),
    width / (bottomLeft.x + bottomRight.x),
    height / (topLeft.y + bottomLeft.y),
    height / (topRight.y + bottomRight.y),
  ].filter((ratio) => Number.isFinite(ratio))
  const scale = Math.min(1, ...ratios)
  return corners.map(({ x, y }) => ({ x: Math.max(0, x * scale), y: Math.max(0, y * scale) })) as Corners
}
