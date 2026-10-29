import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { FontSizeType } from "@niceprototypes/styles"
import { Illustration } from "@niceprototypes/icon"
import type { IconAnimationDurationType } from "@niceprototypes/icon"
import { illustrationNames, illustrationVariants } from "@niceprototypes/icon/svg"

/**
 * Option lists. Names and variants are read from the icon package's illustration catalog;
 * `size` and `animationDuration` are typed against their unions on disk.
 */
const SIZE_OPTIONS = ["smaller", "small", "base", "large", "larger"] as const satisfies readonly FontSizeType[]
const ANIMATION_DURATION_OPTIONS = ["fast", "base", "slow"] as const satisfies readonly IconAnimationDurationType[]
const VARIANT_OPTIONS = [...new Set(Object.values(illustrationVariants).flat())]
const THEME_OPTIONS = ["none", ...Object.keys(themeTokensData)]

const meta = {
  title: "Components/Illustration",
  component: Illustration,
  parameters: {
    layout: "padded",
  },
  args: {
    name: "nice-heart",
    variant: "base",
    size: "larger",
    viewBox: "0 0 16 16",
    animationDuration: "base",
  },
  argTypes: {
    name: { control: "select", options: illustrationNames },
    variant: { control: "select", options: VARIANT_OPTIONS },
    size: { control: "select", options: SIZE_OPTIONS },
    viewBox: { control: "text" },
    theme: { control: "select", options: THEME_OPTIONS, mapping: { none: undefined } },
    animation: { control: "select", options: ["none", "spin"], mapping: { none: undefined } },
    animationDuration: { control: "select", options: ANIMATION_DURATION_OPTIONS },
    // Per-breakpoint prop overrides (withBreakpoints), e.g. { "tablet+": { size: "smaller" } }.
    breakpoints: { control: "object" },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof Illustration>

export default meta

type Story = StoryObj<typeof meta>

/** The computed value of a CSS property set to `value`, read from a throwaway element in the canvas. */
const resolveCss = (canvasElement: HTMLElement, property: string, value: string) => {
  const probe = document.createElement("div")
  probe.style.setProperty(property, value)
  canvasElement.appendChild(probe)
  const resolved = getComputedStyle(probe).getPropertyValue(property)
  probe.remove()
  return resolved
}

/** The story's own root: the canvas also holds a stylesheet link and the Storybook toolbar after it. */
const story = (canvasElement: HTMLElement) => canvasElement.querySelector<HTMLElement>(":scope > :not(link)")!
const svg = (canvasElement: HTMLElement) => story(canvasElement).querySelector("svg")!

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const wrapper = svg(canvasElement).parentElement!
    await expect(getComputedStyle(wrapper).width).toBe(resolveCss(canvasElement, "width", getToken("icon.size:larger")))
    await expect(svg(canvasElement)).toHaveAttribute("viewBox", "0 0 16 16")
  },
}

export const Name: Story = {
  args: { name: "nice-skull" },
  play: async ({ canvasElement }) => {
    await expect(svg(canvasElement)).toBeInTheDocument()
  },
}

export const Size: Story = {
  args: { size: "smaller" },
  play: async ({ canvasElement }) => {
    const wrapper = svg(canvasElement).parentElement!
    await expect(getComputedStyle(wrapper).height).toBe(resolveCss(canvasElement, "height", getToken("icon.size:smaller")))
  },
}

export const ViewBox: Story = {
  args: { viewBox: "0 0 32 32" },
  play: async ({ canvasElement }) => {
    await expect(svg(canvasElement)).toHaveAttribute("viewBox", "0 0 32 32")
  },
}

export const Spin: Story = {
  args: { animation: "spin", animationDuration: "slow" },
  play: async ({ canvasElement }) => {
    const style = getComputedStyle(svg(canvasElement))
    await expect(style.animationName).not.toBe("none")
    await expect(style.animationDuration).toBe(
      resolveCss(canvasElement, "animation-duration", getToken("icon.animationDuration:slow")),
    )
  },
}

export const Theme: Story = {
  args: { theme: "night" },
  play: async ({ canvasElement }) => {
    await expect(svg(canvasElement).closest('[data-theme="night"]')).not.toBeNull()
  },
}
