import { DataTables } from "../DataTables"
import type { DataSection } from "../DataTables"
import { TOKEN_COLUMNS } from "./TokenTables.constants"
import { buildTokenSection } from "./TokenTables.rows"
import { useNiceTheme, useHighlightedToken } from "./TokenTables.hooks"
import type { TokenTablesProps, TokenTablesSectionConfig } from "./TokenTables.types"

/**
 * The one theme-aware token-table renderer. Reads the runtime theme + deep-link
 * highlight once, turns each `TokenTablesSectionConfig` into a `DataSection`
 * (leaf group, or cluster of groups one heading level down), and hands them to
 * the generic `DataTables` in sectioned layout. The single source of truth for
 * the Modules/Docs body, the Colors page, and any grouped token reference.
 */
export const TokenTables = ({ sections }: TokenTablesProps) => {
  const isNight = useNiceTheme() === "night"
  const highlight = useHighlightedToken()

  const toSection = (config: TokenTablesSectionConfig): DataSection =>
    "groups" in config
      ? {
          id: typeof config.name === "string" ? config.name : undefined,
          name: config.name,
          titleAs: config.titleAs,
          // Children carry no titleAs → their level derives one below the cluster's.
          sections: config.groups.map(group => buildTokenSection(group, isNight, highlight)),
        }
      : buildTokenSection(config.group, isNight, highlight, { titleAs: config.titleAs })

  return (
    <DataTables
      layout="sectioned"
      columns={TOKEN_COLUMNS}
      tables={sections.map(toSection)}
      inline
    />
  )
}
