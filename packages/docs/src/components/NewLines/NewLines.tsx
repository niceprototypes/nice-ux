import React from "react"

interface NewLinesProps {
  /** Number of `<br/>` elements to render. @default 1 */
  count?: number
}

const NewLines: React.FC<NewLinesProps> = ({ count = 1 }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <br key={index} />
    ))}
  </>
)

export default NewLines