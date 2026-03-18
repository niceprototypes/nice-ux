import * as React from "react";
import type { FlexSpacingType } from "nice-react-flex";
import type { FontSizeType, GapType, ModeType } from "nice-react-styles";
import type { AlignType, AsType } from "nice-react-typography";
/**
 * Responsive alignment type for header text
 * Allows different alignments at different breakpoints
 */
export type TileHeaderAlignType = AlignType | {
    mobile?: AlignType;
    tablet?: AlignType;
    desktop?: AlignType;
};
export interface TileProps {
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
//# sourceMappingURL=types.d.ts.map