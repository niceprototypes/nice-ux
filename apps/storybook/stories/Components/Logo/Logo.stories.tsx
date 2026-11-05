import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { GapType } from "@niceprototypes/styles"
import Logo from "@niceprototypes/logo"

/** Theme names are read from the token data at runtime; "none" leaves the theme unpinned. */
const THEME_OPTIONS = ["none", ...Object.keys(themeTokensData)]

/** "none" leaves gap unset: the logo.gap token. */
const GAP_OPTIONS = ["none", "smaller", "small", "base", "large", "larger"] as const satisfies readonly (GapType | "none")[]

const meta = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    layout: "padded",
  },
  args: {
    showName: true,
    nameHeightScale: 0.6,
    "aria-label": "Nice Prototypes",
  },
  argTypes: {
    // Unset: the logo.height token.
    height: { control: "number" },
    showName: { control: "boolean" },
    nameHeightScale: { control: { type: "number", min: 0, max: 1, step: 0.05 } },
    gap: { control: "select", options: GAP_OPTIONS, mapping: { none: undefined } },
    "aria-label": { control: "text" },
    theme: { control: "select", options: THEME_OPTIONS, mapping: { none: undefined } },
  },
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

const logo = (canvasElement: HTMLElement, name = "Nice Prototypes") => within(canvasElement).getByRole("img", { name })

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    // The heart and the name.
    await expect(logo(canvasElement).querySelectorAll("svg")).toHaveLength(2)
  },
}

export const HeartOnly: Story = {
  args: { showName: false },
  play: async ({ canvasElement }) => {
    await expect(logo(canvasElement).querySelectorAll("svg")).toHaveLength(1)
  },
}

export const Height: Story = {
  args: { height: 48 },
  play: async ({ canvasElement }) => {
    await expect(logo(canvasElement).getBoundingClientRect().height).toBe(48)
  },
}

export const NameHeightScale: Story = {
  args: { height: 40, nameHeightScale: 0.5 },
  play: async ({ canvasElement }) => {
    const name = logo(canvasElement).querySelectorAll("svg")[1].parentElement!
    await expect(name.getBoundingClientRect().height).toBe(20)
  },
}

export const Gap: Story = {
  args: { gap: "large" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(logo(canvasElement)).columnGap).toBe(
      getComputedStyle(canvasElement).getPropertyValue(getToken("gap", "large", { as: "key" })).trim(),
    )
  },
}

export const DefaultGap: Story = {
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(logo(canvasElement)).columnGap).toBe(
      getComputedStyle(canvasElement).getPropertyValue(getToken("gap", "smaller", { as: "key" })).trim(),
    )
  },
}

export const AriaLabel: Story = {
  args: { "aria-label": "Home" },
  play: async ({ canvasElement }) => {
    await expect(logo(canvasElement, "Home")).toBeInTheDocument()
  },
}

export const Theme: Story = {
  args: { theme: "night" },
  play: async ({ canvasElement }) => {
    await expect(logo(canvasElement).closest('[data-theme="night"]')).not.toBeNull()
  },
}
