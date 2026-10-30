import type * as React from "react"
import type { InkProps } from "@niceprototypes/ink"

/**
 * CardHeaderTitleType
 *
 * Title, rendered in an `<h3>` Ink (semibold). Change the heading level with `titleProps.as`.
 */
export type CardHeaderTitleType = React.ReactNode

/**
 * CardHeaderDescriptionType
 *
 * Description under the title, rendered in a light Ink.
 */
export type CardHeaderDescriptionType = React.ReactNode

/**
 * CardHeaderInkProps
 *
 * Ink props for the title or description, spread over the defaults (Tile precedent).
 */
export type CardHeaderInkProps = Partial<Omit<InkProps, "children">>

/**
 * CardHeaderEndType
 *
 * Content at the end of the header row, beside the title: an action or a status.
 */
export type CardHeaderEndType = React.ReactNode

/**
 * CardHeaderChildrenType
 *
 * Extra content under the title and description.
 */
export type CardHeaderChildrenType = React.ReactNode

/**
 * CardHeaderProps
 *
 * Complete prop definition for the CardHeader component: title and description in a column,
 * with `end` content beside them.
 */
export interface CardHeaderProps {
  /** Title */
  title?: CardHeaderTitleType
  /** Description under the title */
  description?: CardHeaderDescriptionType
  /** Ink props for the title */
  titleProps?: CardHeaderInkProps
  /** Ink props for the description */
  descriptionProps?: CardHeaderInkProps
  /** Content at the end of the header row */
  end?: CardHeaderEndType
  /** Extra content under the title and description */
  children?: CardHeaderChildrenType
}

// Declaration merging: const + namespace creates exportable type namespace
const CardHeaderTypes = {} as const

namespace CardHeaderTypes {
  export type Title = CardHeaderTitleType
  export type Description = CardHeaderDescriptionType
  export type Ink = CardHeaderInkProps
  export type End = CardHeaderEndType
  export type Children = CardHeaderChildrenType
  export type Props = CardHeaderProps
}

export default CardHeaderTypes
