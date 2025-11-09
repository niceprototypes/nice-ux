import * as React from 'react';
import Flex from 'nice-react-flex';
import styled, { css } from 'styled-components';
import Typography from 'nice-react-typography';

const OuterStyled = styled.div `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${({ $fullWidth }) => $fullWidth && css `width: 100%;`}

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
        return css `
        background-color: ${$backgroundColor};
      `;
    }
}}

  ${({ $backgroundImage, $backgroundPosition, $backgroundSize, $backgroundAttachment }) => {
    if ($backgroundImage) {
        return css `
        background-image: ${$backgroundImage};
        background-size: ${$backgroundSize || "cover"};
        background-position: ${$backgroundPosition || "center"};
        background-repeat: no-repeat;

        @media (orientation: landscape) {
          background-attachment: ${$backgroundAttachment || "fixed"};
        }
      `;
    }
}}
`;
const InnerStyled = styled(Flex) `
  margin: 0 auto;
  width: 100%;

  ${({ $breakpointLg }) => $breakpointLg && css `
    @media (min-width: ${$breakpointLg}px) {
      width: ${$breakpointLg}px;
    }
  `}
`;

const TileSlot = ({ children, title, titleAlign = "left", titleColor, }) => {
    return (React.createElement(Flex, { direction: "column", gap: 5 },
        title && (React.createElement(Flex, { direction: "column" },
            React.createElement(Typography, { as: "h4", size: 5, align: titleAlign, color: titleColor }, title))),
        children));
};

const TileLayout = ({ children, title, titleAlign = "left", titleColor, contentLeft: LeftRendered, contentRight: RightRendered, }) => {
    const SlotRendered = (React.createElement(TileSlot, { title: title, titleAlign: titleAlign, titleColor: titleColor }, children));
    return (React.createElement(Flex, { direction: "column", gap: 6 }, !!LeftRendered || !!RightRendered ? (React.createElement(Flex, { direction: { sm: "column", md: "row" }, alignItems: "center", gap: 5 },
        LeftRendered,
        React.createElement(Flex, { direction: "column", grow: 1 }, SlotRendered),
        RightRendered)) : SlotRendered));
};

const Tile = ({ children, breakpointMd, breakpointLg, className, style, backgroundImage, backgroundColor, backgroundPosition = "center", backgroundSize = "cover", backgroundAttachment = "fixed", fullWidth = false, title, titleAlign = "left", titleColor, contentLeft: TileLeft, contentRight: TileRight, spacing, }) => {
    return (React.createElement(OuterStyled, { as: Flex, className: className, style: style, "$backgroundImage": backgroundImage, "$backgroundColor": backgroundColor, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$backgroundAttachment": backgroundAttachment, "$fullWidth": fullWidth },
        React.createElement(InnerStyled, { direction: "column", grow: 1, spacing: spacing, "$breakpointMd": breakpointMd, "$breakpointLg": breakpointLg }, title || TileLeft || TileRight ? (React.createElement(TileLayout, { title: title, titleAlign: titleAlign, titleColor: titleColor, contentLeft: TileLeft, contentRight: TileRight }, children)) : (React.createElement(TileSlot, { title: title, titleAlign: titleAlign, titleColor: titleColor }, children)))));
};

export { Tile as default };
//# sourceMappingURL=index.esm.js.map
