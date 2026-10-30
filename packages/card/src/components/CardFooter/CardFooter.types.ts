import type * as React from "react"
import type { FlexJustifyContentType } from "@niceprototypes/flex"

/**
 * CardFooterChildrenType
 *
 * The footer's content, usually actions.
 */
export type CardFooterChildrenType = React.ReactNode

/**
 * CardFooterJustifyContentType
 *
 * Re-export of FlexJustifyContentType from @niceprototypes/flex.
 * Main-axis distribution of the footer's children.
 */
export type CardFooterJustifyContentType = FlexJustifyContentType

/**
 * CardFooterProps
 *
 * Complete prop definition for the CardFooter component: a row of actions at the card's end.
 */
export interface CardFooterProps {
  /** The footer's content */
  children?: CardFooterChildrenType
  /**
   * Main-axis distribution
   * @default "flex-end"
   */
  justifyContent?: CardFooterJustifyContentType
}

// Declaration merging: const + namespace creates exportable type namespace
const CardFooterTypes = {} as const

namespace CardFooterTypes {
  export type Children = CardFooterChildrenType
  export type JustifyContent = CardFooterJustifyContentType
  export type Props = CardFooterProps
}

export default CardFooterTypes
