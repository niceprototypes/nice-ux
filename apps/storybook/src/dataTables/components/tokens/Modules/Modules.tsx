import { DataTable } from "../../../../components/DataTable"
import type { DataTableConfig } from "../../../../components/DataTable"
import { TOKEN_COLUMNS, TOKEN_COLUMN_WIDTHS } from "./Modules.constants"
import { buildTokenTable } from "./Modules.rows"
import { useNiceTheme, useHighlightedToken } from "./Modules.hooks"
import type { ModuleTokenTableProps, ModuleTokenTableSectionConfig } from "./Modules.types"

/**
 * The theme-aware token-table renderer. Reads the runtime theme + deep-link
 * highlight once, turns each config into a `DataTable` node (a leaf group, or a
 * cluster of groups nested one heading level deeper), and hands the array to
 * `DataTable`.
 */
export default function ModuleTokenTable({ sections }: ModuleTokenTableProps) {
  const isNight = useNiceTheme() === "night"
  const highlight = useHighlightedToken()

  const toTable = (config: ModuleTokenTableSectionConfig): DataTableConfig =>
    "groups" in config
      ? { name: config.name, tables: config.groups.map(group => buildTokenTable(group, isNight, highlight)) }
      : buildTokenTable(config.group, isNight, highlight)

  return <DataTable columns={TOKEN_COLUMNS} columnWidths={TOKEN_COLUMN_WIDTHS} tables={sections.map(toTable)} />
}