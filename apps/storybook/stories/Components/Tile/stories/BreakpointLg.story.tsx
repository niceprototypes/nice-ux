import Tile from "nice-react-tile"
import Typography from "nice-react-typography"
import Story from "../../../../src/components/Story"

const BreakpointLgStory = () => (
  <Story
    variables={[
      {
        name: "1200",
        description: "breakpointLg={1200}",
        demo: (
          <Tile breakpointLg={1200} spacing="base">
            <Typography color="medium">
              Content constrained to 1200px max-width
            </Typography>
          </Tile>
        ),
        code: `<Tile breakpointLg={1200}>\n+1{children}\n</Tile>`,
      },
    ]}
  />
)

export default BreakpointLgStory
