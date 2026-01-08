import Typography from "nice-react-typography"
import Story from "../../../../src/components/Story"

const AntialiasedStory = () => (
  <Story
    variables={[
      {
        name: "false",
        description: "antialiased={false}",
        demo: (
          <Typography antialiased={false} size="large">
            Normal rendering
          </Typography>
        ),
      },
      {
        name: "true",
        description: "antialiased={true}",
        demo: (
          <Typography antialiased={true} size="large">
            Antialiased rendering
          </Typography>
        ),
      },
    ]}
  />
)

export default AntialiasedStory
