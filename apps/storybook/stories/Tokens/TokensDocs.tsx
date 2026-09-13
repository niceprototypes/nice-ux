import { ModuleTokenTable } from "../../src/dataTables/components/tokens/Modules"
import type { ModuleTokenTableSectionConfig } from "../../src/dataTables/components/tokens/Modules"
import { tokenTables, tokenTableList } from "./tables"

/** Color modules grouped under the "Colors" cluster, color first. */
const COLOR_GROUP_NAMES = ["color", "backgroundColor", "borderColor", "brandColor"] as const

/** The "Colors" cluster — the four color modules as h3 sub-tables under one h2. */
const colorsCluster: ModuleTokenTableSectionConfig = {
  name: "Colors",
  groups: COLOR_GROUP_NAMES.map(name => tokenTables[name]),
}

/**
 * The full Tokens/Docs body. The four color modules collapse into one "Colors"
 * `h2` cluster (each an `h3` sub-table) pinned to the top; every other module
 * follows as its own `h2` table. Pure config → `ModuleTokenTable` does the rendering.
 */
export const TokensDocs = () => {
  const sections: ModuleTokenTableSectionConfig[] = [colorsCluster]
  for (const group of tokenTableList) {
    if ((COLOR_GROUP_NAMES as readonly string[]).includes(group.name)) continue
    sections.push({ group })
  }

  return <ModuleTokenTable sections={sections} />
}
