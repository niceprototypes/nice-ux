import * as React from "react"
import { InkProps } from "nice-react-ink"
import { StyledInk } from "./Ink.styles"
import { unwrapMdxParagraph } from "./Ink.services"

type Props = InkProps & { unstyled?: boolean }

/** Heading elements keep nice-react-ink's own per-level size and color defaults. */
const HEADINGS = new Set(["h1", "h2", "h3", "h4"])

const Ink: React.FC<Props> = ({
  as = "span",
  unstyled = true,
  color,
  size,
  className,
  children,
  ...props
}) => {
  const isHeading = HEADINGS.has(as)
  const finalColor = color ?? (isHeading ? undefined : "light")
  const finalSize = size ?? (isHeading ? undefined : "base")
  const finalClassName = unstyled
    ? ["sb-unstyled", className].filter(Boolean).join(" ")
    : className
  return (
    <StyledInk
      forwardedAs={as}
      color={finalColor}
      size={finalSize}
      {...props}
      className={finalClassName}
    >
      {unwrapMdxParagraph(children)}
    </StyledInk>
  )
}

export default Ink
