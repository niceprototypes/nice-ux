import Flex from "@niceprototypes/flex"
import { dotStyle, trackStyle } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const flexMargin = {
  name: "margin",
  description: "Applies outer margin to the flex container using a gap-token shorthand (1–4 values). The track shows the space it adds around the inner container.",
  variants: ["smaller", "small", "base", "large", "larger"],
  // The default flex container has no margin, so no shown variant is the default.
  default: "none",
  preview: variant => (
    <Flex
      fit
      style={trackStyle}
    >
      <Flex margin={variant}>
        <span style={dotStyle("error")} />
      </Flex>
    </Flex>
  ),
  code: variant => `<Flex margin="${variant}" />`,
} satisfies ComponentExample
