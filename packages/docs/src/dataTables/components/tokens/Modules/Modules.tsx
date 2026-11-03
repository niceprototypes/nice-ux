import { DataTable } from "../../../../components/DataTable"
import type { DataTableConfig } from "../../../../components/DataTable"
import { getColumns } from "../../../../data"
import { buildTokenTable } from "./Modules.rows"
import { useNiceTheme, useHighlightedToken } from "./Modules.hooks"
import type { ModuleTokenTableProps, ModuleTokenTableSectionConfig, TokenColumnSetType } from "./Modules.types"

/** A section's column set: its group's, or a cluster's first group's (a folder's groups share one). */
const columnSetOf = (config: ModuleTokenTableSectionConfig): TokenColumnSetType =>
  "groups" in config ? config.groups[0].columnSet : config.group.columnSet

/**
 * The theme-aware token-table renderer. Reads the runtime theme + deep-link
 * highlight once, turns each config into a `DataTable` node (a leaf group, or a
 * cluster of groups nested one heading level deeper), and hands each run of
 * consecutive sections sharing a column set to one `DataTable`. Token rows (name,
 * CSS, then the value cells) stack below laptop, where they do not fit side by side.
 */
export default function ModuleTokenTable({ sections, sectionWrapped }: ModuleTokenTableProps) {
  const isNight = useNiceTheme() === "night"
  const highlight = useHighlightedToken()

  const toTable = (config: ModuleTokenTableSectionConfig): DataTableConfig =>
    "groups" in config
      ? { name: config.name, tables: config.groups.map(group => buildTokenTable(group, isNight, highlight)) }
      : buildTokenTable(config.group, isNight, highlight)

  const runs: ModuleTokenTableSectionConfig[][] = []
  for (const section of sections) {
    const run = runs[runs.length - 1]
    if (run && columnSetOf(run[0]) === columnSetOf(section)) run.push(section)
    else runs.push([section])
  }

  return (
    <>
      {runs.map((run, index) => (
        <DataTable
          key={index}
          {...getColumns(columnSetOf(run[0]))}
          rowFrom="laptop"
          sectionWrapped={sectionWrapped}
          tables={run.map(toTable)}
        />
      ))}
    </>
  )
}