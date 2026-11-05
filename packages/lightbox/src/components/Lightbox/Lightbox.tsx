import React, { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import LightboxCaption from "../LightboxCaption"
import { Trigger, Overlay, Image } from "./Lightbox.styles"
import type { LightboxProps } from "./Lightbox.types"

/**
 * Lightbox
 *
 * Wraps a trigger that opens `imageUrl` in a fullscreen modal dialog: a native `<dialog>` shown
 * with `showModal()`, so the page behind it is inert and focus stays inside. Escape and a click
 * outside the image and caption close it; focus then returns to the trigger. `open` controls it,
 * `onOpenChange` receives every requested change; without `open` it manages its own state.
 */
const Lightbox: React.FC<LightboxProps> = ({
  children,
  imageUrl,
  alt = "",
  title,
  description,
  open,
  onOpenChange,
  className,
  style,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolledOpen
  const triggerRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Controlled: only report the request; uncontrolled: also apply it.
  const requestOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  // Latest requestOpen, read by the native listeners so they subscribe once per open.
  const requestOpenRef = useRef(requestOpen)
  useEffect(() => {
    requestOpenRef.current = requestOpen
  })

  const openOverlay = () => requestOpen(true)
  const closeOverlay = () => requestOpen(false)

  // Children are arbitrary nodes, so the trigger stays a <div> (a <button> may
  // not contain interactive content) and gets button keyboard activation here;
  // Space is prevented from scrolling the page.
  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openOverlay()
    }
  }

  // Escape requests the close; preventing it stops the native `cancel`, so the open state stays the
  // single source.
  const handleOverlayKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.preventDefault()
      closeOverlay()
    }
  }

  // Modal show / hide, scroll lock and focus return. A platform close request (the native
  // `cancel`) is prevented and reported like Escape; a native close that was not requested is
  // reported too. The listeners are removed before the cleanup's own close(), so that close is
  // not reported.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!isOpen || !dialog) return
    const trigger = triggerRef.current

    const handleCancel = (event: Event) => {
      event.preventDefault()
      requestOpenRef.current(false)
    }
    const handleNativeClose = () => {
      if (dialog.open) return
      requestOpenRef.current(false)
    }

    dialog.addEventListener("cancel", handleCancel)
    dialog.addEventListener("close", handleNativeClose)
    document.body.style.overflow = "hidden"
    if (!dialog.open) dialog.showModal()
    dialog.focus()

    return () => {
      dialog.removeEventListener("cancel", handleCancel)
      dialog.removeEventListener("close", handleNativeClose)
      if (dialog.open) dialog.close()
      document.body.style.overflow = ""
      trigger?.focus()
    }
  }, [isOpen])

  return (
    <>
      <Trigger
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={openOverlay}
        onKeyDown={handleTriggerKeyDown}
        className={className}
        style={style}
      >
        {children}
      </Trigger>
      {isOpen &&
        createPortal(
          <Overlay
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={title || alt || undefined}
            tabIndex={-1}
            onClick={closeOverlay}
            onKeyDown={handleOverlayKeyDown}
          >
            <Image src={imageUrl} alt={alt} onClick={(event) => event.stopPropagation()} />
            <LightboxCaption title={title} description={description} />
          </Overlay>,
          document.body
        )}
    </>
  )
}

export default Lightbox
