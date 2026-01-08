import Typography from "nice-react-typography"
import Story from "../../../../src/components/Story"

const LegibilityOptimizedStory = () => (
  <Story
    variables={[
      {
        name: "false",
        description: "legibilityOptimized={false}",
        demo: (
          <Typography legibilityOptimized={false}>
            Legibility standard
          </Typography>
        ),
      },
      {
        name: "true",
        description: "legibilityOptimized={true}",
        demo: (
          <Typography legibilityOptimized={true}>
            Legibility optimized
          </Typography>
        ),
      },
    ]}
  />
)

export default LegibilityOptimizedStory
