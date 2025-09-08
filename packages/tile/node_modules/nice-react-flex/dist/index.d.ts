import * as React from 'react';

/**
 * GapSize Type
 *
 * Defines the available size values for gaps and spacing throughout the component.
 * These values map to CSS custom properties (e.g., --gap-size-1, --gap-size-2, etc.)
 *
 * @type {0 | 1 | 2 | 3 | 4 | 5 | 6}
 *
 * Values:
 * - 0: No gap/spacing
 * - 1-6: Incrementally larger spacing values defined by CSS variables
 */
type GapSize = 0 | 1 | 2 | 3 | 4 | 5 | 6;
/**
 * FlexType Type
 *
 * Determines whether spacing properties apply as padding or margin.
 *
 * @type {"padding" | "margin"}
 *
 * Values:
 * - "padding": Applies spacing as internal padding
 * - "margin": Applies spacing as external margin
 */
type FlexType = "padding" | "margin";
/**
 * SpacingDefinition Interface
 *
 * Provides granular control over spacing on all sides of the component.
 * Supports shortcuts for common patterns while allowing individual side control.
 *
 * @interface SpacingDefinition
 *
 * Properties:
 * @property {GapSize} [all] - Applies spacing to all four sides
 * @property {GapSize} [horizontal] - Applies spacing to left and right sides
 * @property {GapSize} [vertical] - Applies spacing to top and bottom sides
 * @property {GapSize} [top] - Applies spacing to top side only
 * @property {GapSize} [right] - Applies spacing to right side only
 * @property {GapSize} [bottom] - Applies spacing to bottom side only
 * @property {GapSize} [left] - Applies spacing to left side only
 *
 * Priority order (highest to lowest):
 * 1. Individual sides (top, right, bottom, left)
 * 2. Axis shortcuts (horizontal, vertical)
 * 3. All sides (all)
 *
 * @example
 * // All sides with size 2
 * { all: 2 }
 *
 * @example
 * // Different horizontal and vertical spacing
 * { horizontal: 3, vertical: 1 }
 *
 * @example
 * // Custom per-side spacing
 * { top: 2, right: 3, bottom: 2, left: 1 }
 */
type SpacingDefinition = {
    all?: GapSize;
    horizontal?: GapSize;
    vertical?: GapSize;
    top?: GapSize;
    right?: GapSize;
    bottom?: GapSize;
    left?: GapSize;
};
/**
 * FlexProps Interface
 *
 * Complete prop definition for the Flex component.
 * All layout-related props support both static values and responsive breakpoint objects.
 *
 * @interface FlexProps
 *
 * Layout Properties:
 * @property {FlexType} [type="padding"] - Whether spacing applies as padding or margin
 *
 * @property [gap] - Space between flex items using CSS gap
 *   - Static: gap={2}
 *   - Responsive: gap={{ sm: 1, md: 2, lg: 3 }}
 *
 * @property [direction] - Flex direction (row/column)
 *   - Static: direction="row"
 *   - Responsive: direction={{ sm: "column", md: "row" }}
 *
 * @property [alignItems] - Align items on cross axis
 *   - Values: "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
 *   - Static: alignItems="center"
 *   - Responsive: alignItems={{ sm: "flex-start", md: "center" }}
 *
 * @property [justifyContent] - Align items on main axis
 *   - Values: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
 *   - Static: justifyContent="space-between"
 *   - Responsive: justifyContent={{ sm: "center", md: "space-between" }}
 *
 * @property [grow] - Flex grow value for the container
 *   - Static: grow={1}
 *   - Responsive: grow={{ sm: 0, md: 1 }}
 *
 * @property [spacing] - Padding or margin spacing configuration
 *   - Simple: spacing={2} (applies to all sides at sm breakpoint)
 *   - Definition: spacing={{ all: 2, horizontal: 3 }}
 *   - Responsive: spacing={{ sm: { all: 1 }, md: { all: 2 }, lg: { all: 3 } }}
 *
 * Standard React Properties:
 * @property {React.ReactNode} children - Child elements to render inside the flex container
 * @property {React.CSSProperties} [style] - Inline styles applied to the root element
 * @property {string} [className] - CSS class name applied to the root element
 * @property {React.MouseEventHandler} [onClick] - Click event handler for the container
 *
 * Breakpoint System:
 * - sm: Small screens (mobile) - always applied as base
 * - md: Medium screens (tablet) - min-width: 980px
 * - lg: Large screens (desktop) - min-width: 1280px
 *
 * @example
 * // Simple static props
 * <Flex direction="row" gap={2} alignItems="center">
 *   {children}
 * </Flex>
 *
 * @example
 * // Fully responsive configuration
 * <Flex
 *   direction={{ sm: "column", md: "row" }}
 *   gap={{ sm: 1, md: 2, lg: 3 }}
 *   alignItems={{ sm: "stretch", md: "center" }}
 *   justifyContent="space-between"
 *   spacing={{
 *     sm: { all: 1 },
 *     md: { horizontal: 2, vertical: 1 },
 *     lg: { all: 3 }
 *   }}
 * >
 *   {children}
 * </Flex>
 */
type FlexProps = {
    type?: FlexType;
    gap?: GapSize | {
        sm?: GapSize;
        md?: GapSize;
        lg?: GapSize;
    };
    direction?: "row" | "column" | {
        sm?: "row" | "column";
        md?: "row" | "column";
        lg?: "row" | "column";
    };
    alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch" | {
        sm?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
        md?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
        lg?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
    };
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | {
        sm?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
        md?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
        lg?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    };
    grow?: number | {
        sm?: number;
        md?: number;
        lg?: number;
    };
    spacing?: GapSize | SpacingDefinition | {
        sm?: SpacingDefinition;
        md?: SpacingDefinition;
        lg?: SpacingDefinition;
    };
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

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
//# sourceMappingURL=Flex.d.ts.map

export { Flex as default };
export type { FlexProps, FlexType, GapSize, SpacingDefinition };
