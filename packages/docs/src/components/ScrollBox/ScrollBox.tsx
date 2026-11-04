import * as React from "react"
import Flex from "@niceprototypes/flex"
import { Scroll } from "@niceprototypes/scroll"
import { getToken } from "@niceprototypes/styles"
import { ScrollRegion } from "./ScrollBox.styles"

/** Height of one preview's scrolling box; scroll examples also size a section to it. */
export const SCROLL_BOX_HEIGHT = `calc(${getToken("size", "larger")} * 3)`

/**
 * A bounded scrolling box for the SectionLinks and Contents previews: its region is a
 * `<Scroll root>`, so the links scroll it and track its sections. `header` sits above the region,
 * inside the same root (the SectionLinks bar).
 */
const ScrollBox = ({ children, header }: { children: React.ReactNode; header?: React.ReactNode }) => {
  const region = React.useRef<HTMLDivElement>(null)
  return (
    <Flex
      direction="column"
      style={{
        blockSize: SCROLL_BOX_HEIGHT,
        inlineSize: `calc(${getToken("size", "larger")} * 4)`,
        border: `${getToken("borderWidth", "small")} solid ${getToken("borderColor", "base")}`,
        borderRadius: getToken("borderRadius", "base"),
        overflow: "hidden",
      }}
    >
      <Scroll root={region}>
        {header}
        <ScrollRegion ref={region}>
          <Flex direction="column" shrink={0}>
            {children}
          </Flex>
        </ScrollRegion>
      </Scroll>
    </Flex>
  )
}

export default ScrollBox
