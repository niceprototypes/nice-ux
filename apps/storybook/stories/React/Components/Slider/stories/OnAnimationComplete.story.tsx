import Typography from "../../../../../src/nice/Typography"
import Story from "../../../../../src/components/Story"

const OnAnimationCompleteStory = () => (
  <Story
    variables={[
      {
        name: "onAnimationComplete",
        description: "onAnimationComplete={() => {...}}",
        demo: (
          <Typography
            size="small"
            color="light"
          >
            Callback fired when the slide transition animation completes (after
            300ms). Use this to reset the isAnimating state.
          </Typography>
        ),
        code: `<Slider\n+1onAnimationComplete={() => {\n+2setIsAnimating(false)\n+1}}\n>`,
      },
      {
        name: "chaining",
        description: "Chaining actions",
        demo: (
          <Typography
            size="small"
            color="light"
          >
            Perform additional actions after the animation completes, such as
            analytics tracking or auto-advance logic.
          </Typography>
        ),
        code: `onAnimationComplete={() => {\n+1setIsAnimating(false)\n+1trackSlideView(currentIndex)\n+1if (autoPlay) scheduleNextSlide()\n}}`,
      },
    ]}
  />
)

export default OnAnimationCompleteStory
