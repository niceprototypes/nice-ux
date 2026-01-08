import Button from "nice-react-button"
import Story from "../../../../src/components/Story"

const StatusStory = () => (
  <Story
    variables={[
      {
        name: "primary",
        description: 'status="primary"',
        default: true,
        demo: <Button onClick={() => {}}>Primary</Button>,
        code: `<Button onClick={handler}>\n+1{children}\n</Button>`,
      },
      {
        name: "secondary",
        description: 'status="secondary"',
        demo: (
          <Button onClick={() => {}} status="secondary">
            Secondary
          </Button>
        ),
        code: `<Button\n+1onClick={handler}\n+1status="secondary"\n>\n+1{children}\n</Button>`,
      },
    ]}
  />
)

export default StatusStory
