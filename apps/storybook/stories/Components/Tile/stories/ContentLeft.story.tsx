import Tile from "nice-react-tile"
import Story from "../../../../src/components/Story"
import { SampleContent, SideContent } from "../Tile.services"

const ContentLeftStory = () => (
  <Story
    variables={[
      {
        name: "with left content",
        description: "contentLeft={...}",
        demo: (
          <Tile contentLeft={<SideContent label="Left" />} spacing="base">
            <SampleContent />
          </Tile>
        ),
        code: `<Tile contentLeft={node}>\n+1{children}\n</Tile>`,
      },
    ]}
  />
)

export default ContentLeftStory
