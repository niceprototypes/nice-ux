import Button from "nice-react-button"
import Flex from "nice-react-flex"
import Story from "../../../../src/components/Story"

const StateStory = () => (
  <Story
    variables={[
      {
        name: "base",
        description: 'state="base"',
        default: true,
        demo: (
          <Flex gap="small">
            <Button onClick={() => {}}>Base</Button>
            <Button status="secondary" onClick={() => {}}>
              Base
            </Button>
          </Flex>
        ),
        code: `<Button onClick={handler}>\n+1{children}\n</Button>`,
      },
      {
        name: "disabled",
        description: 'state="disabled"',
        demo: (
          <Flex gap="small">
            <Button onClick={() => {}} state="disabled">
              Disabled
            </Button>
            <Button status="secondary" onClick={() => {}} state="disabled">
              Disabled
            </Button>
          </Flex>
        ),
        code: `<Button\n+1onClick={handler}\n+1state="disabled"\n>\n+1{children}\n</Button>`,
      },
      {
        name: "error",
        description: 'state="error"',
        demo: (
          <Flex gap="small">
            <Button onClick={() => {}} state="error">
              Error
            </Button>
            <Button status="secondary" onClick={() => {}} state="error">
              Error
            </Button>
          </Flex>
        ),
        code: `<Button\n+1onClick={handler}\n+1state="error"\n>\n+1{children}\n</Button>`,
      },
      {
        name: "success",
        description: 'state="success"',
        demo: (
          <Flex gap="small">
            <Button onClick={() => {}} state="success">
              Success
            </Button>
            <Button status="secondary" onClick={() => {}} state="success">
              Success
            </Button>
          </Flex>
        ),
        code: `<Button\n+1onClick={handler}\n+1state="success"\n>\n+1{children}\n</Button>`,
      },
      {
        name: "warning",
        description: 'state="warning"',
        demo: (
          <Flex gap="small">
            <Button onClick={() => {}} state="warning">
              Warning
            </Button>
            <Button status="secondary" onClick={() => {}} state="warning">
              Warning
            </Button>
          </Flex>
        ),
        code: `<Button\n+1onClick={handler}\n+1state="warning"\n>\n+1{children}\n</Button>`,
      },
    ]}
  />
)

export default StateStory
