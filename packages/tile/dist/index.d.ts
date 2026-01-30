import * as React from 'react';
import { FlexSpacingType } from 'nice-react-flex';
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
    breakpointMd?: number;
    breakpointLg?: number;
    className?: string;
    style?: React.CSSProperties;
    backgroundImage?: string;
    backgroundColor?: string;
    backgroundPosition?: string;
    backgroundSize?: string;
    backgroundAttachment?: string;
    fullWidth?: boolean;
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
    headerAlign?: TileHeaderAlignType;
    /** Color for title and description text */
    headerColor?: string;
    /** Additional inline styles for title and description */
    headerStyle?: React.CSSProperties;
}

declare const Tile: React.FC<TileProps>;
//# sourceMappingURL=Tile.d.ts.map

export { Tile as default };
export type { TileHeaderAlignType, TileProps };
