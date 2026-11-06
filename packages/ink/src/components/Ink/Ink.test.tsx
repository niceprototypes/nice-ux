import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getToken } from "@niceprototypes/styles"
import Ink from "./Ink"

/** Text of every <style> tag styled-components injected into the document. */
const getInjectedCss = () =>
  Array.from(document.querySelectorAll("style"))
    .map((element) => element.textContent)
    .join("\n")

describe("Ink", () => {
  describe("italic", () => {
    it("is upright by default", () => {
      render(<Ink>text</Ink>)
      expect(screen.getByText("text")).not.toHaveStyle("font-style: italic")
    })

    it("applies font-style: italic when set", () => {
      render(<Ink italic>text</Ink>)
      expect(screen.getByText("text")).toHaveStyle("font-style: italic")
    })
  })

  describe("reads its own ink.* tokens", () => {
    it("default span reads ink font family, size and line height", () => {
      render(<Ink>text</Ink>)
      const css = getInjectedCss()
      expect(css).toContain(`font-family:${getToken("ink.fontFamily:base")}`)
      expect(css).toContain(`font-size:${getToken("ink.fontSize:base")}`)
      expect(css).toContain(`line-height:${getToken("ink.lineHeight:base")}`)
    })

    it("heading reads ink heading family, bold weight and condensed line height", () => {
      render(<Ink as="h1">text</Ink>)
      const css = getInjectedCss()
      expect(css).toContain(`font-family:${getToken("ink.fontFamily:heading")}`)
      expect(css).toContain(`font-size:${getToken("ink.fontSize:larger")}`)
      expect(css).toContain(`font-weight:${getToken("ink.fontWeight:bold")}`)
      expect(css).toContain(`line-height:${getToken("ink.lineHeight:condensed")}`)
    })

    it("code reads ink code family", () => {
      render(<Ink code>text</Ink>)
      expect(getInjectedCss()).toContain(`font-family:${getToken("ink.fontFamily:code")}`)
    })

    it("explicit size and lineHeight read the matching ink variants", () => {
      render(<Ink size="large" lineHeight="single">text</Ink>)
      const css = getInjectedCss()
      expect(css).toContain(`font-size:${getToken("ink.fontSize:large")}`)
      expect(css).toContain(`line-height:${getToken("ink.lineHeight:single")}`)
    })
  })
  describe("as", () => {
    it("renders h5 and h6 with the heading font family", () => {
      render(<Ink as="h6">text</Ink>)
      expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument()
      expect(getInjectedCss()).toContain(`font-family:${getToken("ink.fontFamily:heading")}`)
    })

    it("renders a link with href and the link color by default", () => {
      render(<Ink as="a" href="/docs">text</Ink>)
      expect(screen.getByRole("link", { name: "text" })).toHaveAttribute("href", "/docs")
      expect(getInjectedCss()).toContain(`color:${getToken("ink.color:link")}`)
    })

    it("drops href on elements other than a", () => {
      render(<Ink href="/docs">text</Ink>)
      expect(screen.getByText("text")).not.toHaveAttribute("href")
    })

    it.each(["li", "blockquote", "cite", "mark", "s"] as const)("renders %s", (as) => {
      render(<Ink as={as}>text</Ink>)
      expect(screen.getByText("text").tagName).toBe(as.toUpperCase())
    })
  })

  describe("letterSpacing and maxWidth", () => {
    it("read the matching ink tokens", () => {
      render(<Ink letterSpacing="wide" maxWidth="prose">text</Ink>)
      const css = getInjectedCss()
      expect(css).toContain(`letter-spacing:${getToken("ink.letterSpacing:wide")}`)
      expect(css).toContain(`max-width:${getToken("ink.maxWidth:prose")}`)
    })
  })

  describe("decoration", () => {
    it("sets text-decoration-line", () => {
      render(<Ink decoration="underline">text</Ink>)
      expect(screen.getByText("text")).toHaveStyle("text-decoration-line: underline")
    })
  })

  describe("truncate", () => {
    it("clips to one line with an ellipsis, as a block for inline elements", () => {
      render(<Ink truncate>text</Ink>)
      expect(screen.getByText("text")).toHaveStyle({ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" })
    })
  })
})
