import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, spyOn, within } from "storybook/test"
import type { GapType } from "@niceprototypes/styles"
import Code from "@niceprototypes/code"

/**
 * Option lists. `margin` is typed against GapType on disk. `language` is a plain string
 * in CodeProps; the options are the fence languages the highlighter maps
 * (packages/code/src/utilities/highlightCode.ts).
 */
const MARGIN_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly GapType[]
const LANGUAGE_OPTIONS = ["none", "tsx", "ts", "typescript", "jsx", "js", "javascript", "css", "bash", "sh", "shell", "html", "xml", "json"]

const SAMPLE = `import Code from "@niceprototypes/code"

<Code code={source} language="tsx" />`

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
  },
  argTypes: {
    code: { control: "text" },
    language: { control: "select", options: LANGUAGE_OPTIONS, mapping: { none: undefined } },
    showLabel: { control: "boolean" },
    copyOnClick: { control: "boolean" },
    inlined: { control: "boolean" },
    fit: { control: "boolean" },
    margin: { control: "select", options: MARGIN_OPTIONS },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Code>

export default meta

type Story = StoryObj<typeof meta>

/** The rendered Code root: the nearest ancestor of the highlighted block that sets the card's max-width. */
const root = (canvasElement: HTMLElement) => {
  let element = canvasElement.querySelector(".shiki")!.parentElement!
  while (getComputedStyle(element).maxWidth === "none") element = element.parentElement!
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
