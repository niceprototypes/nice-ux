import Typography from "nice-react-typography"
import { getToken } from "nice-styles"
import Story from "../../../../src/components/Story"

const ColorStory = () => (
  <Story
    variables={[
      {
        name: "lighter",
        description: 'color="lighter"',
        value: getToken("foregroundColor", "lighter").value,
        demo: <Typography color="lighter">Lighter</Typography>,
      },
      {
        name: "light",
        description: 'color="light"',
        value: getToken("foregroundColor", "light").value,
        demo: <Typography color="light">Light</Typography>,
      },
      {
        name: "medium",
        description: 'color="medium"',
        value: getToken("foregroundColor", "medium").value,
        demo: <Typography color="medium">Medium</Typography>,
      },
      {
        name: "heavy",
        description: 'color="heavy"',
        value: getToken("foregroundColor", "heavy").value,
        demo: <Typography color="heavy">Heavy</Typography>,
      },
      {
        name: "base",
        description: 'color="base"',
        value: getToken("foregroundColor", "base").value,
        demo: <Typography color="base">Base</Typography>,
      },
      {
        name: "disabled",
        description: 'color="disabled"',
        value: getToken("foregroundColor", "disabled").value,
        demo: <Typography color="disabled">Disabled</Typography>,
      },
      {
        name: "link",
        description: 'color="link"',
        value: getToken("foregroundColor", "link").value,
        demo: <Typography color="link">Link</Typography>,
      },
      {
        name: "success",
        description: 'color="success"',
        value: getToken("foregroundColor", "success").value,
        demo: <Typography color="success">Success</Typography>,
      },
      {
        name: "warning",
        description: 'color="warning"',
        value: getToken("foregroundColor", "warning").value,
        demo: <Typography color="warning">Warning</Typography>,
      },
      {
        name: "error",
        description: 'color="error"',
        value: getToken("foregroundColor", "error").value,
        demo: <Typography color="error">Error</Typography>,
      },
    ]}
  />
)

export default ColorStory
