import * as React from "react";
export interface TileTopProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
    titleAlign?: "left" | "center" | "right";
    titleColor?: string;
    contentLeft?: React.ReactNode;
    contentRight?: React.ReactNode;
    spacing?: string;
}
declare const TileTop: React.FC<TileTopProps>;
export default TileTop;
