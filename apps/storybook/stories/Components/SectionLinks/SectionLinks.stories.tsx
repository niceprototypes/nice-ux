import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor, within } from "storybook/test"
import { setTokens } from "@niceprototypes/styles"
import { StickySection, StickySectionLinks } from "@niceprototypes/scroll"
import type { StickySectionLink, StickySectionLinksProps } from "@niceprototypes/scroll"
import Button from "@niceprototypes/button"
import Ink from "@niceprototypes/ink"

/** Each section is one viewport tall, so exactly one is in view at a time. */
const getToken = setTokens({ sectionHeight: { base: "100vh" } }, "sectionLinksStory")

/** The sections from StickySectionLinks.mdx; `linkCount` takes the first n. */
const LINKS: StickySectionLink[] = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
]

/** The render presets from StickySectionLinksCustom.mdx. */
const RENDER_LINK_OPTIONS = ["button"] as const
const RENDER_WRAPPER_OPTIONS = ["nav"] as const

/** An unset choice for optional selects; `mapping` turns it into `undefined`. */
const NONE = "none"

/**
 * PlaygroundArgs
 *
 * StickySectionLinksProps with `links` replaced by `linkCount`, and the render props by
 * preset names, recomposed in `render`.
 */
type PlaygroundArgs = Omit<StickySectionLinksProps, "links" | "renderLink" | "renderWrapper"> & {
  linkCount: number
  renderLink?: (typeof RENDER_LINK_OPTIONS)[number] | typeof NONE
  renderWrapper?: (typeof RENDER_WRAPPER_OPTIONS)[number] | typeof NONE
}

const meta = {
  title: "Components/Scroll/SectionLinks",
  component: StickySectionLinks,
  parameters: {
    layout: "padded",
  },
  // The sections the links point at.
  decorators: [
    Story => (
      <>
        <Story />
        {LINKS.map(link => (
          <StickySection
            key={link.href}
            id={link.href.slice(1)}
            style={{ height: getToken("sectionLinksStory.sectionHeight:base") }}
          >
            <Ink as="h2">{link.label}</Ink>
          </StickySection>
        ))}
      </>
    ),
  ],
} satisfies Meta<typeof StickySectionLinks>

export default meta

type Story = StoryObj<PlaygroundArgs>

const optionalSelect = (options: readonly string[], category: string) => ({
  control: "select" as const,
  options: [NONE, ...options],
  mapping: { [NONE]: undefined },
  table: { category },
})

const link = (canvasElement: HTMLElement, name: string) => within(canvasElement).getByRole("link", { name })

/** The window scroll position that puts the section `id` at the top, as the click handler computes it. */
const sectionScrollY = (id: string) => document.getElementById(id)!.getBoundingClientRect().top + window.scrollY + 1

export const Playground: Story = {
  args: {
    linkCount: LINKS.length,
    renderLink: NONE,
    renderWrapper: NONE,
  },
  argTypes: {
    linkCount: { control: { type: "range", min: 1, max: LINKS.length, step: 1 }, table: { category: "Links" } },
    renderLink: optionalSelect(RENDER_LINK_OPTIONS, "Render"),
    renderWrapper: optionalSelect(RENDER_WRAPPER_OPTIONS, "Render"),
    className: { table: { disable: true } },
  },
  // Recompose the presets; the result is checked against StickySectionLinksProps.
  render: ({ linkCount, renderLink, renderWrapper, ...rest }) => {
    const props: StickySectionLinksProps = {
      ...rest,
      links: LINKS.slice(0, linkCount),
      renderLink: renderLink
        ? (item, isActive) => (
            <Button
              as="div"
              filled={isActive}
            >
              {item.label}
            </Button>
          )
        : undefined,
      renderWrapper: renderWrapper ? children => <nav aria-label="Sections">{children}</nav> : undefined,
    }
    return <StickySectionLinks {...props} />
  },
  play: async ({ canvasElement, userEvent }) => {
    window.scrollTo(0, 0)
    for (const { href, label } of LINKS) await expect(link(canvasElement, label)).toHaveAttribute("href", href)
    // A click scrolls the section to the top of the viewport.
    await userEvent.click(link(canvasElement, "Services"))
    await waitFor(() => expect(window.scrollY).toBeCloseTo(sectionScrollY("services"), 0))
    await userEvent.click(link(canvasElement, "About"))
    await waitFor(() => expect(window.scrollY).toBeCloseTo(sectionScrollY("about"), 0))
    window.scrollTo(0, 0)
  },
}

export const LinkCount: Story = {
  ...Playground,
  args: { ...Playground.args, linkCount: 2 },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole("link", { name: "Contact" })).not.toBeInTheDocument()
    await expect(link(canvasElement, "Services")).toBeInTheDocument()
  },
}

export const RenderLink: Story = {
  ...Playground,
  args: { ...Playground.args, renderLink: "button" },
  play: async ({ canvasElement, userEvent }) => {
    window.scrollTo(0, 0)
    // The section in view is active: its link renders filled, the others do not.
    const background = (label: string) => getComputedStyle(link(canvasElement, label).firstElementChild!).backgroundColor
    await userEvent.click(link(canvasElement, "Contact"))
    await waitFor(() => expect(background("Contact")).not.toBe(background("About")))
    await waitFor(() => expect(background("About")).toBe(background("Services")))
    window.scrollTo(0, 0)
  },
}

export const RenderWrapper: Story = {
  ...Playground,
  args: { ...Playground.args, renderWrapper: "nav" },
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole("navigation", { name: "Sections" })
    await expect(within(nav).getAllByRole("link")).toHaveLength(LINKS.length)
    await expect(nav.parentElement).toHaveAttribute("data-sectionlinks")
  },
}

/** The computed value of a CSS property set to `value`, read from a throwaway element in the canvas. */
const resolveCss = (canvasElement: HTMLElement, property: string, value: string) => {
  const probe = document.createElement("div")
  probe.style.setProperty(property, value)
  canvasElement.appendChild(probe)
  const resolved = getComputedStyle(probe).getPropertyValue(property)
  probe.remove()
  return resolved
}

export const Active: Story = {
  ...Playground,
  play: async ({ canvasElement, userEvent }) => {
    window.scrollTo(0, 0)
    // The link to the section in view takes the active colour; the others keep the base colour.
    const color = (label: string) => getComputedStyle(link(canvasElement, label)).color
    await userEvent.click(link(canvasElement, "Services"))
    await waitFor(() =>
      expect(color("Services")).toBe(resolveCss(canvasElement, "color", getToken("scroll.sectionLinks.color:active"))),
    )
    await expect(color("About")).toBe(resolveCss(canvasElement, "color", getToken("scroll.sectionLinks.color:base")))
    window.scrollTo(0, 0)
  },
}
