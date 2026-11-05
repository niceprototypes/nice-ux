import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { ChatComposer } from "."
import type { ChatComposerProps } from "./ChatComposer.types"

/** A composer holding its own draft, as a consumer would. */
const Composer = (props: Partial<ChatComposerProps>) => {
  const [value, setValue] = React.useState(props.value ?? "")
  return (
    <ChatComposer
      onSubmit={jest.fn()}
      {...props}
      value={value}
      onChange={setValue}
    />
  )
}

const textbox = () => screen.getByRole("textbox", { name: "Message" })

describe("ChatComposer", () => {
  it("submits the text on Enter", async () => {
    const onSubmit = jest.fn()
    render(<Composer onSubmit={onSubmit} />)
    await userEvent.type(textbox(), "Hello{Enter}")
    expect(onSubmit).toHaveBeenCalledWith("Hello")
    expect(textbox()).toHaveValue("Hello")
  })

  it("inserts a newline on Shift+Enter and does not submit", async () => {
    const onSubmit = jest.fn()
    render(<Composer onSubmit={onSubmit} />)
    await userEvent.type(textbox(), "a{Shift>}{Enter}{/Shift}b")
    expect(onSubmit).not.toHaveBeenCalled()
    expect(textbox()).toHaveValue("a\nb")
  })

  it("submits through the send button, which is disabled while the text is blank", async () => {
    const onSubmit = jest.fn()
    render(<Composer onSubmit={onSubmit} />)
    const send = screen.getByRole("button", { name: "Send" })
    expect(send).toBeDisabled()
    await userEvent.type(textbox(), "  {Enter}")
    expect(onSubmit).not.toHaveBeenCalled()
    await userEvent.type(textbox(), "Hi")
    await userEvent.click(send)
    expect(onSubmit).toHaveBeenCalledWith("  Hi")
  })

  it("swaps send for stop while busy; stop and Escape call onStop, Enter does not submit", async () => {
    const onSubmit = jest.fn()
    const onStop = jest.fn()
    render(<Composer value="Hi" busy onSubmit={onSubmit} onStop={onStop} />)
    expect(screen.queryByRole("button", { name: "Send" })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "Stop" }))
    expect(onStop).toHaveBeenCalledTimes(1)
    await userEvent.type(textbox(), "{Escape}")
    expect(onStop).toHaveBeenCalledTimes(2)
    await userEvent.type(textbox(), "{Enter}")
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("does not stop on Escape when not busy", async () => {
    const onStop = jest.fn()
    render(<Composer onStop={onStop} />)
    await userEvent.type(textbox(), "{Escape}")
    expect(onStop).not.toHaveBeenCalled()
  })

  it("disables the text field and the buttons when disabled", () => {
    const { rerender } = render(<Composer value="Hi" disabled />)
    expect(textbox()).toBeDisabled()
    expect(screen.getByRole("button", { name: "Send" })).toBeDisabled()
    rerender(<Composer value="Hi" disabled busy onStop={jest.fn()} />)
    expect(screen.getByRole("button", { name: "Stop" })).toBeDisabled()
  })

  it("renders actions before the send button", () => {
    render(<Composer actions={<button type="button">Attach</button>} />)
    const [attach, send] = screen.getAllByRole("button")
    expect(attach).toHaveTextContent("Attach")
    expect(send).toHaveAccessibleName("Send")
  })
})
