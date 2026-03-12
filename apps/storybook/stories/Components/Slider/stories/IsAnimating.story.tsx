import Typography from "nice-react-typography"
import Story from "../../../../src/components/Story"

const IsAnimatingStory = () => (
  <Story
    variables={[
      {
        name: "isAnimating",
        description: "isAnimating={true}",
        demo: (
          <Typography size="small" color="light">
            When true, the slider is in an animating state. Use this to
            prevent navigation during transitions.
          </Typography>
        ),
        code: `<Slider isAnimating={true}>`,
      },
      {
        name: "preventing",
        description: "Preventing double-navigation",
        demo: (
          <Typography size="small" color="light">
            Check isAnimating before allowing navigation to prevent stacking
            animations:
          </Typography>
        ),
        code: `const goToSlide = (index) => {\n+1if (!isAnimating) {\n+2setIsAnimating(true)\n+2setCurrentIndex(index)\n+1}\n}`,
      },
    ]}
  />
)

export default IsAnimatingStory
