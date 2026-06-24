import { DataTable } from "../DataTable"
import { TOKEN_COLUMNS, buildTokenRows } from "./TokensDataTable.helpers"
import { useNiceTheme, useHighlightedToken } from "./TokensDataTable.hooks"
import type { TokensDataTableProps } from "./TokensDataTable.types"

/**
 * One token group as a reference table — preview, CSS variable, getToken() call,
 * and resolved value per variant. Reads the runtime theme and the active
 * deep-link highlight, builds the pure row data, and renders it via `DataTable`.
 * `showName` toggles the leading group-name column (off for the standalone
 * per-group story, which shows column headers instead).
 */
export const TokensDataTable = ({ name, variants, preview, showName = true }: TokensDataTableProps) => {
  const isNight = useNiceTheme() === "night"
  const highlight = useHighlightedToken()
  const rows = buildTokenRows(name, variants, preview, isNight, highlight)
  return <DataTable name={showName ? name : undefined} columns={TOKEN_COLUMNS} rows={rows} inline />
}
