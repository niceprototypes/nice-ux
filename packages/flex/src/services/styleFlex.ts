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
import { getGapSize } from "./getGapSize"
import { getSpacingValue } from "./getSpacingValue"
import { styleSpacing } from "./styleSpacing"

// Phone establishes the flex context; larger breakpoints inherit it. `inline`
// switches it to an inline-level flex container (`display: inline-flex`).
function pushDisplayStyles(styles: string[], inline: boolean | undefined): void {
  styles.push(`display: ${inline ? "inline-flex" : "flex"};`)
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
export const styleFlex = (props: FlexProps): string => {
  const styles: string[] = []

  const { direction, gap, grow, shrink, alignItems, justifyContent, wrap, fit, inline, spacing, type } = props
  const spacingDefinition = getSpacingValue(spacing)

  pushDisplayStyles(styles, inline)
  if (direction) pushDirectionStyles(styles, direction)
  if (alignItems) pushAlignItemsStyles(styles, alignItems)
  if (justifyContent) pushJustifyContentStyles(styles, justifyContent)
  if (grow !== undefined) pushGrowStyles(styles, grow)
  if (shrink !== undefined) pushShrinkStyles(styles, shrink)
  if (wrap) pushWrapStyles(styles, wrap)
  if (fit) pushFitStyles(styles)
  if (gap !== undefined) pushGapStyles(styles, gap)
  if (spacingDefinition) pushSpacingStyles(styles, type, spacingDefinition)

  return styles.join("\n")
}