import Icon, { iconNames } from "nice-react-icon"
import Flex from "nice-react-flex"
import { CodeBlock } from "../CodeBlock"
import { CodeRow } from "../CodeRow"
import { CodeTable } from "../CodeTable"
import { IconsCodeTableProps } from "./IconsCodeTable.types"

/**
 * The icon reference table. Renders one row per name in `iconNames`: a first
 * cell pairing the rendered Icon with its name in a Flex, then a single code
 * cell built by `code`. The table owns the structure (preview, name, headers,
 * layout); the caller supplies only the code column's header and snippet.
 */
export const IconsCodeTable = ({ codeHeader, code, codeWidth = "20em" }: IconsCodeTableProps) => (
  <CodeTable
    fontSize="small"
    columnWidths={["16em", codeWidth]}
    columnHeaders={["Name", "JS"]}
  >
    {iconNames.map((name) => (
      <CodeRow
        key={name}
        inline
        language="tsx"
        cells={[
          <Flex direction="row" alignItems="center" gap="small">
            <Icon strokeScaling name={name} size="large" />
            {/* Clickable code chip — copies the icon name to the clipboard, matching the JS code column. */}
            <CodeBlock code={name} language="tsx" inline />
          </Flex>,
          code(name),
        ]}
        columns={[null, { shiki: true }]}
      />
    ))}
  </CodeTable>
)