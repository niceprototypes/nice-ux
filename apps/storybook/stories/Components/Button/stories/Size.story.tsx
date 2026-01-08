import Button from "nice-react-button"
import Story from "../../../../src/components/Story"

const SizeStory = () => (
  <Story
    variables={[
      {
        name: "smaller",
        description: 'size="smaller"',
        demo: (
          <Button onClick={() => {}} size="smaller">
            Smaller
          </Button>
        ),
        code: `<Button\n+1onClick={handler}\n+1size="smaller"\n>\n+1{children}\n</Button>`,
      },
      {
        name: "small",
        description: 'size="small"',
        demo: (
          <Button onClick={() => {}} size="small">
            Small
          </Button>
        ),
        code: `<Button\n+1onClick={handler}\n+1size="small"\n>\n+1{children}\n</Button>`,
      },
      {
        name: "base",
        description: 'size="base"',
        default: true,
        demo: (
          <Button onClick={() => {}} size="base">
            Base
          </Button>
        ),
        code: `<Button onClick={handler}>\n+1{children}\n</Button>`,
      },
      {
        name: "large",
        description: 'size="large"',
        demo: (
          <Button onClick={() => {}} size="large">
            Large
          </Button>
        ),
        code: `<Button\n+1onClick={handler}\n+1size="large"\n>\n+1{children}\n</Button>`,
      },
      {
        name: "larger",
        description: 'size="larger"',
        demo: (
          <Button onClick={() => {}} size="larger">
            Larger
          </Button>
        ),
        code: `<Button\n+1onClick={handler}\n+1size="larger"\n>\n+1{children}\n</Button>`,
      },
    ]}
  />
)

export default SizeStory
