import * as React from "react"
import { Theme } from "@niceprototypes/styles"
import { StyledImg, StyledBackgroundImage } from "./Image.styles"
import type { ImageProps } from "./Image.types"
import { getVendorImage } from "../../services/registerVendorResolver"
import { getThumbnailLayer } from "../../utilities/getThumbnailLayer"
import { backgroundSizeToCss } from "../../utilities/backgroundSizeToCss"
import { isDevelopment } from "../../utilities/isDevelopment"

/** Whether the unsized-thumbnail warning was already printed this page load. */
let warnedUnsized = false

/**
 * Image component for rendering images as either a standard img element
 * or a div with background-image styling.
 *
 * Two-tier source resolution:
 * 1. Direct src — the URL is used as-is
 * 2. Vendor src — requires the `vendor` flag and a registered resolver
 *    (e.g. @niceprototypes/image-vendor); src/width/height are routed through it
 *
 * @example
 * ```tsx
 * // Standard img element (default)
 * <Image src="/photo.jpg" alt="A photo" />
 *
 * // With sizing and fit
 * <Image src="/photo.jpg" alt="A photo" width="400px" height="300px" backgroundSize="cover" />
 *
 * // As a background-image div
 * <Image as="div" src="/hero.jpg" alt="Hero banner" width="100%" height="400px">
 *   <h1>Overlay content</h1>
 * </Image>
 *
 * // With border radius token
 * <Image src="/avatar.jpg" alt="User avatar" borderRadius="base" />
 *
 * // Vendor src — requires @niceprototypes/image-vendor
 * <Image vendor src="10" width="800px" height="600px" alt="Vendor image" />
 *
 * // Blurred thumbnail until the full image loads; sized so it reserves the space
 * <Image src="/photo.jpg" alt="A photo" thumbnail="data:image/png;base64,…" aspectRatio="4/3" />
 * ```
 */
const Image: React.FC<ImageProps> = ({
  as = "img",
  src,
  alt,
  width,
  height,
  aspectRatio,
  backgroundSize,
  backgroundPosition,
  borderRadius,
  bordered,
  borderWidth,
  borderColor,
  theme,
  renderImage,
  vendor = false,
  thumbnail,
  loading,
  fetchPriority,
  className,
  style,
  children,
}) => {
  // Vendor src — route through the registered resolver; fall back to the raw src if no resolver returned a URL
  const resolvedSrc = vendor ? (getVendorImage({ src, width, height }) ?? src) : src
  const withTheme = (el: React.ReactElement) => (theme ? <Theme name={theme}>{el}</Theme> : el)

  // The src whose full image has loaded; the thumbnail shows until it matches the current src
  const [loadedSrc, setLoadedSrc] = React.useState<string>()
  const thumbnailLayer = thumbnail && loadedSrc !== resolvedSrc ? getThumbnailLayer(thumbnail, backgroundSize) : undefined

  // Div mode has no load event: a detached probe of the same src clears the thumbnail
  const probeDiv = as === "div" && !renderImage && Boolean(thumbnail)
  React.useEffect(() => {
    if (!probeDiv || !resolvedSrc) return
    const probe = new window.Image()
    probe.onload = () => setLoadedSrc(resolvedSrc)
    probe.src = resolvedSrc
    return () => {
      probe.onload = null
    }
  }, [probeDiv, resolvedSrc])

  // A thumbnail does not reserve space; only aspectRatio or width+height do
  if (thumbnail && !aspectRatio && !(width && height) && !warnedUnsized && isDevelopment()) {
    warnedUnsized = true
    console.warn("@niceprototypes/image: thumbnail is set without aspectRatio or width+height, so the image shifts layout when it loads.")
  }

  // Custom render: delegate entirely to consumer
  if (renderImage) {
    return withTheme(<>{renderImage(resolvedSrc ?? "", alt)}</>)
  }

  // Div mode: render background-image container
  if (as === "div") {
    return withTheme(
      <StyledBackgroundImage
        $src={resolvedSrc ?? ""}
        $width={width}
        $height={height}
        $aspectRatio={aspectRatio}
        $backgroundSize={backgroundSize}
        $backgroundPosition={backgroundPosition}
        $borderRadius={borderRadius}
        $bordered={bordered}
        $borderWidth={borderWidth}
        $borderColor={borderColor}
        className={className}
        style={thumbnailLayer ? { backgroundImage: `url("${resolvedSrc}"), ${thumbnailLayer}`, ...style } : style}
        role="img"
        aria-label={alt}
      >
        {children}
      </StyledBackgroundImage>
    )
  }

  // Default: render standard img element
  return withTheme(
    <StyledImg
      src={resolvedSrc}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onLoad={() => setLoadedSrc(resolvedSrc)}
      $width={width}
      $height={height}
      $aspectRatio={aspectRatio}
      $backgroundSize={backgroundSize}
      $backgroundPosition={backgroundPosition}
      $borderRadius={borderRadius}
      $bordered={bordered}
      $borderWidth={borderWidth}
      $borderColor={borderColor}
      className={className}
      style={
        thumbnailLayer
          ? {
              backgroundImage: thumbnailLayer,
              backgroundRepeat: "no-repeat",
              // The blurred SVG layer has no intrinsic size and fits itself; a URL layer follows the image's fit
              backgroundSize: thumbnail && thumbnail.startsWith("data:") ? "100% 100%" : backgroundSizeToCss(backgroundSize ?? "fill"),
              backgroundPosition: backgroundPosition ?? "center",
              ...style,
            }
          : style
      }
    />
  )
}

export default Image