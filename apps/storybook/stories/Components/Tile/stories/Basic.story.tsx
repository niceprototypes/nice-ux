import Tile from "nice-react-tile"
import Story from "../../../../src/components/Story"
import { SampleContent } from "../Tile.services"

const BasicStory = () => (
  <Story
    variables={[
      {
        name: "",
        demo: (
          <Tile>
            <SampleContent />
          </Tile>
        ),
        code: `<Tile>\n+1{children}\n</Tile>`,
      },
    ]}
  />
)

export default BasicStory
