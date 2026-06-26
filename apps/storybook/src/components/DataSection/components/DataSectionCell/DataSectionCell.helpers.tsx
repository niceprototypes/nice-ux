import * as React from "react"
import Tooltip from "nice-react-tooltip"

const COPY_TOOLTIP = "Copy to clipboard"

/** Wrap a copyable node with the hover "Copy to clipboard" tooltip. */
export const withCopyTooltip = (node: React.ReactNode): React.ReactElement => (
  <Tooltip content={COPY_TOOLTIP} trigger="hover" delayShow={500}>
    {node}
  </Tooltip>
)