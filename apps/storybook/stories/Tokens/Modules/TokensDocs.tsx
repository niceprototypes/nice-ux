import { TokenTables } from "../../../src/components/TokenTables"
import type { TokenTablesSectionConfig } from "../../../src/components/TokenTables"
import { tokenTables, tokenTableList } from "./tables"

/** Color modules grouped under the "Colors" cluster, color first. */
const COLOR_GROUP_NAMES = ["color", "backgroundColor", "borderColor", "brandColor"] as const

/** The "Colors" cluster — the four color modules as h3 sub-tables under one h2. */
const colorsCluster: TokenTablesSectionConfig = {
  name: "Colors",
  groups: COLOR_GROUP_NAMES.map(name => tokenTables[name]),
}

/**
 * The full Tokens/Docs body. Each module is its own table under an `h2` title
 * (`animationEasing`, `gap`, …); the four color modules collapse into one
 * "Colors" `h2` cluster (each an `h3` sub-table) placed where the first color
 * module falls in source order. Pure config → `TokenTables` does the rendering.
 */
export const TokensDocs = () => {
  const sections: TokenTablesSectionConfig[] = []
  let clusterPlaced = false
  for (const group of tokenTableList) {
    if ((COLOR_GROUP_NAMES as readonly string[]).includes(group.name)) {
      if (clusterPlaced) continue
      clusterPlaced = true
      sections.push(colorsCluster)
      continue
    }
    sections.push({ group })
  }

  return <TokenTables sections={sections} />
}
