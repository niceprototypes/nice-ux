import { FlexProps } from "../../types";
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
declare const normalizeProps: (props: FlexProps) => FlexProps;
export default normalizeProps;
//# sourceMappingURL=normalizeProps.d.ts.map