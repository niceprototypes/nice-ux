import * as React from "react"
import { InkProps } from "nice-react-ink"
import { StyledInk } from "./Ink.styles"
import { unwrapMdxParagraph } from "./Ink.services"

type Props = InkProps & { unstyled?: boolean }

const Ink: React.FC<Props> = ({
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
    <StyledInk
      forwardedAs={as}
      color={color}
      size={size}
      {...props}
      className={finalClassName}
    >
      {unwrapMdxParagraph(children)}
    </StyledInk>
  )
}

export default Ink
