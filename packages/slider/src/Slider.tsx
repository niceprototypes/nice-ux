import React, { useEffect } from "react"
import { ItemStyled, OuterStyled } from "./styles"
import { SliderProps } from "./types"

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
    <OuterStyled>
      {children.map((child, index) => (
        <ItemStyled
          key={index}
          $index={index}
          $currentIndex={currentIndex}
          $isAnimating={isAnimating}
        >
          {child}
        </ItemStyled>
      ))}
    </OuterStyled>
  )
}

export default Slider
