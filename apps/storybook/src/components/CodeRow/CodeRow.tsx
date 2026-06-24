import * as React from "react"
import Flex from "nice-react-flex"
import { withBreakpoints } from "nice-react-styles"
import Typography from "../../nice/Typography"
import { CodeBlock } from "../CodeBlock"
import { NameWrapper, PreviewWrapper, TokenVarAnchor } from "./CodeRow.styles"
import { Column, RowFlex } from "../CodeGrid"
import { ClickToCopy } from "../ClickToCopy"
import { CodeRowProps, CodeColumn } from "./CodeRow.types"
import { parseTokenVarLink, HIGHLIGHT_KEY } from "../../services/tokenVarLink"
import type { ColorType, FontSizeType } from "nice-react-styles"

// Apply a column's text options (`code` font, `size`, `color`) to a non-shiki
// cell: a Typography/element receives them via clone; a plain value is wrapped
// in a styled Typography. Returns the node untouched when no option is set.
const applyTextOptions = (node: React.ReactNode, column?: CodeColumn | null): React.ReactNode => {
  if (!column || (!column.code && column.size == null && column.color == null)) return node
  const props: { code?: boolean; size?: FontSizeType; color?: ColorType } = {}
  if (column.code) props.code = true
  if (column.size != null) props.size = column.size
  if (column.color != null) props.color = column.color
  return React.isValidElement(node)
    ? React.cloneElement(node as React.ReactElement<typeof props>, props)
    : <Typography {...props}>{node}</Typography>
}

const BaseCodeRow = ({
  cells,
  columns = [],
  language = "tsx",
  fullWidth = false,
  inline = false,
  name,
  nameColumn = false,
  columnWidths,
  highlighted = false,
}: CodeRowProps) => {
  // A cell renders as a CodeBlock when its column opts into `shiki`, otherwise
  // it's an arbitrary node laid out in a Flex (matching the old preview cell),
  // optionally styled via the column's text options.
  const renderCell = (cell: React.ReactNode, index: number): React.ReactNode => {
    const column = columns[index]
    if (!column?.shiki) {
      const styled = applyTextOptions(cell, column)
      // `clickToCopy` applies to string cells only — shiki cells already copy.
      const content =
        column?.clickToCopy && typeof cell === "string"
          ? <ClickToCopy text={cell}>{styled}</ClickToCopy>
          : styled
      return <Flex>{content}</Flex>
    }

    const code = String(cell)
    // A code cell that is a module-token root var becomes a deep link to that
    // token's Modules story. Disable the copy-on-click so the anchor navigates;
    // stash the highlight key in sessionStorage since Storybook rebuilds the
    // docs iframe URL from the story id and drops the query param on the way.
    const link = parseTokenVarLink(code)
    if (link) {
      return (
        <TokenVarAnchor
          href={link.href}
          target="_top"
          onClick={() => {
            try {
              sessionStorage.setItem(HIGHLIGHT_KEY, link.token)
            } catch {
              /* sessionStorage unavailable — fall back to the URL param */
            }
          }}
        >
          <CodeBlock code={code} language={language} inline={inline} copyOnClick={false} />
        </TokenVarAnchor>
      )
    }

    return <CodeBlock code={code} language={language} inline={inline} />
  }

  // Leading name cell — reserved for column alignment when the row belongs to
  // a named table; only the first row of that table carries the text.
  const nameCell = nameColumn ? (
    <NameWrapper>{name ? <Typography code size="small" weight="semibold">{name}</Typography> : null}</NameWrapper>
  ) : null

  // Wrap a cell so a columnWidths entry (when present) can pin its width;
  // null/missing entries and extras fall through to equal-flex.
  const renderColumn = (content: React.ReactNode, widthIndex: number, key: React.Key) => (
    <Column key={key} $width={columnWidths?.[widthIndex] ?? undefined}>
      {content}
    </Column>
  )

  // The leading label occupies column 0 in a named row, so the data cells start
  // at columnWidths index 1. In fullWidth mode the first cell is hoisted out
  // (above) and is not a row column.
  const columnOffset = nameColumn ? 1 : 0
  const rowCells = cells.map((cell, index) => ({ cell, index })).filter(({ index }) => !(fullWidth && index === 0))

  // One flat row holding every cell. A named (sub)table row leads with the label
  // column — its text rendered only on the first row (CodeTable sets `name`
  // there alone), an empty cell on the rest so the columns still line up.
  const row = (
    <RowFlex
      $highlighted={highlighted}
      direction="column"
      gap="large"
      breakpoints={{
        "tablet+": {
          direction: "row",
          alignItems: "center",
        },
      }}
    >
      {nameColumn ? renderColumn(nameCell, 0, "name") : null}
      {rowCells.map(({ cell, index }, position) =>
        renderColumn(renderCell(cell, index), (fullWidth ? position : index) + columnOffset, index)
      )}
    </RowFlex>
  )

  if (fullWidth) {
    return (
      <>
        <PreviewWrapper $fullWidth>
          <Flex>{cells[0]}</Flex>
        </PreviewWrapper>
        {row}
      </>
    )
  }

  return row
}

export const CodeRow = withBreakpoints<CodeRowProps>(BaseCodeRow)