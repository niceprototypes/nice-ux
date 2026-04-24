import React, { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import Typography from "nice-react-typography"
import { Trigger, Overlay, Image, Caption } from "./styles"
import type { LightboxProps } from "./types"

const Lightbox: React.FC<LightboxProps> = ({
  children,
  imageUrl,
  alt = "",
  title,
  description,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, close])

  const hasCaption = title || description

  return (
    <>
      <Trigger onClick={() => setIsOpen(true)} style={style}>{children}</Trigger>
      {isOpen &&
        createPortal(
          <Overlay onClick={close}>
            <Image src={imageUrl} alt={alt} onClick={(e) => e.stopPropagation()} />
            {hasCaption && (
              <Caption onClick={(e) => e.stopPropagation()}>
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
              </Caption>
            )}
          </Overlay>,
          document.body
        )}
    </>
  )
}

export default Lightbox