import * as React from 'react';

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
    spacing?: string;
}

declare const Tile: React.FC<TileProps>;

export { Tile as default };
export type { TileProps };
