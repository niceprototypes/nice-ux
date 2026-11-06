import styled from "styled-components"
import Flex from "@niceprototypes/flex"
import { StoryHeader } from "@niceprototypes/docs/components/Story"
import { getToken } from "@niceprototypes/docs/nice/tokens"
import { DataTable } from "@niceprototypes/docs/components/DataTable"
import { getTokenTable } from "@niceprototypes/docs/data"
import {
  buildTokenRows,
  useNiceTheme,
  useHighlightedToken,
} from "@niceprototypes/docs/dataTables/components/tokens/Modules"

/** The page column: `docs.columnWidth`, centred in the docs flex column, as on the component docs pages. */
const StyledColumn = styled.div`
  align-self: center;
  width: 100%;
  max-width: ${getToken("docs", "columnWidth")};
`

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
  const rows = buildTokenRows(table, isNight, highlight)
  return (
    <StyledColumn className="sb-unstyled">
      <Flex direction="column" gap="larger">
        <StoryHeader title={table.name} description={table.description} />
        <DataTable columns={table.columns} columnWidths={table.columnWidths} sectionWrapped={table.sectionWrapped} tables={[{ rows }]} />
      </Flex>
    </StyledColumn>
  )
}
