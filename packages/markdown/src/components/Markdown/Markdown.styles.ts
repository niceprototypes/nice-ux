import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

/** The blocks in a column, `markdown.gap` apart; top-level lists drop their default margins for the gap. */
export const StyledMarkdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${getToken("markdown.gap")};

  & > ul,
  & > ol {
    margin: 0;
  }
`
