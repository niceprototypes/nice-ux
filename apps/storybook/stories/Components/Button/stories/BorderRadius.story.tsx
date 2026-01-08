import Button from "nice-react-button"
import Story from "../../../../src/components/Story"

const BorderRadiusStory = () => (
  <Story
    variables={[
      {
        name: "small",
        description: 'borderRadius="small"',
        demo: (
          <Button onClick={() => {}} borderRadius="small">
            Small
          </Button>
        ),
        code: `<Button\n+1onClick={handler}\n+1borderRadius="small"\n>\n+1{children}\n</Button>`,
      },
      {
        name: "base",
        description: 'borderRadius="base"',
        default: true,
        demo: (
          <Button onClick={() => {}} borderRadius="base">
            Base
          </Button>
        ),
        code: `<Button onClick={handler}>\n+1{children}\n</Button>`,
      },
      {
        name: "large",
        description: 'borderRadius="large"',
        demo: (
          <Button onClick={() => {}} borderRadius="large">
            Large
          </Button>
        ),
        code: `<Button\n+1onClick={handler}\n+1borderRadius="large"\n>\n+1{children}\n</Button>`,
      },
    ]}
  />
)

export default BorderRadiusStory
