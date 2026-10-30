import type * as React from "react"

/**
 * CardBodyChildrenType
 *
 * The card's main content.
 */
export type CardBodyChildrenType = React.ReactNode

/**
 * CardBodyProps
 *
 * Complete prop definition for the CardBody component: the card's main content, between header
 * and footer.
 */
export interface CardBodyProps {
  /** The card's main content */
  children?: CardBodyChildrenType
}

// Declaration merging: const + namespace creates exportable type namespace
const CardBodyTypes = {} as const

namespace CardBodyTypes {
  export type Children = CardBodyChildrenType
  export type Props = CardBodyProps
}

export default CardBodyTypes
