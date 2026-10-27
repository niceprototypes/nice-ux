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
  className,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  // Children are arbitrary nodes, so the trigger stays a <div> (a <button> may
  // not contain interactive content) and gets button keyboard activation here;
  // Space is prevented from scrolling the page.
  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      open()
    }
  }

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
      <Trigger
        role="button"
        tabIndex={0}
        onClick={open}
        onKeyDown={handleTriggerKeyDown}
        className={className}
        style={style}
      >
        {children}
      </Trigger>
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