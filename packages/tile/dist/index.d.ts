import * as React from 'react';
import { ComponentType } from 'react';
import { Breakpoints, GapType, ModeType, WithBreakpointsProps, TokenResult } from 'nice-react-styles';
import { FlexProps, FlexSpacingType } from 'nice-react-flex';
import { TypographyProps } from 'nice-react-typography';

type TileTypographyProps = Partial<Omit<TypographyProps, "children">>;

/**
 * TileMaxWidthValueType
 *
 * Per-breakpoint max-width value. A number caps the inner column at that
 * pixel value; "none" disables the cap and lets the column fill its
 * container.
 */
type TileMaxWidthValueType = number | "none";
/**
 * TileMaxWidthType
 *
 * Responsive max-width control for the inner content column.
 *
 * Accepts either a bare value applied at every breakpoint, or a breakpoint
 * object specifying per-breakpoint values. Any breakpoint omitted from the
 * object falls back to "none" (no cap).
 */
type TileMaxWidthType = Breakpoints<TileMaxWidthValueType>;

/**
 * TileAlignItemsType
 *
 * Re-export of the `alignItems` prop shape from nice-react-flex.
 * Accepts a single value or a breakpoint object for responsive alignment.
 */
type TileAlignItemsType = NonNullable<FlexProps["alignItems"]>;
/**
 * TileJustifyContentType
 *
 * Re-export of the `justifyContent` prop shape from nice-react-flex.
 * Accepts a single value or a breakpoint object for responsive justification.
 */
type TileJustifyContentType = NonNullable<FlexProps["justifyContent"]>;
interface TileProps {
    children?: React.ReactNode;
    /** Content rendered above the title */
    contentTop?: React.ReactNode;
    /** Content rendered between the title and description */
    contentCenter?: React.ReactNode;
    contentLeft?: React.ReactNode;
    contentRight?: React.ReactNode;
    title?: React.ReactNode;
    titleProps?: TileTypographyProps;
    description?: React.ReactNode | string[];
    descriptionProps?: TileTypographyProps;
    spacing?: FlexSpacingType;
    /**
     * Max-width of the inner content column.
     *
     * - Bare value (`number` or `"none"`) applies at every breakpoint.
     * - Breakpoint object (`{ phone, tablet, laptop }`) provides per-breakpoint
     *   values; omitted breakpoints fall back to `"none"` (no cap).
     * - `"none"` removes any cap, letting the column fill its container.
     */
    maxWidth?: TileMaxWidthType;
    alignItems?: TileAlignItemsType;
    justifyContent?: TileJustifyContentType;
    /** Top spacing applied to the Flex that wraps `children` below the title/description block. */
    gap?: GapType;
    backgroundImage?: string;
    backgroundColor?: string;
    backgroundPosition?: string;
    backgroundSize?: string;
    backgroundAttachment?: string;
    foregroundColor?: string;
    mode?: ModeType;
    className?: string;
    style?: React.CSSProperties;
}
declare const TileTypes: {};
declare namespace TileTypes {
    type Typography = TileTypographyProps;
    type AlignItems = TileAlignItemsType;
    type JustifyContent = TileJustifyContentType;
    type Gap = GapType;
    type MaxWidth = TileMaxWidthType;
    type MaxWidthValue = TileMaxWidthValueType;
    type Props = TileProps;
}

declare const Tile: React.FC<WithBreakpointsProps<TileProps>>;

/**
 * No-op component — tile CSS custom properties are now generated
 * at build time in nice-styles dist/variables.css.
 * Kept for backward compatibility.
 */
declare const TileStyles: ComponentType;

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
declare function getTileToken(nameOrPath: string | string[], variantOrMode?: string, mode?: string): TokenResult;

export { TileStyles, TileTypes, Tile as default, getTileToken };
export type { TileAlignItemsType, TileJustifyContentType, TileMaxWidthType, TileMaxWidthValueType, TileProps, TileTypographyProps };
