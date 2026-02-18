import * as React from 'react';
import { ComponentType } from 'react';
import { FlexSpacingType } from 'nice-react-flex';
import { ModeType, TokenResult } from 'nice-styles';
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
    maxWidthTablet?: number;
    maxWidthDesktop?: number;
    className?: string;
    style?: React.CSSProperties;
    backgroundImage?: string;
    backgroundColor?: string;
    foregroundColor?: string;
    backgroundPosition?: string;
    backgroundSize?: string;
    backgroundAttachment?: string;
    contentLeft?: React.ReactNode;
    contentRight?: React.ReactNode;
    spacing?: FlexSpacingType;
    /** Title text displayed at the top of the tile */
    title?: string;
    /** HTML element for the title (default: "h2") */
    titleAs?: AsType;
    /** Description text displayed below the title */
    description?: string;
    /** Alignment for title and description (default: "center") */
    align?: TileHeaderAlignType;
    /** Pin token resolution to a specific mode instead of responding to media query */
    mode?: ModeType;
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
 * @param name - Token name (e.g., "backgroundColor", "foregroundColor")
 * @param variant - Variant within token (defaults to "base")
 * @param mode - Optional theme mode suffix
 * @returns TokenResult with key, var, and value properties
 */
declare function getTileToken(name: string, variant?: string, mode?: string): TokenResult;

export { TileStyles, Tile as default, getTileToken };
export type { TileHeaderAlignType, TileProps };
