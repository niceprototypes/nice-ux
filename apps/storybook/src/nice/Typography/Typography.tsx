import * as React from "react"
import NiceTypography, { TypographyProps } from "nice-react-typography"

type Props = TypographyProps & { unstyled?: boolean }

const Typography: React.FC<Props> = ({
  unstyled = true,
  color = "light",
  size = "base",
  className,
  ...props
}) => {
  const finalClassName = unstyled
    ? ["sb-unstyled", className].filter(Boolean).join(" ")
    : className
  return (
    <NiceTypography
      color={color}
      size={size}
      {...props}
      className={finalClassName}
    />
  )
}

export default Typography
