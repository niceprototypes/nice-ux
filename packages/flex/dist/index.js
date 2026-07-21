'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var niceReactStyles = require('nice-react-styles');
var jsxRuntime = require('react/jsx-runtime');
require('react');
var styled = require('styled-components');

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
const getGapSize = (size) => {
    if (size === undefined || size === null)
        return undefined;
    // Handle "none" as zero spacing
    if (size === "none") {
        return "0";
    }
    // Check if it's a valid token key
    if (size === "smaller" || size === "small" || size === "base" || size === "large" || size === "larger") {
        return niceReactStyles.getConstant("gap", size);
    }
    // Otherwise return the custom string as-is
    return size;
};

/**
 * Parses a CSS-like spacing shorthand string into a SpacingDefinition object.
 *
 * Follows CSS padding/margin shorthand rules:
 * - 1 value: "small" → { top: "small", right: "small", bottom: "small", left: "small" }
 * - 2 values: "small base" → { top: "small", right: "base", bottom: "small", left: "base" }
 * - 3 values: "small base large" → { top: "small", right: "base", bottom: "large", left: "base" }
 * - 4 values: "small base large smaller" → { top: "small", right: "base", bottom: "large", left: "smaller" }
 *
 * @param shorthand - The spacing shorthand string
 * @returns SpacingDefinition with top, right, bottom, left values
 */
const parseSpacingShorthand = (shorthand) => {
    const values = shorthand.split(" ");
    switch (values.length) {
        case 1:
            // All sides same
            return {
                top: values[0],
                right: values[0],
                bottom: values[0],
                left: values[0],
            };
        case 2:
            // top/bottom, left/right
            return {
                top: values[0],
                right: values[1],
                bottom: values[0],
                left: values[1],
            };
        case 3:
            // top, left/right, bottom
            return {
                top: values[0],
                right: values[1],
                bottom: values[2],
                left: values[1],
            };
        case 4:
            // top, right, bottom, left
            return {
                top: values[0],
                right: values[1],
                bottom: values[2],
                left: values[3],
            };
        default:
            // Fallback: treat as single value
            return {
                top: values[0],
                right: values[0],
                bottom: values[0],
                left: values[0],
            };
    }
};

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
const getSpacingValue = (spacing) => {
    if (spacing === undefined)
        return undefined;
    return parseSpacingShorthand(spacing);
};

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
const styleSpacing = (type, def) => {
    if (!def)
        return "";
    const parts = [];
    if (def.top !== undefined) {
        parts.push(`${type}-top: ${getGapSize(def.top)};`);
    }
    if (def.right !== undefined) {
        parts.push(`${type}-right: ${getGapSize(def.right)};`);
    }
    if (def.bottom !== undefined) {
        parts.push(`${type}-bottom: ${getGapSize(def.bottom)};`);
    }
    if (def.left !== undefined) {
        parts.push(`${type}-left: ${getGapSize(def.left)};`);
    }
    return parts.join("\n");
};

// Phone establishes the flex context; larger breakpoints inherit it. `inlined`
// switches it to an inline-level flex container (`display: inline-flex`).
function pushDisplayStyles(styles, inlined) {
    styles.push(`display: ${inlined ? "inline-flex" : "flex"};`);
}
function pushDirectionStyles(styles, direction) {
    styles.push(`flex-direction: ${direction};`);
}
function pushAlignItemsStyles(styles, alignItems) {
    styles.push(`align-items: ${alignItems};`);
}
function pushJustifyContentStyles(styles, justifyContent) {
    styles.push(`justify-content: ${justifyContent};`);
}
// flex-basis: 0 pairs with grow so items size from grow ratios, not content
function pushGrowStyles(styles, grow) {
    styles.push(`flex-grow: ${grow};`);
    styles.push("flex-basis: 0;");
}
function pushShrinkStyles(styles, shrink) {
    styles.push(`flex-shrink: ${shrink};`);
}
function pushWrapStyles(styles, wrap) {
    styles.push(`flex-wrap: ${wrap};`);
}
// fit: shrink the container to its content width.
function pushFitStyles(styles) {
    styles.push("width: max-content;");
}
function pushGapStyles(styles, gap) {
    const gapValue = getGapSize(gap);
    if (gapValue) {
        styles.push(`gap: ${gapValue};`);
    }
}
// Fix the container height to a cell-height token variant (--np--cell-height--…).
function pushHeightStyles(styles, height) {
    styles.push(`height: ${niceReactStyles.getConstant("cellHeight", height)};`);
}
function pushSpacingStyles(styles, type, spacing) {
    const spacingStyles = styleSpacing(type, spacing);
    if (spacingStyles) {
        styles.push(spacingStyles);
    }
}
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
const styleFlex = (props) => {
    const styles = [];
    const { direction, gap, grow, shrink, alignItems, justifyContent, wrap, fit, inlined, padding, margin, height } = props;
    const paddingDefinition = getSpacingValue(padding);
    const marginDefinition = getSpacingValue(margin);
    pushDisplayStyles(styles, inlined);
    if (direction)
        pushDirectionStyles(styles, direction);
    if (alignItems)
        pushAlignItemsStyles(styles, alignItems);
    if (justifyContent)
        pushJustifyContentStyles(styles, justifyContent);
    if (grow !== undefined)
        pushGrowStyles(styles, grow);
    if (shrink !== undefined)
        pushShrinkStyles(styles, shrink);
    if (wrap)
        pushWrapStyles(styles, wrap);
    if (fit)
        pushFitStyles(styles);
    if (gap !== undefined)
        pushGapStyles(styles, gap);
    if (height)
        pushHeightStyles(styles, height);
    if (paddingDefinition)
        pushSpacingStyles(styles, "padding", paddingDefinition);
    if (marginDefinition)
        pushSpacingStyles(styles, "margin", marginDefinition);
    return styles.join("\n");
};

// Allowlist: only forward props that are valid on a <div>. Drops Flex's
// own layout props plus any unknown prop a consumer or HOC merges in via
// `breakpoints`, so nothing leaks to the underlying element.
const ALLOWED_DOM_PROPS = new Set(["style", "className", "id", "role", "title", "tabIndex", "children"]);
const isForwardable = (prop) => ALLOWED_DOM_PROPS.has(prop) ||
    prop.startsWith("data-") ||
    prop.startsWith("aria-") ||
    (prop.startsWith("on") && prop.length > 2 && prop[2] === prop[2].toUpperCase());
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
 *    Filtered props: padding, margin, gap, direction, alignItems, justifyContent, grow, shrink, wrap
 *
 * 2. **Service Integration**: Delegates CSS generation to the `styleFlex`
 *    service, emitting a single style block from the resolved props.
 *
 * `FlexStyled` is internal and receives flat scalar props. Responsive
 * overrides flow in through the `breakpoints` prop, which the
 * `withBreakpoints` HOC resolves to flat props for the active viewport
 * before this component renders.
 *
 * @example
 * <FlexStyled direction="column" gap="small">
 *   <div>Content</div>
 * </FlexStyled>
 */
const FlexStyled = styled.div.withConfig({
    shouldForwardProp: (prop) => isForwardable(prop),
}) `
  ${(props) => styleFlex(props)}
`;

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
const Flex$1 = (props) => {
    return jsxRuntime.jsx(FlexStyled, { ...props, children: props.children });
};

// Declaration merging: const + namespace creates exportable type namespace
const FlexTypes = {};

// Explicit return-type annotation — without it, TS declaration emit collapses
// the wrapped const to `any` (or to an unbound generic), which erases the
// `breakpoints` prop on consumers.
const Flex = niceReactStyles.withBreakpoints(Flex$1);

exports.FlexTypes = FlexTypes;
exports.default = Flex;
exports.getGapSize = getGapSize;
exports.getSpacingValue = getSpacingValue;
exports.styleFlex = styleFlex;
exports.styleSpacing = styleSpacing;
//# sourceMappingURL=index.js.map
