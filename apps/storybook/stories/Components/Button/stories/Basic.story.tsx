import Button from "nice-react-button"
import Story from "../../../../src/components/Story"

const BasicStory = () => (
  <Story
    variables={[
      {
        name: "onClick",
        description: "onClick={() => void}",
        demo: (
          <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
        ),
        code: `<Button onClick={handler}>\n+1{children}\n</Button>`,
      },
    ]}
  />
)

export default BasicStory
