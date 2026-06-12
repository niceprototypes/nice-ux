import * as React from 'react';
import { BackgroundColorType, BackgroundSizeType, ColorType, GapType, ThemeType, WithBreakpointsProps } from 'nice-react-styles';
import { FlexProps, FlexSpacingType } from 'nice-react-flex';
import { TypographyProps } from 'nice-react-typography';

type TileTypographyProps = Partial<Omit<TypographyProps, "children">>;

/**
 * TileBackgroundColorType
 *
 * @token Re-export of BackgroundColorType from nice-styles. Token-bound —
 * raw CSS color strings are not accepted. Use `backgroundImage` for
 * gradients or image URLs.
 */
type TileBackgroundColorType = BackgroundColorType;
/**
 * TileBackgroundSizeType
 *
 * @token Re-export of BackgroundSizeType from nice-styles. Token-bound —
 * raw CSS background-size strings are not accepted.
 */
type TileBackgroundSizeType = BackgroundSizeType;
/**
 * TileColorType
 *
 * @token Re-export of ColorType from nice-styles. Token-bound —
 * raw CSS color strings are not accepted.
 */
type TileColorType = ColorType;
/**
 * TileMaxWidthValueType
 *
 * Max-width value for the inner content column. A CSS length string (e.g.
 * `"980px"`, `"60rem"`) caps the column at that width; `"none"` disables the
 * cap and lets the column fill its container.
 */
type TileMaxWidthValueType = string;
/**
 * TileMaxWidthType
 *
 * Max-width control for the inner content column. Pass a CSS length string
 * (e.g. `"980px"`) to cap the column, or `"none"` to let it fill its
 * container.
 *
 * Use the wrapper's `breakpoints` prop to vary per breakpoint:
 * `breakpoints={{ "laptop+": { maxWidth: "980px" } }}`.
 */
type TileMaxWidthType = TileMaxWidthValueType;
/**
 * TileMinWidthType
 *
 * Minimum width of the tile box, as a CSS length string (e.g. `"320px"`).
 * Applies to the outer tile box — note `maxWidth` instead constrains the
 * inner centered content column.
 */
type TileMinWidthType = string;
/**
 * TileMinHeightType
 *
 * Minimum height of the tile box, as a CSS length string (e.g. `"80vh"`).
 * Applies to the outer tile box (the surface that carries `backgroundImage`).
 */
type TileMinHeightType = string;
/**
 * TileMaxHeightType
 *
 * Maximum height of the tile box, as a CSS length string (e.g. `"100vh"`).
 * Applies to the outer tile box.
 */
type TileMaxHeightType = string;

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
    /** Minimum width of the outer tile box, as a CSS length string (e.g. `"320px"`). */
    minWidth?: TileMinWidthType;
    /** Minimum height of the outer tile box, as a CSS length string (e.g. `"80vh"`). */
    minHeight?: TileMinHeightType;
    /** Maximum height of the outer tile box, as a CSS length string (e.g. `"100vh"`). */
    maxHeight?: TileMaxHeightType;
    alignItems?: TileAlignItemsType;
    justifyContent?: TileJustifyContentType;
    /** Top spacing applied to the Flex that wraps `children` below the title/description block. */
    gap?: GapType;
    backgroundImage?: string;
    /** @token Token-bound — accepts BackgroundColorType variants only. */
    backgroundColor?: TileBackgroundColorType;
    backgroundPosition?: string;
    /** @token Token-bound — accepts BackgroundSizeType variants only. */
    backgroundSize?: TileBackgroundSizeType;
    backgroundAttachment?: string;
    /** @token Token-bound — accepts ColorType variants only. */
    color?: TileColorType;
    theme?: ThemeType;
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
    type MinWidth = TileMinWidthType;
    type MinHeight = TileMinHeightType;
    type MaxHeight = TileMaxHeightType;
    type BackgroundColor = TileBackgroundColorType;
    type BackgroundSize = TileBackgroundSizeType;
    type Color = TileColorType;
    type Props = TileProps;
}

declare const Tile: React.FC<WithBreakpointsProps<TileProps>>;

/** Returns the `var(--np--tile--…)` reference. */
declare function getTileToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string;

export { TileTypes, Tile as default, getTileToken };
export type { TileAlignItemsType, TileBackgroundColorType, TileBackgroundSizeType, TileColorType, TileJustifyContentType, TileMaxHeightType, TileMaxWidthType, TileMaxWidthValueType, TileMinHeightType, TileMinWidthType, TileProps, TileTypographyProps };
