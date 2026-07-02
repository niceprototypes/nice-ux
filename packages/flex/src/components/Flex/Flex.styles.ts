import styled from "styled-components"
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
 * 2. **Service Integration**: Delegates CSS generation to the `styleFlex`
 *    service, emitting a single style block from the resolved props.
 *
 * `FlexStyled` is internal and receives flat scalar props. Responsive
 * overrides flow in through the `breakpoints` prop, which the
 * `withBreakpoints` HOC resolves to flat props for the active viewport
 * before this component renders.
 *
 * @example
 * <FlexStyled direction="column" gap="small">
 *   <div>Content</div>
 * </FlexStyled>
 */
export const FlexStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => isForwardable(prop as string),
})<FlexProps>`
  ${(props) => styleFlex(props)}
`
