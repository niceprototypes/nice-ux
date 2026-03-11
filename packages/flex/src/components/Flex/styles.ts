import styled from "styled-components"
import { getBreakpoint } from "nice-react-styles"
import { FlexProps } from "./types"
import { styleFlex } from "../../services/styleFlex"

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
 *    Filtered props: mode, spacing, gap, direction, alignItems, justifyContent, grow, wrap
 *
 * 2. **Mobile-First Responsive Design**: Applies styles in a mobile-first approach:
 *    - Base styles: Always applied (mobile breakpoint)
 *    - Tablet styles: Applied above mobile threshold
 *    - Desktop styles: Applied for large screens
 *
 * 3. **Service Integration**: Delegates actual CSS generation to the styleFlex service,
 *    keeping the styled component focused on responsive breakpoint management.
 *
 * @example
 * // Basic usage in component
 * <FlexStyled direction={{ mobile: "column", tablet: "row" }} gap={{ mobile: "small", desktop: "large" }}>
 *   <div>Content</div>
 * </FlexStyled>
 */
export const FlexStyled = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["mode", "spacing", "gap", "direction", "alignItems", "justifyContent", "grow", "wrap"].includes(
      prop as string
    ),
})<FlexProps>`
  ${(props) => styleFlex("mobile", props)}

  ${getBreakpoint("tablet").query} {
    ${(props) => styleFlex("tablet", props)}
  }

  ${getBreakpoint("desktop").query} {
    ${(props) => styleFlex("desktop", props)}
  }
`
