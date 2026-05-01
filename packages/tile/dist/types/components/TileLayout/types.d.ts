import * as React from "react";
import type { FlexSpacingType } from "nice-react-flex";
import type { TileContentProps } from "../TileContent/types";
import type { TileMaxWidthType, TileAlignItemsType, TileJustifyContentType } from "../Tile/types";
export interface TileLayoutProps extends TileContentProps {
    contentLeft?: React.ReactNode;
    contentRight?: React.ReactNode;
    spacing?: FlexSpacingType;
    maxWidth?: TileMaxWidthType;
    alignItems?: TileAlignItemsType;
    justifyContent?: TileJustifyContentType;
}
//# sourceMappingURL=types.d.ts.map