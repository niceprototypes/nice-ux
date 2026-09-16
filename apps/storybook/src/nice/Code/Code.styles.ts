import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

/**
 * Sizing wrapper for storybook Code instances, capped at the storybook
 * `contentMaxWidth` token (full width below laptop, 720px from laptop up).
 *
 * nice-react-code's card hardcodes `max-width: 720px` (with `width: max-content`
 * when `fit`), which ignores the viewport — so the child rule re-caps the card to
 * this wrapper. The token is read lazily: preview.tsx imports ShikiPre (and so
 * this module) before `src/nice/tokens` registers `contentMaxWidth`.
 */
export const CodeFlex = styled(Flex)`
  max-width: ${getToken("contentMaxWidth")};
  min-width: 0;

  & > * {
    max-width: 100%;
  }
`
