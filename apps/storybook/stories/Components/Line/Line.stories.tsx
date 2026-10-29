import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor } from "storybook/test"
import { getToken, themeTokensData } from "@niceprototypes/styles"
import type { BorderColorType } from "@niceprototypes/styles"
import Line from "@niceprototypes/line"
import type { LineProps, LineRadiusType } from "@niceprototypes/line"

/**
 * Option lists. `color` is typed against BorderColorType on disk; `radius` presets cover each
 * form of LineRadiusType except an Element reference, which has no serialisable control.
 */
const COLOR_OPTIONS = ["base", "subtle", "strong", "stronger", "success", "highlight", "warning", "error", "link"] as const satisfies readonly BorderColorType[]
const THEME_OPTIONS = ["none", ...Object.keys(themeTokensData)]
const RADIUS_PRESETS = {
  element: "element",
  "0": 0,
  "8": 8,
  "16": 16,
  "top-right and bottom-left 16": [0, 16, 0, 16],
  "elliptical 24×8": [
    [24, 8],
    [24, 8],
    [24, 8],
    [24, 8],
  ],
} satisfies Record<string, LineRadiusType>

/** LineProps with `radius` as a preset name, mapped back to the radius in `render`. */
type PlaygroundArgs = Omit<LineProps, "radius"> & { radius: keyof typeof RADIUS_PRESETS }

const meta = {
  title: "Components/Line",
  component: Line,
  parameters: {
    layout: "padded",
  },
  // Line frames its nearest positioned ancestor: the story supplies that host.
  decorators: [
    Story => (
      <div
        style={{
          position: "relative",
          height: getToken("size:larger"),
          borderRadius: getToken("borderRadius:large"),
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    color: "base",
  },
  argTypes: {
    // An explicit select overrides preview.tsx's `color` matcher (a colour picker).
    color: { control: "select", options: COLOR_OPTIONS },
    radius: { control: "select", options: Object.keys(RADIUS_PRESETS) },
    theme: { control: "select", options: THEME_OPTIONS, mapping: { none: undefined } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Line>

export default meta

type Story = StoryObj<PlaygroundArgs>

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

/** The dash path; the frame is measured after mount, so it appears asynchronously. */
const dash = async (canvasElement: HTMLElement) => {
  await waitFor(() => expect(story(canvasElement).querySelectorAll("svg path")).toHaveLength(2))
  return story(canvasElement).querySelectorAll<SVGPathElement>("svg path")[1]
}

export const Playground: Story = {
  args: { radius: "element" },
  render: ({ radius, ...rest }) => <Line {...rest} radius={RADIUS_PRESETS[radius]} />,
  play: async ({ canvasElement }) => {
    const path = await dash(canvasElement)
    // "element": the host's own corner radius.
    const radius = parseFloat(resolveCss(canvasElement, "border-top-left-radius", getToken("borderRadius:large")))
    await expect(path.getAttribute("d")).toMatch(new RegExp(`^M ${radius} 0`))
    await expect(path.closest("[aria-hidden]")).toHaveAttribute("aria-hidden", "true")
  },
}

export const Color: Story = {
  ...Playground,
  args: { ...Playground.args, color: "error" },
  play: async ({ canvasElement }) => {
    const path = await dash(canvasElement)
    await expect(getComputedStyle(path).stroke).toBe(resolveCss(canvasElement, "color", getToken("line.borderColor:error")))
  },
}

export const RadiusNumber: Story = {
  ...Playground,
  args: { ...Playground.args, radius: "8" },
  play: async ({ canvasElement }) => {
    const path = await dash(canvasElement)
    await expect(path.getAttribute("d")).toMatch(/^M 8 0/)
  },
}

export const RadiusSquare: Story = {
  ...Playground,
  args: { ...Playground.args, radius: "0" },
  play: async ({ canvasElement }) => {
    const path = await dash(canvasElement)
    await expect(path.getAttribute("d")).toMatch(/^M 0 0/)
  },
}

export const RadiusPerCorner: Story = {
  ...Playground,
  args: { ...Playground.args, radius: "top-right and bottom-left 16" },
  play: async ({ canvasElement }) => {
    const d = (await dash(canvasElement)).getAttribute("d")!
    await expect(d).toMatch(/^M 0 0/)
    await expect(d).toContain("A 16 16")
  },
}

export const RadiusElliptical: Story = {
  ...Playground,
  args: { ...Playground.args, radius: "elliptical 24×8" },
  play: async ({ canvasElement }) => {
    const d = (await dash(canvasElement)).getAttribute("d")!
    await expect(d).toMatch(/^M 24 0/)
    await expect(d).toContain("A 24 8")
  },
}

export const Theme: Story = {
  ...Playground,
  args: { ...Playground.args, theme: "night" },
  play: async ({ canvasElement }) => {
    const path = await dash(canvasElement)
    await expect(path.closest('[data-theme="night"]')).not.toBeNull()
  },
}
