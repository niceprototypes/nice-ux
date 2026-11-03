import * as React from "react"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import Code from "@niceprototypes/code"
import { getColumns } from "../../data"
import type { CatalogPropType } from "../../data/catalog"
import { buildExampleRows, type ComponentExample } from "../../dataTables/components/demos/Components"
import { DataTable } from "../DataTable"

/** A facet's live examples: each variant rendered beside its code. */
export const ExampleTable = ({ example }: { example: ComponentExample }) => (
  <DataTable {...getColumns("componentExample")} tables={[{ rows: buildExampleRows(example) }]} />
)

/** A heading two levels under the page title (a prop, an example), and its description. */
export const SubHeading = ({ title, description }: { title: string; description?: React.ReactNode }) => (
  <Flex direction="column" gap="base">
    <Ink as="h3">{title}</Ink>
    {description ? <Ink>{description}</Ink> : null}
  </Flex>
)

/**
 * PropDocs
 *
 * One prop, from the catalog: its name, description, type and default as inline code, and its
 * live examples when it has some.
 */
const PropDocs = ({ prop, example }: { prop: CatalogPropType; example?: ComponentExample }) => (
  <Flex direction="column" gap="base">
    <SubHeading title={prop.name} description={prop.description ?? example?.description} />
    <Flex gap="small" alignItems="center" wrap="wrap">
      <Ink size="small" color="lighter">Type</Ink>
      <Code language="tsx" code={prop.type} inlined margin="none" />
      {prop.default !== undefined && (
        <>
          <Ink size="small" color="lighter">Default</Ink>
          <Code language="tsx" code={prop.default} inlined margin="none" />
        </>
      )}
    </Flex>
    {example && <ExampleTable example={example} />}
  </Flex>
)

export default PropDocs
