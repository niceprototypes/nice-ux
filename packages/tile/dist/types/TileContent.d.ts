import * as React from "react";
import { AlignType, AsType } from "nice-react-typography";
import type { ModeType } from "nice-styles";
export interface TileContentProps {
    children?: React.ReactNode;
    contentTop?: React.ReactNode;
    contentCenter?: React.ReactNode;
    title?: string;
    titleAs?: AsType;
    description?: string;
    align?: AlignType;
    mode?: ModeType;
}
declare const TileContent: React.FC<TileContentProps>;
export default TileContent;
//# sourceMappingURL=TileContent.d.ts.map