import * as React from "react"
import { StyledImg, StyledBackgroundImage } from "./styles"
import type { ImageProps } from "./types"

/**
 * Image component for rendering images as either a standard img element
 * or a div with background-image styling.
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
 * ```
 */
const Image: React.FC<ImageProps> = ({
  as = "img",
  src,
  alt,
  width,
  height,
  backgroundSize,
  backgroundPosition,
  borderRadius,
  mode,
  renderImage,
  className,
  style,
  children,
}) => {
  // Custom render: delegate entirely to consumer
  if (renderImage) {
    return <>{renderImage(src, alt)}</>
  }

  // Div mode: render background-image container
  if (as === "div") {
    return (
      <StyledBackgroundImage
        $src={src}
        $width={width}
        $height={height}
        $backgroundSize={backgroundSize}
        $backgroundPosition={backgroundPosition}
        $borderRadius={borderRadius}
        $mode={mode}
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
  return (
    <StyledImg
      src={src}
      alt={alt}
      $width={width}
      $height={height}
      $backgroundSize={backgroundSize}
      $backgroundPosition={backgroundPosition}
      $borderRadius={borderRadius}
      $mode={mode}
      className={className}
      style={style}
    />
  )
}

export default Image