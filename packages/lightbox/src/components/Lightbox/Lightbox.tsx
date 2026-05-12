import React, { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import LightboxCaption from "../LightboxCaption"
import { Trigger, Overlay, Image } from "./Lightbox.styles"
import type { LightboxProps } from "./Lightbox.types"

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

  return (
    <>
      <Trigger onClick={() => setIsOpen(true)} style={style}>{children}</Trigger>
      {isOpen &&
        createPortal(
          <Overlay onClick={close}>
            <Image src={imageUrl} alt={alt} onClick={(e) => e.stopPropagation()} />
            <LightboxCaption title={title} description={description} />
          </Overlay>,
          document.body
        )}
    </>
  )
}

export default Lightbox