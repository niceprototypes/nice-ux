import type { Meta, StoryObj } from "@storybook/react"
import "nice-styles/variables.css"
import { StyleTokens } from "nice-styles"
import VariableList from "../../src/components/VariableList"
import { generateDescriptionString } from "../../src/utilities"

/**
 * # Design Tokens
 *
 * Design Tokens from nice-styles provide organized, semantic access to design values as camelCase objects.
 *
 * ## Import Tokens
 *
 * ### JavaScript/TypeScript
 *
 * #### Import from main package (recommended)
 * ```ts
 * import { fontSize, foregroundColor, gap } from 'nice-styles'
 *
 * console.log(fontSize.base)           // "16px"
 * console.log(foregroundColor.link)    // "hsla(202, 100%, 50%, 1)"
 * console.log(gap.large)               // "32px"
 * ```
 *
 * #### Import from tokens.js directly
 * ```ts
 * import { fontSize, foregroundColor, gap } from 'nice-styles/tokens.js'
 * ```
 *
 * #### Import namespaced tokens
 * ```ts
 * import { StyleTokens } from 'nice-styles'
 *
 * console.log(StyleTokens.fontSize.base)
 * console.log(StyleTokens.gap.large)
 * ```
 *
 * ### CSS
 *
 * #### Import individual token CSS files
 * ```css
 * @import 'nice-styles/css/fontSize.css';
 * @import 'nice-styles/css/foregroundColor.css';
 * @import 'nice-styles/css/gap.css';
 * ```
 *
 * #### Import all CSS variables
 * ```css
 * @import 'nice-styles/variables.css';
 * ```
 *
 * #### Import deprecated variables (backward compatibility)
 * ```css
 * @import 'nice-styles/deprecated.css';
 * ```
 */

const TokensDemo = () => null

const meta = {
  title: "Styles/Tokens",
  component: TokensDemo,
  parameters: {
    layout: "padded",
    controls: { disable: true },
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
    docs: {
      preview: () => null,
      description: {
        component: generateDescriptionString([
          "Docs: ",
          { value: "[**Github**](https://github.com/niceprototypes/nice-styles)", newLine: true },
          "Setup: ",
          { value: "npm i nice-styles", code: true, newLine: true },
          "Namespace: ",
          { value: "import { StyleTokens } from \"nice-styles\"", code: true },
          "\u2002\u2192\u2002",
          { value: "StyleTokens.animationDuration.base", code: true, newLine: true },
          "Token: ",
          { value: "import { animationDuration } from \"nice-styles\"", code: true },
          "\u2002\u2192\u2002",
          { value: "animationDuration.base", code: true, newLine: true },
        ]),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TokensDemo>

export default meta
type Story = StoryObj<typeof meta>

const createTokenStory = (tokenGroup: Record<string, any>, namespace: string) => ({
  name: namespace,
  render: () => (
    <VariableList
      spacer={false}
      variables={Object.keys(tokenGroup).map(key => ({
        name: key,
        value: tokenGroup[key]
      }))}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: null,
      },
      canvas: {
        sourceState: 'none',
      },
    },
  },
})

export const AnimationDuration: Story = createTokenStory(StyleTokens.animationDuration, "animationDuration")

export const AnimationEasing: Story = createTokenStory(StyleTokens.animationEasing, "animationEasing")

export const BackgroundColor: Story = createTokenStory(StyleTokens.backgroundColor, "backgroundColor")

export const BorderColor: Story = createTokenStory(StyleTokens.borderColor, "borderColor")

export const BorderRadius: Story = createTokenStory(StyleTokens.borderRadius, "borderRadius")

export const BorderWidth: Story = createTokenStory(StyleTokens.borderWidth, "borderWidth")

export const BoxShadow: Story = createTokenStory(StyleTokens.boxShadow, "boxShadow")

export const CellHeight: Story = createTokenStory(StyleTokens.cellHeight, "cellHeight")

export const FontFamily: Story = createTokenStory(StyleTokens.fontFamily, "fontFamily")

export const FontSize: Story = createTokenStory(StyleTokens.fontSize, "fontSize")

export const FontWeight: Story = createTokenStory(StyleTokens.fontWeight, "fontWeight")

export const ForegroundColor: Story = createTokenStory(StyleTokens.foregroundColor, "foregroundColor")

export const Gap: Story = createTokenStory(StyleTokens.gap, "gap")

export const LineHeight: Story = createTokenStory(StyleTokens.lineHeight, "lineHeight")