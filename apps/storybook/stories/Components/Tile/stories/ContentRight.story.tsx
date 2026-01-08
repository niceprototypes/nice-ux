import Tile from "nice-react-tile"
import Story from "../../../../src/components/Story"
import { SampleContent, SideContent } from "../Tile.services"

const ContentRightStory = () => (
  <Story
    variables={[
      {
        name: "with right content",
        description: "contentRight={...}",
        demo: (
          <Tile contentRight={<SideContent label="Right" />} spacing="base">
            <SampleContent />
          </Tile>
        ),
        code: `<Tile contentRight={node}>\n+1{children}\n</Tile>`,
      },
    ]}
  />
)

export default ContentRightStory
