import * as React from 'react';
import { BreakpointName, GapType, SpacingShorthandType, SpacingDefinitionType, WithBreakpointsProps } from 'nice-react-styles';

/**
 * FlexGapSizeType
 *
 * Re-export of GapType from nice-styles for consistency.
 * Uses design tokens that map to CSS custom properties.
 */
type FlexGapSizeType = GapType;
/**
 * FlexTypeType
 *
 * Determines whether spacing properties apply as padding or margin.
 *
 * Values:
 * - "padding": Applies spacing as internal padding
 * - "margin": Applies spacing as external margin
 */
type FlexTypeType = "padding" | "margin";
/**
 * FlexBreakpointType
 *
 * Re-export of BreakpointName from nice-styles.
 * Supported breakpoint values: "phone", "tablet", "laptop", "desktop"
 */
type FlexBreakpointType = BreakpointName;
/**
 * FlexDirectionType
 *
 * Flex direction values
 */
type FlexDirectionType = "row" | "column";
/**
 * FlexAlignItemsType
 *
 * Align items on cross axis
 */
type FlexAlignItemsType = "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
/**
 * FlexJustifyContentType
 *
 * Align items on main axis
 */
type FlexJustifyContentType = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
/**
 * FlexWrapType
 *
 * Controls flex wrapping behavior
 */
type FlexWrapType = "nowrap" | "wrap" | "wrap-reverse";
/**
 * FlexSpacingType
 *
 * CSS-like shorthand string for spacing using token names. Supports 1-4
 * space-separated token values following CSS padding/margin shorthand rules:
 * - 1 value: "small" → all sides
 * - 2 values: "small base" → top/bottom, left/right
 * - 3 values: "small base large" → top, left/right, bottom
 * - 4 values: "small base large smaller" → top, right, bottom, left
 *
 * For per-breakpoint overrides, use the wrapper's `breakpoints` prop. For
 * custom CSS values (px, rem, etc.), use the `style` prop instead.
 */
type FlexSpacingType = SpacingShorthandType;
/**
 * FlexSpacingDefinitionType
 *
 * Re-export of SpacingDefinitionType from nice-styles.
 * Provides granular control over spacing on all sides of the component.
 * Individual side values after parsing from shorthand.
 *
 * Properties:
 * - top, right, bottom, left: Individual side control with token values
 */
type FlexSpacingDefinitionType = SpacingDefinitionType;
/**
 * FlexProps
 *
 * Complete prop definition for the Flex component.
 * All layout-related props support both static values and responsive breakpoint objects.
 *
 * Breakpoint System:
 * - phone: Base styles, always applied
 * - tablet: min-width query above phone threshold
 * - laptop: min-width query for laptop screens
 * - desktop: min-width query for desktop screens
 */
type FlexProps = {
    /** Whether spacing applies as padding or margin */
    type?: FlexTypeType;
    gap?: FlexGapSizeType;
    direction?: FlexDirectionType;
    alignItems?: FlexAlignItemsType;
    justifyContent?: FlexJustifyContentType;
    grow?: number;
    shrink?: number;
    wrap?: FlexWrapType;
    /** Shrink the container to its content via `width: max-content`. @default false */
    fit?: boolean;
    /** Render as an inline-level flex container (`display: inline-flex`). @default false */
    inline?: boolean;
    spacing?: FlexSpacingType;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
};
type GapSize = FlexGapSizeType;
type Breakpoint = FlexBreakpointType;
type SpacingDefinition = FlexSpacingDefinitionType;
type Spacing = FlexSpacingType;
declare const FlexTypes: {};
declare namespace FlexTypes {
    type GapSize = FlexGapSizeType;
    type Type = FlexTypeType;
    type Breakpoint = FlexBreakpointType;
    type Direction = FlexDirectionType;
    type AlignItems = FlexAlignItemsType;
    type JustifyContent = FlexJustifyContentType;
    type Wrap = FlexWrapType;
    type SpacingDefinition = FlexSpacingDefinitionType;
    type Spacing = FlexSpacingType;
    type Props = FlexProps;
}

declare const Flex: React.FC<WithBreakpointsProps<FlexProps>>;

/**
 * Converts a GapSize value to its corresponding CSS value using CSS variables
 *
 * @function getGapSize
 * @param {GapSize} [size] - The gap size token key ("smaller", "small", "base", "large", "larger") or custom string
 * @returns {string | undefined} CSS variable reference or the string value as-is
 *
 * @example
 * getGapSize("smaller") // returns "var(--np--gap--smaller)"
 * getGapSize("base") // returns "var(--np--gap)"
 * getGapSize("2rem") // returns "2rem"
 * getGapSize("var(--custom-spacing)") // returns "var(--custom-spacing)"
 * getGapSize(null) // returns undefined
 * getGapSize(undefined) // returns undefined
 */
declare const getGapSize: (size?: GapSize) => string | undefined;

/**
 * Resolves a SpacingDefinition from a shorthand string prop (e.g. `"small"`,
 * `"small base"`), or undefined when no spacing is set. Responsive overrides
 * flow in through the `breakpoints` prop, which the `withBreakpoints` HOC
 * resolves to flat props before this runs.
 *
 * @example
 * getSpacingValue("small")
 * // → { top: "small", right: "small", bottom: "small", left: "small" }
 *
 * @example
 * getSpacingValue("small base")
 * // → { top: "small", right: "base", bottom: "small", left: "base" }
 */
declare const getSpacingValue: (spacing: FlexSpacingType | undefined) => SpacingDefinition | undefined;

/**
 * Generates CSS spacing properties (padding or margin) from a SpacingDefinition
 *
 * @function styleSpacing
 * @param {"padding" | "margin"} type - Whether to generate padding or margin properties
 * @param {SpacingDefinition} [def] - Spacing configuration object with top, right, bottom, left values
 * @returns {string} CSS property declarations separated by newlines
 *
 * @description
 * Generates CSS declarations for each side that has a defined value.
 * The SpacingDefinition is expected to already have individual side values
 * (parsed from shorthand by parseSpacingShorthand).
 *
 * @example
 * styleSpacing("padding", { top: "small", right: "base", bottom: "small", left: "base" })
 * // Returns: "padding-top: var(--core--gap--small);\npadding-right: var(--core--gap);\n..."
 *
 * @example
 * styleSpacing("margin", { top: "large", right: "large", bottom: "large", left: "large" })
 * // Returns: "margin-top: var(--core--gap--large);\nmargin-right: var(--core--gap--large);\n..."
 */
declare const styleSpacing: (type: "padding" | "margin", def?: SpacingDefinition | null) => string;

/**
 * styleFlex Service
 *
 * Generates the CSS declarations for a Flex container from its already
 * viewport-resolved props.
 *
 * Responsive behavior is handled upstream by the `withBreakpoints` HOC: it
 * resolves the `breakpoints` prop to flat scalar props for the active
 * breakpoint (re-rendering on viewport change) before this runs. So this
 * emits a single, breakpoint-agnostic style block — no `@media` fan-out.
 *
 * @function styleFlex
 * @param {FlexProps} props - The resolved Flex component props
 * @returns {string} CSS declarations separated by newlines
 *
 * @example
 * styleFlex({ direction: "column", gap: "small" })
 * // Returns: "display: flex;\nflex-direction: column;\ngap: var(--core--gap--small);"
 */
declare const styleFlex: (props: FlexProps) => string;

export { FlexTypes, Flex as default, getGapSize, getSpacingValue, styleFlex, styleSpacing };
export type { Breakpoint, FlexAlignItemsType, FlexBreakpointType, FlexDirectionType, FlexGapSizeType, FlexJustifyContentType, FlexProps, FlexSpacingDefinitionType, FlexSpacingType, FlexTypeType, FlexWrapType, GapSize, Spacing, SpacingDefinition };
