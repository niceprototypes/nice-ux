import styled from "styled-components"
import {
  getBreakpoint,
  BREAKPOINT_PHONE,
  BREAKPOINT_TABLET,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_DESKTOP,
} from "nice-react-styles"
import { FlexProps } from "./Flex.types"
import { styleFlex } from "../../services/styleFlex"

// Allowlist: only forward props that are valid on a <div>. Drops Flex's
// own layout props plus any unknown prop a consumer or HOC merges in via
// `breakpoints`, so nothing leaks to the underlying element.
const ALLOWED_DOM_PROPS = new Set(["style", "className", "id", "role", "title", "tabIndex", "children"])
const isForwardable = (prop: string): boolean =>
  ALLOWED_DOM_PROPS.has(prop) ||
  prop.startsWith("data-") ||
  prop.startsWith("aria-") ||
  (prop.startsWith("on") && prop.length > 2 && prop[2] === prop[2].toUpperCase())

/**
 * FlexStyled - Styled Component
 *
 * The main styled component that applies responsive flexbox styling to a div element.
 * Uses the styleFlex service to generate CSS for different breakpoints.
 *
 * @component FlexStyled
 * @extends {styled.div}
 * @type {FlexProps}
 *
 * @description
 * This styled component serves as the foundation for the Flex component's visual behavior.
 * It combines styled-components with responsive design patterns to create a powerful
 * layout system.
 *
 * **Key Features:**
 *
 * 1. **Prop Filtering**: Uses `shouldForwardProp` to prevent style-related props from
 *    being passed to the DOM, avoiding React warnings about unknown DOM properties.
 *    Filtered props: spacing, gap, direction, alignItems, justifyContent, grow, shrink, wrap
 *
 * 2. **Phone-First Responsive Design**: Applies styles in a phone-first approach:
 *    - Base styles: Always applied (phone breakpoint)
 *    - Tablet styles: Applied above phone threshold
 *    - Laptop styles: Applied for laptop screens
 *    - Desktop styles: Applied for desktop screens
 *
 * 3. **Service Integration**: Delegates actual CSS generation to the styleFlex service,
 *    keeping the styled component focused on responsive breakpoint management.
 *
 * `FlexStyled` is internal — it receives the post-`normalizeProps` shape,
 * not the consumer-facing scalar shape. Public usage of `<Flex>` is
 * scalar; responsive overrides flow in through the `breakpoints` prop.
 *
 * @example
 * // Internal usage (post-normalize)
 * <FlexStyled direction={{ phone: "column", tablet: "row" }} gap={{ phone: "small", laptop: "large" }}>
 *   <div>Content</div>
 * </FlexStyled>
 */
export const FlexStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => isForwardable(prop as string),
})<FlexProps>`
  ${(props) => styleFlex(BREAKPOINT_PHONE, props)}

  ${getBreakpoint(`${BREAKPOINT_TABLET}+`)} {
    ${(props) => styleFlex(BREAKPOINT_TABLET, props)}
  }

  ${getBreakpoint(`${BREAKPOINT_LAPTOP}+`)} {
    ${(props) => styleFlex(BREAKPOINT_LAPTOP, props)}
  }

  ${getBreakpoint(`${BREAKPOINT_DESKTOP}+`)} {
    ${(props) => styleFlex(BREAKPOINT_DESKTOP, props)}
  }
`
