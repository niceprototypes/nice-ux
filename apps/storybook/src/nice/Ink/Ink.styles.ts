import * as React from "react"
import styled from "styled-components"
import NiceInk, { type InkProps } from "nice-react-ink"
import { getToken } from "nice-react-styles"

/**
 * NiceInk plus the descendant rules the docs pages rely on.
 *
 * The props are asserted rather than inferred. `styled(Component)` combined
 * with `forwardedAs` resolves styled-components' polymorphic overload, which
 * merges the intrinsic element's attributes into the props — and `color` is a
 * DOM attribute typed `string`, so Ink's object form (`{ name, transform }`)
 * fails to assign. The assertion pins the props to Ink's own, which is what the
 * wrapper actually forwards.
 */
export const StyledInk = styled(NiceInk)`
  a {
    color: ${getToken("color", "link")};
  }
  /* Inline code inside prose renders as a chip. */
  code {
    font-family: ${getToken("fontFamily", "code")};
    font-size: 0.9em;
    padding: 0.1em 0.35em;
    border: ${getToken("borderWidth", "small")} solid ${getToken("borderColor", "subtle")};
    border-radius: ${getToken("borderRadius", "small")};
    background-color: ${getToken("backgroundColor", "raised")};
  }
` as unknown as React.FC<InkProps & { forwardedAs?: InkProps["as"]; className?: string }>
