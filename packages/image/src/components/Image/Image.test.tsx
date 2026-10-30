import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Image from "./Image"
import { getThumbnailLayer } from "../../utilities/getThumbnailLayer"

const THUMBNAIL = "data:image/png;base64,iVBORw0KGgo="
const THUMBNAIL_URL = "/photo-16.png"

// jsdom's CSS parser drops the SVG data-URI layer; the blurred rendering is covered by the Storybook play tests.
describe("getThumbnailLayer", () => {
  it("wraps a data URI in a blurred SVG", () => {
    const layer = getThumbnailLayer(THUMBNAIL, "cover")
    expect(layer.startsWith('url("data:image/svg+xml')).toBe(true)
    const svg = decodeURIComponent(layer)
    expect(svg).toContain("feGaussianBlur")
    expect(svg).toContain(`href='${THUMBNAIL}'`)
    expect(svg).toContain("preserveAspectRatio='xMidYMid slice'")
  })

  it("paints a URL as-is", () => {
    expect(getThumbnailLayer(THUMBNAIL_URL)).toBe(`url("${THUMBNAIL_URL}")`)
  })
})

describe("Image thumbnail", () => {
  it("paints the thumbnail on the img until it loads", () => {
    render(<Image src="/photo.jpg" alt="Photo" thumbnail={THUMBNAIL_URL} aspectRatio="4/3" />)
    const element = screen.getByRole("img")
    expect(element.style.backgroundImage).toContain(THUMBNAIL_URL)
    fireEvent.load(element)
    expect(element.style.backgroundImage).toBe("")
  })

  it("renders no background for thumbnail={false}", () => {
    render(<Image src="/photo.jpg" alt="Photo" thumbnail={false} />)
    expect(screen.getByRole("img").style.backgroundImage).toBe("")
  })

  it("passes loading and fetchPriority through and decodes async", () => {
    render(<Image src="/photo.jpg" alt="Photo" loading="lazy" fetchPriority="high" />)
    const element = screen.getByRole("img")
    expect(element).toHaveAttribute("loading", "lazy")
    expect(element).toHaveAttribute("fetchpriority", "high")
    expect(element).toHaveAttribute("decoding", "async")
  })

  it("leaves loading unset by default", () => {
    render(<Image src="/photo.jpg" alt="Photo" />)
    expect(screen.getByRole("img")).not.toHaveAttribute("loading")
  })

  // The layered div background is checked in Storybook (jsdom drops multi-layer values).
  it("probes the div's src so the thumbnail can clear", () => {
    const probes: HTMLImageElement[] = []
    const NativeImage = window.Image
    jest.spyOn(window, "Image").mockImplementation(() => {
      const probe = new NativeImage()
      probes.push(probe)
      return probe
    })
    render(<Image as="div" src="/photo.jpg" alt="Photo" thumbnail={THUMBNAIL_URL} aspectRatio="4/3" />)
    expect(probes).toHaveLength(1)
    expect(probes[0].src).toMatch(/\/photo\.jpg$/)
    expect(probes[0].onload).toEqual(expect.any(Function))
    jest.restoreAllMocks()
  })

  it("warns once when a thumbnail is set without reserved space", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {})
    render(<Image src="/a.jpg" alt="A" thumbnail={THUMBNAIL} />)
    render(<Image src="/b.jpg" alt="B" thumbnail={THUMBNAIL} />)
    expect(warn).toHaveBeenCalledTimes(1)
    warn.mockRestore()
  })
})
