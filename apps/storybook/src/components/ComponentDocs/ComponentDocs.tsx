import * as React from "react"
import Contents from "@niceprototypes/contents"
import type { ContentsItemsType } from "@niceprototypes/contents"
import Flex from "@niceprototypes/flex"
import { StoryHeader } from "../Story"
import { StoryHeaderLevel } from "../Story/StoryHeader/StoryHeaderLevel"
import { ComponentExampleStory } from "../../dataTables/components/demos/Components"
import { ComponentTokenTable, componentPrefixesWithTokens } from "../../dataTables/components/tokens/Components"
import type { ComponentPrefixWithTokens } from "../../dataTables/components/tokens/Components"
import { StyledAside, StyledMain, StyledSection } from "./ComponentDocs.styles"
import type { ComponentDocsProps } from "./ComponentDocs.types"

/** A section's anchor id: its label, lower-cased, with runs of other characters as one dash. */
const toId = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

type Section = { id: string; label: string; content: React.ReactNode }

/**
 * One component's docs page: the intro (Docs), the component tokens (Tokens, when the
 * component's prefix has any) and one section per prop or facet, with Contents listing
 * them in a sticky column on the right. The facet sections come from data, not a list:
 * every entry of `examples` (its table, labelled by `name`) and every `*.section.mdx` in
 * the component's folder (labelled by its `label` export), sorted by label.
 */
const ComponentDocs: React.FC<ComponentDocsProps> = ({ component, examples = {}, sections = {}, children }) => {
  const prefix = (component.charAt(0).toLowerCase() + component.slice(1)) as ComponentPrefixWithTokens

  const facets = [
    // Storybook's react-docgen can stamp `displayName` and `__docgenInfo` onto an examples
    // map it mistakes for a component; only entries with variants are examples.
    ...Object.values(examples)
      .filter(example => typeof example === "object" && Array.isArray(example.variants))
      .map(example => ({
        label: example.name,
        content: <ComponentExampleStory example={example} />,
      })),
    ...Object.values(sections).map(({ default: Content, label }) => ({ label, content: <Content /> })),
  ].sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }))

  const all: Section[] = [
    { id: "docs", label: "Docs", content: children },
    ...(componentPrefixesWithTokens.includes(prefix)
      ? [
          {
            id: "tokens",
            label: "Tokens",
            content: (
              <StoryHeaderLevel.Provider value="h2">
                <StoryHeader
                  title="Tokens"
                  description={`Component-level tokens for ${component} — which are initialized to core tokens and which are literal string values.`}
                />
                <ComponentTokenTable prefix={prefix} />
              </StoryHeaderLevel.Provider>
            ),
          },
        ]
      : []),
    ...facets.map(facet => ({
      id: toId(facet.label),
      label: facet.label,
      content: <StoryHeaderLevel.Provider value="h2">{facet.content}</StoryHeaderLevel.Provider>,
    })),
  ]

  const items: ContentsItemsType = all.map(({ id, label }) => ({ id, label }))

  return (
    <Flex gap="larger">
      <StyledMain>
        <Flex direction="column" gap="larger">
          {all.map(section => (
            <StyledSection key={section.id} id={section.id}>
              <Flex direction="column" gap="larger">
                {section.content}
              </Flex>
            </StyledSection>
          ))}
        </Flex>
      </StyledMain>
      {/* sb-unstyled: Storybook's docs typography (list bullets, link colour) stays out of Contents */}
      <StyledAside className="sb-unstyled">
        <Contents items={items} />
      </StyledAside>
    </Flex>
  )
}

export default ComponentDocs
