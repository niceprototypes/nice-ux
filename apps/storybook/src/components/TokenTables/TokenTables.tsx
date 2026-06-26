import { DataSection } from "../DataSection"
import type { DataTable } from "../DataSection"
import { TOKEN_COLUMNS } from "./TokenTables.constants"
import { buildTokenTable } from "./TokenTables.rows"
import { useNiceTheme, useHighlightedToken } from "./TokenTables.hooks"
import type { TokenTablesProps, TokenTablesSectionConfig } from "./TokenTables.types"

/**
 * The theme-aware token-table renderer. Reads the runtime theme + deep-link
 * highlight once, turns each config into a `DataTable` node (a leaf group, or a
 * cluster of groups nested one heading level deeper), and hands the array to
 * `DataSection`.
 */
export const TokenTables = ({ sections }: TokenTablesProps) => {
  const isNight = useNiceTheme() === "night"
  const highlight = useHighlightedToken()

  const toTable = (config: TokenTablesSectionConfig): DataTable =>
    "groups" in config
      ? { name: config.name, tables: config.groups.map(group => buildTokenTable(group, isNight, highlight)) }
      : buildTokenTable(config.group, isNight, highlight)

  return <DataSection columns={TOKEN_COLUMNS} tables={sections.map(toTable)} inline />
}