import * as React from "react"
import Flex from "nice-react-flex"
import Typography from "../../nice/Typography"
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
        <Typography as="h3" code>{token}</Typography>
      </ClickToCopy>
    )}
    {description != null && <Typography as="span">{description}</Typography>}
    <Flex wrap="wrap">
      {elements.map(element => (
        <React.Fragment key={element}>
          {withCopyAffordance(
            <ClickToCopy text={element}>
              <code>{element}</code>
            </ClickToCopy>
          )}
        </React.Fragment>
      ))}
    </Flex>
  </Flex>
)

export default ResetPropertiesItem
