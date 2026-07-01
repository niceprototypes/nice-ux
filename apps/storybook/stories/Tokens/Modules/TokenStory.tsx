import { StoryHeader } from "../../../src/components/Story"
import { DataSection } from "../../../src/components/DataSection"
import {
  TOKEN_COLUMNS,
  buildTokenRows,
  useNiceTheme,
  useHighlightedToken,
} from "../../../src/components/TokenTables"
import { tokenTables } from "./tables"

/**
 * One token group as a standalone story — the story header, its description, and
 * the group's table (column headers, no leading name). Reads the runtime theme +
 * deep-link highlight, builds the rows, and renders a single-section
 * `DataSection`. Driven by the same `tokenTables` config as the Docs page, so a
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
      <DataSection columns={TOKEN_COLUMNS} tables={[{ rows }]} inline />
    </>
  )
}
