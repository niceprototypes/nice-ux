import React, { useEffect } from "react"
import { SliderItemStyled, SliderOuterStyled } from "./styles"
import type { SliderProps } from "./types"

const Slider: React.FC<SliderProps> = ({
  children,
  currentIndex = 0,
  isAnimating = false,
  onAnimationComplete,
}) => {
  useEffect(() => {
    if (isAnimating && onAnimationComplete) {
      const timer = setTimeout(() => {
        onAnimationComplete()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isAnimating, onAnimationComplete])

  return (
    <SliderOuterStyled>
      {children.map((child, index) => (
        <SliderItemStyled
          key={index}
          $index={index}
          $currentIndex={currentIndex}
          $isAnimating={isAnimating}
        >
          {child}
        </SliderItemStyled>
      ))}
    </SliderOuterStyled>
  )
}

export default Slider
