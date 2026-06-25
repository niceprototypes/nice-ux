import * as React from "react"
import Typography from "../../../nice/Typography"
import Tooltip from "nice-react-tooltip"
import { CodeBlock } from "../../CodeBlock"
import { ClickToCopy } from "../../ClickToCopy"
import type { DataColumn } from "../../DataTable/DataTable.types"

interface DataCellProps {
  /** The column defining how this value renders. */
  column: DataColumn
  /** The cell value (index-aligned to its column by the row). */
  value: React.ReactNode
  /** Strip CodeBlock card chrome for `shiki` cells. @default false */
  inline?: boolean
}

// Cue shown on any copy-on-click cell.
const COPY_TOOLTIP = "Copy to clipboard"

/** Wrap a copyable node with the hover "Copy to clipboard" tooltip. */
const withCopyTooltip = (node: React.ReactNode): React.ReactElement => (
  <Tooltip content={COPY_TOOLTIP} trigger="hover" delayShow={500}>
    {node}
  </Tooltip>
)

/**
 * Renders one value according to its column's render policy:
 * - `"shiki"`: a Shiki CodeBlock that copies its source on click, with a
 *   "Copy to clipboard" hover tooltip. (Deep-linking a value to its module-root
 *   story is a Component-table concern, handled there by that table's own value
 *   renderer — never here, so a Modules cell copies rather than navigating.)
 * - `"text"`: a `<Typography>` styled by the column's `code`/`size`/`color`;
 *   when `clickToCopy` is set on a string value, it copies on click with the
 *   same tooltip.
 * - `"node"` (default): the value rendered as-is.
 *
 * A subcomponent of `DataRow` — only `DataRow` renders cells.
 */
export const DataCell: React.FC<DataCellProps> = ({ column, value, inline = false }) => {
  if (column.render === "shiki") {
    return withCopyTooltip(
      <CodeBlock code={String(value)} language={column.language ?? "tsx"} inline={inline} />
    )
  }

  if (column.render === "text") {
    const styled = React.isValidElement(value) ? (
      // An element value (e.g. a pre-built Typography) receives the styling via clone.
      React.cloneElement(value as React.ReactElement<Record<string, unknown>>, {
        code: column.code,
        size: column.size,
        color: column.color,
      })
    ) : (
      <Typography code={column.code} size={column.size} color={column.color}>
        {value}
      </Typography>
    )
    // clickToCopy applies to a string value only — copies the raw text, with the
    // same hover tooltip cueing the affordance.
    return column.clickToCopy && typeof value === "string" ? withCopyTooltip(<ClickToCopy text={value}>{styled}</ClickToCopy>) : styled
  }

  // "node" — render the value as-is.
  return <>{value}</>
}
