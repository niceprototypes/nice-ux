import { DataTable } from "../../../DataTable"
import type { DataTableConfig } from "../../../DataTable"
import { TOKEN_COLUMNS } from "./ModuleTokenTable.constants"
import { buildTokenTable } from "./ModuleTokenTable.rows"
import { useNiceTheme, useHighlightedToken } from "./ModuleTokenTable.hooks"
import type { ModuleTokenTableProps, ModuleTokenTableSectionConfig } from "./ModuleTokenTable.types"

/**
 * The theme-aware token-table renderer. Reads the runtime theme + deep-link
 * highlight once, turns each config into a `DataTable` node (a leaf group, or a
 * cluster of groups nested one heading level deeper), and hands the array to
 * `DataTable`.
 */
export const ModuleTokenTable = ({ sections }: ModuleTokenTableProps) => {
  const isNight = useNiceTheme() === "night"
  const highlight = useHighlightedToken()

  const toTable = (config: ModuleTokenTableSectionConfig): DataTableConfig =>
    "groups" in config
      ? { name: config.name, tables: config.groups.map(group => buildTokenTable(group, isNight, highlight)) }
      : buildTokenTable(config.group, isNight, highlight)

  return <DataTable columns={TOKEN_COLUMNS} tables={sections.map(toTable)} inline />
}