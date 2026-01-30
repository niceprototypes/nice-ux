import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import Flex from 'nice-react-flex';
import Typography from 'nice-react-typography';
import styled, { css } from 'styled-components';

const OuterStyled = styled(Flex).withConfig({
    shouldForwardProp: (prop) => !prop.startsWith('$'),
}) `
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
const InnerStyled = styled(Flex).withConfig({
    shouldForwardProp: (prop) => !prop.startsWith('$'),
}) `
  margin: 0 auto;
  width: 100%;

  ${({ $breakpointLg }) => $breakpointLg && css `
    @media (min-width: ${$breakpointLg}px) {
      width: ${$breakpointLg}px;
    }
  `}
`;

const TileSlot = ({ children, }) => {
    return (jsx(Flex, { direction: "column", gap: "large", children: children }));
};

const TileLayout = ({ children, contentLeft: LeftRendered, contentRight: RightRendered, }) => {
    const SlotRendered = (jsx(TileSlot, { children: children }));
    return (jsx(Flex, { direction: "column", gap: "larger", children: !!LeftRendered || !!RightRendered ? (jsxs(Flex, { direction: { mobile: "column", tablet: "row" }, alignItems: "center", gap: "large", children: [LeftRendered, jsx(Flex, { direction: "column", grow: 1, children: SlotRendered }), RightRendered] })) : SlotRendered }));
};

/**
 * Resolves responsive header alignment to a simple alignment value
 * For responsive values, returns the mobile value as the base
 */
const resolveHeaderAlign = (align) => {
    if (!align)
        return "center";
    if (typeof align === "string")
        return align;
    return align.mobile || "center";
};
const Tile = ({ children, breakpointMd, breakpointLg, className, style, backgroundImage, backgroundColor, backgroundPosition = "center", backgroundSize = "cover", backgroundAttachment = "fixed", fullWidth = false, contentLeft: TileLeft, contentRight: TileRight, spacing, title, titleAs = "h2", description, headerAlign, headerColor, headerStyle, }) => {
    const hasHeader = title || description;
    const resolvedAlign = resolveHeaderAlign(headerAlign);
    const textStyle = headerColor
        ? { color: headerColor, ...headerStyle }
        : headerStyle;
    const HeaderContent = hasHeader ? (jsxs(Flex, { direction: "column", gap: "small", children: [title && (jsx(Typography, { as: titleAs, size: "large", align: resolvedAlign, style: textStyle, children: title })), description && (jsx(Typography, { size: "base", align: resolvedAlign, style: textStyle, children: description }))] })) : null;
    const ContentWithHeader = hasHeader ? (jsxs(Flex, { direction: "column", gap: "large", children: [HeaderContent, children] })) : (children);
    return (jsx(OuterStyled, { className: className, style: style, "$backgroundImage": backgroundImage, "$backgroundColor": backgroundColor, "$backgroundPosition": backgroundPosition, "$backgroundSize": backgroundSize, "$backgroundAttachment": backgroundAttachment, "$fullWidth": fullWidth, children: jsx(InnerStyled, { direction: "column", grow: 1, spacing: spacing, "$breakpointMd": breakpointMd, "$breakpointLg": breakpointLg, children: TileLeft || TileRight ? (jsx(TileLayout, { contentLeft: TileLeft, contentRight: TileRight, children: ContentWithHeader })) : (jsx(TileSlot, { children: ContentWithHeader })) }) }));
};

export { Tile as default };
//# sourceMappingURL=index.esm.js.map
