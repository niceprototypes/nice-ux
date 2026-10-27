import { ModuleTokenTable } from "../../src/dataTables/components/tokens/Modules"
import type { ModuleTokenTableSectionConfig } from "../../src/dataTables/components/tokens/Modules"
import { getItem, getTokenTable, type TokenTable } from "../../src/data"

/**
 * The full Tokens/Docs body, in sidebar order. Each Tokens folder (Animation,
 * Borders, Colors, …) becomes one cluster — the folder as an `h2`, its tables as
 * `h3` sub-tables; a top-level token page is its own `h2` table. Hand-written
 * pages (`table: false`) are skipped. Pure config → `ModuleTokenTable` renders.
 */
export const TokensDocs = () => {
  const tokens = getItem("tokens")
  const sections: ModuleTokenTableSectionConfig[] = []
  for (const item of tokens?.children ?? []) {
    if (item.isFolder) {
      const groups = item.children.map(child => getTokenTable(child.id)).filter((table): table is TokenTable => !!table)
      if (groups.length) sections.push({ name: item.name, groups })
    } else {
      const group = getTokenTable(item.id)
      if (group) sections.push({ group })
    }
  }
  return <ModuleTokenTable sections={sections} sectionWrapped={tokens?.settings.sectionWrapped === true} />
}
