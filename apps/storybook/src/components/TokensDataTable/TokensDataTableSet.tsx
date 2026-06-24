import { DataTableSet } from "../DataTableSet"
import { TOKEN_COLUMNS, buildTokenRows } from "./TokensDataTable.helpers"
import { useNiceTheme, useHighlightedToken } from "./TokensDataTable.hooks"
import type { TokenGroupConfig } from "./TokensDataTable.types"

interface TokensDataTableSetProps {
  /** Token group configs, in render order — one named sub-table each. */
  groups: TokenGroupConfig[]
}

/**
 * The Tokens/Modules Docs body: every token group as one aligned table-of-tables
 * under a single shared header (the data-first replacement for the old
 * `TokensDocs`, which rendered a header table plus N named group tables). Reads
 * the runtime theme + deep-link highlight once and builds every group's rows.
 */
export const TokensDataTableSet = ({ groups }: TokensDataTableSetProps) => {
  const isNight = useNiceTheme() === "night"
  const highlight = useHighlightedToken()
  const tables = groups.map(group => ({
    name: group.name,
    rows: buildTokenRows(group.name, group.variants, group.preview, isNight, highlight),
  }))
  return <DataTableSet columns={TOKEN_COLUMNS} tables={tables} inline />
}
