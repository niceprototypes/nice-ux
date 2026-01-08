import Tile from "nice-react-tile"
import Story from "../../../../src/components/Story"
import { SampleContent } from "../Tile.services"

const BackgroundColorStory = () => (
  <Story
    variables={[
      {
        name: "custom color",
        description: 'backgroundColor="..."',
        demo: (
          <Tile>
            <SampleContent />
          </Tile>
        ),
        code: `<Tile backgroundColor={color}>\n+1{children}\n</Tile>`,
      },
    ]}
  />
)

export default BackgroundColorStory
