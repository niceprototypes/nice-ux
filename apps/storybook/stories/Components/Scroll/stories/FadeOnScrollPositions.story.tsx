import Typography from "../../../../src/nice/Typography"
import Story from "../../../../src/components/Story"

const FadeOnScrollPositionsStory = () => (
  <Story
    variables={[
      {
        name: "startPosition",
        description: "startPosition={30}",
        demo: (
          <Typography size="small" color="light">
            Scroll progress % where fade in begins (default: 0)
          </Typography>
        ),
        code: `<FadeOnScroll startPosition={30}>`,
      },
      {
        name: "peakPosition",
        description: "peakPosition={50}",
        demo: (
          <Typography size="small" color="light">
            Scroll progress % where peak opacity is reached (default: 50)
          </Typography>
        ),
        code: `<FadeOnScroll peakPosition={50}>`,
      },
      {
        name: "endPosition",
        description: "endPosition={100}",
        demo: (
          <Typography size="small" color="light">
            Scroll progress % where fade out completes (default: 100)
          </Typography>
        ),
        code: `<FadeOnScroll endPosition={100}>`,
      },
    ]}
  />
)

export default FadeOnScrollPositionsStory
