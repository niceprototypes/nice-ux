import * as React from "react"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import DocsPage, { type DocsPageSectionType } from "../DocsPage"
import type { CatalogComponentType, CatalogPropType } from "../../catalog"
import { getColumns } from "@niceprototypes/docs/data"
import { ComponentTokenTable, componentPrefixesWithTokens, type ComponentPrefixWithTokens } from "@niceprototypes/docs/dataTables/components/tokens/Components"
import { buildExampleRows, type ComponentExample } from "@niceprototypes/docs/dataTables/components/demos/Components"
import { componentExamples } from "@niceprototypes/docs/examples"
import { DataTable } from "@niceprototypes/docs/components/DataTable"
import { StoryHeader } from "@niceprototypes/docs/components/Story"
import { StoryHeaderLevel } from "@niceprototypes/docs/components/Story/StoryHeader/StoryHeaderLevel"
import Install from "@niceprototypes/docs/components/Install"
import Code from "@niceprototypes/docs/nice/Code"


/** A facet's live examples: each variant rendered beside its code. */
const ExampleTable = ({ example }: { example: ComponentExample }) => (
  <DataTable {...getColumns("componentExample")} tables={[{ rows: buildExampleRows(example) }]} />
)

/** A heading two levels under the page title (a prop, an example), and its description. */
const SubHeading = ({ title, description }: { title: string; description?: React.ReactNode }) => (
  <Flex direction="column" gap="base">
    <Ink as="h3">{title}</Ink>
    {description ? <Ink>{description}</Ink> : null}
  </Flex>
)

/** One prop: its name, description, type, default, and its live examples when it has some. */
const Prop = ({ prop, example }: { prop: CatalogPropType; example?: ComponentExample }) => (
  <Flex direction="column" gap="base">
    <SubHeading title={prop.name} description={prop.description ?? example?.description} />
    <Code language="tsx" code={prop.type} fit />
    {prop.default !== undefined && (
      <Flex gap="small" alignItems="center">
        <Ink size="small" color="lighter">Default</Ink>
        <Ink size="small" code>{prop.default}</Ink>
      </Flex>
    )}
    {example && <ExampleTable example={example} />}
  </Flex>
)

/** A section heading one level under the page title. */
const SectionHeading = ({ title }: { title: string }) => (
  <StoryHeaderLevel.Provider value="h2">
    <StoryHeader title={title} />
  </StoryHeaderLevel.Provider>
)

/**
 * ComponentPage
 *
 * One component's docs page, from the catalog: the overview (install and import), every prop
 * (its type, default and live examples), the examples that are not one prop, and the component
 * tokens when its prefix has any.
 */
const ComponentPage: React.FC<{ component: CatalogComponentType }> = ({ component }) => {
  const examples = componentExamples[component.name] ?? {}
  const propNames = new Set(component.props.map(prop => prop.name))
  const prefix = `${component.name.charAt(0).toLowerCase()}${component.name.slice(1)}` as ComponentPrefixWithTokens
  const importLine = component.named
    ? `import { ${component.name} } from "${component.package}"`
    : `import ${component.name} from "${component.package}"`

  const sections: DocsPageSectionType[] = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <Flex direction="column" gap="large">
          <StoryHeader title={component.name} />
          <Install package={component.package.replace("@niceprototypes/", "")} />
          <Code language="tsx" code={importLine} />
        </Flex>
      ),
    },
    {
      id: "props",
      label: "Props",
      content: <SectionHeading title="Props" />,
      sections: component.props.map(prop => ({
        id: `prop-${prop.name}`,
        label: prop.name,
        content: <Prop prop={prop} example={examples[prop.name]} />,
      })),
    },
  ]

  const otherExamples = Object.entries(examples).filter(([key]) => !propNames.has(key))
  if (otherExamples.length)
    sections.push({
      id: "examples",
      label: "Examples",
      content: <SectionHeading title="Examples" />,
      sections: otherExamples.map(([key, example]) => ({
        id: `example-${key}`,
        label: example.name,
        content: (
          <Flex direction="column" gap="base">
            <SubHeading title={example.name} description={example.description} />
            <ExampleTable example={example} />
          </Flex>
        ),
      })),
    })

  if (componentPrefixesWithTokens.includes(prefix))
    sections.push({
      id: "tokens",
      label: "Tokens",
      content: (
        <>
          <SectionHeading title="Tokens" />
          <ComponentTokenTable prefix={prefix} />
        </>
      ),
    })

  return <DocsPage sections={sections} />
}

export default ComponentPage
