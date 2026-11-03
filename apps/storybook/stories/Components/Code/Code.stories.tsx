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

/** Taller than the `code.maxHeight` token, so the block collapses above the drag bar. */
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
    fit: false,
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

/** The rendered Code root: the nearest ancestor of the highlighted block with the card's border. */
const root = (canvasElement: HTMLElement) => {
  let element = canvasElement.querySelector(".shiki")!.parentElement!
  while (getComputedStyle(element).borderTopStyle !== "solid") element = element.parentElement!
  return element
}

export const Playground: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement)
    await expect(canvasElement.querySelector(".shiki")).toBeTruthy()
    const copy = canvas.getByRole("button", { name: "Copy TSX" })
    const writeText = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    await userEvent.click(root(canvasElement))
    await expect(writeText).toHaveBeenCalledWith(SAMPLE)
    writeText.mockClear()
    // The copy icon copies from the keyboard too.
    copy.focus()
    await userEvent.keyboard("{Enter}")
    await expect(writeText).toHaveBeenCalledWith(SAMPLE)
    writeText.mockRestore()
    // Short code fits under maxHeight: no drag bar.
    await expect(canvas.queryByRole("separator")).not.toBeInTheDocument()
  },
}

export const Collapsed: Story = {
  args: { code: LONG_SAMPLE },
  play: async ({ canvasElement, userEvent }) => {
    const card = within(root(canvasElement))
    const height = () => root(canvasElement).getBoundingClientRect().height
    const collapsedHeight = height()
    const writeText = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    // The drag bar's keys show the whole code (End) and return to the cap (Home); a click on it does not copy.
    const bar = card.getByRole("separator", { name: "Code height" })
    await userEvent.click(bar)
    await expect(writeText).not.toHaveBeenCalled()
    await userEvent.keyboard("{End}")
    await expect(height()).toBeGreaterThan(collapsedHeight)
    await expect(bar).toHaveAttribute("aria-valuenow", bar.getAttribute("aria-valuemax"))
    await userEvent.keyboard("{Home}")
    await expect(height()).toBe(collapsedHeight)
    writeText.mockRestore()
  },
}

export const Uncollapsed: Story = {
  args: { code: LONG_SAMPLE, maxHeight: "none" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole("separator")).not.toBeInTheDocument()
  },
}

export const HiddenLabel: Story = {
  args: { showLabel: false },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole("button", { name: "Copy TSX" })).not.toBeInTheDocument()
  },
}

export const Inlined: Story = {
  args: { code: "border.width", language: undefined, inlined: true },
  play: async ({ canvasElement, userEvent }) => {
    const chip = within(canvasElement).getByText("border.width")
    // A chip: no copy icon, no border.
    await expect(within(canvasElement).queryByRole("button", { name: /^Copy/ })).not.toBeInTheDocument()
    await expect(getComputedStyle(chip.closest("span[class]")!).borderTopStyle).toBe("none")
    const writeText = spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    await userEvent.hover(chip)
    await expect(await within(document.body).findByText("Copy to clipboard")).toBeInTheDocument()
    await userEvent.click(chip)
    await expect(writeText).toHaveBeenCalledWith("border.width")
    writeText.mockRestore()
  },
}

export const UnmappedLanguage: Story = {
  args: { language: "python" },
  play: async ({ canvasElement }) => {
    // Unmapped languages fall back to plain text; the copy icon names the language upper-cased.
    await expect(within(canvasElement).getByRole("button", { name: "Copy PYTHON" })).toBeInTheDocument()
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

export const Fit: Story = {
  args: { fit: true },
  play: async ({ canvasElement }) => {
    // Hugged: the card is as wide as its code, narrower than the canvas it would otherwise fill.
    await expect(root(canvasElement).getBoundingClientRect().width).toBeLessThan(canvasElement.getBoundingClientRect().width)
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
