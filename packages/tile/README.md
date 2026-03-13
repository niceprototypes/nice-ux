# nice-react-tile

A responsive Tile component for React with styled-components, providing flexible layout with customizable breakpoints, background styling, and advanced layout features.

## Installation

```bash
npm install nice-react-tile
```

## Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom styled-components nice-react-flex
```

## Usage

### Basic Usage

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

### With Title and Background

```tsx
<Tile
  title="Welcome"
  titleAlign="center"
  backgroundColor="#f5f5f5"
>
  <p>Content with a title and background color</p>
</Tile>
```

### With Background Image

```tsx
<Tile
  backgroundImage="url('/path/to/image.jpg')"
  backgroundPosition="center"
  backgroundSize="cover"
  backgroundAttachment="fixed"
>
  <div>Content with background image</div>
</Tile>
```

### With Split Layout

```tsx
<Tile
  title="Dashboard"
  contentLeft={<div>Left sidebar content</div>}
  contentRight={<div>Right sidebar content</div>}
>
  <div>Main content area</div>
</Tile>
```

### With Custom Spacing

```tsx
<Tile spacing="lg">
  <div>Content with large spacing between children</div>
</Tile>

// Or with responsive spacing
<Tile
  spacing={{
    sm: { x: 'sm', y: 'md' },
    md: { x: 'md', y: 'lg' },
    lg: { x: 'lg', y: 'xl' }
  }}
>
  <div>Content with responsive spacing</div>
</Tile>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to be rendered inside the tile |
| `maxWidthTablet` | `number` | `980` | Max-width constraint at tablet viewport |
| `maxWidthDesktop` | `number` | `1280` | Max-width constraint at desktop viewport |
| `className` | `string` | - | Custom CSS class name |
| `style` | `React.CSSProperties` | - | Custom inline styles |
| `backgroundImage` | `string` | - | Background image (use CSS `url()` syntax) |
| `backgroundColor` | `string` | - | Background color |
| `backgroundPosition` | `string` | `"center"` | Background image position |
| `backgroundSize` | `string` | `"cover"` | Background image size |
| `backgroundAttachment` | `string` | `"fixed"` | Background attachment (applied only on landscape orientation) |
| `title` | `string \| React.ReactNode` | - | Title to display at the top of the tile |
| `titleAlign` | `"left" \| "center" \| "right"` | `"left"` | Alignment of the title |
| `titleColor` | `string` | - | Color of the title text |
| `contentLeft` | `React.ReactNode` | - | Content for left sidebar (creates split layout) |
| `contentRight` | `React.ReactNode` | - | Content for right sidebar (creates split layout) |
| `spacing` | `GapSize \| SpacingDefinition \| object` | - | Spacing between child elements (from nice-react-flex) |

### Spacing Types

The `spacing` prop accepts:
- **GapSize**: Simple string values like `"sm"`, `"md"`, `"lg"`, `"xl"`
- **SpacingDefinition**: Object with `x` and `y` properties for horizontal and vertical spacing
- **Responsive object**: Different spacing for `sm`, `md`, and `lg` breakpoints

## Custom Max-Width

You can customize the max-width constraints to match your design system:

```tsx
<Tile maxWidthTablet={768} maxWidthDesktop={1024}>
  <div>Content with custom max-width constraints</div>
</Tile>
```

## Layout Features

### Split Layout
When `contentLeft` or `contentRight` props are provided, the tile automatically creates a three-column layout with sidebars and main content area.

### Title Display
The `title` prop can accept either a string or a custom React component, giving you full control over the title appearance.

## Default Behavior

- Content is full-width on mobile and tablet
- At the large breakpoint (1280px by default), content is constrained to the breakpoint width and centered
- Uses flexbox layout with `direction="column"` and `grow={1}`
- Background images use `fixed` attachment only on landscape orientation for better mobile performance

## License

MIT