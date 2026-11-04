import * as React from "react"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import { Scroll } from "@niceprototypes/scroll"
import { useSceneRegion } from "@niceprototypes/app"
import { StoryHeader } from "@niceprototypes/docs/components/Story"
import { StoryHeaderLevel } from "@niceprototypes/docs/components/Story/StoryHeader/StoryHeaderLevel"
import Code from "@niceprototypes/docs/nice/Code"
import { getToken } from "../../tokens"

/** A section heading one level under the page title. */
const SectionHeading = ({ title, description }: { title: string; description: string }) => (
  <StoryHeaderLevel.Provider value="h2">
    <StoryHeader title={title} description={description} />
  </StoryHeaderLevel.Provider>
)

const STICKY_CODE = `<Scroll root>
  <Scroll sticky={{ onChange: setIsSticky }}>
    <Header />
  </Scroll>
</Scroll>`

const FADE_CODE = `<Scroll root>
  <Scroll fade={{ start: 0, peak: 50, end: 100, opacity: [0, 1, 0] }}>
    <Section />
  </Scroll>
</Scroll>`

const FADE_LINES = ["Fades in from the bottom of the view", "Full at its middle", "Fades out toward the top"]

/**
 * ScrollPageBehaviour
 *
 * The Scroll / Page behaviour page: `sticky` and `fade` running in the real page scroller (the
 * docs app's scene region, its `<Scroll root>`), not in a box. Scroll the page to drive them.
 * Not a DocsPage: its sections column scrolls sideways, which would hold the sticky bar.
 */
const ScrollPageBehaviour = () => {
  const region = useSceneRegion()
  const [isSticky, setIsSticky] = React.useState(false)
  return (
    <Scroll root={region}>
      <Flex direction="column" gap="larger" style={{ maxInlineSize: getToken("docs", "columnWidth"), marginInline: "auto" }}>
        <StoryHeader
          title="Page behaviour"
          description="Scroll's page-wide behaviours, driven by the page scroller: a <Scroll root> (the window, or the element the page scrolls in) above them. Scroll this page to see them."
          packageName="@niceprototypes/scroll"
        />
        <SectionHeading
          title="sticky"
          description="Keeps its children at the top of the root once the page scrolls past them, stacked by order; it slides up while scrolling down and back on scrolling up. onChange receives true when it sticks, false when it returns."
        />
        <Code language="tsx" code={STICKY_CODE} />
        <Scroll sticky={{ onChange: setIsSticky }} data-testid="page-behaviour-sticky">
          <Flex padding="base" style={{ backgroundColor: getToken("backgroundColor", "raised") }}>
            <Ink>{`onChange(${isSticky})`}</Ink>
          </Flex>
        </Scroll>
        <SectionHeading
          title="fade"
          description="Fades its children with their place in the root's view: from opacity[0] before start, to opacity[1] at peak, to opacity[2] after end (percent of the view, 0 at its bottom edge, 100 at its top)."
        />
        <Code language="tsx" code={FADE_CODE} />
        {FADE_LINES.map(line => (
          <Flex key={line} direction="column" justifyContent="center" style={{ minBlockSize: getToken("pageBehaviour", "room") }}>
            <Scroll fade data-testid="page-behaviour-fade">
              <Ink size="large">{line}</Ink>
            </Scroll>
          </Flex>
        ))}
      </Flex>
    </Scroll>
  )
}

export default ScrollPageBehaviour
