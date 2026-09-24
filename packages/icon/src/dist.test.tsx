import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

/**
 * Loads the built CommonJS bundle without mocks. The bundle inlines nice-icons,
 * whose code requires nice-styles at runtime — this fails with
 * "Cannot find module 'nice-styles'" if that dependency is not declared.
 * Requires `npm run build` first.
 */
describe("dist bundle", () => {
  it("loads and renders a real Icon", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { default: Icon } = require("../dist/index.js")
    const { container } = render(<Icon name="check" />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })
})
