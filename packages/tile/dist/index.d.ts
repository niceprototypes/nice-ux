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
 * Per-breakpoint max-width value. A number caps the inner column at that
 * pixel value; "none" disables the cap and lets the column fill its
 * container.
 */
type TileMaxWidthValueType = number | "none";
/**
 * TileMaxWidthType
 *
 * Max-width control for the inner content column. Pass a number to cap at
 * that pixel value, or `"none"` to let the column fill its container.
 *
 * Use the wrapper's `breakpoints` prop to vary per breakpoint:
 * `breakpoints={{ "laptop+": { maxWidth: 980 } }}`.
 */
type TileMaxWidthType = TileMaxWidthValueType;

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
    type BackgroundColor = TileBackgroundColorType;
    type BackgroundSize = TileBackgroundSizeType;
    type Color = TileColorType;
    type Props = TileProps;
}

declare const Tile: React.FC<WithBreakpointsProps<TileProps>>;

/** Returns the `var(--np--tile--…)` reference. */
declare function getTileToken(nameOrPath: string | string[], variantOrTheme?: string, theme?: string): string;

export { TileTypes, Tile as default, getTileToken };
export type { TileAlignItemsType, TileBackgroundColorType, TileBackgroundSizeType, TileColorType, TileJustifyContentType, TileMaxWidthType, TileMaxWidthValueType, TileProps, TileTypographyProps };
