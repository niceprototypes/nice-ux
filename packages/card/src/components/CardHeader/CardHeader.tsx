import * as React from "react"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import type { CardHeaderProps } from "./CardHeader.types"

/**
 * CardHeader
 *
 * The card's header row: title (an `<h3>` Ink) and description (a light Ink) in a column, extra
 * `children` under them, and `end` content beside them.
 *
 * @example
 * ```tsx
 * <CardHeader title="Plan" description="Billed monthly." titleProps={{ as: "h2" }} end={<Button>Edit</Button>} />
 * ```
 */
const CardHeader: React.FC<CardHeaderProps> = ({ title, description, titleProps, descriptionProps, end, children }) => (
  <Flex direction="row" justifyContent="space-between" alignItems="flex-start" gap="base">
    <Flex direction="column" gap="smaller">
      {title != null ? (
        <Ink as="h3" weight="semibold" {...titleProps}>
          {title}
        </Ink>
      ) : null}
      {description != null ? (
        <Ink color="light" {...descriptionProps}>
          {description}
        </Ink>
      ) : null}
      {children}
    </Flex>
    {end}
  </Flex>
)

export default CardHeader
