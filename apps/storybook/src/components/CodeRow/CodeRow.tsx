import * as React from "react"
import Flex from "nice-react-flex"
import { withBreakpoints } from "nice-react-styles"
import Typography from "../../nice/Typography"
import { CodeBlock } from "../CodeBlock"
import { Column, NameWrapper, PreviewWrapper, RowFlex } from "./CodeRow.styles"
import { CodeRowProps } from "./CodeRow.types"

const BaseCodeRow = ({
  previewCell,
  code,
  language = "tsx",
  fullWidth = false,
  inline = false,
  name,
  nameColumn = false,
  columnWidths,
  value,
  fontSize,
  fontWeight,
}: CodeRowProps) => {
  const sourceBlock = (Array.isArray(code) ? code : [code]).map((snippet, index) => (
    <CodeBlock
      key={index}
      code={snippet}
      language={language}
      inline={inline}
    />
  ))

  // Trailing value cell — plain text in the code font via Typography, not a
  // Shiki CodeBlock. Rendered as the last column when `value` is provided.
  const valueCell =
    value != null ? (
      <Typography code size={fontSize} weight={fontWeight}>
        {value}
      </Typography>
    ) : null

  // Leading name cell — reserved for column alignment when the row belongs to
  // a named table; only the first row of that table carries the text.
  const nameCell = nameColumn ? (
    <NameWrapper>{name ? <Typography weight="bold">{name}</Typography> : null}</NameWrapper>
  ) : null

  // Columns laid out inside the row Flex, left-to-right. In fullWidth mode the
  // preview is hoisted out (below) and so is not a row column.
  const rowColumns: React.ReactNode[] = [
    ...(nameColumn ? [nameCell] : []),
    ...(fullWidth ? [] : [<PreviewWrapper key="preview"><Flex>{previewCell}</Flex></PreviewWrapper>]),
    ...sourceBlock,
    ...(valueCell ? [valueCell] : []),
  ]

  // Each column is wrapped so a columnWidths entry (when present) can pin its
  // width; null/missing entries and extra entries fall through to equal-flex.
  const rowFlex = (
    <RowFlex
      direction="column"
      gap="large"
      breakpoints={{
        "tablet+": {
          direction: "row",
          alignItems: "center",
        },
      }}
    >
      {rowColumns.map((column, index) => (
        <Column
          key={index}
          $width={columnWidths?.[index] ?? undefined}
        >
          {column}
        </Column>
      ))}
    </RowFlex>
  )

  if (fullWidth) {
    return (
      <>
        <PreviewWrapper $fullWidth>
          <Flex>{previewCell}</Flex>
        </PreviewWrapper>
        {rowFlex}
      </>
    )
  }

  return rowFlex
}

export const CodeRow = withBreakpoints<CodeRowProps>(BaseCodeRow)
