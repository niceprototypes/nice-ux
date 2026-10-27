import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getToken } from "nice-react-styles"
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
      expect(css).toContain(`font-size:${getToken("ink.fontSize:small")}`)
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
})
