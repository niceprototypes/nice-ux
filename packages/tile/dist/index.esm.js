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
const InnerStyled = styled.div `
  margin: 0 auto;
  width: 100%;
  
  @media (min-width: ${({ $breakpointMd }) => $breakpointMd}px) {
    /* Medium breakpoint styles can be added here if needed */
  }
  
  @media (min-width: ${({ $breakpointLg }) => $breakpointLg}px) {
    width: ${({ $breakpointLg }) => $breakpointLg}px;
  }
`;

const TileSlot = ({ children, title, titleAlign = "left", titleColor, }) => {
    return (React.createElement(Flex, { direction: "column", gap: 5 },
        title && (React.createElement(Flex, { direction: "column", spacing: { sm: { horizontal: 4 }, md: { horizontal: 0 } } },
            React.createElement(Typography, { as: "h4", size: 5, align: titleAlign, color: titleColor }, title))),
        children));
};

const TileTop = ({ children, title, titleAlign = "left", titleColor, contentLeft, contentRight, spacing = "var(--nice-tile-spacing, 8rem)", }) => {
    return (React.createElement(Flex, { direction: "column", gap: 6 }, !!contentLeft || !!contentRight ? (React.createElement(Flex, { direction: { sm: "column", md: "row" }, alignItems: "center", gap: 5, spacing: { vertical: spacing } },
        contentLeft,
        React.createElement(Flex, { direction: "column", grow: 1 },
            React.createElement(TileSlot, { title: title, titleAlign: titleAlign, titleColor: titleColor }, children)),
        contentRight)) : (React.createElement(Flex, { direction: "column", spacing: { vertical: spacing } },
        React.createElement(TileSlot, { title: title, titleAlign: titleAlign, titleColor: titleColor }, children)))));
};

// Default breakpoint values from helpshelf-ui
const DEFAULT_BREAKPOINT_MD = 980;
const DEFAULT_BREAKPOINT_LG = 1280;
const Tile = ({ children, breakpointMd = DEFAULT_BREAKPOINT_MD, breakpointLg = DEFAULT_BREAKPOINT_LG, className, style, backgroundImage, backgroundColor, backgroundPosition = "center", backgroundSize = "cover", backgroundAttachment = "fixed", fullWidth = false, title, titleAlign = "left", titleColor, contentLeft: TileLeft, contentRight: TileRight, contentBottom: TileBottom, spacing, }) => {
    return (React.createElement(OuterStyled, { as: Flex, className: className, style: style, "$backgroundImage": backgroundImage, "$backgroundColor": backgroundColor, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$backgroundAttachment": backgroundAttachment, "$fullWidth": fullWidth },
        React.createElement(InnerStyled, { as: Flex, direction: "column", grow: 1, "$breakpointMd": breakpointMd, "$breakpointLg": breakpointLg }, title || TileLeft || TileRight || TileBottom ? (React.createElement(Flex, { direction: "column" },
            React.createElement(TileTop, { title: title, titleAlign: titleAlign, titleColor: titleColor, contentLeft: TileLeft, contentRight: TileRight, spacing: spacing }, children),
            TileBottom)) : (React.createElement(TileSlot, { title: title, titleAlign: titleAlign, titleColor: titleColor }, children)))));
};

export { Tile as default };
//# sourceMappingURL=index.esm.js.map
