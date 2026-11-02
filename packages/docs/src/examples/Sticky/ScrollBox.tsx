import type * as React from "react"
import Flex from "@niceprototypes/flex"
import { getToken } from "@niceprototypes/styles"

/** Height of one preview's scrolling box; scroll examples also size a section to it. */
export const SCROLL_BOX_HEIGHT = `calc(${getToken("size", "larger")} * 3)`

/**
 * A bounded scrolling box for scroll-driven previews. The outer frame contains paint, so it is
 * the containing block for Sticky's fixed wrapper; the inner region scrolls a column that
 * keeps its children's heights (Sticky's empty spacer would otherwise shrink to nothing).
 */
const ScrollBox = ({ children }: { children: React.ReactNode }) => (
  <Flex
    direction="column"
    style={{
      contain: "paint",
      blockSize: SCROLL_BOX_HEIGHT,
      inlineSize: `calc(${getToken("size", "larger")} * 4)`,
      border: `${getToken("borderWidth", "small")} solid ${getToken("borderColor", "base")}`,
      borderRadius: getToken("borderRadius", "base"),
    }}
  >
    <Flex
      direction="column"
      grow={1}
      style={{ minBlockSize: 0, overflowY: "auto" }}
    >
      <Flex
        direction="column"
        shrink={0}
      >
        {children}
      </Flex>
    </Flex>
  </Flex>
)

export default ScrollBox
