import * as React from "react"
import { Mode } from "nice-react-styles"
import { StyledImg, StyledBackgroundImage } from "./Image.styles"
import type { ImageProps } from "./Image.types"
import { getVendorImage } from "../../services/registerVendorResolver"

/**
 * Image component for rendering images as either a standard img element
 * or a div with background-image styling.
 *
 * Two-tier source resolution:
 * 1. Direct src — the URL is used as-is
 * 2. Vendor src — requires the `vendor` flag and a registered resolver
 *    (e.g. nice-react-image-vendor); src/width/height are routed through it
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
 * // Vendor src — requires nice-react-image-vendor
 * <Image vendor src="10" width="800px" height="600px" alt="Vendor image" />
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
  mode,
  renderImage,
  vendor = false,
  className,
  style,
  children,
}) => {
  // Vendor src — route through the registered resolver; fall back to the raw src if no resolver returned a URL
  const resolvedSrc = vendor ? (getVendorImage({ src, width, height }) ?? src) : src
  const withMode = (el: React.ReactElement) => (mode ? <Mode name={mode}>{el}</Mode> : el)

  // Custom render: delegate entirely to consumer
  if (renderImage) {
    return withMode(<>{renderImage(resolvedSrc ?? "", alt)}</>)
  }

  // Div mode: render background-image container
  if (as === "div") {
    return withMode(
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
        style={style}
        role="img"
        aria-label={alt}
      >
        {children}
      </StyledBackgroundImage>
    )
  }

  // Default: render standard img element
  return withMode(
    <StyledImg
      src={resolvedSrc}
      alt={alt}
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
      style={style}
    />
  )
}

export default Image