import * as React from "react"
import Typography from "../../../../nice/Typography"
import { CodeBlock } from "../../../CodeBlock"
import { ClickToCopy } from "../../../ClickToCopy"
import { withCopyTooltip } from "./DataTablesCell.helpers"
import type { DataTablesCellProps } from "./DataTablesCell.types"

/**
 * One cell, rendered per its column's policy:
 * - `"shiki"`: a Shiki CodeBlock that copies on click (with a hover tooltip).
 * - `"text"`: a `<Typography>` styled by `code`/`size`/`color`; `clickToCopy`
 *   on a string value copies on click with the same tooltip.
 * - `"node"` (default): the value rendered as-is.
 */
export const DataTablesCell: React.FC<DataTablesCellProps> = ({ column, value, inline = false }) => {
  if (column.render === "shiki") {
    return withCopyTooltip(<CodeBlock code={String(value)} language={column.language ?? "tsx"} inline={inline} />)
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
    return column.clickToCopy && typeof value === "string" ? withCopyTooltip(<ClickToCopy text={value}>{styled}</ClickToCopy>) : styled
  }

  return <>{value}</>
}