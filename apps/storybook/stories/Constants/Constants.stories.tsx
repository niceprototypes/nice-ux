import type { Meta, StoryObj } from "@storybook/react"
import "nice-styles/variables.css"
import { StyleConstants } from "nice-styles"
import Typography from "nice-react-typography"
import BorderedBox from "../../src/components/BorderedBox"
import ColorDot from "../../src/components/ColorDot"
import DemoBackground from "../../src/components/DemoBackground"
import DemoFlex from "../../src/components/DemoFlex"
import VariableList from "../../src/components/VariableList"
import { generateDescriptionString } from "../../src/utilities"

/**
 * # CSS Variables & Constants
 *
 * A comprehensive collection of CSS custom properties (variables) and TypeScript constants for consistent design tokens.
 *
 * ## Why Use Nice Styles?
 *
 * - **Centralized Design System**: Define once, use everywhere
 * - **Runtime Theming**: Change values dynamically without rebuilding
 * - **No JavaScript Overhead**: Pure CSS with browser-native support
 * - **Framework Agnostic**: Works with any framework or vanilla CSS
 * - **Modular Imports**: Import only what you need for optimal performance
 *
 * ## Installation
 *
 * ```bash
 * npm install nice-styles
 * ```
 *
 * ## Import Constants & Variables
 *
 * ### JavaScript/TypeScript
 *
 * #### Import from main package (recommended)
 * ```ts
 * import { FONT_SIZE_BASE, GAP_BASE, FOREGROUND_COLOR_LINK } from 'nice-styles'
 *
 * console.log(FONT_SIZE_BASE)         // "16px"
 * console.log(GAP_BASE)               // "16px"
 * console.log(FOREGROUND_COLOR_LINK)  // "hsla(202, 100%, 50%, 1)"
 * ```
 *
 * #### Import from constants.js directly
 * ```ts
 * import { FONT_SIZE_BASE, GAP_BASE } from 'nice-styles/constants.js'
 * ```
 *
 * #### Import namespaced constants
 * ```ts
 * import { StyleConstants } from 'nice-styles'
 *
 * console.log(StyleConstants.FONT_SIZE_BASE)
 * console.log(StyleConstants.GAP_BASE)
 * ```
 *
 * ### CSS
 *
 * #### Import all CSS variables
 * ```css
 * @import 'nice-styles/variables.css';
 *
 * .button {
 *   font-size: var(--font-size-base);
 *   padding: var(--gap-small) var(--gap-base);
 *   color: var(--foreground-color-base);
 * }
 * ```
 *
 * #### Import individual CSS files
 * Each story below corresponds to an individual CSS file:
 * ```css
 * @import 'nice-styles/css/backgroundColor.css';
 * @import 'nice-styles/css/fontSize.css';
 * @import 'nice-styles/css/gap.css';
 * ```
 *
 * #### Import deprecated variables (backward compatibility)
 * ```css
 * @import 'nice-styles/deprecated.css';
 * ```
 */

const ConstantsDemo = () => null

const meta = {
  title: "Styles/Constants",
  component: ConstantsDemo,
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
          { value: "import { StyleConstants } from \"nice-styles\"", code: true },
          "\u2002\u2192\u2002",
          { value: "StyleConstants.ANIMATION_DURATION_BASE", code: true, newLine: true },
          "Constant: ",
          { value: "import { ANIMATION_DURATION_BASE } from \"nice-styles\"", code: true },
        ]),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConstantsDemo>

export default meta
type Story = StoryObj<typeof meta>

// Story data structure
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."

const storiesData = {
  AnimationDuration: {
    variables: [
      { name: "--animation-duration-base", value: StyleConstants.ANIMATION_DURATION_BASE },
      { name: "--animation-duration-slow", value: StyleConstants.ANIMATION_DURATION_SLOW },
    ],
  },
  AnimationEasing: {
    variables: [
      { name: "--animation-easing-base", value: StyleConstants.ANIMATION_EASING_BASE },
    ],
  },
  BackgroundColor: {
    variables: [
      {
        name: "--background-color-base",
        value: StyleConstants.BACKGROUND_COLOR_BASE,
        demo: <DemoBackground backgroundColor="var(--background-color-alternate)"><ColorDot color="var(--background-color-base)" /></DemoBackground>,
      },
      {
        name: "--background-color-alternate",
        value: StyleConstants.BACKGROUND_COLOR_ALTERNATE,
        demo: <DemoBackground><ColorDot color="var(--background-color-alternate)" /></DemoBackground>,
      },
    ],
  },
  BorderColor: {
    variables: [
      {
        name: "--border-color-base",
        value: StyleConstants.BORDER_COLOR_BASE,
        demo: <DemoBackground><BorderedBox borderColor="var(--border-color-base)" backgroundColor="white" /></DemoBackground>,
      },
      {
        name: "--border-color-heavy",
        value: StyleConstants.BORDER_COLOR_HEAVY,
        demo: <DemoBackground><BorderedBox borderColor="var(--border-color-heavy)" backgroundColor="white" /></DemoBackground>,
      },
      {
        name: "--border-color-heavier",
        value: StyleConstants.BORDER_COLOR_HEAVIER,
        demo: <DemoBackground><BorderedBox borderColor="var(--border-color-heavier)" backgroundColor="white" /></DemoBackground>,
      },
    ],
  },
  BorderRadius: {
    variables: [
      {
        name: "--border-radius-smaller",
        value: StyleConstants.BORDER_RADIUS_SMALLER,
        demo: <DemoBackground><BorderedBox width="40px" height="20px" borderRadius="var(--border-radius-smaller)" /></DemoBackground>,
      },
      {
        name: "--border-radius-small",
        value: StyleConstants.BORDER_RADIUS_SMALL,
        demo: <DemoBackground><BorderedBox width="80px" height="40px" borderRadius="var(--border-radius-small)" /></DemoBackground>,
      },
      {
        name: "--border-radius-base",
        value: StyleConstants.BORDER_RADIUS_BASE,
        demo: <DemoBackground><BorderedBox width="160px" height="80px" borderRadius="var(--border-radius-base)" /></DemoBackground>,
      },
      {
        name: "--border-radius-large",
        value: StyleConstants.BORDER_RADIUS_LARGE,
        demo: <DemoBackground><BorderedBox width="240px" height="120px" borderRadius="var(--border-radius-large)" /></DemoBackground>,
      },
      {
        name: "--border-radius-larger",
        value: StyleConstants.BORDER_RADIUS_LARGER,
        demo: <DemoBackground><BorderedBox width="320px" height="160px" borderRadius="var(--border-radius-larger)" /></DemoBackground>,
      },
    ],
  },
  BorderWidth: {
    variables: [
      {
        name: "--border-width-base",
        value: StyleConstants.BORDER_WIDTH_BASE,
        demo: <DemoBackground><BorderedBox width="150px" height="75px" borderWidth="var(--border-width-base)" /></DemoBackground>,
      },
      {
        name: "--border-width-large",
        value: StyleConstants.BORDER_WIDTH_LARGE,
        demo: <DemoBackground><BorderedBox width="200px" height="100px" borderWidth="var(--border-width-large)" /></DemoBackground>,
      },
    ],
  },
  BoxShadow: {
    variables: [
      {
        name: "--box-shadow-down-base",
        value: StyleConstants.BOX_SHADOW_DOWN_BASE,
        demo: <DemoBackground backgroundColor="rgba(0, 0, 0, 0.05)"><BorderedBox width="60px" height="30px" borderWidth="0" boxShadow="var(--box-shadow-down-base)" /></DemoBackground>,
      },
      {
        name: "--box-shadow-down-large",
        value: StyleConstants.BOX_SHADOW_DOWN_LARGE,
        demo: <DemoBackground backgroundColor="rgba(0, 0, 0, 0.05)"><BorderedBox width="120px" height="60px" borderWidth="0" boxShadow="var(--box-shadow-down-large)" /></DemoBackground>,
      },
      {
        name: "--box-shadow-up-base",
        value: StyleConstants.BOX_SHADOW_UP_BASE,
        demo: <DemoBackground backgroundColor="rgba(0, 0, 0, 0.05)"><BorderedBox width="60px" height="30px" borderWidth="0" boxShadow="var(--box-shadow-up-base)" /></DemoBackground>,
      },
      {
        name: "--box-shadow-up-large",
        value: StyleConstants.BOX_SHADOW_UP_LARGE,
        demo: <DemoBackground backgroundColor="rgba(0, 0, 0, 0.05)"><BorderedBox width="120px" height="60px" borderWidth="0" boxShadow="var(--box-shadow-up-large)" /></DemoBackground>,
      },
    ],
  },
  CellHeight: {
    variables: [
      {
        name: "--cell-height-smaller",
        value: StyleConstants.CELL_HEIGHT_SMALLER,
        demo: <DemoBackground><BorderedBox width="var(--cell-height-smaller)" height="var(--cell-height-smaller)" /></DemoBackground>,
      },
      {
        name: "--cell-height-small",
        value: StyleConstants.CELL_HEIGHT_SMALL,
        demo: <DemoBackground><BorderedBox width="var(--cell-height-small)" height="var(--cell-height-small)" /></DemoBackground>,
      },
      {
        name: "--cell-height-base",
        value: StyleConstants.CELL_HEIGHT_BASE,
        demo: <DemoBackground><BorderedBox width="var(--cell-height-base)" height="var(--cell-height-base)" /></DemoBackground>,
      },
      {
        name: "--cell-height-large",
        value: StyleConstants.CELL_HEIGHT_LARGE,
        demo: <DemoBackground><BorderedBox width="var(--cell-height-large)" height="var(--cell-height-large)" /></DemoBackground>,
      },
      {
        name: "--cell-height-larger",
        value: StyleConstants.CELL_HEIGHT_LARGER,
        demo: <DemoBackground><BorderedBox width="var(--cell-height-larger)" height="var(--cell-height-larger)" /></DemoBackground>,
      },
    ],
  },
  ForegroundColor: {
    variables: [
      {
        name: "--foreground-color-lighter",
        value: StyleConstants.FOREGROUND_COLOR_LIGHTER,
        demo: <DemoBackground><ColorDot color="var(--foreground-color-lighter)" /></DemoBackground>,
      },
      {
        name: "--foreground-color-light",
        value: StyleConstants.FOREGROUND_COLOR_LIGHT,
        demo: <DemoBackground><ColorDot color="var(--foreground-color-light)" /></DemoBackground>,
      },
      {
        name: "--foreground-color-medium",
        value: StyleConstants.FOREGROUND_COLOR_MEDIUM,
        demo: <DemoBackground><ColorDot color="var(--foreground-color-medium)" /></DemoBackground>,
      },
      {
        name: "--foreground-color-heavy",
        value: StyleConstants.FOREGROUND_COLOR_HEAVY,
        demo: <DemoBackground><ColorDot color="var(--foreground-color-heavy)" /></DemoBackground>,
      },
      {
        name: "--foreground-color-base",
        value: StyleConstants.FOREGROUND_COLOR_BASE,
        demo: <DemoBackground><ColorDot color="var(--foreground-color-base)" /></DemoBackground>,
      },
      {
        name: "--foreground-color-disabled",
        value: StyleConstants.FOREGROUND_COLOR_DISABLED,
        demo: <DemoBackground><ColorDot color="var(--foreground-color-disabled)" /></DemoBackground>,
      },
      {
        name: "--foreground-color-link",
        value: StyleConstants.FOREGROUND_COLOR_LINK,
        demo: <DemoBackground><ColorDot color="var(--foreground-color-link)" /></DemoBackground>,
      },
      {
        name: "--foreground-color-success",
        value: StyleConstants.FOREGROUND_COLOR_SUCCESS,
        demo: <DemoBackground><ColorDot color="var(--foreground-color-success)" /></DemoBackground>,
      },
      {
        name: "--foreground-color-warning",
        value: StyleConstants.FOREGROUND_COLOR_WARNING,
        demo: <DemoBackground><ColorDot color="var(--foreground-color-warning)" /></DemoBackground>,
      },
      {
        name: "--foreground-color-error",
        value: StyleConstants.FOREGROUND_COLOR_ERROR,
        demo: <DemoBackground><ColorDot color="var(--foreground-color-error)" /></DemoBackground>,
      },
    ],
  },
  FontFamily: {
    variables: [
      {
        name: "--font-family-heading",
        value: StyleConstants.FONT_FAMILY_HEADING,
        demo: <Typography size="larger" weight="bold">Heading</Typography>,
      },
      {
        name: "--font-family-base",
        value: StyleConstants.FONT_FAMILY_BASE,
        demo: <Typography size="large">Body</Typography>,
      },
      {
        name: "--font-family-code",
        value: StyleConstants.FONT_FAMILY_CODE,
        demo: <Typography size="large" code>Code</Typography>,
      },
    ],
  },
  FontSize: {
    variables: [
      {
        name: "--font-size-smaller",
        value: StyleConstants.FONT_SIZE_SMALLER,
        demo: <Typography size="smaller">Sample</Typography>,
      },
      {
        name: "--font-size-small",
        value: StyleConstants.FONT_SIZE_SMALL,
        demo: <Typography size="small">Sample</Typography>,
      },
      {
        name: "--font-size-base",
        value: StyleConstants.FONT_SIZE_BASE,
        demo: <Typography size="base">Sample</Typography>,
      },
      {
        name: "--font-size-large",
        value: StyleConstants.FONT_SIZE_LARGE,
        demo: <Typography size="large">Sample</Typography>,
      },
      {
        name: "--font-size-larger",
        value: StyleConstants.FONT_SIZE_LARGER,
        demo: <Typography size="larger">Sample</Typography>,
      },
    ],
  },
  FontWeight: {
    variables: [
      {
        name: "--font-weight-light",
        value: StyleConstants.FONT_WEIGHT_LIGHT,
        demo: <Typography size="large" weight="var(--font-weight-light)">Sample</Typography>,
      },
      {
        name: "--font-weight-base",
        value: StyleConstants.FONT_WEIGHT_BASE,
        demo: <Typography size="large" weight="var(--font-weight-base)">Sample</Typography>,
      },
      {
        name: "--font-weight-medium",
        value: StyleConstants.FONT_WEIGHT_MEDIUM,
        demo: <Typography size="large" weight="var(--font-weight-medium)">Sample</Typography>,
      },
      {
        name: "--font-weight-semibold",
        value: StyleConstants.FONT_WEIGHT_SEMIBOLD,
        demo: <Typography size="large" weight="var(--font-weight-semibold)">Sample</Typography>,
      },
      {
        name: "--font-weight-bold",
        value: StyleConstants.FONT_WEIGHT_BOLD,
        demo: <Typography size="large" weight="var(--font-weight-bold)">Sample</Typography>,
      },
      {
        name: "--font-weight-extrabold",
        value: StyleConstants.FONT_WEIGHT_EXTRABOLD,
        demo: <Typography size="large" weight="var(--font-weight-extrabold)">Sample</Typography>,
      },
      {
        name: "--font-weight-black",
        value: StyleConstants.FONT_WEIGHT_BLACK,
        demo: <Typography size="large" weight="var(--font-weight-black)">Sample</Typography>,
      },
    ],
  },
  Gap: {
    variables: [
      {
        name: "--gap-smaller",
        value: StyleConstants.GAP_SMALLER,
        demo: <DemoFlex gap="smaller" />,
      },
      {
        name: "--gap-small",
        value: StyleConstants.GAP_SMALL,
        demo: <DemoFlex gap="small" />,
      },
      {
        name: "--gap-base",
        value: StyleConstants.GAP_BASE,
        demo: <DemoFlex gap="base" />,
      },
      {
        name: "--gap-large",
        value: StyleConstants.GAP_LARGE,
        demo: <DemoFlex gap="large" />,
      },
      {
        name: "--gap-larger",
        value: StyleConstants.GAP_LARGER,
        demo: <DemoFlex gap="larger" />,
      },
    ],
  },
  LineHeight: {
    variables: [
      {
        name: "--line-height-condensed",
        value: StyleConstants.LINE_HEIGHT_CONDENSED,
        demo: <Typography lineHeight="condensed">{loremIpsum}</Typography>,
      },
      {
        name: "--line-height-base",
        value: StyleConstants.LINE_HEIGHT_BASE,
        demo: <Typography lineHeight="base">{loremIpsum}</Typography>,
      },
      {
        name: "--line-height-expanded",
        value: StyleConstants.LINE_HEIGHT_EXPANDED,
        demo: <Typography lineHeight="expanded">{loremIpsum}</Typography>,
      },
    ],
  },
}

// Story parameters to hide code preview
const storyParameters = {
  docs: {
    source: {
      code: null,
    },
    canvas: {
      sourceState: 'none',
    },
  },
}

// Dynamically generate story exports
export const AnimationDuration: Story = {
  render: () => <VariableList variables={storiesData.AnimationDuration.variables} />,
  parameters: storyParameters,
}

export const AnimationEasing: Story = {
  render: () => <VariableList variables={storiesData.AnimationEasing.variables} />,
  parameters: storyParameters,
}

export const BackgroundColor: Story = {
  render: () => <VariableList variables={storiesData.BackgroundColor.variables} />,
  parameters: storyParameters,
}

export const BorderColor: Story = {
  render: () => <VariableList variables={storiesData.BorderColor.variables} />,
  parameters: storyParameters,
}

export const BorderRadius: Story = {
  render: () => <VariableList variables={storiesData.BorderRadius.variables} />,
  parameters: storyParameters,
}

export const BorderWidth: Story = {
  render: () => <VariableList variables={storiesData.BorderWidth.variables} />,
  parameters: storyParameters,
}

export const BoxShadow: Story = {
  render: () => <VariableList variables={storiesData.BoxShadow.variables} />,
  parameters: storyParameters,
}

export const CellHeight: Story = {
  render: () => <VariableList variables={storiesData.CellHeight.variables} />,
  parameters: storyParameters,
}

export const ForegroundColor: Story = {
  render: () => <VariableList variables={storiesData.ForegroundColor.variables} />,
  parameters: storyParameters,
}

export const FontFamily: Story = {
  render: () => <VariableList variables={storiesData.FontFamily.variables} />,
  parameters: storyParameters,
}

export const FontSize: Story = {
  render: () => <VariableList variables={storiesData.FontSize.variables} />,
  parameters: storyParameters,
}

export const FontWeight: Story = {
  render: () => <VariableList variables={storiesData.FontWeight.variables} />,
  parameters: storyParameters,
}

export const Gap: Story = {
  render: () => <VariableList variables={storiesData.Gap.variables} />,
  parameters: storyParameters,
}

export const LineHeight: Story = {
  render: () => <VariableList variables={storiesData.LineHeight.variables} />,
  parameters: storyParameters,
}