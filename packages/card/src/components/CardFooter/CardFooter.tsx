import * as React from "react"
import Flex from "@niceprototypes/flex"
import type { CardFooterProps } from "./CardFooter.types"

/**
 * CardFooter
 *
 * A row at the card's end, usually actions, aligned by `justifyContent` (end by default).
 *
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button>Cancel</Button>
 *   <Button filled>Save</Button>
 * </CardFooter>
 * ```
 */
const CardFooter: React.FC<CardFooterProps> = ({ children, justifyContent = "flex-end" }) => (
  <Flex direction="row" justifyContent={justifyContent} alignItems="center" gap="small">
    {children}
  </Flex>
)

export default CardFooter
