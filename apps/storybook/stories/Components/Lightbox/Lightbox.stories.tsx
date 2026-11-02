import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import Lightbox from "@niceprototypes/lightbox"
import type { LightboxProps } from "@niceprototypes/lightbox"
import Ink from "@niceprototypes/ink"
import { resolveVendorImage } from "@niceprototypes/image-vendor"
import { DemoImage } from "@niceprototypes/docs/examples/Lightbox/Lightbox.styles"

const IMAGE = resolveVendorImage({ src: "10", width: "800px", height: "600px" }) ?? ""

/** The trigger presets from Lightbox/Children.mdx: the image itself, or a text link. */
const CHILDREN_OPTIONS = ["image", "text"] as const

/**
 * PlaygroundArgs
 *
 * LightboxProps with `children` replaced by a preset name, rendered in `render`.
 */
type PlaygroundArgs = Omit<LightboxProps, "children"> & {
  children: (typeof CHILDREN_OPTIONS)[number]
}

const meta = {
  title: "Components/Lightbox",
  component: Lightbox,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Lightbox>

export default meta

type Story = StoryObj<PlaygroundArgs>

const HIDDEN = { table: { disable: true } }

/** The open overlay's image: the one `<img>` rendered into `document.body`, outside the canvas. */
const overlayImage = (canvasElement: HTMLElement) =>
  Array.from(document.body.querySelectorAll("img")).find(image => !canvasElement.contains(image))

export const Playground: Story = {
  args: {
    children: "image",
    imageUrl: IMAGE,
    alt: "Mountain landscape",
    title: "Mountain landscape",
    description: "Morning light over the ridge.",
  },
  argTypes: {
    children: { control: "select", options: CHILDREN_OPTIONS, table: { category: "Content" } },
    imageUrl: { control: "text", table: { category: "Content" } },
    alt: { control: "text", table: { category: "Content" } },
    title: { control: "text", table: { category: "Caption" } },
    description: { control: "text", table: { category: "Caption" } },
    className: HIDDEN,
    style: HIDDEN,
  },
  render: ({ children, ...rest }) => (
    <Lightbox {...rest}>
      {children === "text" ? (
        <Ink color="link">View photo</Ink>
      ) : (
        <DemoImage
          src={rest.imageUrl}
          alt={rest.alt}
        />
      )}
    </Lightbox>
  ),
  play: async ({ canvasElement, args, userEvent }) => {
    const trigger = within(canvasElement).getByRole("button", { name: args.alt })
    await expect(overlayImage(canvasElement)).toBeUndefined()
    await userEvent.click(trigger)
    const image = overlayImage(canvasElement)!
    await expect(image).toHaveAttribute("src", args.imageUrl)
    await expect(image).toHaveAttribute("alt", args.alt)
    const body = within(document.body)
    await expect(body.getByText(args.title!)).toBeInTheDocument()
    await expect(body.getByText(args.description!)).toBeInTheDocument()
    await expect(document.body.style.overflow).toBe("hidden")
    // A click on the image keeps the overlay open; Escape closes it.
    await userEvent.click(image)
    await expect(overlayImage(canvasElement)).toBeDefined()
    await userEvent.keyboard("{Escape}")
    await expect(overlayImage(canvasElement)).toBeUndefined()
    await expect(document.body.style.overflow).toBe("")
  },
}

export const TextTrigger: Story = {
  ...Playground,
  args: { ...Playground.args, children: "text" },
  play: async ({ canvasElement, userEvent }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "View photo" })
    // Keyboard activation: Enter opens the overlay.
    trigger.focus()
    await userEvent.keyboard("{Enter}")
    await expect(overlayImage(canvasElement)).toBeDefined()
    await userEvent.keyboard("{Escape}")
    await expect(overlayImage(canvasElement)).toBeUndefined()
  },
}

export const NoCaption: Story = {
  ...Playground,
  args: { ...Playground.args, title: undefined, description: undefined },
  play: async ({ canvasElement, args, userEvent }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: args.alt }))
    const overlay = overlayImage(canvasElement)!.parentElement!
    // Without title and description the overlay holds the image only.
    await expect(overlay.children).toHaveLength(1)
    // A click on the backdrop closes the overlay.
    await userEvent.click(overlay)
    await expect(overlayImage(canvasElement)).toBeUndefined()
  },
}
