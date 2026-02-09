import Tile from "nice-react-tile"
import Story from "../../../../src/components/Story"

const DescriptionStory = () => (
  <Story
    variables={[
      {
        name: "description",
        description: 'description="..."',
        demo: (
          <Tile
            title="Section Title"
            description="A brief description of this section."
          >
            Description content
          </Tile>
        ),
        code: `<Tile\n+1title="Section Title"\n+1description="A brief description of this section."\n>\n+1{children}\n</Tile>`,
      },
      {
        name: "headerAlign",
        description: 'headerAlign="left"',
        demo: (
          <Tile
            title="Section Title"
            description="A brief description of this section."
            headerAlign="left"
          >
            Description content
          </Tile>
        ),
        code: `<Tile\n+1title="Section Title"\n+1description="..."\n+1headerAlign="left"\n>\n+1{children}\n</Tile>`,
      },
      {
        name: "headerColor",
        description: 'headerColor="..."',
        demo: (
          <Tile
            title="Section Title"
            description="A brief description of this section."
            headerColor="coral"
          >
            Children content goes here.
          </Tile>
        ),
        code: `<Tile\n+1title="Section Title"\n+1description="..."\n+1headerColor="coral"\n>\n+1{children}\n</Tile>`,
      },
    ]}
  />
)

export default DescriptionStory