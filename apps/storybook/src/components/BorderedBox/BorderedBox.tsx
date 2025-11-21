import React from "react"

interface BorderedBoxProps {
  borderColor?: string
  backgroundColor?: string
  width?: string
  height?: string
  borderWidth?: string
  borderRadius?: string
  boxShadow?: string
}

const BorderedBox: React.FC<BorderedBoxProps> = ({
  borderColor = "var(--foreground-color-light)",
  backgroundColor = "white",
  width = "80px",
  height = "40px",
  borderWidth = "var(--border-width-base)",
  borderRadius = "4px",
  boxShadow = "none",
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor,
        border: `${borderWidth} solid ${borderColor}`,
        borderRadius,
        boxShadow,
      }}
    />
  )
}

export default BorderedBox