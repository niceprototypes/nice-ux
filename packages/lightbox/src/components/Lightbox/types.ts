import * as React from "react"

/**
 * LightboxImageUrlType
 *
 * URL of the image to display in the lightbox overlay.
 */
export type LightboxImageUrlType = string

/**
 * LightboxAltType
 *
 * Alt text for the lightbox image.
 */
export type LightboxAltType = string

/**
 * LightboxTitleType
 *
 * Title text displayed below the image in the lightbox overlay.
 */
export type LightboxTitleType = string

/**
 * LightboxDescriptionType
 *
 * Description text displayed below the title in the lightbox overlay.
 */
export type LightboxDescriptionType = string

/**
 * LightboxProps
 *
 * Complete prop definition for the Lightbox component.
 */
export interface LightboxProps {
  /** Content that triggers the lightbox on click */
  children: React.ReactNode
  /** URL of the image to display fullscreen */
  imageUrl: LightboxImageUrlType
  /** Alt text for the image */
  alt?: LightboxAltType
  /** Title shown below the image in the overlay */
  title?: LightboxTitleType
  /** Description shown below the title in the overlay */
  description?: LightboxDescriptionType
}

const LightboxTypes = {} as const

namespace LightboxTypes {
  export type ImageUrl = LightboxImageUrlType
  export type Alt = LightboxAltType
  export type Title = LightboxTitleType
  export type Description = LightboxDescriptionType
  export type Props = LightboxProps
}

export default LightboxTypes