import { useRef } from "react"
import { CodeSpanProps } from "./CodeSpan.types"
import { SpanCode } from "./CodeSpan.styles"

export const CodeSpan = ({ children, copyOnClick = true }: CodeSpanProps) => {
  const ref = useRef<HTMLElement>(null)

  const handleClick = copyOnClick
    ? () => {
        const text = ref.current?.textContent
        if (text) navigator.clipboard.writeText(text)
      }
    : undefined

  return (
    <SpanCode
      ref={ref}
      onClick={handleClick}
      $clickable={copyOnClick}
    >
      {children}
    </SpanCode>
  )
}
