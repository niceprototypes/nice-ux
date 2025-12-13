import type { Meta, StoryObj } from "@storybook/react"
import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import { getIconToken } from "nice-react-icon"
import { getTypographyToken } from "nice-react-typography"
import { getButtonToken } from "nice-react-button"
import VariableList from "../../../../src/components/VariableList"
import { generateDescriptionString } from "../../../../src/services"

const ComponentDemo = () => <></>

const meta = {
  title: "Styles/Tokens/Component",
  component: ComponentDemo,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
    docs: {
      description: {
        component: generateDescriptionString("nice-react-styles", {
          setup: [
            {
              value: 'import { createTokens } from "nice-react-styles"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value: 'const { GlobalStyles, getComponentToken } = createTokens("component", tokenMap)',
              code: true,
              newLine: true,
            },
          ],
        }),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ComponentDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

export const Tokens: Story = {
  name: "Tokens",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="larger">
      <section>
        <Typography as="h3">Icon</Typography>
        <Flex direction="column" gap="large">
          <div>
            <Typography as="h4" color="medium">strokeWidth</Typography>
            <VariableList
              variables={[
                { name: "small", value: getIconToken("strokeWidth", "small").value, code: getIconToken("strokeWidth", "small").key },
                { name: "base", value: getIconToken("strokeWidth", "base").value, code: getIconToken("strokeWidth", "base").key, default: true },
                { name: "large", value: getIconToken("strokeWidth", "large").value, code: getIconToken("strokeWidth", "large").key },
              ]}
            />
          </div>
          <div>
            <Typography as="h4" color="medium">spinningAnimationDuration</Typography>
            <VariableList
              variables={[
                { name: "base", value: getIconToken("spinningAnimationDuration", "base").value, code: getIconToken("spinningAnimationDuration", "base").key, default: true },
              ]}
            />
          </div>
          <div>
            <Typography as="h4" color="medium">viewBox</Typography>
            <VariableList
              variables={[
                { name: "base", value: getIconToken("viewBox", "base").value, code: getIconToken("viewBox", "base").key, default: true },
              ]}
            />
          </div>
        </Flex>
      </section>

      <section>
        <Typography as="h3">Typography</Typography>
        <Flex direction="column" gap="large">
          <div>
            <Typography as="h4" color="medium">letterSpacing</Typography>
            <VariableList
              variables={[
                { name: "tight", value: getTypographyToken("letterSpacing", "tight").value, code: getTypographyToken("letterSpacing", "tight").key },
                { name: "base", value: getTypographyToken("letterSpacing", "base").value, code: getTypographyToken("letterSpacing", "base").key, default: true },
                { name: "wide", value: getTypographyToken("letterSpacing", "wide").value, code: getTypographyToken("letterSpacing", "wide").key },
                { name: "wider", value: getTypographyToken("letterSpacing", "wider").value, code: getTypographyToken("letterSpacing", "wider").key },
              ]}
            />
          </div>
          <div>
            <Typography as="h4" color="medium">maxWidth</Typography>
            <VariableList
              variables={[
                { name: "prose", value: getTypographyToken("maxWidth", "prose").value, code: getTypographyToken("maxWidth", "prose").key },
                { name: "wide", value: getTypographyToken("maxWidth", "wide").value, code: getTypographyToken("maxWidth", "wide").key },
                { name: "full", value: getTypographyToken("maxWidth", "full").value, code: getTypographyToken("maxWidth", "full").key },
              ]}
            />
          </div>
        </Flex>
      </section>

      <section>
        <Typography as="h3">Button</Typography>
        <Flex direction="column" gap="large">
          <div>
            <Typography as="h4" color="medium">height</Typography>
            <VariableList
              variables={[
                { name: "smaller", value: getButtonToken("height", "smaller").value, code: getButtonToken("height", "smaller").key },
                { name: "small", value: getButtonToken("height", "small").value, code: getButtonToken("height", "small").key },
                { name: "base", value: getButtonToken("height", "base").value, code: getButtonToken("height", "base").key, default: true },
                { name: "large", value: getButtonToken("height", "large").value, code: getButtonToken("height", "large").key },
                { name: "larger", value: getButtonToken("height", "larger").value, code: getButtonToken("height", "larger").key },
              ]}
            />
          </div>
          <div>
            <Typography as="h4" color="medium">spacing</Typography>
            <VariableList
              variables={[
                { name: "smaller", value: getButtonToken("spacing", "smaller").value, code: getButtonToken("spacing", "smaller").key },
                { name: "small", value: getButtonToken("spacing", "small").value, code: getButtonToken("spacing", "small").key },
                { name: "base", value: getButtonToken("spacing", "base").value, code: getButtonToken("spacing", "base").key, default: true },
                { name: "large", value: getButtonToken("spacing", "large").value, code: getButtonToken("spacing", "large").key },
                { name: "larger", value: getButtonToken("spacing", "larger").value, code: getButtonToken("spacing", "larger").key },
              ]}
            />
          </div>
          <div>
            <Typography as="h4" color="medium">borderRadius</Typography>
            <VariableList
              variables={[
                { name: "small", value: getButtonToken("borderRadius", "small").value, code: getButtonToken("borderRadius", "small").key },
                { name: "base", value: getButtonToken("borderRadius", "base").value, code: getButtonToken("borderRadius", "base").key, default: true },
                { name: "large", value: getButtonToken("borderRadius", "large").value, code: getButtonToken("borderRadius", "large").key },
              ]}
            />
          </div>
        </Flex>
      </section>
    </Flex>
  ),
}
