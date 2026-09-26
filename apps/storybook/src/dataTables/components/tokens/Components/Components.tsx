import { DataTable } from "../../../../components/DataTable"
import type { DataTableConfig } from "../../../../components/DataTable"
import { getColumns } from "../../../../data"
import { buildGroupTable } from "./Components.rows"
import { getComponentTokenGroups } from "./Components.tokens"
import { cap } from "../../../utilities"
import type { ComponentTokenTableProps } from "./Components.types"

/**
 * One component's token tree, mirroring the Tokens pages' nesting: the component is
 * an h2 cluster whose groups (size, spacing, …) are h3 sub-tables, `status`
 * splitting one level deeper. Each row documents a component CSS variable and its
 * initial value — a core `var(--np--…)` deep-link or a literal.
 */
export default function ComponentTokenTable({ prefix, nested = false }: ComponentTokenTableProps) {
  const groups: DataTableConfig[] = getComponentTokenGroups(prefix).map((group) => buildGroupTable(prefix, group))

  // Docs: one h2 cluster (component → groups). Substory: groups flat.
  const tables = nested ? [{ name: cap(prefix), tables: groups }] : groups
  return <DataTable {...getColumns("componentToken")} tables={tables} />
}