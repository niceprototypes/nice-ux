import { FlexProps } from "../components/Flex/Flex.types";
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
export declare const styleFlex: (props: FlexProps) => string;
//# sourceMappingURL=styleFlex.d.ts.map