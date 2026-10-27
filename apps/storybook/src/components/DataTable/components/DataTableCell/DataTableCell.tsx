import * as React from "react"
import Ink from "../../../../nice/Ink"
import Code from "../../../../nice/Code"
import { ClickToCopy } from "../../../ClickToCopy"
import { withCopyAffordance } from "./DataTableCell.helpers"
import type { DataTableCellProps } from "./DataTableCell.types"

/** Best-effort text content of a rendered node — the clipboard string for a
 * copyable `node` cell (e.g. the token name inside a `<Ink>`). */
const nodeText = (node: React.ReactNode): string => {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join("")
  if (React.isValidElement(node)) return nodeText((node.props as { children?: React.ReactNode }).children)
  return ""
}

/**
 * One cell, rendered per its column's policy:
 * - `"nice-react-code"`: the nice `Code` component, copying on click (with an
 *   inline copy icon). Table code is always inlined — a card would break the
 *   cell grid — so there is no block option here.
 * - `"nice-react-ink"`: an `<Ink>` styled by `code`/`size`/`color`;
 *   `clickToCopy` on a string value copies on click with the same affordance.
 * - no `render` (default): the value rendered as-is.
 */
export const DataTableCell: React.FC<DataTableCellProps> = ({ column, value }) => {
  if (column.render === "nice-react-code") {
    // clickToCopy gates both the copy handler (and its pointer cursor, via
    // CodeBlock's copyOnClick) and the copy-icon affordance. Defaults on.
    const copy = column.clickToCopy ?? true
    const block = (
      <Code
        code={String(value)}
        language={column.language ?? "tsx"}
        inlined
        margin="none"
        copyOnClick={copy}
      />
    )
    return copy ? withCopyAffordance(block) : block
  }

  if (column.render === "nice-react-ink") {
    const styled = React.isValidElement(value) ? (
      React.cloneElement(value as React.ReactElement<Record<string, unknown>>, {
        code: column.code,
        size: column.size,
        color: column.color,
      })
    ) : (
      <Ink code={column.code} size={column.size} color={column.color}>
        {value}
      </Ink>
    )
    return column.clickToCopy && typeof value === "string" ? withCopyAffordance(<ClickToCopy text={value}>{styled}</ClickToCopy>) : styled
  }

  // node (default): rendered as-is, or wrapped in the copy affordance when the
  // column opts in — the clipboard string is the node's text content.
  return column.clickToCopy
    ? withCopyAffordance(<ClickToCopy text={nodeText(value).trim()}>{value}</ClickToCopy>)
    : <>{value}</>
}