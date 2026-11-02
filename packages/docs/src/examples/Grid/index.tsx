// Grid example configs — one ComponentExample per facet, shaped like Toggle's. ComponentDocs renders each
// entry as a section of the Grid docs page, sorted by name.
import type { ReactNode } from "react"
import { Grid, GridItem } from "@niceprototypes/grid"
import { Card } from "@niceprototypes/card"
import { getToken } from "@niceprototypes/styles"
import { Fill } from "../Card/Fill"
import type { ComponentExample } from "../../dataTables/components/demos/Components"

/** One visible grid cell. */
const Cell = ({ label, tall }: { label: number; tall?: boolean }) => (
  <Card
    variant="filled"
    padding={tall ? "larger base" : undefined}
  >
    {label}
  </Card>
)

/** `count` cells; the first is tall when `tallFirst` is set. */
const cells = (count: number, tallFirst = false) =>
  Array.from({ length: count }, (_, index) => (
    <Cell
      key={index}
      label={index + 1}
      tall={tallFirst && index === 0}
    />
  ))

/** JSX lines for `count` cells, indented under the grid. */
const cellsCode = (count: number, tallFirst = false) =>
  Array.from(
    { length: count },
    (_, index) => `  <Card variant="filled"${tallFirst && index === 0 ? ` padding="larger base"` : ""}>${index + 1}</Card>`,
  ).join("\n")

/** `<Grid …>` with `count` cells. */
const gridCode = (props: string, count: number, tallFirst = false) =>
  `<Grid${props}>\n${cellsCode(count, tallFirst)}\n</Grid>`

/** An outline frame around the grid, so padding and margin show. */
const Frame = ({ children }: { children: ReactNode }) => (
  <Fill>
    <Card padding="none">{children}</Card>
  </Fill>
)

export const gridChildren = {
  name: "children",
  description: "The grid's items: GridItems, or any elements, each taking one cell in DOM order.",
  variants: ["elements", "GridItem"],
  default: "elements",
  preview: variant => (
    <Fill>
      {variant === "elements" ? (
        <Grid columns={3}>{cells(3)}</Grid>
      ) : (
        <Grid columns={3}>
          <GridItem colSpan={2}>
            <Cell label={1} />
          </GridItem>
          <GridItem>
            <Cell label={2} />
          </GridItem>
        </Grid>
      )}
    </Fill>
  ),
  code: variant =>
    variant === "elements"
      ? gridCode(" columns={3}", 3)
      : `<Grid columns={3}>\n  <GridItem colSpan={2}>\n    <Card variant="filled">1</Card>\n  </GridItem>\n  <GridItem>\n    <Card variant="filled">2</Card>\n  </GridItem>\n</Grid>`,
} satisfies ComponentExample

export const gridColumns = {
  name: "columns",
  description: "Number of equal column tracks. Ignored when minChildWidth is set.",
  variants: ["1", "2", "3", "4"],
  default: "1",
  preview: variant => (
    <Fill>
      <Grid columns={Number(variant)}>{cells(4)}</Grid>
    </Fill>
  ),
  code: variant => gridCode(variant === "1" ? "" : ` columns={${variant}}`, 4),
} satisfies ComponentExample

export const gridMinChildWidth = {
  name: "minChildWidth",
  description:
    "Minimum item width: the grid fills the row with as many columns of at least this width as fit, overriding columns. Pass a token value.",
  variants: ["unset", "small", "base", "larger"],
  default: "unset",
  preview: variant => (
    <Fill>
      <Grid minChildWidth={variant === "unset" ? undefined : getToken("size", variant)}>{cells(6)}</Grid>
    </Fill>
  ),
  code: variant => gridCode(variant === "unset" ? "" : ` minChildWidth={getToken("size", "${variant}")}`, 6),
} satisfies ComponentExample

export const gridRows = {
  name: "rows",
  description: "Number of equal row tracks. Unset, each row sizes to its content.",
  variants: ["unset", "2"],
  default: "unset",
  preview: variant => (
    <Fill>
      <Grid
        columns={2}
        rows={variant === "unset" ? undefined : Number(variant)}
      >
        {cells(4, true)}
      </Grid>
    </Fill>
  ),
  code: variant => gridCode(` columns={2}${variant === "unset" ? "" : ` rows={${variant}}`}`, 4, true),
} satisfies ComponentExample

export const gridGap = {
  name: "gap",
  description: "Space between rows and columns, from the gap tokens.",
  variants: ["none", "smaller", "small", "base", "large", "larger"],
  default: "base",
  preview: variant => (
    <Fill>
      <Grid
        columns={3}
        gap={variant}
      >
        {cells(6)}
      </Grid>
    </Fill>
  ),
  code: variant => gridCode(` columns={3}${variant === "base" ? "" : ` gap="${variant}"`}`, 6),
} satisfies ComponentExample

export const gridAlignItems = {
  name: "alignItems",
  description: "Block-axis alignment of items within their cells. Cell 1 is taller than the rest of its row.",
  variants: ["start", "end", "center", "baseline", "stretch"],
  default: "stretch",
  preview: variant => (
    <Fill>
      <Grid
        columns={3}
        alignItems={variant}
      >
        {cells(3, true)}
      </Grid>
    </Fill>
  ),
  code: variant => gridCode(` columns={3}${variant === "stretch" ? "" : ` alignItems="${variant}"`}`, 3, true),
} satisfies ComponentExample

export const gridAs = {
  name: "as",
  description: "HTML element to render. Use \"ul\" with GridItem as=\"li\" for a list of cards.",
  variants: ["div", "ul"],
  default: "div",
  preview: variant => (
    <Fill>
      {variant === "div" ? (
        <Grid columns={3}>{cells(3)}</Grid>
      ) : (
        <Grid
          as="ul"
          columns={3}
        >
          {[1, 2, 3].map(label => (
            <GridItem
              key={label}
              as="li"
            >
              <Cell label={label} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Fill>
  ),
  code: variant =>
    variant === "div"
      ? gridCode(" columns={3}", 3)
      : `<Grid as="ul" columns={3}>\n${[1, 2, 3]
          .map(label => `  <GridItem as="li">\n    <Card variant="filled">${label}</Card>\n  </GridItem>`)
          .join("\n")}\n</Grid>`,
} satisfies ComponentExample

export const gridPadding = {
  name: "padding",
  description: "Internal padding as a shorthand of 1–4 gap tokens. Each preview is framed so the padding shows.",
  variants: ["unset", "small", "large", "small large"],
  default: "unset",
  preview: variant => (
    <Frame>
      <Grid
        columns={3}
        padding={variant === "unset" ? undefined : variant}
      >
        {cells(3)}
      </Grid>
    </Frame>
  ),
  code: variant => gridCode(` columns={3}${variant === "unset" ? "" : ` padding="${variant}"`}`, 3),
} satisfies ComponentExample

export const gridMargin = {
  name: "margin",
  description: "External margin as a shorthand of 1–4 gap tokens. Each preview is framed so the margin shows.",
  variants: ["unset", "small", "large", "small large"],
  default: "unset",
  preview: variant => (
    <Frame>
      <Grid
        columns={3}
        margin={variant === "unset" ? undefined : variant}
      >
        {cells(3)}
      </Grid>
    </Frame>
  ),
  code: variant => gridCode(` columns={3}${variant === "unset" ? "" : ` margin="${variant}"`}`, 3),
} satisfies ComponentExample

export const gridFit = {
  name: "fit",
  description: "Shrinks the grid to its content width instead of filling its container.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <Frame>
      <Grid
        columns={3}
        fit={variant === "true"}
      >
        {cells(3)}
      </Grid>
    </Frame>
  ),
  code: variant => gridCode(` columns={3}${variant === "true" ? " fit" : ""}`, 3),
} satisfies ComponentExample

/** Every Grid example facet — each one a section of the Grid docs page. */
export const gridExamples = {
  children: gridChildren,
  columns: gridColumns,
  minChildWidth: gridMinChildWidth,
  rows: gridRows,
  gap: gridGap,
  alignItems: gridAlignItems,
  as: gridAs,
  padding: gridPadding,
  margin: gridMargin,
  fit: gridFit,
} satisfies Record<string, ComponentExample>
