import type { Corners } from "./resolveCorners"

/** A quarter ellipse's length (Ramanujan's approximation of the full perimeter, quartered). */
const quarterArc = (a: number, b: number) =>
  a === 0 || b === 0 ? a + b : (Math.PI / 4) * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)))

/**
 * The path along a `width` × `height` box's edge, corners rounded per `corners`, clockwise from
 * the end of the top-left corner; and its length.
 */
export const framePath = (width: number, height: number, corners: Corners): { d: string; length: number } => {
  const [topLeft, topRight, bottomRight, bottomLeft] = corners
  const d = [
    `M ${topLeft.x} 0`,
    `H ${width - topRight.x}`,
    `A ${topRight.x} ${topRight.y} 0 0 1 ${width} ${topRight.y}`,
    `V ${height - bottomRight.y}`,
    `A ${bottomRight.x} ${bottomRight.y} 0 0 1 ${width - bottomRight.x} ${height}`,
    `H ${bottomLeft.x}`,
    `A ${bottomLeft.x} ${bottomLeft.y} 0 0 1 0 ${height - bottomLeft.y}`,
    `V ${topLeft.y}`,
    `A ${topLeft.x} ${topLeft.y} 0 0 1 ${topLeft.x} 0`,
    "Z",
  ].join(" ")
  const straight =
    width - topLeft.x - topRight.x + (height - topRight.y - bottomRight.y) + (width - bottomRight.x - bottomLeft.x) + (height - bottomLeft.y - topLeft.y)
  const arcs = corners.reduce((sum, { x, y }) => sum + quarterArc(x, y), 0)
  return { d, length: straight + arcs }
}
