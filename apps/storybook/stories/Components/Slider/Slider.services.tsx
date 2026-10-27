import { useState } from "react"
import Slider from "@niceprototypes/slider"
import Flex from "@niceprototypes/flex"
import Ink from "../../../src/nice/Ink"
import { getToken } from "@niceprototypes/styles"

export const SlideContent = ({
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
      padding: getToken("gap", "large"),
    }}
  >
    <Ink
      as="h2"
      weight="bold"
      size="larger"
    >
      {title}
    </Ink>
    <Ink color="light">
      Swipe or use navigation to change slides
    </Ink>
  </Flex>
)

export const InteractiveSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const slides = [
    { title: "Slide 1", color: getToken("color", "error") },
    { title: "Slide 2", color: getToken("color", "warning") },
    { title: "Slide 3", color: getToken("color", "success") },
  ]

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true)
      setCurrentIndex(index)
    }
  }

  return (
    <Flex
      direction="column"
      gap="base"
      style={{ height: "300px" }}
    >
      <Slider
        currentIndex={currentIndex}
        isAnimating={isAnimating}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {slides.map((slide, index) => (
          <SlideContent
            key={index}
            title={slide.title}
            color={slide.color}
          />
        ))}
      </Slider>
      <Flex
        gap="small"
        justify="center"
      >
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
