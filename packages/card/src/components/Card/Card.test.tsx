import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { getToken } from "@niceprototypes/styles"
import Card from "./Card"
import CardHeader from "../CardHeader/CardHeader"
import CardBody from "../CardBody/CardBody"
import CardFooter from "../CardFooter/CardFooter"

/** CSS text of every rule whose selector starts at one of `element`'s classes. */
function cssFor(element: Element): string {
  const css = Array.from(document.head.querySelectorAll("style"))
    .map(tag => tag.textContent ?? "")
    .join("\n")
  return Array.from(element.classList)
    .flatMap(className => css.match(new RegExp(`\\.${className}[^{]*\\{[^}]*\\}`, "g")) ?? [])
    .join("\n")
}

describe("Card", () => {
  it("renders a static div with the outline tokens by default", () => {
    const { container } = render(<Card>Content</Card>)
    const root = container.firstElementChild!
    expect(root.tagName).toBe("DIV")
    expect(root).not.toHaveAttribute("role")
    const css = cssFor(root)
    expect(css).toContain("flex-direction:column")
    expect(css).toContain(`border-color:${getToken("card.borderColor:base")}`)
    expect(css).toContain(`border-width:${getToken("card.borderWidth:base")}`)
    expect(css).toContain(`border-radius:${getToken("card.borderRadius:base")}`)
    expect(css).toContain(`padding:${getToken("card.padding:base")}`)
    expect(css).toContain(`gap:${getToken("card.gap:base")}`)
    expect(css).toContain(`background-color:${getToken("card.backgroundColor:base")}`)
    expect(css).toContain("box-shadow:none")
  })

  it("elevated: the elevated shadow and a hidden border", () => {
    const { container } = render(<Card variant="elevated">Content</Card>)
    const css = cssFor(container.firstElementChild!)
    expect(css).toContain(`box-shadow:${getToken("card.boxShadow:elevated")}`)
    expect(css).toContain("border-color:transparent")
  })

  it("filled: the raised background and a hidden border", () => {
    const { container } = render(<Card variant="filled">Content</Card>)
    const css = cssFor(container.firstElementChild!)
    expect(css).toContain(`background-color:${getToken("card.backgroundColor:raised")}`)
    expect(css).toContain("border-color:transparent")
  })

  it("reads padding, gap, borderRadius and backgroundColor props from tokens", () => {
    const { container } = render(
      <Card padding="large" gap="small" borderRadius="small" backgroundColor="success">
        Content
      </Card>,
    )
    const css = cssFor(container.firstElementChild!)
    expect(css).toContain(`padding-top:${getToken("gap", "large")}`)
    expect(css).toContain(`gap:${getToken("gap", "small")}`)
    expect(css).toContain(`border-radius:${getToken("borderRadius", "small")}`)
    expect(css).toContain(`background-color:${getToken("card.backgroundColor:success")}`)
  })

  it("renders a button that Enter and click activate when onClick is set", async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(<Card onClick={onClick}>Content</Card>)
    const button = screen.getByRole("button", { name: "Content" })
    expect(button).toHaveAttribute("type", "button")
    expect(button).not.toHaveAttribute("aria-pressed")
    await user.click(button)
    button.focus()
    await user.keyboard("{Enter}")
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it("is a toggle button with the selected border when selected", () => {
    render(
      <Card onClick={() => {}} selected>
        Content
      </Card>,
    )
    const button = screen.getByRole("button", { pressed: true })
    expect(cssFor(button)).toContain(`border-color:${getToken("card.borderColor:selected")}`)
  })

  it("renders a link when href is set", () => {
    render(<Card href="/plans">Content</Card>)
    expect(screen.getByRole("link", { name: "Content" })).toHaveAttribute("href", "/plans")
  })

  it("does not call onClick when a disabled button", async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(
      <Card onClick={onClick} disabled>
        Content
      </Card>,
    )
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
    expect(cssFor(button)).toContain(`opacity:${getToken("card.disabledOpacity:base")}`)
  })

  it("marks a disabled link aria-disabled and does not navigate or call onClick", async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(
      <Card href="#plans" onClick={onClick} disabled>
        Content
      </Card>,
    )
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("aria-disabled", "true")
    await user.click(link)
    expect(onClick).not.toHaveBeenCalled()
    expect(window.location.hash).toBe("")
  })

  it("draws the focus ring and hover only on interactive cards", () => {
    const { container, rerender } = render(<Card>Content</Card>)
    expect(cssFor(container.firstElementChild!)).not.toContain(":hover")
    rerender(<Card onClick={() => {}}>Content</Card>)
    const css = cssFor(screen.getByRole("button"))
    expect(css).toContain(`border-color:${getToken("card.hover.borderColor:base")}`)
    expect(css).toContain(`${getToken("card.focusRing.width:base")} solid ${getToken("card.focusRing.color:base")}`)
  })

  it("forwards ref to the root", () => {
    const ref = React.createRef<HTMLElement>()
    render(
      <Card ref={ref} href="/plans">
        Content
      </Card>,
    )
    expect(ref.current).toBe(screen.getByRole("link"))
  })

  it("warns in development when an interactive card contains an interactive element", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {})
    render(
      <Card href="/plans">
        <a href="/other">Other</a>
      </Card>,
    )
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("@niceprototypes/card"))
    warn.mockClear()
    render(
      <Card>
        <a href="/other">Other</a>
      </Card>,
    )
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })
})

describe("CardHeader, CardBody, CardFooter", () => {
  it("renders title, description and end content in order", () => {
    const { container } = render(
      <Card>
        <CardHeader title="Plan" description="Billed monthly." end={<span>Active</span>} />
      </Card>,
    )
    expect(screen.getByRole("heading", { level: 3, name: "Plan" })).toBeInTheDocument()
    expect(container.textContent).toBe("PlanBilled monthly.Active")
  })

  it("passes titleProps to the title Ink", () => {
    render(<CardHeader title="Plan" titleProps={{ as: "h2" }} />)
    expect(screen.getByRole("heading", { level: 2, name: "Plan" })).toBeInTheDocument()
  })

  it("renders body content and a footer row aligned to the end by default", () => {
    render(
      <Card>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>,
    )
    expect(screen.getByText("Body")).toBeInTheDocument()
    expect(cssFor(screen.getByText("Footer"))).toContain("justify-content:flex-end")
  })
})
