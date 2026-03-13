import * as React from "react"
import { FlexStyled } from "./styles"
import { FlexProps } from "./types"
import { normalizeProps } from "../../utilities/normalizeProps"

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
 * // Responsive usage with breakpoint-based props
 * <Flex
 *   direction={{ mobile: "column", tablet: "row" }}
 *   gap={{ mobile: "small", tablet: "base", desktop: "large" }}
 *   alignItems="center"
 * >
 *   <div>Responsive Item 1</div>
 *   <div>Responsive Item 2</div>
 * </Flex>
 *
 * @example
 * // Using spacing with CSS-like shorthand
 * <Flex spacing="small base" gap="small">
 *   <div>Padded content (top/bottom: small, left/right: base)</div>
 * </Flex>
 *
 * @example
 * // Responsive spacing with margin mode
 * <Flex
 *   mode="margin"
 *   spacing={{ mobile: "small", tablet: "base large", desktop: "small base large smaller" }}
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
 *    or responsive objects with mobile/tablet/desktop breakpoints
 *
 * 2. **Automatic Prop Normalization**: The component automatically normalizes props
 *    to ensure consistent behavior. Simple values are converted to breakpoint objects
 *    with the value applied to the 'mobile' breakpoint.
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
const Flex: React.FC<FlexProps> = (props) => {
  // Normalize props to ensure all breakpoint-capable props are in object format
  // This simplifies the styling logic by providing a consistent prop structure
  const normalizedProps = normalizeProps(props)

  // Render the styled component with normalized props
  // Children are passed through from original props to maintain reference integrity
  return <FlexStyled {...normalizedProps}>{props.children}</FlexStyled>
}

export default Flex
