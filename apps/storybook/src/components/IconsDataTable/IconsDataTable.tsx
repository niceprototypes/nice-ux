import Icon, { iconNames } from "nice-react-icon"
import Flex from "nice-react-flex"
import { CodeBlock } from "../CodeBlock"
import { DataSection } from "../DataSection"
import type { DataColumn } from "../DataSection"
import type { IconsDataTableProps } from "./IconsDataTable.types"

/**
 * The icon reference table, data-first. One row per name in `iconNames`: a first
 * cell pairing the rendered Icon with its name (a flush, click-to-copy code
 * chip), then the code snippet `code(name)` rendered as a Shiki block. The table
 * owns structure (columns, headers, layout); the caller supplies the code
 * column's header and snippet builder.
 */
export const IconsDataTable = ({ codeHeader, code, codeWidth = "20em" }: IconsDataTableProps) => {
  const columns: DataColumn[] = [
    { key: "name", header: "Name", width: "16em", render: "node" },
    { key: "code", header: codeHeader, width: codeWidth, render: "shiki", language: "tsx" },
  ]

  const rows = iconNames.map(name => ({
    id: name,
    values: [
      <Flex direction="row" alignItems="center" gap="base">
        <Icon strokeScaling name={name} size="large" />
        {/* Clickable code chip — copies the icon name, matching the code column. */}
        <CodeBlock code={name} language="tsx" inline />
      </Flex>,
      code(name),
    ],
  }))

  return <DataSection columns={columns} tables={[{ rows }]} inline />
}
