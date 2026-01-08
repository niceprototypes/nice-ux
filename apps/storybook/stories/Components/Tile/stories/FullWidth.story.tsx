import Tile from "nice-react-tile"
import Typography from "nice-react-typography"
import Story from "../../../../src/components/Story"

const FullWidthStory = () => (
  <Story
    variables={[
      {
        name: "false",
        description: "fullWidth={false}",
        default: true,
        demo: (
          <Tile>
            <Typography color="medium">Default width</Typography>
          </Tile>
        ),
        code: `<Tile>\n+1{children}\n</Tile>`,
      },
      {
        name: "true",
        description: "fullWidth={true}",
        demo: (
          <Tile fullWidth>
            <Typography color="medium">Full width tile</Typography>
          </Tile>
        ),
        code: `<Tile fullWidth>\n+1{children}\n</Tile>`,
      },
    ]}
  />
)

export default FullWidthStory
