import Story from "../../../../../src/components/Story"
import { InteractiveSlider } from "../Slider.services"

const DefaultStory = () => (
  <Story
    variables={[
      {
        name: "basic",
        description: "<Slider>",
        demo: <InteractiveSlider />,
        code: `const [currentIndex, setCurrentIndex] = useState(0)\nconst [isAnimating, setIsAnimating] = useState(false)\n\n<Slider\n+1currentIndex={currentIndex}\n+1isAnimating={isAnimating}\n+1onAnimationComplete={() => setIsAnimating(false)}\n>\n+1{slides}\n</Slider>`,
      },
    ]}
  />
)

export default DefaultStory
