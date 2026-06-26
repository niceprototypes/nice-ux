import {
  FlexProps,
  FlexTypeType,
  FlexDirectionType,
  FlexAlignItemsType,
  FlexJustifyContentType,
  FlexWrapType,
  FlexGapSizeType,
  SpacingDefinition,
} from "../components/Flex/Flex.types"
import { BREAKPOINT_PHONE, type BreakpointName } from "nice-react-styles"
import { getBreakpointValue } from "./getBreakpointValue"
import { getGapSize } from "./getGapSize"
import { getSpacingValue } from "./getSpacingValue"
import { styleSpacing } from "./styleSpacing"

// Phone establishes the flex context; larger breakpoints inherit it
function pushDisplayStyles(styles: string[]): void {
  styles.push("display: flex;")
}

function pushDirectionStyles(styles: string[], direction: FlexDirectionType): void {
  styles.push(`flex-direction: ${direction};`)
}

function pushAlignItemsStyles(styles: string[], alignItems: FlexAlignItemsType): void {
  styles.push(`align-items: ${alignItems};`)
}

function pushJustifyContentStyles(styles: string[], justifyContent: FlexJustifyContentType): void {
  styles.push(`justify-content: ${justifyContent};`)
}

// flex-basis: 0 pairs with grow so items size from grow ratios, not content
function pushGrowStyles(styles: string[], grow: number): void {
  styles.push(`flex-grow: ${grow};`)
  styles.push("flex-basis: 0;")
}

function pushShrinkStyles(styles: string[], shrink: number): void {
  styles.push(`flex-shrink: ${shrink};`)
}

function pushWrapStyles(styles: string[], wrap: FlexWrapType): void {
  styles.push(`flex-wrap: ${wrap};`)
}

// fit: shrink the container to its content width.
function pushFitStyles(styles: string[]): void {
  styles.push("width: max-content;")
}

function pushGapStyles(styles: string[], gap: FlexGapSizeType): void {
  const gapValue = getGapSize(gap)
  if (gapValue) {
    styles.push(`gap: ${gapValue};`)
  }
}

function pushSpacingStyles(
  styles: string[],
  type: FlexTypeType | undefined,
  spacing: SpacingDefinition
): void {
  const spacingStyles = styleSpacing(type || "padding", spacing)
  if (spacingStyles) {
    styles.push(spacingStyles)
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
 * // Returns: "flex-direction: row;\ngap: var(--core--gap);\npadding-top: var(--core--gap--small);\npadding-right: var(--core--gap);..."
 */
export const styleFlex = (breakpoint: BreakpointName, props: FlexProps): string => {
  const styles: string[] = []

  const direction = getBreakpointValue(props.direction, breakpoint)
  const gap = getBreakpointValue(props.gap, breakpoint)
  const grow = getBreakpointValue(props.grow, breakpoint)
  const shrink = getBreakpointValue(props.shrink, breakpoint)
  const alignItems = getBreakpointValue(props.alignItems, breakpoint)
  const justifyContent = getBreakpointValue(props.justifyContent, breakpoint)
  const wrap = getBreakpointValue(props.wrap, breakpoint)
  const fit = getBreakpointValue(props.fit, breakpoint)
  const spacing = getSpacingValue(props.spacing, breakpoint)

  if (breakpoint === BREAKPOINT_PHONE) pushDisplayStyles(styles)
  if (direction) pushDirectionStyles(styles, direction)
  if (alignItems) pushAlignItemsStyles(styles, alignItems)
  if (justifyContent) pushJustifyContentStyles(styles, justifyContent)
  if (grow !== undefined) pushGrowStyles(styles, grow)
  if (shrink !== undefined) pushShrinkStyles(styles, shrink)
  if (wrap) pushWrapStyles(styles, wrap)
  if (fit) pushFitStyles(styles)
  if (gap !== undefined) pushGapStyles(styles, gap)
  if (spacing) pushSpacingStyles(styles, props.type, spacing)

  return styles.join("\n")
}