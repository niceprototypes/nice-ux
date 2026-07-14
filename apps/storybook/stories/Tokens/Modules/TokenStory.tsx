import { StoryHeader } from "../../../src/components/Story"
import { DataTable } from "../../../src/components/DataTable"
import {
  TOKEN_COLUMNS,
  TOKEN_COLUMN_WIDTHS,
  buildTokenRows,
  useNiceTheme,
  useHighlightedToken,
} from "../../../src/dataTables/components/tokens/Modules"
import { tokenTables } from "./tables"

/**
 * One token group as a standalone story — the story header, its description, and
 * the group's table (column headers, no leading name). Reads the runtime theme +
 * deep-link highlight, builds the rows, and renders a single-section
 * `DataTable`. Driven by the same `tokenTables` config as the Docs page, so a
 * story and its Docs row can never disagree.
 */
export const TokenStory = ({ name }: { name: keyof typeof tokenTables }) => {
  const group = tokenTables[name]
  const isNight = useNiceTheme() === "night"
  const highlight = useHighlightedToken()
  const rows = buildTokenRows(group.name, group.variants, group.preview, isNight, highlight)
  return (
    <>
      {/* Match the Tokens/Docs page width — the multi-column table needs the full
          container, not the default 980px docs measure. */}
      <StoryHeader title={group.name} description={group.description} />
      <DataTable columns={TOKEN_COLUMNS} columnWidths={TOKEN_COLUMN_WIDTHS} tables={[{ rows }]} />
    </>
  )
}
