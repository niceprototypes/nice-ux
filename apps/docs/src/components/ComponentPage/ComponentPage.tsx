import * as React from "react"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import DocsPage, { type DocsPageSectionType } from "../DocsPage"
import Playground from "../Playground"
import { hasPlayground } from "../Playground/Playground.controls"
import { subcomponentsOf, type CatalogComponentType } from "../../catalog"
import PropDocs, { SubHeading } from "@niceprototypes/docs/components/PropDocs"
import ExampleBlocks from "@niceprototypes/docs/components/ExampleBlocks"
import { ComponentTokenTable, componentPrefixesWithTokens, type ComponentPrefixWithTokens } from "@niceprototypes/docs/dataTables/components/tokens/Components"
import { componentExamples } from "@niceprototypes/docs/examples"
import { StoryHeader } from "@niceprototypes/docs/components/Story"
import { StoryHeaderLevel } from "@niceprototypes/docs/components/Story/StoryHeader/StoryHeaderLevel"
import Install from "@niceprototypes/docs/components/Install"
import Code from "@niceprototypes/docs/nice/Code"


/** A section heading one level under the page title. */
const SectionHeading = ({ title }: { title: string }) => (
  <StoryHeaderLevel.Provider value="h2">
    <StoryHeader title={title} />
  </StoryHeaderLevel.Provider>
)

/**
 * ComponentPage
 *
 * One component's docs page, from the catalog: the overview (install and import), a playground
 * (when the props allow one), every prop (its type, default and live examples), a section per
 * subcomponent with its props, the examples that are not one prop, and the component tokens
 * when its prefix has any.
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
    ...(hasPlayground(component)
      ? [
          {
            id: "playground",
            label: "Playground",
            content: (
              <>
                <SectionHeading title="Playground" />
                <Playground component={component} />
              </>
            ),
          },
        ]
      : []),
    {
      id: "props",
      label: "Props",
      content: <SectionHeading title="Props" />,
      sections: component.props.map(prop => ({
        id: `prop-${prop.name}`,
        label: prop.name,
        content: <PropDocs prop={prop} example={examples[prop.name]} />,
      })),
    },
    // Each subcomponent (CardHeader on Card) as a section: its import, then its props.
    ...subcomponentsOf(component.name).map(sub => {
      const subExamples = componentExamples[sub.name] ?? {}
      const anchor = sub.name.toLowerCase()
      return {
        id: anchor,
        label: sub.name,
        content: (
          <Flex direction="column" gap="large">
            <SectionHeading title={sub.name} />
            <Code language="tsx" code={`import { ${sub.name} } from "${sub.package}"`} />
            {sub.props.length === 0 && <Ink>No props of its own.</Ink>}
          </Flex>
        ),
        sections: sub.props.map(prop => ({
          id: `${anchor}-prop-${prop.name}`,
          label: prop.name,
          content: <PropDocs prop={prop} example={subExamples[prop.name]} />,
        })),
      }
    }),
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
            <ExampleBlocks example={example} />
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
