import { useRef } from "react"
import { CodeClipProps } from "./CodeClip.types"
import { ClipCode } from "./CodeClip.styles"

export const CodeClip = ({ children, copyOnClick = true }: CodeClipProps) => {
  const ref = useRef<HTMLElement>(null)

  const handleClick = copyOnClick
    ? () => {
        const text = ref.current?.textContent
        if (text) navigator.clipboard.writeText(text)
      }
    : undefined

  return (
    <ClipCode
      ref={ref}
      onClick={handleClick}
      $clickable={copyOnClick}
    >
      {children}
    </ClipCode>
  )
}
