import Flex from "nice-react-flex"
import { dotStyle, trackStyle } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const flexChildren = {
  name: "children",
  description: "The flex items. Every direct child is laid out by the container's direction, gap, alignment and wrap.",
  variants: ["items"],
  default: "items",
  preview: () => (
    <Flex
      gap="smaller"
      padding="smaller"
      style={trackStyle}
    >
      <span style={dotStyle("error")} />
      <span style={dotStyle("warning")} />
      <span style={dotStyle("link")} />
    </Flex>
  ),
  code: () => `<Flex gap="smaller">\n  <Flex />\n  <Flex />\n  <Flex />\n</Flex>`,
} satisfies ComponentExample
