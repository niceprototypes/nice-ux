import * as React from "react"
import { TypographyProps } from "nice-react-typography"
import { StyledTypography } from "./Typography.styles"
import { unwrapMdxParagraph } from "./Typography.services"

type Props = TypographyProps & { unstyled?: boolean }

const Typography: React.FC<Props> = ({
  as = "span",
  unstyled = true,
  color = "light",
  size = "base",
  className,
  children,
  ...props
}) => {
  const finalClassName = unstyled
    ? ["sb-unstyled", className].filter(Boolean).join(" ")
    : className
  return (
    <StyledTypography
      forwardedAs={as}
      color={color}
      size={size}
      {...props}
      className={finalClassName}
    >
      {unwrapMdxParagraph(children)}
    </StyledTypography>
  )
}

export default Typography
