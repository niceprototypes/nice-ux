import * as React from "react";
import type { AlignType, AsType } from "nice-react-typography";
import type { FontSizeType, GapType, ModeType } from "nice-react-styles";
export interface TileContentProps {
    children?: React.ReactNode;
    contentTop?: React.ReactNode;
    contentCenter?: React.ReactNode;
    title?: React.ReactNode;
    titleAs?: AsType;
    titleSize?: FontSizeType;
    description?: React.ReactNode | string[];
    descriptionSize?: FontSizeType;
    align?: AlignType;
    gap?: GapType;
    mode?: ModeType;
}
//# sourceMappingURL=types.d.ts.map