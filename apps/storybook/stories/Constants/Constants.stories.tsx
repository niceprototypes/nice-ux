import type { Meta, StoryObj } from "@storybook/react"
import { getToken } from "nice-styles"
import Typography from "nice-react-typography"
import Demo from "../../src/components/Demo"
import FlexDemo from "../../src/components/FlexDemo"
import VariableList from "../../src/components/VariableList"
import { generateDescriptionString } from "../../src/utilities"

const ConstantsDemo = () => <></>

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
      description: {
        component: generateDescriptionString([
          { value: "[REPO](https://github.com/niceprototypes/nice-styles)", newLine: true },
          { value: "SETUP", newLine: true },
          { value: "npm i nice-styles", code: true, newLine: true },
          { value: "import { getToken } from \"nice-styles\"", code: true, newLine: true },
          { value: "USAGE", newLine: true },
          { value: "getToken(\"fontSize\").key", code: true },
          "\u2002\u2192\u2002",
          { value: "\"--font-size-base\"", code: true, newLine: true },
          { value: "getToken(\"fontSize\", \"large\").key", code: true },
          "\u2002\u2192\u2002",
          { value: "\"--font-size-large\"", code: true, newLine: true },
          { value: "getToken(\"fontSize\", \"large\").var", code: true },
          "\u2002\u2192\u2002",
          { value: "var(\"--font-size-large\")", code: true, newLine: true },
          { value: "getToken(\"fontSize\", \"large\").value", code: true },
          "\u2002\u2192\u2002",
          { value: "\"24px\"", code: true, newLine: true },
        ]),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConstantsDemo>

export default meta
type Story = StoryObj<typeof meta>

// Helper function to generate variable arrays
const createVariables = <T extends string | { name: string }>(
  groupName: string,
  variants: T[],
  renderDemo?: (variant: T extends string ? string : T) => React.ReactNode,
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
  createVariables("animationDuration", ["base", "slow"])

const prepareAnimationEasing = () =>
  createVariables("animationEasing", ["base"])

const prepareBackgroundColor = () =>
  createVariables(
    "backgroundColor",
    [
      { name: "base", backgroundColor: getToken("backgroundColor").var },
      { name: "alternate", backgroundColor: getToken("backgroundColor", "alternate").var },
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
        }} />
    ),
  )

const prepareBorderColor = () =>
  createVariables(
    "borderColor",
    ["base", "heavy", "heavier"],
    (variant) => (
      <Demo style={{
        backgroundColor: "white",
        width: "150px",
        height: "75px",
        border: `${getToken("borderWidth").var} solid ${getToken("borderColor", variant).var}`,
        borderRadius: getToken("borderRadius", "small").var,
      }} />
    ),
  )

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
      <Demo style={{
        borderRadius: getToken("borderRadius", name).var,
        width,
        height,
        border: `${getToken("borderWidth").var} solid ${getToken("foregroundColor", "light").var}`,
      }} />
    ),
  )

const prepareBorderWidth = () =>
  createVariables(
    "borderWidth",
    [
      { name: "base", width: "150px", height: "75px" },
      { name: "large", width: "200px", height: "100px" },
    ],
    ({ name, width, height }: any) => (
      <Demo style={{
        width,
        height,
        border: `${getToken("borderWidth", name).var} solid ${getToken("foregroundColor", "light").var}`,
        borderRadius: getToken("borderRadius", "small").var,
      }} />
    ),
  )

const prepareBoxShadow = () =>
  createVariables(
    "boxShadow",
    [
      { name: "base", width: "60px", height: "30px" },
      { name: "large", width: "120px", height: "60px" },
    ],
    ({ name, width, height }: any) => (
      <Demo backgroundColor="rgba(0, 0, 0, 0.05)" borderRadius={getToken("borderRadius", "small").var}
            spacing={{ all: "large" }}
            style={{
              backgroundColor: getToken("backgroundColor").var,
              width,
              height,
              borderRadius: getToken("borderRadius", "small").var,
              boxShadow: getToken("boxShadow", name).var,
            }} />
    ),
  )

const prepareCellHeight = () =>
  createVariables(
    "cellHeight",
    ["smaller", "small", "base", "large", "larger"],
    (variant) => (
      <Demo style={{
        width: getToken("cellHeight", variant).var,
        height: getToken("cellHeight", variant).var,
        border: `${getToken("borderWidth").var} solid ${getToken("foregroundColor", "light").var}`,
        borderRadius: getToken("borderRadius", "small").var,
      }} />
    ),
  )

const prepareForegroundColor = () =>
  createVariables(
    "foregroundColor",
    ["lighter", "light", "medium", "heavy", "base", "disabled", "link", "success", "warning", "error"],
    (variant) => (
      <Demo style={{
        width: "24px",
        height: "24px",
        backgroundColor: getToken("foregroundColor", variant).var,
        borderRadius: "50%",
      }} />
    ),
  )

const prepareFontFamily = () =>
  createVariables(
    "fontFamily",
    [
      { name: "heading", size: "larger", weight: "bold", text: "Heading" },
      { name: "base", size: "large", text: "Body" },
      { name: "code", size: "large", code: true, text: "Code" },
    ],
    ({ size, weight, code, text }: any) => (
      <Typography size={size} weight={weight} code={code}>{text}</Typography>
    ),
  )

const prepareFontSize = () =>
  createVariables(
    "fontSize",
    ["smaller", "small", "base", "large", "larger"],
    (variant) => <Typography size={variant as any}>Sample</Typography>,
  )

const prepareFontWeight = () =>
  createVariables(
    "fontWeight",
    ["light", "base", "medium", "semibold", "bold", "extrabold", "black"],
    (variant) => <Typography size="large" weight={getToken("fontWeight", variant).var}>Sample</Typography>,
  )

const prepareGap = () =>
  createVariables(
    "gap",
    ["smaller", "small", "base", "large", "larger"],
    (variant) => <FlexDemo gap={variant as any} />,
  )

const prepareLineHeight = () => {
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  return createVariables(
    "lineHeight",
    ["condensed", "base", "expanded"],
    (variant) => <Typography lineHeight={variant as any}>{loremIpsum}</Typography>,
  )
}

// Story data structure
const storiesData = {
  AnimationDuration: { variables: prepareAnimationDuration() },
  AnimationEasing: { variables: prepareAnimationEasing() },
  BackgroundColor: { variables: prepareBackgroundColor() },
  BorderColor: { variables: prepareBorderColor() },
  BorderRadius: { variables: prepareBorderRadius() },
  BorderWidth: { variables: prepareBorderWidth() },
  BoxShadow: { variables: prepareBoxShadow() },
  CellHeight: { variables: prepareCellHeight() },
  ForegroundColor: { variables: prepareForegroundColor() },
  FontFamily: { variables: prepareFontFamily() },
  FontSize: { variables: prepareFontSize() },
  FontWeight: { variables: prepareFontWeight() },
  Gap: { variables: prepareGap() },
  LineHeight: { variables: prepareLineHeight() },
}

// Helper to create story objects
const createStory = (camelName: string, pascalKey: keyof typeof storiesData): Story => {
  return {
    name: camelName,
    render: () => <VariableList variables={storiesData[pascalKey].variables} />,
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
export const AnimationDuration: Story = createStory("animationDuration", "AnimationDuration")
export const AnimationEasing: Story = createStory("animationEasing", "AnimationEasing")
export const BackgroundColor: Story = createStory("backgroundColor", "BackgroundColor")
export const BorderColor: Story = createStory("borderColor", "BorderColor")
export const BorderRadius: Story = createStory("borderRadius", "BorderRadius")
export const BorderWidth: Story = createStory("borderWidth", "BorderWidth")
export const BoxShadow: Story = createStory("boxShadow", "BoxShadow")
export const CellHeight: Story = createStory("cellHeight", "CellHeight")
export const ForegroundColor: Story = createStory("foregroundColor", "ForegroundColor")
export const FontFamily: Story = createStory("fontFamily", "FontFamily")
export const FontSize: Story = createStory("fontSize", "FontSize")
export const FontWeight: Story = createStory("fontWeight", "FontWeight")
export const Gap: Story = createStory("gap", "Gap")
export const LineHeight: Story = createStory("lineHeight", "LineHeight")