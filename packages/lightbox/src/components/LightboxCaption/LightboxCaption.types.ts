import type {
  LightboxTitleType,
  LightboxDescriptionType,
} from "../Lightbox/Lightbox.types"

/**
 * LightboxCaptionTitleType
 *
 * Title text displayed below the image in the lightbox overlay.
 * Re-export of LightboxTitleType.
 */
export type LightboxCaptionTitleType = LightboxTitleType

/**
 * LightboxCaptionDescriptionType
 *
 * Description text displayed below the title in the lightbox overlay.
 * Re-export of LightboxDescriptionType.
 */
export type LightboxCaptionDescriptionType = LightboxDescriptionType

/**
 * LightboxCaptionProps
 *
 * Complete prop definition for the LightboxCaption component.
 */
export interface LightboxCaptionProps {
  /** Title shown above the description */
  title?: LightboxCaptionTitleType
  /** Description shown below the title */
  description?: LightboxCaptionDescriptionType
  /** CSS class name applied to the wrapper */
  className?: string
}

const LightboxCaptionTypes = {} as const

namespace LightboxCaptionTypes {
  export type Title = LightboxCaptionTitleType
  export type Description = LightboxCaptionDescriptionType
  export type Props = LightboxCaptionProps
}

export default LightboxCaptionTypes
