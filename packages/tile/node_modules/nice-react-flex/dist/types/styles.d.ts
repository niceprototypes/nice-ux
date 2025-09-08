import { FlexProps } from "./types";
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
 *    Filtered props: type, spacing, gap, direction, alignItems, justifyContent, grow
 *
 * 2. **Mobile-First Responsive Design**: Applies styles in a mobile-first approach:
 *    - Base styles: Always applied (sm breakpoint)
 *    - Medium styles: Applied at 980px+ (md breakpoint)
 *    - Large styles: Applied at 1280px+ (lg breakpoint)
 *
 * 3. **Service Integration**: Delegates actual CSS generation to the styleFlex service,
 *    keeping the styled component focused on responsive breakpoint management.
 *
 * 4. **Clean Separation**: Separates styling logic from component structure, making
 *    the codebase more maintainable and testable.
 *
 * **CSS Generation Flow:**
 * 1. Component receives normalized props from normalizeProps service
 * 2. For each breakpoint (sm/md/lg), styleFlex generates appropriate CSS
 * 3. Media queries ensure styles are applied at correct screen sizes
 * 4. Higher breakpoint styles override lower ones as expected in CSS
 *
 * **Breakpoint System:**
 * - Small (sm): 0px+ - Base mobile styles, always applied
 * - Medium (md): 980px+ - Tablet and small desktop styles
 * - Large (lg): 1280px+ - Large desktop styles
 *
 * The component follows CSS cascade principles where later styles override earlier ones,
 * enabling predictable responsive behavior.
 *
 * @example
 * // Basic usage in component
 * <FlexStyled direction={{ sm: "column", md: "row" }} gap={{ sm: 1, lg: 3 }}>
 *   <div>Content</div>
 * </FlexStyled>
 *
 * @example
 * // Generated CSS structure
 * .FlexStyled-abc123 {
 *   // sm breakpoint styles (always applied)
 *   display: flex;
 *   flex-direction: column;
 *   gap: var(--gap-size-1);
 * }
 * @media (min-width: 980px) {
 *   .FlexStyled-abc123 {
 *     // md breakpoint styles
 *     flex-direction: row;
 *   }
 * }
 * @media (min-width: 1280px) {
 *   .FlexStyled-abc123 {
 *     // lg breakpoint styles
 *     gap: var(--gap-size-3);
 *   }
 * }
 */
export declare const FlexStyled: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, FlexProps>> & string;
//# sourceMappingURL=styles.d.ts.map