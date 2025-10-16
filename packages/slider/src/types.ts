import React from "react"

export interface SliderProps {
  children: React.ReactNode[]
  currentIndex?: number
  isAnimating?: boolean
  onAnimationComplete?: () => void
}
