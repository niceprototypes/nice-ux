import Typography from "nice-react-typography"
import { getToken } from "nice-react-styles"
import Story from "../../../../src/components/Story"

const SizeStory = () => (
  <Story
    variables={[
      {
        name: "smaller",
        description: 'size="smaller"',
        value: getToken("fontSize", "smaller").value,
        demo: <Typography size="smaller">Smaller</Typography>,
      },
      {
        name: "small",
        description: 'size="small"',
        value: getToken("fontSize", "small").value,
        demo: <Typography size="small">Small</Typography>,
      },
      {
        name: "base",
        description: 'size="base"',
        value: getToken("fontSize", "base").value,
        demo: <Typography size="base">Base</Typography>,
      },
      {
        name: "large",
        description: 'size="large"',
        value: getToken("fontSize", "large").value,
        demo: <Typography size="large">Large</Typography>,
      },
      {
        name: "larger",
        description: 'size="larger"',
        value: getToken("fontSize", "larger").value,
        demo: <Typography size="larger">Larger</Typography>,
      },
    ]}
  />
)

export default SizeStory
