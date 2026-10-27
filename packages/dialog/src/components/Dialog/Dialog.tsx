import * as React from "react"
import { Theme } from "nice-react-styles"
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogDescription,
  StyledDialogTitle,
} from "./Dialog.styles"
import type { DialogProps } from "./Dialog.types"

/**
 * Dialog
 *
 * Controlled modal built on the native `<dialog>`. While `open`, the element is
 * shown with `showModal()` (top layer, inert page behind it), page scroll is
 * locked on `<html>`, and focus moves into the dialog — to the first focusable
 * descendant per the native focusing steps, or to the dialog itself. Escape
 * (the native `cancel` event, prevented so the consumer stays in control), a
 * backdrop click when `closeOnBackdropClick`, and any native close the consumer
 * did not request call `onClose`. When `open` turns false the dialog closes,
 * scroll is restored and focus returns to the element focused before opening.
 * Content is mounted only while open.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = React.useState(false)
 *
 * <button onClick={() => setOpen(true)}>Delete</button>
 * <Dialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Delete invoice?"
 *   actions={<button onClick={() => setOpen(false)}>Cancel</button>}
 * >
 *   …
 * </Dialog>
 * ```
 */
const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  closeOnBackdropClick = true,
  id,
  ref,
  theme,
}) => {
  const dialogRef = React.useRef<HTMLDialogElement | null>(null)
  const titleId = React.useId()
  const descriptionId = React.useId()

  // Whether the current press started on the backdrop, so a drag that starts
  // inside the dialog and ends on the backdrop does not close it.
  const pressOnBackdropRef = React.useRef(false)

  // Latest onClose, read by the native listeners so they subscribe once per
  // open rather than on every render with an inline callback.
  const onCloseRef = React.useRef(onClose)
  React.useEffect(() => {
    onCloseRef.current = onClose
  })

  // Forward the dialog element to both the internal ref and the consumer's ref.
  const setDialogNode = React.useCallback(
    (node: HTMLDialogElement | null) => {
      dialogRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  // Show / hide, scroll lock and focus return. The listeners are removed before
  // the cleanup's own close(), so only a close the consumer did not request
  // reaches onClose. The native `close` event is queued, not synchronous: when
  // the effect re-runs before it fires (StrictMode's mount → cleanup → mount),
  // the re-added listener receives the cleanup's event while the dialog is open
  // again, so an event that arrives with `dialog.open` true is ignored.
  React.useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const root = document.documentElement
    const previousOverflow = root.style.overflow

    const onCancel = (event: Event) => {
      event.preventDefault()
      onCloseRef.current?.()
    }
    const onNativeClose = () => {
      if (dialog.open) return
      onCloseRef.current?.()
    }

    dialog.addEventListener("cancel", onCancel)
    dialog.addEventListener("close", onNativeClose)
    root.style.overflow = "hidden"
    if (!dialog.open) dialog.showModal()
    if (!dialog.contains(document.activeElement)) dialog.focus()

    return () => {
      dialog.removeEventListener("cancel", onCancel)
      dialog.removeEventListener("close", onNativeClose)
      if (dialog.open) dialog.close()
      root.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [open])

  const onPointerDown = (event: React.PointerEvent<HTMLDialogElement>) => {
    pressOnBackdropRef.current = event.target === event.currentTarget
  }

  const onClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const pressOnBackdrop = pressOnBackdropRef.current
    pressOnBackdropRef.current = false
    if (closeOnBackdropClick && pressOnBackdrop && event.target === event.currentTarget) onCloseRef.current?.()
  }

  const dialog = (
    <StyledDialog
      ref={setDialogNode}
      id={id}
      tabIndex={-1}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onPointerDown={onPointerDown}
      onClick={onClick}
    >
      {open && (
        <StyledDialogContent>
          <StyledDialogTitle id={titleId}>{title}</StyledDialogTitle>
          {description && <StyledDialogDescription id={descriptionId}>{description}</StyledDialogDescription>}
          {children}
          {actions && <StyledDialogActions>{actions}</StyledDialogActions>}
        </StyledDialogContent>
      )}
    </StyledDialog>
  )

  return theme ? <Theme name={theme}>{dialog}</Theme> : dialog
}

export default Dialog
