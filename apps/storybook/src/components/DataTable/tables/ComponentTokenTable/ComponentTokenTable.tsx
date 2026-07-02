import { DataTable } from "../../../DataTable"
import type { DataTableConfig } from "../../../DataTable"
import { COMPONENT_TOKEN_COLUMNS } from "./ComponentTokenTable.constants"
import { buildGroupTable } from "./ComponentTokenTable.rows"
import { getComponentTokenGroups, componentLabel } from "./ComponentTokenTable.tokens"
import type { ComponentTokenTableProps } from "./ComponentTokenTable.types"

/**
 * One component's token tree, mirroring Tokens/Modules nesting: the component is
 * an h2 cluster whose groups (size, spacing, …) are h3 sub-tables, `status`
 * splitting one level deeper. Each row documents a component CSS variable and its
 * initial value — a core `var(--np--…)` deep-link or a literal.
 */
export const ComponentTokenTable = ({ prefix, nested = false }: ComponentTokenTableProps) => {
  const groups: DataTableConfig[] = getComponentTokenGroups(prefix).map((group) => buildGroupTable(prefix, group))

  // Docs: one h2 cluster (component → groups). Substory: groups flat.
  const tables = nested ? [{ name: componentLabel(prefix), tables: groups }] : groups
  return <DataTable columns={COMPONENT_TOKEN_COLUMNS} tables={tables} inline />
}