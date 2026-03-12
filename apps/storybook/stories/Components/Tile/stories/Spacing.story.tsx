import Tile from "nice-react-tile"
import { getToken } from "nice-react-styles"
import Story from "../../../../src/components/Story"
import { SampleContent } from "../Tile.services"

const SpacingStory = () => (
  <Story
    variables={["smaller", "small", "base", "large", "larger"].map(value => ({
      name: value,
      description: `spacing="${value}"`,
      value: getToken("gap", value).value,
      demo: (
        <Tile
          spacing={value as "smaller" | "small" | "base" | "large" | "larger"}
        >
          <SampleContent />
        </Tile>
      ),
      code: `<Tile spacing="${value}">\n+1{children}\n</Tile>`,
    }))}
  />
)

export default SpacingStory
