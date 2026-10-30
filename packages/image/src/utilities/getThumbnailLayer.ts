import type { ImageBackgroundSizeType } from "../components/Image/Image.types"

/** Blur radius of the thumbnail filter, in SVG user units (rendered pixels; the SVG has no viewBox). */
const BLUR_STD_DEVIATION = 20

/**
 * The SVG `preserveAspectRatio` that matches a fit, so the blurred thumbnail
 * covers the same area the full image will.
 */
function toPreserveAspectRatio(fit?: ImageBackgroundSizeType): string {
  switch (fit) {
    case "contain":
    case "scale-down":
      return "xMidYMid meet"
    case "cover":
      return "xMidYMid slice"
    default:
      return "none"
  }
}

/**
 * The CSS image layer that paints a thumbnail behind (img) or under (div) the
 * full image.
 *
 * A data URI is wrapped in an SVG whose `feGaussianBlur` filter blurs it
 * (next/image's technique; a CSS `filter` would blur the full image too). The
 * flood/composite pass keeps the blurred edges opaque. A URL is painted as-is:
 * an SVG used as a CSS image cannot load external resources, so the browser's
 * upscaling of the small raster is the only smoothing.
 *
 * @param thumbnail - Data URI or URL of the thumbnail
 * @param fit - The Image's backgroundSize, for the blurred layer's aspect handling
 * @returns A CSS `<image>` value (`url(…)`)
 */
export function getThumbnailLayer(thumbnail: string, fit?: ImageBackgroundSizeType): string {
  if (!thumbnail.startsWith("data:")) return `url("${thumbnail}")`

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg'>` +
    `<filter id='b' color-interpolation-filters='sRGB'>` +
    `<feGaussianBlur stdDeviation='${BLUR_STD_DEVIATION}'/>` +
    `<feColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/>` +
    `<feFlood x='0' y='0' width='100%' height='100%'/>` +
    `<feComposite operator='out' in='s'/>` +
    `<feComposite in2='SourceGraphic'/>` +
    `<feGaussianBlur stdDeviation='${BLUR_STD_DEVIATION}'/>` +
    `</filter>` +
    `<image width='100%' height='100%' x='0' y='0' preserveAspectRatio='${toPreserveAspectRatio(fit)}' style='filter: url(#b);' href='${thumbnail}'/>` +
    `</svg>`

  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`
}
