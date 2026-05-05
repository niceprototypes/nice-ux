import { getToken } from "nice-react-styles"
import React, { useEffect } from "react"
import { SliderItemStyled, SliderOuterStyled } from "./Slider.styles"
import type { SliderProps } from "./Slider.types"

// Single source of truth — CSS transition reads the same token via .var
const animationDurationMs = parseInt(getToken("animationDuration", "base").value, 10)

const Slider: React.FC<SliderProps> = ({
  children,
  currentIndex = 0,
  isAnimating = false,
  onAnimationComplete,
  style,
}) => {
  useEffect(() => {
    // Mirror the CSS transition window — fire onAnimationComplete once it has settled
    if (isAnimating && onAnimationComplete) {
      const timer = setTimeout(() => {
        onAnimationComplete()
      }, animationDurationMs)
      return () => clearTimeout(timer)
    }
  }, [isAnimating, onAnimationComplete])

  return (
    <SliderOuterStyled style={style}>
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
