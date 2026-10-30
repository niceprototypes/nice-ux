import * as React from "react"
import Flex from "@niceprototypes/flex"
import type { CardBodyProps } from "./CardBody.types"

/**
 * CardBody
 *
 * The card's main content, in a column that takes the card's spare height, so a CardFooter
 * sits at the bottom of equal-height cards.
 *
 * @example
 * ```tsx
 * <CardBody>
 *   <Ink>Unlimited projects.</Ink>
 * </CardBody>
 * ```
 */
const CardBody: React.FC<CardBodyProps> = ({ children }) => (
  <Flex direction="column" grow={1}>
    {children}
  </Flex>
)

export default CardBody
