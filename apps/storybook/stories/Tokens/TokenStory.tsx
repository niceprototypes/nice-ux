import { StoryHeader } from "../../src/components/Story"
import { DataTable } from "../../src/components/DataTable"
import { getTokenTable } from "../../src/data"
import {
  buildTokenRows,
  useNiceTheme,
  useHighlightedToken,
} from "../../src/dataTables/components/tokens/Modules"

/**
 * One token group as a standalone story — the story header, its description, and
 * the group's table (column headers, no leading name). Reads the runtime theme +
 * deep-link highlight, builds the rows, and renders a single-section
 * `DataTable`. Driven by the same `storybook.json` item as the Docs page, so a
 * story and its Docs row can never disagree.
 */
export const TokenStory = ({ id }: { id: string }) => {
  const isNight = useNiceTheme() === "night"
  const highlight = useHighlightedToken()
  const table = getTokenTable(id)
  if (!table) throw new Error(`TokenStory: no token table "${id}" in storybook.json`)
  const rows = buildTokenRows(table.name, table.variants, table.preview, isNight, highlight)
  return (
    <>
      <StoryHeader title={table.name} description={table.description} />
      <DataTable columns={table.columns} columnWidths={table.columnWidths} sectionWrapped={table.sectionWrapped} tables={[{ rows }]} />
    </>
  )
}
