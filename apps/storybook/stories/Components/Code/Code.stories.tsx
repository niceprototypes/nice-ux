import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, spyOn, within } from "storybook/test"
import type { GapType } from "@niceprototypes/styles"
import Code, { type CodeMaxHeightType } from "@niceprototypes/code"

/**
 * Option lists. `margin` is typed against GapType on disk. `language` is a plain string
 * in CodeProps; the options are the fence languages the highlighter maps
 * (packages/code/src/utilities/highlightCode.ts).
 */
const MARGIN_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly GapType[]
const MAX_HEIGHT_OPTIONS = ["none", "base"] as const satisfies readonly CodeMaxHeightType[]
const LANGUAGE_OPTIONS = ["none", "tsx", "ts", "typescript", "jsx", "js", "javascript", "css", "bash", "sh", "shell", "html", "xml", "json"]

const SAMPLE = `import Code, { type CodeMaxHeightType } from "@niceprototypes/code"

<Code code={source} language="tsx" />`

/** Taller than the `code.maxHeight` token, so the block collapses behind Show more. */
const LONG_SAMPLE = `import React, { useState } from "react"
import { createPortal } from "react-dom"

const Z_INDEX = 500

// A portal renders its children into document.body.
const PortalExample = (): React.JSX.Element => {
  const [isMounted, setIsMounted] = useState(false)
  return (
    <h1 onClick={() => setIsMounted(!isMounted)}>
      {createPortal(
        <b style={{ zIndex: Z_INDEX }}>I am a child of the h1 element in the code but in the DOM I am not.</b>,
        document.body
      )}
    </h1>
  )
}

export default PortalExample`

const meta = {
  title: "Components/Code",
  component: Code,
  parameters: {
    layout: "padded",
  },
  args: {
    code: SAMPLE,
    language: "tsx",
    showLabel: true,
    copyOnClick: true,
    inlined: false,
    fit: true,
    margin: "large",
    maxHeight: "base",
  },
  argTypes: {
    code: { control: "text" },
    language: { control: "select", options: LANGUAGE_OPTIONS, mapping: { none: undefined } },
    showLabel: { control: "boolean" },
    copyOnClick: { control: "boolean" },
    inlined: { control: "boolean" },
    fit: { control: "boolean" },
    margin: { control: "select", options: MARGIN_OPTIONS },
    maxHeight: { control: "select", options: MAX_HEIGHT_OPTIONS },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Code>

export default meta

type Story = StoryObj<typeof meta>

/** The rendered Code root: the nearest ancestor of the highlighted block that sets the card's fixed max-width (the scroll container's 100% is skipped). */
const root = (canvasElement: HTMLElement) => {
  let element = canvasElement.querySelector(".shiki")!.parentElement!
  while (["none", "100%"].includes(getComputedStyle(element).maxWidth)) element = element.parentElement!
  return element
}

export const Playground: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement)
    await expect(canvasElement.querySelector(".shiki")).toBeTruthy()
    await expect(canvas.getByText("TSX")).toBeInTheDocument()
    const writeText = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    await userEvent.click(root(canvasElement))
    await expect(writeText).toHaveBeenCalledWith(SAMPLE)
    writeText.mockRestore()
    // Short code fits under maxHeight: no toggle.
    await expect(within(root(canvasElement)).queryByRole("button")).not.toBeInTheDocument()
  },
}

export const Collapsed: Story = {
  args: { code: LONG_SAMPLE },
  play: async ({ canvasElement, userEvent }) => {
    const card = within(root(canvasElement))
    const height = () => root(canvasElement).getBoundingClientRect().height
    const collapsedHeight = height()
    const writeText = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    // Expanding shows the whole block, and the toggle click does not copy. The exact name
    // checks the chevron icon stays out of it (its SVG carries a <style> element).
    await userEvent.click(card.getByRole("button", { name: "Show more" }))
    await expect(writeText).not.toHaveBeenCalled()
    await expect(height()).toBeGreaterThan(collapsedHeight)
    await userEvent.click(card.getByRole("button", { name: "Show less" }))
    await expect(height()).toBe(collapsedHeight)
    writeText.mockRestore()
  },
}

export const Uncollapsed: Story = {
  args: { code: LONG_SAMPLE, maxHeight: "none" },
  play: async ({ canvasElement }) => {
    await expect(within(root(canvasElement)).queryByRole("button")).not.toBeInTheDocument()
  },
}

export const HiddenLabel: Story = {
  args: { showLabel: false },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByText("TSX")).not.toBeInTheDocument()
  },
}

export const UnmappedLanguage: Story = {
  args: { language: "python" },
  play: async ({ canvasElement }) => {
    // Unmapped languages fall back to plain text and an upper-cased label.
    await expect(within(canvasElement).getByText("PYTHON")).toBeInTheDocument()
  },
}

export const NoCopy: Story = {
  args: { copyOnClick: false },
  play: async ({ canvasElement, userEvent }) => {
    const writeText = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    await userEvent.click(root(canvasElement))
    await expect(writeText).not.toHaveBeenCalled()
    writeText.mockRestore()
  },
}

export const Inlined: Story = {
  args: { inlined: true },
  play: async ({ canvasElement }) => {
    // No chrome: no label and a transparent, borderless root.
    await expect(within(canvasElement).queryByText("TSX")).not.toBeInTheDocument()
    const style = getComputedStyle(root(canvasElement))
    await expect(style.backgroundColor).toBe("rgba(0, 0, 0, 0)")
    await expect(style.borderTopStyle).toBe("none")
  },
}

export const Fill: Story = {
  args: { fit: false },
  play: async ({ canvasElement }) => {
    const width = root(canvasElement).getBoundingClientRect().width
    const shiki = canvasElement.querySelector(".shiki")!.getBoundingClientRect().width
    await expect(width).toBeGreaterThan(shiki)
  },
}
