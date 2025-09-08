# Flex Component

A highly flexible and responsive flexbox container component for React with styled-components. Provides comprehensive layout control with breakpoint-based responsive design and intuitive prop APIs.

## Features

- 🎯 **Responsive Design**: All props support breakpoint-based responsive values
- 📱 **Mobile-First**: Built with mobile-first responsive design principles
- 🔧 **Flexible API**: Simple values for basic use, objects for responsive control
- 📏 **Spacing System**: Integrated spacing system with CSS custom properties
- 🎨 **Clean Styling**: Prop filtering prevents DOM attribute pollution
- 💪 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🧩 **Modular**: Clean service-based architecture for maintainability

## Installation

```bash
npm install nice-react-flex
```

## Basic Usage

```jsx
import Flex from 'nice-react-flex'

// Simple horizontal layout
<Flex direction="row" gap={2} alignItems="center">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>

// Responsive layout
<Flex 
  direction={{ sm: "column", md: "row" }}
  gap={{ sm: 1, md: 2, lg: 3 }}
  alignItems="center"
  justifyContent="space-between"
>
  <div>Responsive Item 1</div>
  <div>Responsive Item 2</div>
</Flex>
```

## Props API

### Layout Props

| Prop | Type | Default      | Description |
|------|------|--------------|-------------|
| `direction` | `"row" \| "column"` or responsive object | `row`        | Flex direction (main axis) |
| `alignItems` | Alignment value or responsive object | `flex-start` | Cross-axis alignment |
| `justifyContent` | Justification value or responsive object | `flex-start` | Main-axis alignment |
| `gap` | `GapSize (0-6)` or responsive object | `0`          | Space between flex items |
| `grow` | `number` or responsive object | `0`          | Flex grow value |
| `spacing` | Spacing configuration | `0`          | Padding/margin spacing |
| `type` | `"padding" \| "margin"` | `"padding"`  | How spacing is applied |

### Standard Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Child elements |
| `className` | `string` | CSS class name |
| `style` | `React.CSSProperties` | Inline styles |
| `onClick` | `React.MouseEventHandler` | Click handler |

### Responsive Values

All layout props accept either simple values or responsive objects:

```jsx
// Simple value (applied to all breakpoints)
<Flex gap={2} direction="row" />

// Responsive object (different values per breakpoint)
<Flex 
  gap={{ sm: 1, md: 2, lg: 3 }}
  direction={{ sm: "column", md: "row" }}
/>
```

### Breakpoint System

- **sm** (Small): 0px+ - Mobile, always applied as base
- **md** (Medium): 980px+ - Tablet and small desktop  
- **lg** (Large): 1280px+ - Large desktop

## Spacing System

The spacing prop provides flexible control over padding and margin:

### Basic Spacing

```jsx
// Simple number - applies to all sides at sm breakpoint
<Flex spacing={2}>Content</Flex>

// SpacingDefinition object
<Flex spacing={{ all: 2, horizontal: 3 }}>Content</Flex>

// Responsive spacing
<Flex spacing={{
  sm: { all: 1 },
  md: { horizontal: 2, vertical: 1 },
  lg: { all: 3 }
}}>Content</Flex>
```

### Spacing Properties

| Property | Description |
|----------|-------------|
| `all` | Applied to all four sides |
| `horizontal` | Applied to left and right |
| `vertical` | Applied to top and bottom |
| `top` | Applied to top side only |
| `right` | Applied to right side only |
| `bottom` | Applied to bottom side only |
| `left` | Applied to left side only |

### Priority System

Individual sides override axis shortcuts, which override `all`:

```jsx
<Flex spacing={{ 
  all: 1,        // Base spacing for all sides
  horizontal: 2, // Overrides 'all' for left/right
  top: 3         // Overrides 'all' for top
}}>
  {/* Results in: top: 3, right: 2, bottom: 1, left: 2 */}
</Flex>
```

### Gap Sizes

Gap sizes (0-6) map to CSS custom properties:

```css
/* Your CSS should define these variables */
:root {
  --gap-size-0: 0;
  --gap-size-1: 0.25rem;   /* 4px */
  --gap-size-2: 0.5rem;    /* 8px */
  --gap-size-3: 1rem;      /* 16px */
  --gap-size-4: 1.5rem;    /* 24px */
  --gap-size-5: 2rem;      /* 32px */
  --gap-size-6: 3rem;      /* 48px */
}
```

## Alignment Values

### alignItems (Cross-axis)
- `flex-start` - Align to start of cross axis
- `flex-end` - Align to end of cross axis  
- `center` - Center on cross axis
- `baseline` - Align to text baseline
- `stretch` - Stretch to fill container

### justifyContent (Main-axis)
- `flex-start` - Pack items to start
- `flex-end` - Pack items to end
- `center` - Pack items to center
- `space-between` - Space between items
- `space-around` - Space around each item
- `space-evenly` - Even space between items

## Examples

### Card Layout

```jsx
<Flex 
  direction="column" 
  spacing={{ all: 3 }}
  style={{ border: '1px solid #ccc', borderRadius: '8px' }}
>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
  <Flex direction="row" gap={2} justifyContent="flex-end">
    <button>Cancel</button>
    <button>Save</button>
  </Flex>
</Flex>
```

### Navigation Bar

```jsx
<Flex 
  direction="row"
  alignItems="center"
  justifyContent="space-between"
  spacing={{ horizontal: 3, vertical: 2 }}
>
  <div className="logo">Logo</div>
  <Flex direction="row" gap={3} alignItems="center">
    <a href="/home">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </Flex>
</Flex>
```

### Responsive Grid

```jsx
<Flex
  direction={{ sm: "column", md: "row" }}
  gap={{ sm: 2, md: 3, lg: 4 }}
  spacing={{ sm: { all: 2 }, md: { all: 3 } }}
>
  <Flex grow={{ md: 2 }}>Main Content</Flex>
  <Flex grow={{ md: 1 }}>Sidebar</Flex>
</Flex>
```

### Form Layout

```jsx
<Flex direction="column" gap={3} spacing={{ all: 2 }}>
  <Flex direction={{ sm: "column", md: "row" }} gap={2}>
    <Flex direction="column" gap={1} grow={1}>
      <label>First Name</label>
      <input type="text" />
    </Flex>
    <Flex direction="column" gap={1} grow={1}>
      <label>Last Name</label>
      <input type="text" />
    </Flex>
  </Flex>
  
  <Flex direction="column" gap={1}>
    <label>Email</label>
    <input type="email" />
  </Flex>
  
  <Flex direction="row" gap={2} justifyContent="flex-end">
    <button type="button">Cancel</button>
    <button type="submit">Submit</button>
  </Flex>
</Flex>
```

## Architecture

The component is built with a clean, modular architecture:

### Core Files

- **`Flex.tsx`** - Main component with prop normalization
- **`types.ts`** - TypeScript type definitions
- **`styles.ts`** - Styled component with responsive media queries

### Services

- **`normalizeProps`** - Converts simple props to breakpoint objects
- **`styleFlex`** - Generates CSS for specific breakpoints

### Dependencies

- React 16.8+
- styled-components 5.0+

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import Flex, { FlexProps, GapSize, SpacingDefinition } from 'nice-react-flex'

const MyComponent: React.FC = () => {
  const spacing: SpacingDefinition = { horizontal: 2, vertical: 1 }
  
  return (
    <Flex 
      direction="column"
      gap={3}
      spacing={spacing}
      alignItems="center"
    >
      Content
    </Flex>
  )
}
```

## Browser Support

- Modern browsers with CSS flexbox support
- IE 11+ (with appropriate styled-components polyfills)
- Mobile browsers (iOS Safari 9+, Android Chrome 4+)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## License

MIT License - see LICENSE file for details