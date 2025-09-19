'use strict';

var React = require('react');
var styled = require('styled-components');

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
 * Breakpoint Constants
 *
 * Defines the responsive breakpoint system used throughout the Flex component.
 * These values determine when different responsive styles are applied.
 */
/** Small breakpoint - mobile devices */
/** Medium breakpoint - tablets and small desktops */
const BREAKPOINT_MD = 980;
/** Large breakpoint - large desktops */
const BREAKPOINT_LG = 1280;
/**
 * Media Queries
 *
 * Pre-built media query strings for responsive design.
 * These are used in styled-components to apply styles at different screen sizes.
 */
/** Media query for medium screens and up (tablets+) */
const MEDIA_MIN_MD = `@media (min-width: ${BREAKPOINT_MD}px)`;
/** Media query for large screens and up (desktops+) */
const MEDIA_MIN_LG = `@media (min-width: ${BREAKPOINT_LG}px)`;

/**
 * Converts a GapSize value to its corresponding CSS custom property
 *
 * @function getGapSize
 * @param {GapSize} [size] - The gap size (0-6)
 * @returns {string | undefined} CSS custom property string or "0" for zero values
 *
 * @example
 * getGapSize(0) // returns "0"
 * getGapSize(3) // returns "var(--gap-size-3)"
 * getGapSize(undefined) // returns undefined
 */
const getGapSize = (size) => size !== undefined ? (size === 0 ? "0" : `var(--gap-size-${size})`) : undefined;
/**
 * Generates CSS spacing properties (padding or margin) from a SpacingDefinition
 *
 * @function styleSpacing
 * @param {"padding" | "margin"} type - Whether to generate padding or margin properties
 * @param {SpacingDefinition} [def] - Spacing configuration object
 * @returns {string} CSS property declarations separated by newlines
 *
 * @description
 * This function applies spacing values with a priority system:
 * 1. Individual sides (top, right, bottom, left) - highest priority
 * 2. Axis shortcuts (horizontal→left+right, vertical→top+bottom)
 * 3. All sides (all) - lowest priority
 *
 * The function only generates CSS for sides that have defined values,
 * allowing for partial spacing definitions.
 *
 * @example
 * // Simple all-sides spacing
 * styleSpacing("padding", { all: 2 })
 * // Returns: "padding-top: var(--gap-size-2);\npadding-right: var(--gap-size-2);\n..."
 *
 * @example
 * // Mixed priority spacing
 * styleSpacing("margin", { all: 1, horizontal: 2, top: 3 })
 * // Returns: "margin-top: var(--gap-size-3);\nmargin-right: var(--gap-size-2);\n..."
 * // (top=3 overrides all=1, horizontal=2 overrides all=1 for left/right)
 */
const styleSpacing = (type, def) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!def)
        return "";
    const prefix = type;
    // Apply priority system: individual > axis shortcuts > all
    const styles = {
        top: (_b = (_a = def.top) !== null && _a !== void 0 ? _a : def.vertical) !== null && _b !== void 0 ? _b : def.all,
        right: (_d = (_c = def.right) !== null && _c !== void 0 ? _c : def.horizontal) !== null && _d !== void 0 ? _d : def.all,
        bottom: (_f = (_e = def.bottom) !== null && _e !== void 0 ? _e : def.vertical) !== null && _f !== void 0 ? _f : def.all,
        left: (_h = (_g = def.left) !== null && _g !== void 0 ? _g : def.horizontal) !== null && _h !== void 0 ? _h : def.all,
    };
    const parts = [];
    // Generate CSS declarations only for defined values
    if (styles.top !== undefined) {
        parts.push(`${prefix}-top: ${getGapSize(styles.top)};`);
    }
    if (styles.right !== undefined) {
        parts.push(`${prefix}-right: ${getGapSize(styles.right)};`);
    }
    if (styles.bottom !== undefined) {
        parts.push(`${prefix}-bottom: ${getGapSize(styles.bottom)};`);
    }
    if (styles.left !== undefined) {
        parts.push(`${prefix}-left: ${getGapSize(styles.left)};`);
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
 * - `gap`: Sets space between flex items using CSS Grid gap
 *
 * **Spacing Integration**: Uses the styleSpacing helper to generate padding
 * or margin properties with full side-by-side control.
 *
 * The function is designed to work with props that have been processed by
 * the normalizeProps service, ensuring consistent prop structure.
 *
 * @example
 * // Generate small breakpoint styles
 * const props = { direction: { sm: "column" }, gap: { sm: 2 } }
 * styleFlex("sm", props)
 * // Returns: "display: flex;\nflex-direction: column;\ngap: var(--gap-size-2);"
 *
 * @example
 * // Generate medium breakpoint styles
 * const props = {
 *   direction: { sm: "column", md: "row" },
 *   gap: { sm: 1, md: 3 },
 *   spacing: { md: { horizontal: 2 } }
 * }
 * styleFlex("md", props)
 * // Returns: "flex-direction: row;\ngap: var(--gap-size-3);\npadding-left: var(--gap-size-2);\npadding-right: var(--gap-size-2);"
 */
const styleFlex = (breakpoint, props) => {
    const styles = [];
    // Extract values for this specific breakpoint
    // For object props, get the breakpoint-specific value
    // For simple props, only apply at 'sm' breakpoint (since props are normalized)
    const direction = typeof props.direction === "object"
        ? props.direction[breakpoint]
        : breakpoint === "sm" && typeof props.direction === "string"
            ? props.direction
            : undefined;
    const gap = typeof props.gap === "object"
        ? props.gap[breakpoint]
        : breakpoint === "sm" && typeof props.gap === "number"
            ? props.gap
            : undefined;
    const grow = typeof props.grow === "object"
        ? props.grow[breakpoint]
        : breakpoint === "sm" && typeof props.grow === "number"
            ? props.grow
            : undefined;
    const alignItems = typeof props.alignItems === "object"
        ? props.alignItems[breakpoint]
        : breakpoint === "sm" && typeof props.alignItems === "string"
            ? props.alignItems
            : undefined;
    const justifyContent = typeof props.justifyContent === "object"
        ? props.justifyContent[breakpoint]
        : breakpoint === "sm" && typeof props.justifyContent === "string"
            ? props.justifyContent
            : undefined;
    // Spacing requires checking for breakpoint structure
    const spacing = typeof props.spacing === "object" &&
        ("sm" in props.spacing || "md" in props.spacing || "lg" in props.spacing)
        ? props.spacing[breakpoint]
        : undefined;
    // Base flex display - only set for small breakpoint
    // Higher breakpoints inherit the flex display value
    if (breakpoint === "sm") {
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
    // Gap between flex items using CSS Grid gap property
    if (gap !== undefined) {
        styles.push(`gap: var(--gap-size-${gap});`);
    }
    // Spacing (padding/margin) using the spacing helper
    if (spacing) {
        const spacingStyles = styleSpacing(props.type || "padding", spacing);
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
 *    Filtered props: type, spacing, gap, direction, alignItems, justifyContent, grow
 *
 * 2. **Mobile-First Responsive Design**: Applies styles in a mobile-first approach:
 *    - Base styles: Always applied (sm breakpoint)
 *    - Medium styles: Applied at 980px+ (md breakpoint)
 *    - Large styles: Applied at 1280px+ (lg breakpoint)
 *
 * 3. **Service Integration**: Delegates actual CSS generation to the styleFlex service,
 *    keeping the styled component focused on responsive breakpoint management.
 *
 * 4. **Clean Separation**: Separates styling logic from component structure, making
 *    the codebase more maintainable and testable.
 *
 * **CSS Generation Flow:**
 * 1. Component receives normalized props from normalizeProps service
 * 2. For each breakpoint (sm/md/lg), styleFlex generates appropriate CSS
 * 3. Media queries ensure styles are applied at correct screen sizes
 * 4. Higher breakpoint styles override lower ones as expected in CSS
 *
 * **Breakpoint System:**
 * - Small (sm): 0px+ - Base mobile styles, always applied
 * - Medium (md): 980px+ - Tablet and small desktop styles
 * - Large (lg): 1280px+ - Large desktop styles
 *
 * The component follows CSS cascade principles where later styles override earlier ones,
 * enabling predictable responsive behavior.
 *
 * @example
 * // Basic usage in component
 * <FlexStyled direction={{ sm: "column", md: "row" }} gap={{ sm: 1, lg: 3 }}>
 *   <div>Content</div>
 * </FlexStyled>
 *
 * @example
 * // Generated CSS structure
 * .FlexStyled-abc123 {
 *   // sm breakpoint styles (always applied)
 *   display: flex;
 *   flex-direction: column;
 *   gap: var(--gap-size-1);
 * }
 * @media (min-width: 980px) {
 *   .FlexStyled-abc123 {
 *     // md breakpoint styles
 *     flex-direction: row;
 *   }
 * }
 * @media (min-width: 1280px) {
 *   .FlexStyled-abc123 {
 *     // lg breakpoint styles
 *     gap: var(--gap-size-3);
 *   }
 * }
 */
const FlexStyled = styled.div.withConfig({
    shouldForwardProp: (prop) => !["type", "spacing", "gap", "direction", "alignItems", "justifyContent", "grow"].includes(prop),
}) `
  ${(props) => styleFlex('sm', props)}

  ${MEDIA_MIN_MD} {
    ${(props) => styleFlex('md', props)}
  }

  ${MEDIA_MIN_LG} {
    ${(props) => styleFlex('lg', props)}
  }
`;

/**
 * List of props that accept breakpoint values
 * These props can be specified as either simple values or breakpoint objects.
 * Note: spacing is handled separately due to its more complex structure
 */
const BREAKPOINT_PROPS = ["gap", "direction", "grow"];
/**
 * normalizeProps Service
 *
 * Transforms component props to ensure consistent structure for styling logic.
 * Converts simple prop values into breakpoint objects to simplify downstream processing.
 *
 * @function normalizeProps
 * @param {FlexProps} props - The raw props passed to the Flex component
 * @returns {FlexProps} Normalized props with consistent breakpoint structure
 *
 * @description
 * This service performs two main transformations:
 *
 * 1. **Simple Value Normalization**: Converts simple prop values into breakpoint objects
 *    - Example: `gap={2}` becomes `gap={{ sm: 2 }}`
 *    - Example: `direction="row"` becomes `direction={{ sm: "row" }}`
 *    - This ensures the styling logic only needs to handle one format
 *
 * 2. **Spacing Normalization**: Handles the special case of the spacing prop
 *    - Simple number: `spacing={3}` → `spacing={{ sm: { all: 3 } }}`
 *    - SpacingDefinition: `spacing={{ all: 3 }}` → `spacing={{ sm: { all: 3 } }}`
 *    - Already normalized: `spacing={{ sm: {...} }}` → unchanged
 *
 * Why this normalization is important:
 * - **Consistency**: The styling logic (styleFlex) only needs to handle one format
 * - **Simplicity**: Reduces complexity in the styled-components implementation
 * - **Flexibility**: Users can provide props in the most convenient format
 * - **Type Safety**: Maintains TypeScript type safety throughout the transformation
 *
 * @example
 * // Input: Simple values
 * normalizeProps({
 *   gap: 2,
 *   direction: "row",
 *   children: <div />
 * })
 * // Output: Breakpoint objects
 * {
 *   gap: { sm: 2 },
 *   direction: { sm: "row" },
 *   children: <div />
 * }
 *
 * @example
 * // Input: Mixed simple and responsive values
 * normalizeProps({
 *   gap: 2,
 *   direction: { sm: "column", md: "row" },
 *   spacing: { all: 3 },
 *   children: <div />
 * })
 * // Output: All values normalized to breakpoint format
 * {
 *   gap: { sm: 2 },
 *   direction: { sm: "column", md: "row" },
 *   spacing: { sm: { all: 3 } },
 *   children: <div />
 * }
 */
const normalizeProps = (props) => {
    // Create a shallow copy to avoid mutating the original props
    const normalizedProps = { ...props };
    // Process standard breakpoint props (gap, direction, grow)
    // These props can be either simple values or breakpoint objects
    BREAKPOINT_PROPS.forEach((propName) => {
        const value = props[propName];
        if (value !== undefined && typeof value !== "object") {
            normalizedProps[propName] = { sm: value };
        }
    });
    // Special handling for the spacing prop due to its nested structure
    if (props.spacing !== undefined) {
        if (typeof props.spacing === "number") {
            // Simple number becomes a SpacingDefinition at sm breakpoint
            // spacing={3} -> spacing={{ sm: { all: 3 } }}
            normalizedProps.spacing = { sm: { all: props.spacing } };
        }
        else if (!("sm" in props.spacing || "md" in props.spacing || "lg" in props.spacing)) {
            // SpacingDefinition object becomes breakpoint-wrapped
            // spacing={{ all: 3 }} -> spacing={{ sm: { all: 3 } }}
            normalizedProps.spacing = { sm: props.spacing };
        }
        // If already has breakpoint keys (sm/md/lg), leave as-is
    }
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
const Flex = (props) => {
    // Normalize props to ensure all breakpoint-capable props are in object format
    // This simplifies the styling logic by providing a consistent prop structure
    const normalizedProps = normalizeProps(props);
    // Render the styled component with normalized props
    // Children are passed through from original props to maintain reference integrity
    return React__namespace.createElement(FlexStyled, { ...normalizedProps }, props.children);
};

module.exports = Flex;
//# sourceMappingURL=index.js.map
