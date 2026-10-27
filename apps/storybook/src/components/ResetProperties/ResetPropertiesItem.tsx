import * as React from "react"
import Flex from "@niceprototypes/flex"
import Code from "../../nice/Code"
import Ink from "../../nice/Ink"
import { withCopyAffordance } from "../DataTable"
import { ClickToCopy } from "../ClickToCopy"

export interface ResetPropertiesItemProps {
  /** The key / token name, rendered as an `<h3>` in inline code (e.g. `borderBox`). */
  token: string
  /** The one-line description shown between the heading and the element list. */
  description?: React.ReactNode
  /** The HTML elements (or selectors) this item affects, rendered as inline code chips. */
  elements: string[]
}

/**
 * One entry in a {@link ResetProperties}: an `<h3>` code heading, the list of
 * HTML elements it affects as inline code chips, and a short description. The
 * heading and each element chip are click-to-copy, carrying the same hover copy
 * affordance the DataTable cells use.
 */
const ResetPropertiesItem: React.FC<ResetPropertiesItemProps> = ({ token, description, elements }) => (
  <Flex direction="column">
    {withCopyAffordance(
      <ClickToCopy text={token}>
        <Ink as="h3" code>{token}</Ink>
      </ClickToCopy>
    )}
    {description != null && <Ink>{description}</Ink>}
    <Flex wrap="wrap">
      {elements.map(element => (
        <React.Fragment key={element}>
          {withCopyAffordance(
            <ClickToCopy text={element}>
              <Code
                code={element}
                language="css"
                inlined
                margin="none"
                showLabel={false}
              />
            </ClickToCopy>
          )}
        </React.Fragment>
      ))}
    </Flex>
  </Flex>
)

export default ResetPropertiesItem
