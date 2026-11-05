import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { ChatSuggestions } from "."

describe("ChatSuggestions", () => {
  it("renders a button per item and picks the pressed one", async () => {
    const onPick = jest.fn()
    const items = [
      { id: "ease", label: "Ease the slide" },
      { id: "fade", label: "Add a fade" },
    ]
    render(<ChatSuggestions items={items} onPick={onPick} />)
    expect(screen.getAllByRole("button")).toHaveLength(2)
    await userEvent.click(screen.getByRole("button", { name: "Add a fade" }))
    expect(onPick).toHaveBeenCalledWith(items[1])
  })
})
