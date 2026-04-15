import { type TokenResult } from "nice-react-styles";
/**
 * Get a tile component token.
 *
 * Flat lookup — for tokens at depth 1 (e.g., "backgroundColor", "foregroundColor"):
 * ```ts
 * getTileToken("backgroundColor", "base")
 * ```
 *
 * Path lookup — for nested tokens:
 * ```ts
 * getTileToken(["group", "variant", "parameter"])
 * ```
 */
export declare function getTileToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): TokenResult;
//# sourceMappingURL=getTileToken.d.ts.map