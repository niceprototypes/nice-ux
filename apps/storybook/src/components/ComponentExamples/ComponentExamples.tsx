import * as React from "react"
import { StoryHeader } from "../Story"
import { DataSection, withCopyAffordance } from "../DataSection"
import { ClickToCopy } from "../ClickToCopy"
import { TokenName } from "../TokenTables"
import type { DataColumn, DataRowItem, DataTable } from "../DataSection"
import type { ComponentExample, ExampleVariant } from "./ComponentExamples.types"

/**
 * Columns for a component-example table — the example / name / React-code subset
 * of the token columns (TOKEN_COLUMNS' preview, tokenName, and jsCall), minus the
 * CSS-var and resolved-value columns that only tokens have. The example (preview)
 * leads, matching the token tables' preview-first order.
 */
export const EXAMPLE_COLUMNS: DataColumn[] = [
  { key: "example", header: null, width: "16em", render: "node" },
  { key: "name", header: "Name", width: "8em", render: "node" },
  { key: "code", header: "React", render: "shiki", language: "tsx" },
]

/** The variant string of an item — the item itself, or its `variant` field. */
export const variantKey = (item: ExampleVariant): string =>
  typeof item === "string" ? item : item.variant

/**
 * Build the data rows for one example facet. Each row's `values` are
 * index-aligned to EXAMPLE_COLUMNS: [example, name, code]. The default variant
 * (config `default`, else `"base"`) gets the check + "Default" flag via
 * `TokenName`, matching the token tables.
 */
export function buildExampleRows(example: ComponentExample): DataRowItem[] {
  const defaultVariant = example.default ?? "base"
  return example.variants.map(item => {
    const variant = variantKey(item)
    return {
      id: variant,
      values: [
        example.preview(item),
        // Name cell copies the variant string on click, with the hover copy icon —
        // the affordance DataSectionCell gives text/shiki cells, applied here since
        // this is a node cell (TokenName carries the "Default" flag).
        withCopyAffordance(
          <ClickToCopy text={variant}>
            <TokenName variant={variant} isDefault={variant === defaultVariant} />
          </ClickToCopy>
        ),
        example.code(item),
      ],
    }
  })
}

/** Build one example facet as a `DataTable` node — its `name` heading and rows. */
export function buildExampleTable(example: ComponentExample): DataTable {
  return { name: example.name, rows: buildExampleRows(example) }
}

/**
 * One example facet as a standalone story — the header, its description, and the
 * facet's table. The component-example analog of `TokenStory`.
 */
export const ComponentExampleStory = ({ example }: { example: ComponentExample }) => (
  <>
    {/* Match the combined Docs width — the code column needs the full container. */}
    <StoryHeader title={example.name} description={example.description} />
    <DataSection columns={EXAMPLE_COLUMNS} tables={[{ rows: buildExampleRows(example) }]} inline />
  </>
)

/**
 * Several example facets as one combined table set — the analog of
 * `TokenTables` / `TokensDocs`. Each facet becomes its own `DataTable` (heading +
 * rows); the array is handed to a single `DataSection`.
 */
export const ComponentExamples = ({ examples }: { examples: ComponentExample[] }) => (
  <DataSection columns={EXAMPLE_COLUMNS} tables={examples.map(buildExampleTable)} inline />
)
