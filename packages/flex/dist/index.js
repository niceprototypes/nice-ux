'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var niceReactStyles = require('nice-react-styles');
var jsxRuntime = require('react/jsx-runtime');
require('react');
var styled = require('styled-components');

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
const getBreakpointValue = (value, breakpoint) => {
    if (value === undefined)
        return undefined;
    return value[breakpoint];
};

/**
 * Converts a GapSize value to its corresponding CSS value using CSS variables
 *
 * @function getGapSize
 * @param {GapSize} [size] - The gap size token key ("smaller", "small", "base", "large", "larger") or custom string
 * @returns {string | undefined} CSS variable reference or the string value as-is
 *
 * @example
 * getGapSize("smaller") // returns "var(--np--gap--smaller)"
 * getGapSize("base") // returns "var(--np--gap--base)"
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
const getSpacingValue = (spacing, breakpoint) => {
    if (spacing === undefined)
        return undefined;
    if (breakpoint !== niceReactStyles.BREAKPOINT_PHONE)
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
 * // Returns: "padding-top: var(--core--gap--small);\npadding-right: var(--core--gap--base);\n..."
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

// Phone establishes the flex context; larger breakpoints inherit it
function pushDisplayStyles(styles) {
    styles.push("display: flex;");
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
function pushGapStyles(styles, gap) {
    const gapValue = getGapSize(gap);
    if (gapValue) {
        styles.push(`gap: ${gapValue};`);
    }
}
function pushSpacingStyles(styles, type, spacing) {
    const spacingStyles = styleSpacing(type || "padding", spacing);
    if (spacingStyles) {
        styles.push(spacingStyles);
    }
}
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
 * // Returns: "flex-direction: row;\ngap: var(--core--gap--base);\npadding-top: var(--core--gap--small);\npadding-right: var(--core--gap--base);..."
 */
const styleFlex = (breakpoint, props) => {
    const styles = [];
    const direction = getBreakpointValue(props.direction, breakpoint);
    const gap = getBreakpointValue(props.gap, breakpoint);
    const grow = getBreakpointValue(props.grow, breakpoint);
    const shrink = getBreakpointValue(props.shrink, breakpoint);
    const alignItems = getBreakpointValue(props.alignItems, breakpoint);
    const justifyContent = getBreakpointValue(props.justifyContent, breakpoint);
    const wrap = getBreakpointValue(props.wrap, breakpoint);
    const spacing = getSpacingValue(props.spacing, breakpoint);
    if (breakpoint === niceReactStyles.BREAKPOINT_PHONE)
        pushDisplayStyles(styles);
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
    if (gap !== undefined)
        pushGapStyles(styles, gap);
    if (spacing)
        pushSpacingStyles(styles, props.type, spacing);
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
 * `FlexStyled` is internal — it receives the post-`normalizeProps` shape,
 * not the consumer-facing scalar shape. Public usage of `<Flex>` is
 * scalar; responsive overrides flow in through the `breakpoints` prop.
 *
 * @example
 * // Internal usage (post-normalize)
 * <FlexStyled direction={{ phone: "column", tablet: "row" }} gap={{ phone: "small", laptop: "large" }}>
 *   <div>Content</div>
 * </FlexStyled>
 */
const FlexStyled = styled.div.withConfig({
    shouldForwardProp: (prop) => isForwardable(prop),
}) `
  ${(props) => styleFlex(niceReactStyles.BREAKPOINT_PHONE, props)}

  ${niceReactStyles.getBreakpoint(niceReactStyles.BREAKPOINT_TABLET)} {
    ${(props) => styleFlex(niceReactStyles.BREAKPOINT_TABLET, props)}
  }

  ${niceReactStyles.getBreakpoint(niceReactStyles.BREAKPOINT_LAPTOP)} {
    ${(props) => styleFlex(niceReactStyles.BREAKPOINT_LAPTOP, props)}
  }

  ${niceReactStyles.getBreakpoint(niceReactStyles.BREAKPOINT_DESKTOP)} {
    ${(props) => styleFlex(niceReactStyles.BREAKPOINT_DESKTOP, props)}
  }
`;

/**
 * Per-breakpoint props that get wrapped into phone-keyed objects so the
 * downstream styling pipeline can iterate breakpoints uniformly. Spacing
 * is handled separately by `getSpacingValue`, which parses shorthand at
 * render time without going through this normalization step.
 */
const breakpointProps = ["gap", "direction", "grow", "shrink", "wrap", "alignItems", "justifyContent"];
/**
 * normalizeProps
 *
 * Wraps every scalar per-breakpoint prop into a `{ phone: value }` object
 * so `styleFlex` can call `getBreakpointValue(prop, breakpoint)` uniformly
 * regardless of which breakpoint it's emitting CSS for. Tablet/laptop/
 * desktop overrides flow through the `breakpoints` prop merged in by the
 * `withBreakpoints` HOC, not through this function.
 *
 * @example
 * normalizeProps({ gap: "base", direction: "row" })
 * // → { gap: { phone: "base" }, direction: { phone: "row" } }
 */
const normalizeProps = (props) => {
    const normalizedProps = { ...props };
    breakpointProps.forEach((propName) => {
        const value = props[propName];
        if (value !== undefined) {
            normalizedProps[propName] = { [niceReactStyles.BREAKPOINT_PHONE]: value };
        }
    });
    return normalizedProps;
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
 * // Using spacing with CSS-like shorthand
 * <Flex spacing="small base" gap="small">
 *   <div>Padded content (top/bottom: small, left/right: base)</div>
 * </Flex>
 *
 * @example
 * // Responsive spacing with margin type
 * <Flex
 *   type="margin"
 *   spacing="small"
 *   breakpoints={{
 *     "tablet+": { spacing: "base large" },
 *     "laptop+": { spacing: "small base large smaller" },
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
 * 2. **Automatic Prop Normalization**: The component automatically normalizes props
 *    to ensure consistent behavior. Simple values are converted to breakpoint objects
 *    with the value applied to the 'phone' breakpoint.
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
    // Normalize props to ensure all breakpoint-capable props are in object format
    // This simplifies the styling logic by providing a consistent prop structure
    const normalizedProps = normalizeProps(props);
    // Render the styled component with normalized props
    // Children are passed through from original props to maintain reference integrity
    return jsxRuntime.jsx(FlexStyled, { ...normalizedProps, children: props.children });
};

// Declaration merging: const + namespace creates exportable type namespace
const FlexTypes = {};

// Explicit return-type annotation — without it, TS declaration emit collapses
// the wrapped const to `any` (or to an unbound generic), which erases the
// `breakpoints` prop on consumers.
const Flex = niceReactStyles.withBreakpoints(Flex$1);

exports.FlexTypes = FlexTypes;
exports.default = Flex;
exports.getBreakpointValue = getBreakpointValue;
exports.getGapSize = getGapSize;
exports.getSpacingValue = getSpacingValue;
exports.styleFlex = styleFlex;
exports.styleSpacing = styleSpacing;
//# sourceMappingURL=index.js.map
