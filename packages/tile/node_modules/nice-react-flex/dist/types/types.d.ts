import * as React from "react";
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
export type GapSize = 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
export type FlexType = "padding" | "margin";
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
export type SpacingDefinition = {
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
export type FlexProps = {
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
//# sourceMappingURL=types.d.ts.map