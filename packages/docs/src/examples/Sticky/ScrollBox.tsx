import * as React from "react"
import Flex from "@niceprototypes/flex"
import { ScrollProvider } from "@niceprototypes/scroll"
import { getToken } from "@niceprototypes/styles"
import { ScrollRegion } from "./ScrollBox.styles"

/** Height of one preview's scrolling box; scroll examples also size a section to it. */
export const SCROLL_BOX_HEIGHT = `calc(${getToken("size", "larger")} * 3)`

/**
 * A bounded scrolling box for scroll-driven previews: its region is the ScrollProvider's
 * `root`, so Sticky sticks to its top, SectionLinks scrolls it, and FadeOnScroll measures
 * against it, as on a page that scrolls inside an app shell. `header` sits above the region,
 * inside the same provider (a SectionLinks bar).
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
      <ScrollProvider root={region}>
        {header}
        <ScrollRegion ref={region}>
          <Flex direction="column" shrink={0}>
            {children}
          </Flex>
        </ScrollRegion>
      </ScrollProvider>
    </Flex>
  )
}

export default ScrollBox
