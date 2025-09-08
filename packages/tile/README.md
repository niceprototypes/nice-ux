# nice-react-tile

A responsive Tile component for React with styled-components, providing flexible layout with customizable breakpoints.

## Installation

```bash
npm install nice-react-tile
```

## Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react styled-components nice-react-flex
```

## Usage

```tsx
import React from 'react'
import Tile from 'nice-react-tile'

const App = () => (
  <Tile>
    <h2>Your Content Here</h2>
    <p>This tile will automatically center and constrain width at large breakpoints.</p>
  </Tile>
)

export default App
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to be rendered inside the tile |
| `breakpointMd` | `number` | `980` | Medium breakpoint value in pixels |
| `breakpointLg` | `number` | `1280` | Large breakpoint value in pixels |

## Custom Breakpoints

You can customize the breakpoints to match your design system:

```tsx
<Tile breakpointMd={768} breakpointLg={1024}>
  <div>Content with custom breakpoints</div>
</Tile>
```

## Default Behavior

- Content is full-width on mobile and tablet
- At the large breakpoint (1280px by default), content is constrained to the breakpoint width and centered
- Uses flexbox layout with `direction="column"` and `grow={1}`

## License

MIT