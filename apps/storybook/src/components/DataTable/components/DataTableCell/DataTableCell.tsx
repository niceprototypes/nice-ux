import * as React from "react"
import Typography from "../../../../nice/Typography"
import { CodeBlock } from "../../../CodeBlock"
import { ClickToCopy } from "../../../ClickToCopy"
import { withCopyAffordance } from "./DataTableCell.helpers"
import type { DataTableCellProps } from "./DataTableCell.types"

/**
 * One cell, rendered per its column's policy:
 * - `"shiki"`: a Shiki CodeBlock that copies on click (with an inline copy icon).
 * - `"text"`: a `<Typography>` styled by `code`/`size`/`color`; `clickToCopy`
 *   on a string value copies on click with the same copy-icon affordance.
 * - `"node"` (default): the value rendered as-is.
 */
export const DataTableCell: React.FC<DataTableCellProps> = ({ column, value, inline = false }) => {
  if (column.render === "shiki") {
    // clickToCopy gates both the copy handler (and its pointer cursor, via
    // CodeBlock's copyOnClick) and the copy-icon affordance. Defaults on.
    const copy = column.clickToCopy ?? true
    const block = (
      <CodeBlock
        code={String(value)}
        language={column.language ?? "tsx"}
        inline={inline}
        margin="none"
        copyOnClick={copy}
      />
    )
    return copy ? withCopyAffordance(block) : block
  }

  if (column.render === "text") {
    const styled = React.isValidElement(value) ? (
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
    return column.clickToCopy && typeof value === "string" ? withCopyAffordance(<ClickToCopy text={value}>{styled}</ClickToCopy>) : styled
  }

  return <>{value}</>
}