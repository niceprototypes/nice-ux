import * as React from "react";
import { FlexProps } from "./types";
/**
 * Flex Component
 *
 * A highly flexible and responsive flexbox container component that provides
 * comprehensive layout control with breakpoint-based responsive design.
 *
 * @component
 * @example
 * // Basic usage with static props
 * <Flex direction="row" gap={2} alignItems="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * @example
 * // Responsive usage with breakpoint-based props
 * <Flex
 *   direction={{ sm: "column", md: "row" }}
 *   gap={{ sm: 1, md: 2, lg: 3 }}
 *   alignItems="center"
 * >
 *   <div>Responsive Item 1</div>
 *   <div>Responsive Item 2</div>
 * </Flex>
 *
 * @example
 * // Using spacing for padding/margin
 * <Flex
 *   type="padding"
 *   spacing={{ all: 2 }}
 *   gap={1}
 * >
 *   <div>Padded content</div>
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
 *    or responsive objects with sm/md/lg breakpoints
 *
 * 2. **Automatic Prop Normalization**: The component automatically normalizes props
 *    to ensure consistent behavior. Simple values are converted to breakpoint objects
 *    with the value applied to the 'sm' breakpoint.
 *
 * 3. **Spacing Management**: Supports both padding and margin with granular control
 *    over all sides (top, right, bottom, left) or shortcuts (horizontal, vertical, all)
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