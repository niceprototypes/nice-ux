# @niceprototypes/grid

`Grid` and `GridItem`: a CSS grid container for two-dimensional and column layouts. Flex stays
the default for one-dimensional layouts. Gap, padding and margin take the same gap tokens as Flex
(through Flex's `getGapSize`, `getSpacingValue` and `styleSpacing` services).

## Install

```sh
npm install @niceprototypes/grid
```

Peer dependencies: `@niceprototypes/flex`, `@niceprototypes/styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import { Grid, GridItem } from "@niceprototypes/grid"

// Equal columns, more from tablet and laptop up
<Grid columns={1} gap="large" breakpoints={{ "tablet+": { columns: 2 }, "laptop+": { columns: 3 } }}>
  <GridItem colSpan="full">Header</GridItem>
  <GridItem>One</GridItem>
  <GridItem>Two</GridItem>
</Grid>

// As many columns as fit, each at least a token width
<Grid minChildWidth={getToken("cardWidth", "base")}>{cards}</Grid>

// A list of cards
<Grid as="ul" columns={3}>
  <GridItem as="li">…</GridItem>
</Grid>
```

## Props

Prop types are `GridProps` and `GridItemProps`; allowed values per prop are in
`manifest/agents/catalog.json`. Both components take per-viewport overrides of every prop through
`breakpoints` (`withBreakpoints`). `minChildWidth` overrides `columns`; pass a token value, not an
inline literal. Items flow in DOM order (no `order` or dense packing), so reading order matches
visual order.
