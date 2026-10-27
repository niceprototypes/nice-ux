import * as React from "react"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getToken } from "nice-react-styles"
import Dialog from "./Dialog"
import WrappedDialog from "./index"
import type { DialogProps } from "./Dialog.types"

// jsdom 20 has HTMLDialogElement but no showModal / close. Minimal stand-ins:
// toggle the `open` attribute, and queue `close` as a task like the native
// close steps (the async dispatch is what StrictMode's double effect exposes).
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.setAttribute("open", "")
  }
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return
    this.removeAttribute("open")
    setTimeout(() => this.dispatchEvent(new Event("close")), 0)
  }
})

type HarnessProps = Partial<DialogProps> & { initialOpen?: boolean }

/** Trigger button + controlled Dialog whose onClose sets open to false. */
const Harness: React.FC<HarnessProps> = ({ initialOpen = false, onClose, title = "Delete invoice?", ...rest }) => {
  const [open, setOpen] = React.useState(initialOpen)
  return (
    <>
      <button onClick={() => setOpen(true)}>trigger</button>
      <Dialog
        {...rest}
        title={title}
        open={open}
        onClose={() => {
          onClose?.()
          setOpen(false)
        }}
        actions={<button onClick={() => setOpen(false)}>cancel</button>}
      >
        <button>inside</button>
      </Dialog>
    </>
  )
}

/** Lets a queued `close` event from the stand-in close() fire. */
const flushCloseEvent = () => new Promise<void>((resolve) => setTimeout(resolve, 0))

/** Every styled-components rule in the document. */
const sheet = () =>
  Array.from(document.head.querySelectorAll("style"))
    .map((tag) => tag.textContent ?? "")
    .join("\n")

/** CSS text of every rule whose selector starts at one of `element`'s classes. */
const cssFor = (element: Element) => {
  const css = sheet()
  return Array.from(element.classList)
    .flatMap((className) => css.match(new RegExp(`\\.${className}[^{]*\\{[^}]*\\}`, "g")) ?? [])
    .join("\n")
}

const getDialog = () => document.querySelector("dialog") as HTMLDialogElement

const openViaTrigger = () => {
  const trigger = screen.getByText("trigger")
  trigger.focus()
  fireEvent.click(trigger)
  return trigger
}

describe("Dialog", () => {
  it("shows the dialog as a modal when open, labelled by the title", () => {
    render(<Harness initialOpen />)
    const dialog = screen.getByRole("dialog", { name: "Delete invoice?" })
    expect(dialog).toHaveAttribute("open")
    expect(screen.getByRole("heading", { name: "Delete invoice?" })).toBeInTheDocument()
  })

  it("mounts no content and stays closed when not open", () => {
    render(<Harness />)
    expect(getDialog()).not.toHaveAttribute("open")
    expect(screen.queryByText("inside")).not.toBeInTheDocument()
  })

  it("describes the dialog by the description when given", () => {
    render(<Harness initialOpen description="This cannot be undone." />)
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription("This cannot be undone.")
  })

  it("omits aria-describedby without a description", () => {
    render(<Harness initialOpen />)
    expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-describedby")
  })

  it("renders children and actions", () => {
    render(<Harness initialOpen />)
    expect(screen.getByText("inside")).toBeInTheDocument()
    expect(screen.getByText("cancel")).toBeInTheDocument()
  })

  it("calls onClose and prevents the native close on Escape (cancel)", () => {
    const onClose = jest.fn()
    render(<Harness initialOpen onClose={onClose} />)
    const cancel = new Event("cancel", { cancelable: true })
    fireEvent(getDialog(), cancel)
    expect(cancel.defaultPrevented).toBe(true)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(getDialog()).not.toHaveAttribute("open")
  })

  it("calls onClose on a backdrop click", () => {
    const onClose = jest.fn()
    render(<Harness initialOpen onClose={onClose} />)
    fireEvent.pointerDown(getDialog())
    fireEvent.click(getDialog())
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not close on a click inside the dialog", () => {
    const onClose = jest.fn()
    render(<Harness initialOpen onClose={onClose} />)
    fireEvent.pointerDown(screen.getByText("inside"))
    fireEvent.click(screen.getByText("inside"))
    expect(onClose).not.toHaveBeenCalled()
  })

  it("does not close when a press starts inside and ends on the backdrop", () => {
    const onClose = jest.fn()
    render(<Harness initialOpen onClose={onClose} />)
    fireEvent.pointerDown(screen.getByText("inside"))
    fireEvent.click(getDialog())
    expect(onClose).not.toHaveBeenCalled()
  })

  it("ignores backdrop clicks when closeOnBackdropClick is false", () => {
    const onClose = jest.fn()
    render(<Harness initialOpen onClose={onClose} closeOnBackdropClick={false} />)
    fireEvent.pointerDown(getDialog())
    fireEvent.click(getDialog())
    expect(onClose).not.toHaveBeenCalled()
  })

  it("calls onClose on a native close the consumer did not request", async () => {
    const onClose = jest.fn()
    render(<Harness initialOpen onClose={onClose} />)
    await act(async () => {
      getDialog().close()
      await flushCloseEvent()
    })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not call onClose when the consumer closes it", async () => {
    const onClose = jest.fn()
    render(<Harness initialOpen onClose={onClose} />)
    fireEvent.click(screen.getByText("cancel"))
    await act(flushCloseEvent)
    expect(getDialog()).not.toHaveAttribute("open")
    expect(onClose).not.toHaveBeenCalled()
  })

  describe("StrictMode", () => {
    const renderStrict = (props: HarnessProps) =>
      render(
        <React.StrictMode>
          <Harness {...props} />
        </React.StrictMode>
      )

    it("stays open and does not call onClose when opened", async () => {
      const onClose = jest.fn()
      renderStrict({ onClose })
      openViaTrigger()
      await act(flushCloseEvent)
      expect(onClose).not.toHaveBeenCalled()
      expect(getDialog()).toHaveAttribute("open")
    })

    it("stays open and does not call onClose when mounted open", async () => {
      const onClose = jest.fn()
      renderStrict({ onClose, initialOpen: true })
      await act(flushCloseEvent)
      expect(onClose).not.toHaveBeenCalled()
      expect(getDialog()).toHaveAttribute("open")
    })

    it("still calls onClose once on Escape (cancel)", async () => {
      const onClose = jest.fn()
      renderStrict({ onClose, initialOpen: true })
      await act(flushCloseEvent)
      fireEvent(getDialog(), new Event("cancel", { cancelable: true }))
      await act(flushCloseEvent)
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(getDialog()).not.toHaveAttribute("open")
    })

    it("still calls onClose once on a backdrop click", async () => {
      const onClose = jest.fn()
      renderStrict({ onClose, initialOpen: true })
      await act(flushCloseEvent)
      fireEvent.pointerDown(getDialog())
      fireEvent.click(getDialog())
      await act(flushCloseEvent)
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(getDialog()).not.toHaveAttribute("open")
    })
  })

  it("moves focus into the dialog on open and returns it to the trigger on close", () => {
    render(<Harness />)
    const trigger = openViaTrigger()
    expect(getDialog()).toHaveFocus()
    fireEvent.click(screen.getByText("cancel"))
    expect(trigger).toHaveFocus()
  })

  it("keeps focus on a descendant that is already focused on open", () => {
    const Focusing: React.FC = () => {
      const [open, setOpen] = React.useState(false)
      return (
        <>
          <button onClick={() => setOpen(true)}>trigger</button>
          <Dialog open={open} onClose={() => setOpen(false)} title="Rename">
            <input aria-label="name" autoFocus />
          </Dialog>
        </>
      )
    }
    render(<Focusing />)
    openViaTrigger()
    expect(screen.getByLabelText("name")).toHaveFocus()
  })

  it("locks page scroll while open and restores it on close", () => {
    document.documentElement.style.overflow = "auto"
    render(<Harness />)
    openViaTrigger()
    expect(document.documentElement.style.overflow).toBe("hidden")
    fireEvent.click(screen.getByText("cancel"))
    expect(document.documentElement.style.overflow).toBe("auto")
    document.documentElement.style.overflow = ""
  })

  it("restores page scroll when unmounted while open", () => {
    const { unmount } = render(<Harness />)
    openViaTrigger()
    unmount()
    expect(document.documentElement.style.overflow).toBe("")
  })

  it("reads the dialog surface, size and backdrop from the dialog tokens", () => {
    render(<Harness initialOpen />)
    const css = cssFor(getDialog())
    expect(css).toContain(`width:${getToken("dialog.width:base")}`)
    expect(css).toContain(`max-width:${getToken("dialog.maxWidth:base")}`)
    expect(css).toContain(`background-color:${getToken("dialog.backgroundColor:base")}`)
    expect(css).toContain(`color:${getToken("dialog.color:base")}`)
    expect(css).toContain(`border-radius:${getToken("dialog.borderRadius:base")}`)
    expect(css).toContain(`box-shadow:${getToken("dialog.boxShadow:base")}`)
    expect(css).toMatch(/::backdrop\{[^}]*background-color:var\(--np--dialog--backdrop--background-color\)/)
    expect(getToken("dialog.width:base")).toBe("var(--np--dialog--width)")
  })

  it("reads content spacing and text from the dialog tokens", () => {
    render(<Harness initialOpen description="This cannot be undone." />)
    const content = cssFor(getDialog().firstElementChild!)
    expect(content).toContain(`gap:${getToken("dialog.gap:base")}`)
    expect(content).toContain(`padding:${getToken("dialog.padding:base")}`)
    const title = cssFor(screen.getByRole("heading"))
    expect(title).toContain(`font-size:${getToken("dialog.title.fontSize:base")}`)
    expect(title).toContain(`font-weight:${getToken("dialog.title.fontWeight:base")}`)
    expect(cssFor(screen.getByText("This cannot be undone."))).toContain(`color:${getToken("dialog.description.color:base")}`)
    expect(cssFor(screen.getByText("cancel").parentElement!)).toContain(`gap:${getToken("dialog.actions.gap:base")}`)
  })

  it("applies the id prop", () => {
    render(<Harness initialOpen id="confirm" />)
    expect(getDialog()).toHaveAttribute("id", "confirm")
  })

  it("forwards ref to the dialog element", () => {
    const ref = React.createRef<HTMLDialogElement>()
    render(<Harness initialOpen ref={ref} />)
    expect(ref.current).toBe(getDialog())
  })

  it("forwards ref through the withBreakpoints-wrapped export", () => {
    const ref = React.createRef<HTMLDialogElement>()
    render(<WrappedDialog open title="wrapped" ref={ref} />)
    expect(ref.current).toBe(screen.getByRole("dialog", { name: "wrapped" }))
  })

  it("wraps in Theme when theme is set", () => {
    render(<Harness initialOpen theme="night" />)
    expect(getDialog().parentElement).toHaveAttribute("data-theme", "night")
  })
})
