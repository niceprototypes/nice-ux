import Flex from "nice-react-flex"
import { dotStyle, trackStyle } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

// The dot has no height of its own, so it stretches to the container's height.
const { height: _height, ...stretchDot } = dotStyle("link")

export const flexHeight = {
  name: "height",
  description: "Fixes the container height to a size token (--np--size--{variant}).",
  variants: ["smaller", "small", "base", "large", "larger"],
  // Without height the container takes its content's height, so no shown variant is the default.
  default: "none",
  preview: variant => (
    <Flex
      height={variant}
      fit
      style={trackStyle}
    >
      <span style={stretchDot} />
    </Flex>
  ),
  code: variant => `<Flex height="${variant}" />`,
} satisfies ComponentExample
