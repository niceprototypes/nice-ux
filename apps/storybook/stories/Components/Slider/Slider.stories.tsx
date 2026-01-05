import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import Slider from "nice-react-slider"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import { getToken } from "nice-styles"
import Story from "../../../src/components/Story"
import { generateDescriptionString } from "../../../src/services"

/**
 * A smooth, animated vertical slider component for React.
 *
 * The Slider component provides:
 * - Vertical slide transitions with smooth animations
 * - Controlled index-based navigation
 * - Animation state callbacks for sequencing
 * - Hidden scrollbar styling for clean UI
 */
const meta = {
  title: "Components/Slider",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: generateDescriptionString("nice-react-slider", {
          setup: [
            {
              value: 'import Slider from "nice-react-slider"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value:
                "<Slider currentIndex={0}>{slides}</Slider>",
              code: true,
            },
          ],
        }),
      },
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "Array of slide elements to display",
      table: {
        type: { summary: "React.ReactNode[]" },
      },
    },
    currentIndex: {
      description: "Index of the currently visible slide (zero-indexed)",
      control: "number",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    isAnimating: {
      description: "Whether the slider is currently animating between slides",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onAnimationComplete: {
      description: "Callback fired when slide transition animation completes (after 300ms)",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const SlideContent = ({
  title,
  color,
}: {
  title: string
  color: string
}) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    style={{
      height: "100%",
      backgroundColor: color,
      padding: getToken("gap", "large").var,
    }}
  >
    <Typography as="h2" weight="bold" size="larger">
      {title}
    </Typography>
    <Typography color="medium">
      Swipe or use navigation to change slides
    </Typography>
  </Flex>
)

const InteractiveSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const slides = [
    { title: "Slide 1", color: getToken("foregroundColor", "error").var },
    { title: "Slide 2", color: getToken("foregroundColor", "warning").var },
    { title: "Slide 3", color: getToken("foregroundColor", "success").var },
  ]

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true)
      setCurrentIndex(index)
    }
  }

  return (
    <Flex direction="column" gap="base" style={{ height: "300px" }}>
      <Slider
        currentIndex={currentIndex}
        isAnimating={isAnimating}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {slides.map((slide, index) => (
          <SlideContent key={index} title={slide.title} color={slide.color} />
        ))}
      </Slider>
      <Flex gap="small" justify="center">
        {slides.map((_, index) => (
          <Flex
            key={index}
            as="button"
            onClick={() => goToSlide(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "none",
              cursor: isAnimating ? "not-allowed" : "pointer",
              transition: "background-color 0.2s ease",
            }}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export const Default: Story = {
  name: "Slider",
  render: () => (
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
  ),
}

export const CurrentIndex: Story = {
  name: "currentIndex",
  render: () => (
    <Story
      variables={[
        {
          name: "currentIndex",
          description: "currentIndex={0}",
          demo: (
            <Typography size="small" color="medium">
              Controls which slide is currently visible. Zero-indexed.
            </Typography>
          ),
          code: `<Slider currentIndex={0}>`,
        },
        {
          name: "navigation",
          description: "Navigation example",
          demo: (
            <Flex direction="column" gap="small">
              <Typography size="small" color="medium">
                Increment the index to navigate to the next slide:
              </Typography>
              <Flex gap="small">
                <Flex
                  style={{
                    padding: `${getToken("gap", "smaller").var} ${getToken("gap", "small").var}`,
                    borderRadius: getToken("borderRadius", "small").var,
                  }}
                >
                  <Typography size="smaller">Previous: index - 1</Typography>
                </Flex>
                <Flex
                  style={{
                    padding: `${getToken("gap", "smaller").var} ${getToken("gap", "small").var}`,
                    borderRadius: getToken("borderRadius", "small").var,
                  }}
                >
                  <Typography size="smaller">Next: index + 1</Typography>
                </Flex>
              </Flex>
            </Flex>
          ),
          code: `const [currentIndex, setCurrentIndex] = useState(0)\n\nconst next = () => setCurrentIndex(i => i + 1)\nconst prev = () => setCurrentIndex(i => i - 1)`,
        },
      ]}
    />
  ),
}

export const IsAnimating: Story = {
  name: "isAnimating",
  render: () => (
    <Story
      variables={[
        {
          name: "isAnimating",
          description: "isAnimating={true}",
          demo: (
            <Typography size="small" color="medium">
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
            <Typography size="small" color="medium">
              Check isAnimating before allowing navigation to prevent stacking
              animations:
            </Typography>
          ),
          code: `const goToSlide = (index) => {\n+1if (!isAnimating) {\n+2setIsAnimating(true)\n+2setCurrentIndex(index)\n+1}\n}`,
        },
      ]}
    />
  ),
}

export const OnAnimationComplete: Story = {
  name: "onAnimationComplete",
  render: () => (
    <Story
      variables={[
        {
          name: "onAnimationComplete",
          description: "onAnimationComplete={() => {...}}",
          demo: (
            <Typography size="small" color="medium">
              Callback fired when the slide transition animation completes
              (after 300ms). Use this to reset the isAnimating state.
            </Typography>
          ),
          code: `<Slider\n+1onAnimationComplete={() => {\n+2setIsAnimating(false)\n+1}}\n>`,
        },
        {
          name: "chaining",
          description: "Chaining actions",
          demo: (
            <Typography size="small" color="medium">
              Perform additional actions after the animation completes, such as
              analytics tracking or auto-advance logic.
            </Typography>
          ),
          code: `onAnimationComplete={() => {\n+1setIsAnimating(false)\n+1trackSlideView(currentIndex)\n+1if (autoPlay) scheduleNextSlide()\n}}`,
        },
      ]}
    />
  ),
}