import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { StickySection } from "@niceprototypes/scroll"
import type { StickySectionElementType, StickySectionProps } from "@niceprototypes/scroll"
import Ink from "@niceprototypes/ink"

/** Wrapper elements for `as`, typed against the intrinsic-element union. */
const AS_OPTIONS = ["section", "div", "article", "aside", "main", "header", "footer", "nav"] as const satisfies readonly StickySectionElementType[]

/** The `render` preset from StickySection.mdx: an `<article>` carrying the id. */
const RENDER_OPTIONS = ["article"] as const

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * PlaygroundArgs
 *
 * StickySectionProps with `render` replaced by a preset name, recomposed in `render`.
 */
type PlaygroundArgs = Omit<StickySectionProps, "render"> & {
  render?: (typeof RENDER_OPTIONS)[number] | typeof NONE
}

const meta = {
  title: "Components/Scroll/StickySection",
  component: StickySection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof StickySection>

export default meta

type Story = StoryObj<PlaygroundArgs>

const HIDDEN = { table: { disable: true } }

/** The element carrying the section id. */
const section = (canvasElement: HTMLElement, id: string) => canvasElement.querySelector<HTMLElement>(`#${id}`)!

export const Playground: Story = {
  args: {
    id: "about",
    children: "About Us",
    as: "section",
    render: NONE,
  },
  argTypes: {
    id: { control: "text", table: { category: "Element" } },
    children: { control: "text", table: { category: "Content" } },
    as: { control: "select", options: AS_OPTIONS, table: { category: "Element" } },
    render: {
      control: "select",
      options: [NONE, ...RENDER_OPTIONS],
      mapping: { [NONE]: undefined },
      table: { category: "Element" },
    },
    className: HIDDEN,
    style: HIDDEN,
  },
  // `children` arrives as text; the section holds it as a heading, as in StickySection.mdx.
  render: ({ render, children, ...rest }) => (
    <StickySection
      {...rest}
      render={render ? ({ id, children: content }) => <article id={id}>{content}</article> : undefined}
    >
      <Ink as="h2">{children}</Ink>
    </StickySection>
  ),
  play: async ({ canvasElement }) => {
    const element = section(canvasElement, "about")
    await expect(element.tagName).toBe("SECTION")
    await expect(within(element).getByRole("heading", { name: "About Us" })).toBeInTheDocument()
  },
}

export const As: Story = {
  ...Playground,
  args: { ...Playground.args, id: "hero", as: "div" },
  play: async ({ canvasElement }) => {
    await expect(section(canvasElement, "hero").tagName).toBe("DIV")
  },
}

export const Render: Story = {
  ...Playground,
  args: { ...Playground.args, id: "custom", as: "aside", render: "article" },
  play: async ({ canvasElement }) => {
    // `render` wins over `as`.
    const element = section(canvasElement, "custom")
    await expect(element.tagName).toBe("ARTICLE")
    await expect(within(element).getByRole("heading", { name: "About Us" })).toBeInTheDocument()
  },
}
