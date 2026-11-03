import { StoryHeader } from "../../../../components/Story"
import ExampleBlocks from "../../../../components/ExampleBlocks"
import type { ComponentExample } from "./Components.types"

/**
 * One example facet as a standalone story — the header, its description, and the facet's live
 * examples (ExampleBlocks). The component-example analog of `TokenStory`.
 */
export const ComponentExampleStory = ({ example }: { example: ComponentExample }) => (
  <>
    <StoryHeader title={example.name} description={example.description} />
    <ExampleBlocks example={example} />
  </>
)
