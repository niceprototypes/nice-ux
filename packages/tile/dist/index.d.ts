import * as nice_react_styles from 'nice-react-styles';
import { GapType, ModeType, TokenResult } from 'nice-react-styles';
import * as React$1 from 'react';
import { ComponentType } from 'react';
import { FlexProps, FlexSpacingType } from 'nice-react-flex';
import { TypographyProps } from 'nice-react-typography';

type TileTypographyProps = Partial<Omit<TypographyProps, "children">>;

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
    children?: React$1.ReactNode;
    /** Content rendered above the title */
    contentTop?: React$1.ReactNode;
    /** Content rendered between the title and description */
    contentCenter?: React$1.ReactNode;
    contentLeft?: React$1.ReactNode;
    contentRight?: React$1.ReactNode;
    title?: React$1.ReactNode;
    titleProps?: TileTypographyProps;
    description?: React$1.ReactNode | string[];
    descriptionProps?: TileTypographyProps;
    spacing?: FlexSpacingType;
    maxWidthMedium?: number;
    maxWidthLarge?: number;
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
    style?: React$1.CSSProperties;
}
declare const TileTypes: {};
declare namespace TileTypes {
    type Typography = TileTypographyProps;
    type AlignItems = TileAlignItemsType;
    type JustifyContent = TileJustifyContentType;
    type Gap = GapType;
    type Props = TileProps;
}

declare const Tile: React.FC<nice_react_styles.WithBreakpointsProps<P>>;
//# sourceMappingURL=index.d.ts.map

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
export type { TileAlignItemsType, TileJustifyContentType, TileProps, TileTypographyProps };
