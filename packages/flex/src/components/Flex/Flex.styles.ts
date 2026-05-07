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
 * 2. **Phone-First Responsive Design**: Applies styles in a phone-first approach:
 *    - Base styles: Always applied (phone breakpoint)
 *    - Tablet styles: Applied above phone threshold
 *    - Laptop styles: Applied for laptop screens
 *    - Desktop styles: Applied for desktop screens
 *
 * 3. **Service Integration**: Delegates actual CSS generation to the styleFlex service,
 *    keeping the styled component focused on responsive breakpoint management.
 *
 * @example
 * // Basic usage in component
 * <FlexStyled direction={{ phone: "column", tablet: "row" }} gap={{ phone: "small", laptop: "large" }}>
 *   <div>Content</div>
 * </FlexStyled>
 */
export const FlexStyled = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["mode", "spacing", "gap", "direction", "alignItems", "justifyContent", "grow", "wrap"].includes(
      prop as string
    ),
})<FlexProps>`
  ${(props) => styleFlex(BREAKPOINT_PHONE, props)}

  ${getBreakpoint(BREAKPOINT_TABLET).query} {
    ${(props) => styleFlex(BREAKPOINT_TABLET, props)}
  }

  ${getBreakpoint(BREAKPOINT_LAPTOP).query} {
    ${(props) => styleFlex(BREAKPOINT_LAPTOP, props)}
  }

  ${getBreakpoint(BREAKPOINT_DESKTOP).query} {
    ${(props) => styleFlex(BREAKPOINT_DESKTOP, props)}
  }
`
