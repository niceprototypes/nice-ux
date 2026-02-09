import Tile from "nice-react-tile"
import Story from "../../../../src/components/Story"

const TitleStory = () => (
  <Story
    variables={[
      {
        name: "title",
        description: 'title="..."',
        demo: (
          <Tile title="Section Title">
            Title content
          </Tile>
        ),
        code: `<Tile title="Section Title">\n+1{children}\n</Tile>`,
      },
      {
        name: "title + titleAs",
        description: 'titleAs="h3"',
        demo: (
          <Tile title="Section Title" titleAs="h3">
            Title content
          </Tile>
        ),
        code: `<Tile\n+1title="Section Title"\n+1titleAs="h3"\n>\n+1{children}\n</Tile>`,
      },
    ]}
  />
)

export default TitleStory