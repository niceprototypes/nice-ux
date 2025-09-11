import * as React from 'react';

interface TileProps {
    children: React.ReactNode;
    breakpointMd?: number;
    breakpointLg?: number;
    className?: string;
    style?: React.CSSProperties;
}

declare const Tile: React.FC<TileProps>;

export { Tile as default };
export type { TileProps };
