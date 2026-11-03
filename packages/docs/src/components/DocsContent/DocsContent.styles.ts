import styled from "styled-components"
import { getToken } from "../../nice/tokens"

/**
 * One vertical rhythm for a docs page's content, from the `docs` rhythm tokens. Spacing is the
 * top margin of every block after the first, so nothing doubles up and the first block sits
 * at the top: one flow step between blocks; an h2 a section step above and a smaller step
 * below, an h3 a subsection step above and a smaller one below; the page title (the first
 * block) its own step below; a rule a rule step on each side. Prose and links laid out inline
 * become blocks, `<br>` spacers give way to the rhythm, and the doubled class outranks a
 * component's own margins.
 */
export const StyledDocsContent = styled.div`
  && > * {
    margin-block: 0;
  }

  && > br {
    display: none;
  }

  && > span {
    display: block;
  }

  && > a {
    display: block;
    width: fit-content;
  }

  && > * + * {
    margin-top: ${getToken("docs", "flow")};
  }

  && > :first-child + * {
    margin-top: ${getToken("docs", "titleBelow")};
  }

  && > h2 {
    margin-top: ${getToken("docs", "sectionAbove")};
  }

  && > h2 + * {
    margin-top: ${getToken("docs", "sectionBelow")};
  }

  && > h3 {
    margin-top: ${getToken("docs", "subsectionAbove")};
  }

  && > h3 + * {
    margin-top: ${getToken("docs", "subsectionBelow")};
  }

  && > hr,
  && > hr + * {
    margin-top: ${getToken("docs", "rule")};
  }

  && > :first-child {
    margin-top: 0;
  }

  /* Headings scroll to where Contents sticks, like sections. */
  h2[id],
  h3[id] {
    scroll-margin-top: ${getToken("contents.top")};
  }
`
