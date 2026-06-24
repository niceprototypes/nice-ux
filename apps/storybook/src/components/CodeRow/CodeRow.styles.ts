import styled from "styled-components"

export const PreviewWrapper = styled.div<{ $fullWidth?: boolean }>`
  ${({ $fullWidth }) => $fullWidth && `width: 100%;`}
`

// A code cell that is a module-token reference renders inside this anchor so it
// deep-links to that token's Modules story. Kept visually flush with the code
// block it wraps — no text-decoration, including on hover.
export const TokenVarAnchor = styled.a`
  display: inline-block;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`

// Leading "name" cell. Always rendered (possibly empty) when the row belongs
// to a named CodeTable, so every row's columns line up.
export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`
