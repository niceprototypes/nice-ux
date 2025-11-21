import React from "react"
import { ColorDotProps } from "./types"

const ColorDot: React.FC<ColorDotProps> = ({ color, stroke, strokeWidth, fill }) => {
  // Backwards compatible: color prop sets fill if fill not explicitly provided
  const finalFill = fill !== undefined ? fill : (color || (stroke ? "none" : undefined))

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={finalFill} stroke={stroke} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="12" />
    </svg>
  )
}

export default ColorDot