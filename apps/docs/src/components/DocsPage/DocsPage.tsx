import * as React from "react"
import Contents from "@niceprototypes/contents"
import type { ContentsItemsType } from "@niceprototypes/contents"
import Flex from "@niceprototypes/flex"
import { DocsSettingsContext } from "./DocsSettings"
import type { DocsPageProps, DocsPageSectionType } from "./DocsPage.types"
import {
  StyledDocsPage,
  StyledDocsPageAside,
  StyledDocsPageMain,
  StyledDocsPageSection,
  StyledDocsPageSettings,
  StyledDocsPageSettingsContent,
} from "./DocsPage.styles"

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
 * listing them (nested sections nested) in a sticky column on the right, from tablet up, and the
 * site's settings (DocsSettingsContext) in a sticky column right of that; the columns sit centred
 * in the page. Below tablet the settings are a row above the sections.
 */
const DocsPage: React.FC<DocsPageProps> = ({ sections, wrapped = true, contents }) => (
  <StyledDocsPage>
    <StyledDocsPageMain $wrapped={wrapped}>
      <Flex direction="column" gap="larger">
        {sections.map(section => <Section key={section.id} section={section} />)}
      </Flex>
    </StyledDocsPageMain>
    <StyledDocsPageAside>
      <Contents size="base" items={contents ?? toItems(sections)} />
    </StyledDocsPageAside>
    <StyledDocsPageSettings aria-label="Settings">
      <StyledDocsPageSettingsContent>{React.useContext(DocsSettingsContext)}</StyledDocsPageSettingsContent>
    </StyledDocsPageSettings>
  </StyledDocsPage>
)

export default DocsPage
