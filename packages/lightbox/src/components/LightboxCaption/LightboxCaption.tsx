import React from "react"
import Typography from "nice-react-typography"
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
        <Typography as="h3" size="large" weight="semibold" mode="night">
          {title}
        </Typography>
      )}
      {description && (
        <Typography as="p" size="base" color="lighter" mode="night">
          {description}
        </Typography>
      )}
    </Wrapper>
  )
}

export default LightboxCaption
