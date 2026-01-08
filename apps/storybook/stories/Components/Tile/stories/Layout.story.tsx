import Tile from "nice-react-tile"
import Story from "../../../../src/components/Story"
import { SampleContent, SideContent } from "../Tile.services"

const LayoutStory = () => (
  <Story
    variables={[
      {
        name: "with both sides",
        description: "contentLeft + contentRight",
        demo: (
          <Tile
            contentLeft={<SideContent label="Left" />}
            contentRight={<SideContent label="Right" />}
            spacing="base"
          >
            <SampleContent />
          </Tile>
        ),
        code: `<Tile\n+1contentLeft={left}\n+1contentRight={right}\n>\n+1{children}\n</Tile>`,
      },
    ]}
  />
)

export default LayoutStory
