import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import Code from "@niceprototypes/code"
import { catalogEntries } from "../../data/catalog"
import { componentExamples } from "../../examples"
import PropDocs from "../PropDocs"
import { StoryHeader } from "../Story"
import { StoryHeaderLevel } from "../Story/StoryHeader/StoryHeaderLevel"

/**
 * SubcomponentDocs
 *
 * A subcomponent (CardHeader on Card) documented as a section of its parent's page: its name,
 * its import, and every prop from the catalog with its live examples.
 */
const SubcomponentDocs = ({ name }: { name: string }) => {
  const entry = catalogEntries.find(candidate => candidate.name === name)
  if (!entry) return null
  const examples = componentExamples[name] ?? {}
  return (
    <Flex direction="column" gap="larger">
      <Flex direction="column" gap="large">
        <StoryHeaderLevel.Provider value="h2">
          <StoryHeader title={name} />
        </StoryHeaderLevel.Provider>
        <Code language="tsx" code={`import { ${name} } from "${entry.package}"`} />
        {entry.props.length === 0 && <Ink>No props of its own.</Ink>}
      </Flex>
      {entry.props.map(prop => (
        <PropDocs key={prop.name} prop={prop} example={examples[prop.name]} />
      ))}
    </Flex>
  )
}

export default SubcomponentDocs
