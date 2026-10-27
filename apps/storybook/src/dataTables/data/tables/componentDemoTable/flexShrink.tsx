import Flex from "@niceprototypes/flex"
import { getToken } from "@niceprototypes/styles"
import { dotStyle, trackStyle } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

// Two items, each as wide as the track, in a track that fits only one and a
// half: the first shrinks by the row's factor, the second always by 1.
const trackWidth = `calc(${getToken("size", "large")} * 1.5)`
const itemStyle = (color: "error" | "link") => ({ ...dotStyle(color), width: getToken("size", "large") })

export const flexShrink = {
  name: "shrink",
  description: "Flex shrink factor (flex-shrink): how much an item gives up when its siblings overflow the container. 0 keeps its size.",
  variants: ["0", "1", "2"],
  default: "1",
  preview: variant => (
    <Flex style={{ ...trackStyle, width: trackWidth }}>
      <Flex
        shrink={Number(variant)}
        style={itemStyle("error")}
      >
        <span />
      </Flex>
      <Flex
        shrink={1}
        style={itemStyle("link")}
      >
        <span />
      </Flex>
    </Flex>
  ),
  code: variant => `<Flex>\n  <Flex shrink={${variant}} />\n  <Flex shrink={1} />\n</Flex>`,
} satisfies ComponentExample
