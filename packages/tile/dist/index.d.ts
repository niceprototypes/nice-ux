import * as React from 'react';
import { GapSize, SpacingDefinition } from 'nice-react-flex';

interface TileProps {
    children: React.ReactNode;
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
    title?: string | React.ReactNode;
    titleAlign?: "left" | "center" | "right";
    titleColor?: string;
    contentLeft?: React.ReactNode;
    contentRight?: React.ReactNode;
    spacing?: GapSize | SpacingDefinition | {
        sm?: SpacingDefinition;
        md?: SpacingDefinition;
        lg?: SpacingDefinition;
    };
}

declare const Tile: React.FC<TileProps>;

export { Tile as default };
export type { TileProps };
