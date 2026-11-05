import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import type { FontSizeType } from "@niceprototypes/styles"
import Markdown from "@niceprototypes/markdown"
import type { MarkdownLinkComponentType, MarkdownOverridesType, MarkdownProps } from "@niceprototypes/markdown"
import LifecycleStory from "@niceprototypes/docs/components/LifecycleStory"

const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly FontSizeType[]

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/** A link component standing in for a router link: it marks its links for the test. */
const RouterLink: MarkdownLinkComponentType = ({ href, children }) => (
  <a href={href} data-router-link>
    {children}
  </a>
)
const LINK_COMPONENT_OPTIONS = { [NONE]: undefined, router: RouterLink }

/** An override replacing the Ink paragraph with a plain one. */
const PLAIN_PARAGRAPHS: MarkdownOverridesType = { p: ({ children }: { children?: React.ReactNode }) => <p data-plain>{children}</p> }
const OVERRIDES_OPTIONS = { [NONE]: undefined, plainParagraphs: PLAIN_PARAGRAPHS }

/** An assistant reply using every default: a heading, paragraphs, a list, inline and fenced code, a link. */
const REPLY = `## Easing the slide

The slide reads stiff because it starts and stops at full speed. Give it an \`ease-out\` curve:

- shorten the duration to 240ms
- ease out, so it settles into place
- keep the fade on the same timing

\`\`\`css
.slide {
  transition: transform 240ms ease-out;
}
\`\`\`

The [timing guide](/docs/timing) lists the other curves.`

/** The reply as it streams: each step adds the next few words. */
const STREAM = (() => {
  const words = REPLY.split(/(?<=\s)/)
  const chunk = Math.ceil(words.length / 8)
  return Array.from({ length: 8 }, (_, index) => words.slice(0, (index + 1) * chunk).join(""))
})()

const meta = {
  title: "Components/Markdown",
  component: Markdown,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Markdown>

export default meta

type Story = StoryObj<MarkdownProps>

export const Playground: Story = {
  args: {
    children: REPLY,
    size: undefined,
    linkComponent: undefined,
    overrides: undefined,
  },
  argTypes: {
    children: { control: "text", table: { category: "Content" } },
    size: {
      control: "select",
      options: [NONE, ...SIZE_OPTIONS],
      mapping: { [NONE]: undefined },
      table: { category: "Appearance" },
    },
    linkComponent: {
      control: "select",
      options: Object.keys(LINK_COMPONENT_OPTIONS),
      mapping: LINK_COMPONENT_OPTIONS,
      table: { category: "Behavior" },
    },
    overrides: {
      control: "select",
      options: Object.keys(OVERRIDES_OPTIONS),
      mapping: OVERRIDES_OPTIONS,
      table: { category: "Behavior" },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 2, name: "Easing the slide" })).toBeInTheDocument()
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3)
    const codes = [...canvasElement.querySelectorAll("code")].map(code => code.textContent)
    await expect(codes).toContain("ease-out")
    await expect(canvasElement.querySelector("pre")?.textContent).toContain("transition: transform 240ms ease-out;")
    await expect(canvas.getByRole("link", { name: "timing guide" })).toHaveAttribute("href", "/docs/timing")
  },
}

/** `linkComponent` renders every link. */
export const LinkComponent: Story = {
  ...Playground,
  args: { ...Playground.args, linkComponent: RouterLink },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("link", { name: "timing guide" })).toHaveAttribute("data-router-link")
  },
}

/** `size` sets the paragraphs' and list items' font size; headings keep theirs. */
export const Size: Story = {
  ...Playground,
  args: { ...Playground.args, size: "smaller" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const fontSize = (element: Element) => parseFloat(getComputedStyle(element).fontSize)
    const paragraph = canvas.getByText(/The slide reads stiff/)
    const item = canvas.getByText("shorten the duration to 240ms")
    await expect(fontSize(item)).toBe(fontSize(paragraph))
    await expect(fontSize(paragraph)).toBeLessThan(fontSize(canvas.getByRole("heading", { level: 2 })))
  },
}

/** `overrides` replace a default element. */
export const Overrides: Story = {
  ...Playground,
  args: { ...Playground.args, overrides: PLAIN_PARAGRAPHS },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText(/The slide reads stiff/).closest("p")).toHaveAttribute("data-plain")
  },
}

/** A reply streaming in, a few words per step, then held complete. */
export const Lifecycle: Story = {
  args: Playground.args,
  render: args => (
    <LifecycleStory
      steps={STREAM.map((text, index) => ({
        label: index === STREAM.length - 1 ? "complete" : `streaming ${index + 1}`,
        props: { children: text },
        duration: index === STREAM.length - 1 ? "long" : "base",
      }))}
      render={({ children }) => <Markdown {...args}>{children}</Markdown>}
    />
  ),
}
