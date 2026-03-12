import Tile from "nice-react-tile"
import Typography from "nice-react-typography"
import Story from "../../../../src/components/Story"

const MaxWidthDesktopStory = () => (
  <Story
    variables={[
      {
        name: "1200",
        description: "maxWidthDesktop={1200}",
        demo: (
          <Tile maxWidthDesktop={1200} spacing="base">
            <Typography color="light">
              Content constrained to 1200px max-width
            </Typography>
          </Tile>
        ),
        code: `<Tile maxWidthDesktop={1200}>\n+1{children}\n</Tile>`,
      },
    ]}
  />
)

export default MaxWidthDesktopStory
