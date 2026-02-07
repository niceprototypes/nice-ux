'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styled = require('styled-components');
var niceStyles = require('nice-styles');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

/**
 * Checks if a value is a responsive breakpoint object (has mobile, tablet, or desktop keys)
 *
 * @function isResponsiveObject
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is an object with breakpoint keys
 *
 * @example
 * isResponsiveObject({ mobile: "column", tablet: "row" }) // true
 * isResponsiveObject({ all: "base" }) // false
 * isResponsiveObject("row") // false
 * isResponsiveObject(null) // false
 */
const isResponsiveObject = (value) => typeof value === "object" &&
    value !== null &&
    ("mobile" in value || "tablet" in value || "desktop" in value);

/**
 * Extracts the value for a specific breakpoint from a prop that can be either
 * a simple value or a responsive object
 *
 * @function getBreakpointValue
 * @param {T | { mobile?: T; tablet?: T; desktop?: T } | undefined} value - The prop value
 * @param {Breakpoint} breakpoint - The target breakpoint
 * @returns {T | undefined} The value for the specified breakpoint
 *
 * @example
 * getBreakpointValue("row", "mobile") // returns "row"
 * getBreakpointValue("row", "tablet") // returns undefined (simple values only apply at mobile)
 * getBreakpointValue({ mobile: "column", tablet: "row" }, "tablet") // returns "row"
 */
const getBreakpointValue = (value, breakpoint) => {
    if (value === undefined)
        return undefined;
    if (isResponsiveObject(value)) {
        return value[breakpoint];
    }
    return breakpoint === "mobile" ? value : undefined;
};

/**
 * Converts a GapSize value to its corresponding CSS value using CSS variables
 *
 * @function getGapSize
 * @param {GapSize} [size] - The gap size token key ("smaller", "small", "base", "large", "larger") or custom string
 * @returns {string | undefined} CSS variable reference or the string value as-is
 *
 * @example
 * getGapSize("smaller") // returns "var(--core--gap--smaller)"
 * getGapSize("base") // returns "var(--core--gap--base)"
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
        return niceStyles.getConstant("core", "gap", size).var;
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
 * Extracts the SpacingDefinition for a specific breakpoint from a spacing prop
 *
 * @function getSpacingValue
 * @param {SpacingProp | undefined} spacing - The spacing prop value
 * @param {Breakpoint} breakpoint - The target breakpoint
 * @returns {SpacingDefinition | null | undefined} The spacing definition for the specified breakpoint
 *
 * @description
 * Handles two possible shapes of the spacing prop:
 * - Shorthand string: "small", "small base", etc. - parsed and applied to "mobile" breakpoint
 * - Responsive object: { mobile?: string | null, tablet?: string | null, desktop?: string | null }
 *
 * Returns null when spacing is explicitly disabled at a breakpoint.
 * Returns undefined when no spacing is defined for the breakpoint.
 *
 * @example
 * getSpacingValue("small", "mobile") // returns { top: "small", right: "small", bottom: "small", left: "small" }
 * getSpacingValue("small base", "mobile") // returns { top: "small", right: "base", bottom: "small", left: "base" }
 * getSpacingValue("small", "tablet") // returns undefined (shorthand only applies to mobile)
 * getSpacingValue({ mobile: "base", tablet: null, desktop: "small" }, "tablet") // returns null
 * getSpacingValue({ mobile: "base", desktop: "small large" }, "desktop") // returns { top: "small", right: "large", bottom: "small", left: "large" }
 */
const getSpacingValue = (spacing, breakpoint) => {
    if (spacing === undefined)
        return undefined;
    // Handle shorthand string (applies to mobile only)
    if (typeof spacing === "string") {
        if (breakpoint === "mobile") {
            return parseSpacingShorthand(spacing);
        }
        return undefined;
    }
    // Handle responsive object
    if (isResponsiveObject(spacing)) {
        const responsiveSpacing = spacing;
        const value = responsiveSpacing[breakpoint];
        if (value === null)
            return null;
        if (value === undefined)
            return undefined;
        if (typeof value === "string") {
            return parseSpacingShorthand(value);
        }
        return undefined;
    }
    return undefined;
};

/**
 * Generates CSS spacing properties (padding or margin) from a SpacingDefinition
 *
 * @function styleSpacing
 * @param {"padding" | "margin"} mode - Whether to generate padding or margin properties
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
const styleSpacing = (mode, def) => {
    if (!def)
        return "";
    const parts = [];
    if (def.top !== undefined) {
        parts.push(`${mode}-top: ${getGapSize(def.top)};`);
    }
    if (def.right !== undefined) {
        parts.push(`${mode}-right: ${getGapSize(def.right)};`);
    }
    if (def.bottom !== undefined) {
        parts.push(`${mode}-bottom: ${getGapSize(def.bottom)};`);
    }
    if (def.left !== undefined) {
        parts.push(`${mode}-left: ${getGapSize(def.left)};`);
    }
    return parts.join("\n");
};

/**
 * styleFlex Service
 *
 * Generates CSS styling for a specific breakpoint based on normalized Flex component props.
 * This is the core styling logic that transforms component props into CSS declarations.
 *
 * @function styleFlex
 * @param {Breakpoint} breakpoint - The breakpoint to generate styles for (sm/md/lg)
 * @param {FlexProps} props - The normalized Flex component props
 * @returns {string} CSS declarations separated by newlines
 *
 * @description
 * This service handles the generation of all CSS properties for the Flex component:
 *
 * **Base Display**: Sets `display: flex` only for the 'sm' breakpoint to establish
 * the flexbox context. Higher breakpoints inherit this display value.
 *
 * **Responsive Value Extraction**: For each CSS property, the function extracts
 * the appropriate value based on whether the prop is a simple value or breakpoint object:
 * - Object props: Use the value for the current breakpoint
 * - Simple props: Only use for 'sm' breakpoint (since props are normalized)
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
 * @example
 * // Generate mobile breakpoint styles
 * const props = { direction: { mobile: "column" }, gap: { mobile: "small" } }
 * styleFlex("mobile", props)
 * // Returns: "display: flex;\nflex-direction: column;\ngap: var(--core--gap--small);"
 *
 * @example
 * // Generate tablet breakpoint styles
 * const props = {
 *   direction: { mobile: "column", tablet: "row" },
 *   gap: { mobile: "small", tablet: "base" },
 *   spacing: { tablet: "small base" }
 * }
 * styleFlex("tablet", props)
 * // Returns: "flex-direction: row;\ngap: var(--core--gap--base);\npadding-top: var(--core--gap--small);\npadding-right: var(--core--gap--base);..."
 */
const styleFlex = (breakpoint, props) => {
    const styles = [];
    // Extract values for this specific breakpoint using the helper function
    const direction = getBreakpointValue(props.direction, breakpoint);
    const gap = getBreakpointValue(props.gap, breakpoint);
    const grow = getBreakpointValue(props.grow, breakpoint);
    const alignItems = getBreakpointValue(props.alignItems, breakpoint);
    const justifyContent = getBreakpointValue(props.justifyContent, breakpoint);
    const wrap = getBreakpointValue(props.wrap, breakpoint);
    const spacing = getSpacingValue(props.spacing, breakpoint);
    // Base flex display - only set for mobile breakpoint
    // Higher breakpoints inherit the flex display value
    if (breakpoint === "mobile") {
        styles.push("display: flex;");
    }
    // Flex direction - controls main axis direction
    if (direction) {
        styles.push(`flex-direction: ${direction};`);
    }
    // Alignment properties
    if (alignItems) {
        styles.push(`align-items: ${alignItems};`);
    }
    if (justifyContent) {
        styles.push(`justify-content: ${justifyContent};`);
    }
    // Flex growth - when grow is set, also set flex-basis to 0 for proper behavior
    if (grow !== undefined) {
        styles.push(`flex-grow: ${grow};`);
        styles.push("flex-basis: 0;");
    }
    // Flex wrap - controls whether items wrap to new lines
    if (wrap) {
        styles.push(`flex-wrap: ${wrap};`);
    }
    // Gap between flex items using CSS Grid gap property
    if (gap !== undefined) {
        const gapValue = getGapSize(gap);
        if (gapValue) {
            styles.push(`gap: ${gapValue};`);
        }
    }
    // Spacing (padding/margin) using the spacing helper
    if (spacing) {
        const spacingStyles = styleSpacing(props.mode || "padding", spacing);
        if (spacingStyles) {
            styles.push(spacingStyles);
        }
    }
    return styles.join("\n");
};

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
 * 2. **Mobile-First Responsive Design**: Applies styles in a mobile-first approach:
 *    - Base styles: Always applied (mobile breakpoint)
 *    - Tablet styles: Applied above mobile threshold
 *    - Desktop styles: Applied for large screens
 *
 * 3. **Service Integration**: Delegates actual CSS generation to the styleFlex service,
 *    keeping the styled component focused on responsive breakpoint management.
 *
 * @example
 * // Basic usage in component
 * <FlexStyled direction={{ mobile: "column", tablet: "row" }} gap={{ mobile: "small", desktop: "large" }}>
 *   <div>Content</div>
 * </FlexStyled>
 */
const FlexStyled = styled.div.withConfig({
    shouldForwardProp: (prop) => !["mode", "spacing", "gap", "direction", "alignItems", "justifyContent", "grow", "wrap"].includes(prop),
}) `
  ${(props) => styleFlex("mobile", props)}

  ${niceStyles.getBreakpoint("tablet").query} {
    ${(props) => styleFlex("tablet", props)}
  }

  ${niceStyles.getBreakpoint("desktop").query} {
    ${(props) => styleFlex("desktop", props)}
  }
`;

/**
 * List of props that accept breakpoint values.
 * These props can be specified as either simple values or breakpoint objects.
 * Spacing is handled directly by getSpacingValue and doesn't need normalization.
 */
const breakpointProps = ["gap", "direction", "grow", "wrap", "alignItems", "justifyContent"];
/**
 * normalizeProps Helper
 *
 * Transforms component props to ensure consistent structure for styling logic.
 * Converts simple prop values into breakpoint objects to simplify downstream processing.
 *
 * @function normalizeProps
 * @param {FlexProps} props - The raw props passed to the Flex component
 * @returns {FlexProps} Normalized props with consistent breakpoint structure
 *
 * @description
 * Converts simple prop values into breakpoint objects:
 * - Example: `gap="base"` becomes `gap={{ mobile: "base" }}`
 * - Example: `direction="row"` becomes `direction={{ mobile: "row" }}`
 *
 * Note: The spacing prop is NOT normalized here. It's handled directly by
 * getSpacingValue which parses shorthand strings at render time.
 */
const normalizeProps = (props) => {
    const normalizedProps = { ...props };
    breakpointProps.forEach((propName) => {
        const value = props[propName];
        if (value !== undefined && typeof value !== "object") {
            normalizedProps[propName] = { mobile: value };
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
const Flex = (props) => {
    // Normalize props to ensure all breakpoint-capable props are in object format
    // This simplifies the styling logic by providing a consistent prop structure
    const normalizedProps = normalizeProps(props);
    // Render the styled component with normalized props
    // Children are passed through from original props to maintain reference integrity
    return React__namespace.createElement(FlexStyled, { ...normalizedProps }, props.children);
};

// Declaration merging: const + namespace creates exportable type namespace
const FlexTypes = {};

exports.FlexTypes = FlexTypes;
exports.default = Flex;
exports.getBreakpointValue = getBreakpointValue;
exports.getGapSize = getGapSize;
exports.getSpacingValue = getSpacingValue;
exports.isResponsiveObject = isResponsiveObject;
exports.styleFlex = styleFlex;
exports.styleSpacing = styleSpacing;
//# sourceMappingURL=index.js.map
