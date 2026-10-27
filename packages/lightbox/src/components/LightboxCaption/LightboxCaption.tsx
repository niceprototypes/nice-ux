import React from "react"
import Ink from "nice-react-ink"
import { Wrapper } from "./LightboxCaption.styles"
import type { LightboxCaptionProps } from "./LightboxCaption.types"

const LightboxCaption: React.FC<LightboxCaptionProps> = ({
  title,
  description,
  className,
}) => {
  if (!title && !description) return null

  return (
    <Wrapper className={className} onClick={(e) => e.stopPropagation()}>
      {title && (
        <Ink as="h3" size="large" weight="semibold" theme="night">
          {title}
        </Ink>
      )}
      {description && (
        <Ink as="p" size="base" color="lighter" theme="night">
          {description}
        </Ink>
      )}
    </Wrapper>
  )
}

export default LightboxCaption
