import Typography from "../../../../../src/nice/Typography"
import Story from "../../../../../src/components/Story"

const FadeOnScrollOpacityStory = () => (
  <Story
    variables={[
      {
        name: "startOpacity",
        description: "startOpacity={0}",
        demo: (
          <Typography
            size="small"
            color="light"
          >
            Initial opacity value before fade in begins (default: 0)
          </Typography>
        ),
        code: `<FadeOnScroll startOpacity={0}>`,
      },
      {
        name: "peakOpacity",
        description: "peakOpacity={1}",
        demo: (
          <Typography
            size="small"
            color="light"
          >
            Peak opacity value at peakPosition (default: 1)
          </Typography>
        ),
        code: `<FadeOnScroll peakOpacity={1}>`,
      },
      {
        name: "endOpacity",
        description: "endOpacity={0}",
        demo: (
          <Typography
            size="small"
            color="light"
          >
            Final opacity value after fade out (default: 0)
          </Typography>
        ),
        code: `<FadeOnScroll endOpacity={0}>`,
      },
    ]}
  />
)

export default FadeOnScrollOpacityStory
