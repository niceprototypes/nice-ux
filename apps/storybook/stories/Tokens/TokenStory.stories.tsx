import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { getTokenTables } from "@niceprototypes/docs/data"
import { TokenStory } from "./TokenStory"

/**
 * Render coverage for the MDX-only token pages, which the story test runner
 * does not visit: every token table (`TokenStory`) renders under both themes,
 * so a table that throws while building its rows fails here. Hidden from the
 * sidebar and docs (`!dev`, `!autodocs`); the test runner still runs it.
 */
const meta = {
  title: "Tokens/Render coverage",
  tags: ["!dev", "!autodocs"],
  render: () => (
    <>
      {getTokenTables().map(table => (
        <TokenStory key={table.id} id={table.id} />
      ))}
    </>
  ),
  play: async ({ canvasElement }) => {
    for (const table of getTokenTables()) await expect(canvasElement).toHaveTextContent(table.name)
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Day: Story = {}

/** `TokenStory` reads the theme from `<html data-theme>`, so the pin is set before render. */
export const Night: Story = {
  beforeEach: () => {
    const previous = document.documentElement.getAttribute("data-theme")
    document.documentElement.setAttribute("data-theme", "night")
    return () => {
      if (previous === null) document.documentElement.removeAttribute("data-theme")
      else document.documentElement.setAttribute("data-theme", previous)
    }
  },
}
