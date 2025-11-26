import type { Meta, StoryObj } from "@storybook/react"
import { getToken } from "nice-styles"
import Typography from "nice-react-typography"
import Demo from "../../src/components/Demo"
import DemoDots from "../../src/components/DemoDots"
import VariableList from "../../src/components/VariableList"
import { generateDescriptionString } from "../../src/utilities"
import Flex from "nice-react-flex"

const TokensDemo = () => <></>

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
      description: {
        component: generateDescriptionString([
          {
            value: "[REPO](https://github.com/niceprototypes/nice-styles)",
            newLine: true,
          },
          { value: "SETUP", newLine: true },
          { value: "npm i nice-styles", code: true, newLine: true },
          {
            value: 'import { getToken } from "nice-styles"',
            code: true,
            newLine: true,
          },
          { value: "USAGE", newLine: true },
          { value: 'getToken("fontSize").key', code: true },
          "\u2002\u2192\u2002",
          { value: '"--font-size-base"', code: true, newLine: true },
          { value: 'getToken("fontSize", "large").key', code: true },
          "\u2002\u2192\u2002",
          { value: '"--font-size-large"', code: true, newLine: true },
          { value: 'getToken("fontSize", "large").var', code: true },
          "\u2002\u2192\u2002",
          { value: 'var("--font-size-large")', code: true, newLine: true },
          { value: 'getToken("fontSize", "large").value', code: true },
          "\u2002\u2192\u2002",
          { value: '"24px"', code: true, newLine: true },
        ]),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TokensDemo>

export default meta
type Story = StoryObj<typeof meta>

// Helper function to generate variable arrays
const createVariables = <T extends string | { name: string }>(
  groupName: string,
  variants: T[],
  renderDemo?: (variant: T extends string ? string : T) => React.ReactNode
) => {
  return variants.map(variant => {
    const itemName = typeof variant === "string" ? variant : variant.name

    const token = getToken(groupName as any, itemName)
    return {
      name: itemName,
      key: token.key,
      var: token.var,
      value: token.value,
      demo: renderDemo ? renderDemo(variant as any) : undefined,
    }
  })
}

// Helper functions to generate variable arrays
const prepareAnimationDuration = () =>
  createVariables(
    "animationDuration",
    [
      {
        name: "base",
        backgroundColor: getToken("foregroundColor", "error").var,
      },
      {
        name: "slow",
        backgroundColor: getToken("foregroundColor", "warning").var,
      },
    ],
    ({ name, backgroundColor }: any) => {
      const animationName = name === "base" ? "slide" : "slideSlow"
      return (
        <Flex
          style={{
            width: "120px",
            backgroundColor: getToken("backgroundColor", "alternate").var,
            borderRadius: "12px",
          }}
        >
          <Demo
            style={{
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
              backgroundColor,
              borderRadius: "12px",
              animation: `${animationName} calc(${getToken("animationDuration", name).var} * 6) ${getToken("animationEasing").var} infinite`,
            }}
          />
        </Flex>
      )
    }
  )

const prepareAnimationEasing = () =>
  createVariables("animationEasing", ["base"], () => (
    <Flex
      style={{
        backgroundColor: getToken("backgroundColor", "alternate").var,
        padding: getToken("gap").var,
        borderRadius: getToken("borderRadius").var,
      }}
    >
      <svg width="60" height="24" viewBox="0 0 60 24">
        <path
          d="M 1 23 C 30 23, 30 1, 60 1"
          fill="none"
          stroke={getToken("foregroundColor", "lighter").var}
          strokeWidth={getToken("borderWidth", "large").var}
          strokeLinecap="round"
        />
      </svg>
    </Flex>
  ))

const prepareBackgroundColor = () =>
  createVariables(
    "backgroundColor",
    [
      { name: "base", backgroundColor: getToken("backgroundColor").var },
      {
        name: "alternate",
        backgroundColor: getToken("backgroundColor", "alternate").var,
      },
    ],
    ({ backgroundColor }: any) => (
      <Demo
        borderRadius={getToken("borderRadius", "small").var}
        style={{
          backgroundColor,
          border: `${getToken("borderWidth").var} solid ${getToken("borderColor").var}`,
          borderRadius: getToken("borderRadius", "small").var,
          width: getToken("cellHeight", "larger").var,
          height: getToken("cellHeight").var,
        }}
      />
    )
  )

const prepareBorderColor = () =>
  createVariables("borderColor", ["base", "heavy", "heavier"], variant => (
    <Demo
      style={{
        backgroundColor: "white",
        width: "150px",
        height: "75px",
        border: `${getToken("borderWidth").var} solid ${getToken("borderColor", variant).var}`,
        borderRadius: getToken("borderRadius", "small").var,
      }}
    />
  ))

const prepareBorderRadius = () =>
  createVariables(
    "borderRadius",
    [
      { name: "smaller", width: "24px", height: "24px" },
      { name: "small", width: "48px", height: "48px" },
      { name: "base", width: "96px", height: "96px" },
      { name: "large", width: "240px", height: "240px" },
      { name: "larger", width: "320px", height: "320px" },
    ],
    ({ name, width, height }: any) => (
      <Demo
        style={{
          borderRadius: getToken("borderRadius", name).var,
          width,
          height,
          border: `${getToken("borderWidth").var} solid ${getToken("foregroundColor", "light").var}`,
        }}
      />
    )
  )

const prepareBorderWidth = () =>
  createVariables(
    "borderWidth",
    [
      { name: "base", width: "150px", height: "75px" },
      { name: "large", width: "200px", height: "100px" },
    ],
    ({ name, width, height }: any) => (
      <Demo
        style={{
          width,
          height,
          border: `${getToken("borderWidth", name).var} solid ${getToken("foregroundColor", "light").var}`,
          borderRadius: getToken("borderRadius", "small").var,
        }}
      />
    )
  )

const prepareBoxShadow = () =>
  createVariables(
    "boxShadow",
    [
      { name: "base", width: "60px", height: "30px" },
      { name: "large", width: "120px", height: "60px" },
    ],
    ({ name, width, height }: any) => (
      <Demo
        backgroundColor="rgba(0, 0, 0, 0.05)"
        borderRadius={getToken("borderRadius", "small").var}
        spacing={{ all: "large" }}
        style={{
          backgroundColor: getToken("backgroundColor").var,
          width,
          height,
          borderRadius: getToken("borderRadius", "small").var,
          boxShadow: getToken("boxShadow", name).var,
        }}
      />
    )
  )

const prepareCellHeight = () =>
  createVariables(
    "cellHeight",
    ["smaller", "small", "base", "large", "larger"],
    variant => (
      <Demo
        style={{
          width: getToken("cellHeight", variant).var,
          height: getToken("cellHeight", variant).var,
          border: `${getToken("borderWidth").var} solid ${getToken("foregroundColor", "light").var}`,
          borderRadius: getToken("borderRadius", "small").var,
        }}
      />
    )
  )

const prepareForegroundColor = () =>
  createVariables(
    "foregroundColor",
    [
      "lighter",
      "light",
      "medium",
      "heavy",
      "base",
      "disabled",
      "link",
      "success",
      "warning",
      "error",
    ],
    variant => (
      <Demo
        style={{
          width: getToken("cellHeight", "smaller").var,
          height: getToken("cellHeight", "smaller").var,
          backgroundColor: getToken("foregroundColor", variant).var,
          borderRadius: "50%",
        }}
      />
    )
  )

const prepareFontFamily = () =>
  createVariables(
    "fontFamily",
    [
      { name: "heading", weight: "bold", text: "Heading" },
      { name: "base", text: "Body" },
      { name: "code", code: true, text: "Code" },
    ],
    ({ size, weight, code, text }: any) => (
      <Typography size={size} weight={weight} code={code}>
        {text}
      </Typography>
    )
  )

const prepareFontSize = () =>
  createVariables(
    "fontSize",
    ["smaller", "small", "base", "large", "larger"],
    variant => <Typography size={variant as any}>Sample</Typography>
  )

const prepareFontWeight = () =>
  createVariables(
    "fontWeight",
    ["light", "base", "medium", "semibold", "bold", "extrabold", "black"],
    variant => (
      <Typography weight={variant}>
        Sample
      </Typography>
    )
  )

const prepareGap = () =>
  createVariables(
    "gap",
    ["smaller", "small", "base", "large", "larger"],
    variant => (
      <DemoDots
        gap={variant as any}
        demos={[
          {
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
              backgroundColor: getToken("foregroundColor", "link").var,
              borderRadius: "50%",
            },
          },
          {
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
              backgroundColor: getToken("foregroundColor", "success").var,
              borderRadius: "50%",
            },
          },
        ]}
      />
    )
  )

const prepareLineHeight = () => {
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  return createVariables(
    "lineHeight",
    ["condensed", "base", "expanded"],
    variant => <Typography lineHeight={variant as any}>{loremIpsum}</Typography>
  )
}

// Map of prepare functions for each token type
const prepareFunctions = {
  AnimationDuration: prepareAnimationDuration,
  AnimationEasing: prepareAnimationEasing,
  BackgroundColor: prepareBackgroundColor,
  BorderColor: prepareBorderColor,
  BorderRadius: prepareBorderRadius,
  BorderWidth: prepareBorderWidth,
  BoxShadow: prepareBoxShadow,
  CellHeight: prepareCellHeight,
  ForegroundColor: prepareForegroundColor,
  FontFamily: prepareFontFamily,
  FontSize: prepareFontSize,
  FontWeight: prepareFontWeight,
  Gap: prepareGap,
  LineHeight: prepareLineHeight,
}

// Helper to create story objects - calls prepare function at render time
const createStory = (
  camelName: string,
  pascalKey: keyof typeof prepareFunctions
): Story => {
  return {
    name: camelName,
    render: () => <VariableList variables={prepareFunctions[pascalKey]()} />,
    parameters: {
      docs: {
        source: {
          code: null,
        },
        canvas: {
          sourceState: "none",
        },
      },
    },
  }
}

// Dynamically generate story exports
export const AnimationDuration: Story = createStory(
  "animationDuration",
  "AnimationDuration"
)
export const AnimationEasing: Story = createStory(
  "animationEasing",
  "AnimationEasing"
)
export const BackgroundColor: Story = createStory(
  "backgroundColor",
  "BackgroundColor"
)
export const BorderColor: Story = createStory("borderColor", "BorderColor")
export const BorderRadius: Story = createStory("borderRadius", "BorderRadius")
export const BorderWidth: Story = createStory("borderWidth", "BorderWidth")
export const BoxShadow: Story = createStory("boxShadow", "BoxShadow")
export const CellHeight: Story = createStory("cellHeight", "CellHeight")
export const ForegroundColor: Story = createStory(
  "foregroundColor",
  "ForegroundColor"
)
export const FontFamily: Story = createStory("fontFamily", "FontFamily")
export const FontSize: Story = createStory("fontSize", "FontSize")
export const FontWeight: Story = createStory("fontWeight", "FontWeight")
export const Gap: Story = createStory("gap", "Gap")
export const LineHeight: Story = createStory("lineHeight", "LineHeight")
