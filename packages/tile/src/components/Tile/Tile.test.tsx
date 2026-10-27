import * as React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getToken } from "nice-react-styles"
import Tile from "./Tile"

/** Text of every <style> tag styled-components injected into the document. */
const getInjectedCss = () =>
  Array.from(document.querySelectorAll("style"))
    .map((element) => element.textContent)
    .join("\n")

describe("Tile", () => {
  it("default background and text color read the tile.* base tokens", () => {
    render(<Tile>content</Tile>)
    const css = getInjectedCss()
    expect(css).toContain(`background-color:${getToken("tile.backgroundColor:base")}`)
    expect(css).toContain(`color:${getToken("tile.color:base")}`)
  })
})
