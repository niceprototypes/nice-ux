// GridItem example configs — one ComponentExample per facet, shaped like Toggle's. ComponentDocs renders
// each entry as a section of the GridItem docs page, sorted by name.
import { Grid, GridItem } from "@niceprototypes/grid"
import { Card } from "@niceprototypes/card"
import { Fill } from "../Card/Fill"
import type { ComponentExample } from "../../dataTables/components/demos/Components"

/** One visible grid cell. */
const Cell = ({ label }: { label: number }) => (
  <Card variant="filled">{label}</Card>
)

/** JSX for a filled cell card. */
const cellCode = (label: number) => `<Card variant="filled">${label}</Card>`

export const gridItemColSpan = {
  name: "colSpan",
  description: "Column tracks the item spans, or \"full\" for the whole row. Item 1 in a three-column Grid.",
  variants: ["1", "2", "full"],
  default: "1",
  preview: variant => (
    <Fill>
      <Grid columns={3}>
        <GridItem colSpan={variant === "full" ? "full" : Number(variant)}>
          <Cell label={1} />
        </GridItem>
        <GridItem>
          <Cell label={2} />
        </GridItem>
        <GridItem>
          <Cell label={3} />
        </GridItem>
      </Grid>
    </Fill>
  ),
  code: variant =>
    `<Grid columns={3}>\n  <GridItem${variant === "1" ? "" : variant === "full" ? ` colSpan="full"` : ` colSpan={${variant}}`}>\n    ${cellCode(1)}\n  </GridItem>\n  <GridItem>\n    ${cellCode(2)}\n  </GridItem>\n  <GridItem>\n    ${cellCode(3)}\n  </GridItem>\n</Grid>`,
} satisfies ComponentExample

export const gridItemRowSpan = {
  name: "rowSpan",
  description: "Row tracks the item spans. Item 1 in a two-column Grid: at 2 it takes both rows of the first column, so item 3 moves beside it.",
  variants: ["1", "2"],
  default: "1",
  preview: variant => (
    <Fill>
      <Grid columns={2}>
        <GridItem rowSpan={Number(variant)}>
          <Cell label={1} />
        </GridItem>
        <GridItem>
          <Cell label={2} />
        </GridItem>
        <GridItem>
          <Cell label={3} />
        </GridItem>
      </Grid>
    </Fill>
  ),
  code: variant =>
    `<Grid columns={2}>\n  <GridItem${variant === "1" ? "" : ` rowSpan={${variant}}`}>\n    ${cellCode(1)}\n  </GridItem>\n  <GridItem>\n    ${cellCode(2)}\n  </GridItem>\n  <GridItem>\n    ${cellCode(3)}\n  </GridItem>\n</Grid>`,
} satisfies ComponentExample

export const gridItemAs = {
  name: "as",
  description: "HTML element to render: \"li\" inside a Grid as=\"ul\".",
  variants: ["div", "li"],
  default: "div",
  preview: variant => (
    <Fill>
      <Grid
        as={variant === "li" ? "ul" : "div"}
        columns={2}
      >
        {[1, 2].map(label => (
          <GridItem
            key={label}
            as={variant}
          >
            <Cell label={label} />
          </GridItem>
        ))}
      </Grid>
    </Fill>
  ),
  code: variant =>
    `<Grid${variant === "li" ? ` as="ul"` : ""} columns={2}>\n${[1, 2]
      .map(label => `  <GridItem${variant === "li" ? ` as="li"` : ""}>\n    ${cellCode(label)}\n  </GridItem>`)
      .join("\n")}\n</Grid>`,
} satisfies ComponentExample

export const gridItemChildren = {
  name: "children",
  description: "The item's content.",
  variants: ["Card"],
  default: "Card",
  preview: () => (
    <Fill>
      <Grid columns={2}>
        <GridItem>
          <Cell label={1} />
        </GridItem>
      </Grid>
    </Fill>
  ),
  code: () => `<Grid columns={2}>\n  <GridItem>\n    ${cellCode(1)}\n  </GridItem>\n</Grid>`,
} satisfies ComponentExample

/** Every GridItem example facet — each one a section of the GridItem docs page. */
export const gridItemExamples = {
  colSpan: gridItemColSpan,
  rowSpan: gridItemRowSpan,
  as: gridItemAs,
  children: gridItemChildren,
} satisfies Record<string, ComponentExample>
