import * as React from 'react';
import { ComponentType } from 'react';
import { FlexSpacingType } from 'nice-react-flex';
import { FontSizeType, GapType, ModeType, TokenResult } from 'nice-react-styles';
import { AsType, AlignType } from 'nice-react-typography';

/**
 * Responsive alignment type for header text
 * Allows different alignments at different breakpoints
 */
type TileHeaderAlignType = AlignType | {
    mobile?: AlignType;
    tablet?: AlignType;
    desktop?: AlignType;
};
interface TileProps {
    children?: React.ReactNode;
    /** Content rendered above the title */
    contentTop?: React.ReactNode;
    /** Content rendered between the title and description */
    contentCenter?: React.ReactNode;
    contentLeft?: React.ReactNode;
    contentRight?: React.ReactNode;
    title?: React.ReactNode;
    titleAs?: AsType;
    titleSize?: FontSizeType;
    description?: React.ReactNode | string[];
    descriptionSize?: FontSizeType;
    align?: TileHeaderAlignType;
    gap?: GapType;
    spacing?: FlexSpacingType;
    maxWidthTablet?: number;
    maxWidthDesktop?: number;
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
    type HeaderAlign = TileHeaderAlignType;
    type Props = TileProps;
}

declare const Tile: React.FC<TileProps>;
//# sourceMappingURL=Tile.d.ts.map

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
export type { TileHeaderAlignType, TileProps };
