import * as React from "react"
import Icon from "nice-react-icon"
import { CopyAffordance } from "./DataTableCell.styles"

/**
 * Wrap a copyable node with an inline copy icon (color "lightest") that turns
 * link-colored on hover — the click-to-copy affordance. The wrapped node keeps
 * its own click-to-copy handler; the icon is the visual cue.
 */
export const withCopyAffordance = (node: React.ReactNode): React.ReactElement => (
  <CopyAffordance>
    {node}
    <Icon name="copy" size="smaller" color="lightest" />
  </CopyAffordance>
)