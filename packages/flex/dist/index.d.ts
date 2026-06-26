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
 * Extracts the value for a specific breakpoint from a normalized prop.
 *
 * After `normalizeProps`, every per-breakpoint prop is wrapped into a phone-
 * keyed object (`{ phone: value }`). Tablet/laptop/desktop overrides are
 * folded in by the `withBreakpoints` HOC before `styleFlex` runs, so this
 * function simply returns the per-breakpoint value or undefined.
 *
 * @example
 * getBreakpointValue({ phone: "row" }, "phone")   // → "row"
 * getBreakpointValue({ phone: "row" }, "tablet")  // → undefined
 * getBreakpointValue({ phone: "column", tablet: "row" }, "tablet") // → "row"
 */
declare const getBreakpointValue: <T>(value: {
    phone?: T;
    tablet?: T;
    laptop?: T;
    desktop?: T;
} | undefined, breakpoint: BreakpointName) => T | undefined;

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
 * Resolves the SpacingDefinition for a specific breakpoint from a shorthand
 * string prop.
 *
 * Spacing is consumed as a single scalar shorthand string (e.g. `"small"`,
 * `"small base"`). The shorthand is parsed and applied at the phone
 * breakpoint; tablet/laptop/desktop overrides flow in through the
 * `breakpoints` prop, which the `withBreakpoints` HOC folds into each
 * breakpoint's props before this function runs.
 *
 * @example
 * getSpacingValue("small", "phone")
 * // → { top: "small", right: "small", bottom: "small", left: "small" }
 *
 * @example
 * getSpacingValue("small base", "phone")
 * // → { top: "small", right: "base", bottom: "small", left: "base" }
 *
 * @example
 * getSpacingValue("small", "tablet")
 * // → undefined (no spacing rule emitted at non-phone breakpoints unless
 * //   the HOC merged a tablet override from the `breakpoints` prop)
 */
declare const getSpacingValue: (spacing: FlexSpacingType | undefined, breakpoint: BreakpointName) => SpacingDefinition | undefined;

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
 * Generates CSS styling for a specific breakpoint based on normalized Flex component props.
 * This is the core styling logic that transforms component props into CSS declarations.
 *
 * @function styleFlex
 * @param {Breakpoint} breakpoint - The breakpoint to generate styles for (phone/tablet/laptop/desktop)
 * @param {FlexProps} props - The normalized Flex component props
 * @returns {string} CSS declarations separated by newlines
 *
 * @description
 * This service handles the generation of all CSS properties for the Flex component:
 *
 * **Base Display**: Sets `display: flex` only for the 'phone' breakpoint to establish
 * the flexbox context. Higher breakpoints inherit this display value.
 *
 * **Responsive Value Extraction**: For each CSS property, the function extracts
 * the appropriate value based on whether the prop is a simple value or breakpoint object:
 * - Object props: Use the value for the current breakpoint
 * - Simple props: Only use for 'phone' breakpoint (since props are normalized)
 *
 * **CSS Property Generation**: Generates standard CSS flexbox properties:
 * - `flex-direction`: Controls layout direction (row/column)
 * - `align-items`: Aligns items on the cross axis
 * - `justify-content`: Aligns items on the main axis
 * - `flex-grow` & `flex-basis`: Controls item growth behavior
 * - `flex-wrap`: Controls whether items wrap to new lines
 * - `gap`: Sets space between flex items using CSS Grid gap
 *
 * **Spacing Integration**: Uses the styleSpacing helper to generate padding
 * or margin properties with full side-by-side control.
 *
 * The function is designed to work with props that have been processed by
 * the normalizeProps service, ensuring consistent prop structure.
 *
 * Examples below show the POST-normalizeProps shape (every per-breakpoint
 * prop is a `{ phone, tablet, laptop, desktop }` object). Consumer-facing
 * `<Flex>` props are scalar; responsive overrides flow in through the
 * `breakpoints` prop, which the `withBreakpoints` HOC folds into each
 * breakpoint's props before this function runs.
 *
 * @example
 * // Generate phone breakpoint styles
 * const props = { direction: { phone: "column" }, gap: { phone: "small" } }
 * styleFlex(BREAKPOINT_PHONE, props)
 * // Returns: "display: flex;\nflex-direction: column;\ngap: var(--core--gap--small);"
 *
 * @example
 * // Generate tablet breakpoint styles
 * const props = {
 *   direction: { phone: "column", tablet: "row" },
 *   gap: { phone: "small", tablet: "base" },
 *   spacing: { tablet: "small base" }
 * }
 * styleFlex(BREAKPOINT_TABLET, props)
 * // Returns: "flex-direction: row;\ngap: var(--core--gap);\npadding-top: var(--core--gap--small);\npadding-right: var(--core--gap);..."
 */
declare const styleFlex: (breakpoint: BreakpointName, props: FlexProps) => string;

export { FlexTypes, Flex as default, getBreakpointValue, getGapSize, getSpacingValue, styleFlex, styleSpacing };
export type { Breakpoint, FlexAlignItemsType, FlexBreakpointType, FlexDirectionType, FlexGapSizeType, FlexJustifyContentType, FlexProps, FlexSpacingDefinitionType, FlexSpacingType, FlexTypeType, FlexWrapType, GapSize, Spacing, SpacingDefinition };
