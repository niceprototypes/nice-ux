import * as React from "react"
import Contents from "@niceprototypes/contents"
import type { ContentsItemsType } from "@niceprototypes/contents"
import Flex from "@niceprototypes/flex"
import type { DocsPageProps, DocsPageSectionType } from "./DocsPage.types"
import { StyledDocsPageAside, StyledDocsPageMain, StyledDocsPageSection } from "./DocsPage.styles"

/** Contents rows for a level of sections, nested sections one level deeper. */
const toItems = (sections: ReadonlyArray<DocsPageSectionType>): ContentsItemsType =>
  sections.map(({ id, label, sections: nested }) => ({ id, label, ...(nested?.length ? { items: toItems(nested) } : {}) }))

/** A section: its content, then its nested sections. */
const Section = ({ section }: { section: DocsPageSectionType }) => (
  <StyledDocsPageSection id={section.id}>
    <Flex direction="column" gap="larger">
      {section.content}
      {section.sections?.map(nested => <Section key={nested.id} section={nested} />)}
    </Flex>
  </StyledDocsPageSection>
)

/**
 * DocsPage
 *
 * A docs page: its sections stacked in a column capped at `docs.columnWidth` (unless not
 * `wrapped`), and Contents
 * listing them (nested sections nested) in a sticky column on the right, from tablet up; the two
 * columns sit centred in the page.
 */
const DocsPage: React.FC<DocsPageProps> = ({ sections, wrapped = true }) => (
  <Flex gap="larger" justifyContent="center">
    <StyledDocsPageMain $wrapped={wrapped}>
      <Flex direction="column" gap="larger">
        {sections.map(section => <Section key={section.id} section={section} />)}
      </Flex>
    </StyledDocsPageMain>
    <StyledDocsPageAside>
      <Contents items={toItems(sections)} />
    </StyledDocsPageAside>
  </Flex>
)

export default DocsPage
