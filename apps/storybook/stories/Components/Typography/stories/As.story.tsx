import Typography from "nice-react-typography"
import Story from "../../../../src/components/Story"

const AsStory = () => (
  <Story
    variables={[
      { name: "h1", description: 'as="h1"', demo: <Typography as="h1">Heading 1</Typography> },
      { name: "h2", description: 'as="h2"', demo: <Typography as="h2">Heading 2</Typography> },
      { name: "h3", description: 'as="h3"', demo: <Typography as="h3">Heading 3</Typography> },
      { name: "h4", description: 'as="h4"', demo: <Typography as="h4">Heading 4</Typography> },
      { name: "p", description: 'as="p"', demo: <Typography as="p">Paragraph text</Typography> },
      { name: "span", description: 'as="span"', demo: <Typography as="span">Span text</Typography> },
    ]}
  />
)

export default AsStory
