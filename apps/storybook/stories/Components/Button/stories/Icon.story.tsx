import Button from "nice-react-button"
import Story from "../../../../src/components/Story"

const IconStory = () => (
  <Story
    variables={[
      {
        name: "with text",
        description: `icon="arrow-right"`,
        demo: (
          <Button onClick={() => {}} icon="arrow">
            Next
          </Button>
        ),
        code: `<Button\n+1onClick={handler}\n+1icon="arrow-right"\n>\n+1{children}\n</Button>`,
      },
      {
        name: "icon only",
        description: `icon="plus"`,
        demo: (
          <Button onClick={() => {}} icon="plus" aria-label="Add item" />
        ),
        code: `<Button\n+1onClick={handler}\n+1icon="plus"\n+1aria-label="Add item"\n/>`,
      },
    ]}
  />
)

export default IconStory
