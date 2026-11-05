import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ChatMessage } from "."

describe("ChatMessage", () => {
  it("renders its content and actions", () => {
    render(
      <ChatMessage
        role="assistant"
        actions={<button type="button">Copy</button>}
      >
        Reply
      </ChatMessage>
    )
    expect(screen.getByText("Reply")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument()
  })

  it("keeps a user message's line breaks", () => {
    render(<ChatMessage role="user">{"First line\nsecond line"}</ChatMessage>)
    expect(screen.getByText(/First line/)).toHaveStyle({ whiteSpace: "pre-wrap" })
  })

  it("is busy and withholds its actions while streaming", () => {
    render(
      <ChatMessage
        role="assistant"
        status="streaming"
        actions={<button type="button">Copy</button>}
      >
        Rep
      </ChatMessage>
    )
    expect(screen.getByText("Rep").parentElement).toHaveAttribute("aria-busy", "true")
    expect(screen.queryByRole("button", { name: "Copy" })).not.toBeInTheDocument()
  })
})
