import { FlexProps } from "../types";
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
export declare const normalizeProps: (props: FlexProps) => FlexProps;
//# sourceMappingURL=normalizeProps.d.ts.map