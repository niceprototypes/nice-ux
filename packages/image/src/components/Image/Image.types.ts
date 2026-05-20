import * as React from "react"
import type { BackgroundSizeType, BorderRadiusType, BorderWidthType, BorderColorType, ModeType } from "nice-react-styles"

/**
 * ImageAsType
 *
 * Rendering mode for the Image component.
 *
 * Values:
 * - "img": Renders a standard HTML img element
 * - "div": Renders a div with background-image styling
 */
export type ImageAsType = "img" | "div"

/**
 * ImageSrcType
 *
 * Image source URL string.
 */
export type ImageSrcType = string

/**
 * ImageAltType
 *
 * Alternative text for accessibility.
 */
export type ImageAltType = string

/**
 * ImageWidthType
 *
 * Width of the image. Accepts any valid CSS width value.
 */
export type ImageWidthType = string

/**
 * ImageHeightType
 *
 * Height of the image. Accepts any valid CSS height value.
 */
export type ImageHeightType = string

/**
 * ImageBackgroundSizeType
 *
 * Re-export of BackgroundSizeType from nice-styles.
 * Controls how the image content fits within its container.
 * Maps to CSS object-fit (img) or background-size (div, with runtime translation
 * for values that CSS `background-size` doesn't accept — `fill`, `none`, `scale-down`).
 *
 * Values:
 * - "contain": Scale to fit without cropping
 * - "cover": Scale to fill, cropping as needed
 * - "fill": Stretch to fill exactly
 * - "none": No resizing
 * - "scale-down": Use smaller of none or contain
 */
export type ImageBackgroundSizeType = BackgroundSizeType

/**
 * ImageBackgroundPositionType
 *
 * Controls the position of the image within its container.
 * Maps to CSS background-position (div) or object-position (img).
 * Accepts any valid CSS position value.
 */
export type ImageBackgroundPositionType = string

/**
 * ImageBorderRadiusType
 *
 * Re-export of BorderRadiusType from nice-styles.
 * Border radius values using design tokens.
 */
export type ImageBorderRadiusType = BorderRadiusType

/**
 * ImageBorderedType
 *
 * Toggles a border around the image. When true, the border is rendered
 * using `borderWidth` and `borderColor` tokens (both default to "base").
 */
export type ImageBorderedType = boolean

/**
 * ImageBorderWidthType
 *
 * Re-export of BorderWidthType from nice-styles.
 * Border width values using design tokens. Applied when `bordered` is true.
 */
export type ImageBorderWidthType = BorderWidthType

/**
 * ImageBorderColorType
 *
 * Re-export of BorderColorType from nice-styles.
 * Border color values using design tokens. Applied when `bordered` is true.
 */
export type ImageBorderColorType = BorderColorType

/**
 * ImageModeType
 *
 * Re-export of ModeType from nice-styles.
 * Pin token resolution to a specific mode.
 * Extensible for consumer-defined custom modes.
 */
export type ImageModeType = ModeType

/**
 * ImageRenderImageType
 *
 * Custom render function that replaces the default image rendering.
 * Receives the resolved src and alt, returns custom JSX.
 */
export type ImageRenderImageType = (src: string, alt: string) => React.ReactNode

/**
 * ImageVendorType
 *
 * Enables vendor image resolution — props are routed through the registered
 * vendor resolver to produce the concrete URL. Requires nice-react-image-vendor
 * (or a custom resolver) to be installed and imported.
 */
export type ImageVendorType = boolean

/**
 * ImageProps
 *
 * Complete prop definition for the Image component.
 */
export type ImageProps = {
  /** Rendering mode: standard img element or div with background-image */
  as?: ImageAsType

  /** Image source URL — optional when vendor is true (vendor resolver may generate it) */
  src?: ImageSrcType

  /** Alternative text for accessibility (required for img, used as aria-label for div) */
  alt: ImageAltType

  /** Width of the image container */
  width?: ImageWidthType

  /** Height of the image container */
  height?: ImageHeightType

  /** How the image fits within its container */
  backgroundSize?: ImageBackgroundSizeType

  /** Position of the image within its container */
  backgroundPosition?: ImageBackgroundPositionType

  /** Border radius from nice-styles tokens */
  borderRadius?: ImageBorderRadiusType

  /** Render a border around the image (uses borderWidth/borderColor tokens) */
  bordered?: ImageBorderedType

  /** Border width token (only applied when bordered is true) */
  borderWidth?: ImageBorderWidthType

  /** Border color token (only applied when bordered is true) */
  borderColor?: ImageBorderColorType

  /** Pin token resolution to a specific mode */
  mode?: ImageModeType

  /** Custom render function that replaces the default image rendering */
  renderImage?: ImageRenderImageType

  /** Route src/width/height through the registered vendor resolver */
  vendor?: ImageVendorType

  /** CSS class name for styling */
  className?: string

  /** Inline styles */
  style?: React.CSSProperties

  /** Content to render inside the div (only applicable when as="div") */
  children?: React.ReactNode
}

// Declaration merging: const + namespace creates exportable type namespace
const ImageTypes = {} as const

namespace ImageTypes {
  export type As = ImageAsType
  export type Src = ImageSrcType
  export type Alt = ImageAltType
  export type Width = ImageWidthType
  export type Height = ImageHeightType
  export type BackgroundSize = ImageBackgroundSizeType
  export type BackgroundPosition = ImageBackgroundPositionType
  export type BorderRadius = ImageBorderRadiusType
  export type Bordered = ImageBorderedType
  export type BorderWidth = ImageBorderWidthType
  export type BorderColor = ImageBorderColorType
  export type Mode = ImageModeType
  export type RenderImage = ImageRenderImageType
  export type Vendor = ImageVendorType
  export type Props = ImageProps
}

export default ImageTypes