import React from "react"

interface LineBreaksProps {
  /** Number of `<br/>` elements to render. */
  lines: number
}

const LineBreaks: React.FC<LineBreaksProps> = ({ lines }) => (
  <>
    {Array.from({ length: lines }).map((_, i) => (
      <br key={i} />
    ))}
  </>
)

export default LineBreaks
