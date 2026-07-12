import * as React from "react";
import { FlexProps } from "./Flex.types";
/**
 * Flex Component
 *
 * A highly flexible and responsive flexbox container component that provides
 * comprehensive layout control with breakpoint-based responsive design.
 *
 * @component
 * @example
 * // Basic usage with static props
 * <Flex direction="row" gap="base" alignItems="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * @example
 * // Responsive usage via the breakpoints object
 * <Flex
 *   direction="column"
 *   gap="small"
 *   alignItems="center"
 *   breakpoints={{
 *     "tablet+": { direction: "row", gap: "base" },
 *     "laptop+": { gap: "large" },
 *   }}
 * >
 *   <div>Responsive Item 1</div>
 *   <div>Responsive Item 2</div>
 * </Flex>
 *
 * @example
 * // Padding with CSS-like shorthand
 * <Flex padding="small base" gap="small">
 *   <div>Padded content (top/bottom: small, left/right: base)</div>
 * </Flex>
 *
 * @example
 * // Responsive margin
 * <Flex
 *   margin="small"
 *   breakpoints={{
 *     "tablet+": { margin: "base large" },
 *     "laptop+": { margin: "small base large smaller" },
 *   }}
 * >
 *   <div>Responsive margins</div>
 * </Flex>
 *
 * @param {FlexProps} props - The component props
 * @returns {JSX.Element} A styled div element with flexbox properties
 *
 * @description
 * The Flex component serves as a versatile container that leverages CSS Flexbox
 * for creating responsive layouts. It supports:
 *
 * 1. **Responsive Design**: All layout props can be specified as either static values
 *    or responsive objects with phone/tablet/laptop/desktop breakpoints
 *
 * 2. **Responsive Overrides via HOC**: Responsive behavior is provided by the
 *    `withBreakpoints` HOC (applied in `index.ts`), which resolves the
 *    `breakpoints` prop to flat props for the active viewport before render.
 *
 * 3. **CSS-like Spacing Shorthand**: Supports 1-4 token values like CSS padding/margin:
 *    - "small" → all sides
 *    - "small base" → top/bottom, left/right
 *    - "small base large" → top, left/right, bottom
 *    - "small base large smaller" → top, right, bottom, left
 *
 * 4. **Gap Support**: Uses CSS gap property for consistent spacing between flex items
 *
 * 5. **Growth Control**: Allows flex items to grow with configurable flex-grow values
 *
 * The component uses styled-components for styling and filters out style props before
 * passing them to the DOM to avoid React warnings about unknown DOM properties.
 */
declare const Flex: React.FC<FlexProps>;
export default Flex;
//# sourceMappingURL=Flex.d.ts.map