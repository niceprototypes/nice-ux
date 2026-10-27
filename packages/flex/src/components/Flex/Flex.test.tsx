import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Flex from "."
import type { FlexAsType } from "./Flex.types"

const ELEMENTS: FlexAsType[] = ["div", "nav", "header", "section", "footer", "main", "article", "aside", "ul", "ol", "li"]

describe("Flex", () => {
  it("renders a div by default", () => {
    const { container } = render(<Flex>Content</Flex>)
    expect(container.firstElementChild!.tagName).toBe("DIV")
  })

  it.each(ELEMENTS)("renders as %s", (element) => {
    const { container } = render(<Flex as={element}>Content</Flex>)
    expect(container.firstElementChild!.tagName).toBe(element.toUpperCase())
  })

  it("keeps the flex styles on the element it renders as", () => {
    const { container: asDiv } = render(<Flex gap="small">Content</Flex>)
    const { container: asNav } = render(<Flex as="nav" gap="small">Content</Flex>)
    expect(asNav.firstElementChild!.className).toBe(asDiv.firstElementChild!.className)
  })

  it("forwards aria and id props, and drops layout props, with as", () => {
    render(
      <Flex as="nav" aria-label="Primary" id="primary" direction="column" gap="small">
        Content
      </Flex>,
    )
    const nav = screen.getByRole("navigation", { name: "Primary" })
    expect(nav).toHaveAttribute("id", "primary")
    expect(nav).not.toHaveAttribute("direction")
    expect(nav).not.toHaveAttribute("gap")
    expect(nav).not.toHaveAttribute("as")
  })

  it("applies an as override from breakpoints", () => {
    const { container } = render(
      <Flex as="ul" breakpoints={{ "phone+": { as: "ol" } }}>
        <Flex as="li">Item</Flex>
      </Flex>,
    )
    expect(container.firstElementChild!.tagName).toBe("OL")
    expect(screen.getByRole("listitem")).toHaveTextContent("Item")
  })
})
