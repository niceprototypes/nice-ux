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
 * LightboxOpenType
 *
 * Whether the overlay is shown. Set it to control the Lightbox; leave it unset
 * and the Lightbox opens and closes itself.
 */
export type LightboxOpenType = boolean

/**
 * LightboxOnOpenChangeType
 *
 * Called with the open state the Lightbox requests: `true` from the trigger,
 * `false` from Escape or a click outside the image and caption.
 */
export type LightboxOnOpenChangeType = (open: boolean) => void

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
  /** Whether the overlay is shown (controlled); unset, the Lightbox manages it */
  open?: LightboxOpenType
  /** Called with the requested open state, in controlled and uncontrolled use */
  onOpenChange?: LightboxOnOpenChangeType
  /** CSS class name applied to the trigger element */
  className?: string
  /** Inline styles applied to the trigger element */
  style?: React.CSSProperties
}

const LightboxTypes = {} as const

namespace LightboxTypes {
  export type ImageUrl = LightboxImageUrlType
  export type Alt = LightboxAltType
  export type Title = LightboxTitleType
  export type Description = LightboxDescriptionType
  export type Open = LightboxOpenType
  export type OnOpenChange = LightboxOnOpenChangeType
  export type Props = LightboxProps
}

export default LightboxTypes