# nice-react-typography

A flexible and customizable typography component for React with styled-components. Provides comprehensive text styling control with semantic HTML elements, CSS custom properties, and accessibility features.

## Features

- 🎯 **Semantic HTML**: Supports h1-h4, p, and span elements
- 📏 **Flexible Sizing**: CSS custom property-based sizing with fallbacks
- 🎨 **Rich Styling**: Weight, color, alignment, and line-height control
- 💡 **Status Colors**: Built-in semantic color support for status messages
- 🔤 **Code Support**: Monospace font styling for code snippets
- ♿ **Accessibility**: Font antialiasing and legibility optimizations
- 💪 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🎨 **CSS Variables**: Uses CSS custom properties for flexible theming

## Installation

```bash
npm install nice-react-typography
```

## Basic Usage

```jsx
import Typography from 'nice-react-typography'

// Simple heading - uses default CSS variable
<Typography as="h1">Main Heading</Typography>

// Paragraph with custom size and weight
<Typography as="p" size="1.125rem" weight="500">
  Body text content
</Typography>

// Using CSS variables for theming
<Typography size="var(--text-lg)" weight="var(--font-semibold)">
  Themed text
</Typography>

// Status message with semantic color
<Typography status="success">
  Operation completed successfully
</Typography>

// Code snippet
<Typography code>
  const result = calculateValue()
</Typography>
```

## Props API

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `AlignType` | - | Text alignment: `"left"`, `"center"`, `"right"`, `"justify"` |
| `antialiased` | `boolean` | `false` | Enable font antialiasing |
| `as` | `TypographyAsType` | `"p"` | HTML element: `"h1"`, `"h2"`, `"h3"`, `"h4"`, `"p"`, `"span"` |
| `children` | `React.ReactNode` | - | Text content or elements |
| `className` | `string` | - | CSS class name |
| `code` | `boolean` | `false` | Apply monospace font for code |
| `color` | `string` | - | Custom text color (any CSS color value) |
| `legibilityOptimized` | `boolean` | `false` | Apply legibility optimizations |
| `lineHeight` | `LineHeightType` | Based on `as` prop | Line height: `"default"` or `"condensed"` |
| `size` | `string` | `var(--typography-size-default, 1rem)` | Font size (any CSS size value or variable) |
| `status` | `StatusType` | - | Semantic status color (overrides `color`) |
| `weight` | `string` | `var(--typography-weight-default, normal)` | Font weight (any CSS weight value or variable) |

## CSS Custom Properties

The component uses CSS custom properties for flexible theming. Define these in your application:

### Typography Defaults

```css
:root {
  /* Default size and weight - applied when props not provided */
  --typography-size-default: 1rem;
  --typography-weight-default: normal;

  /* Heading weight - used for h1, h2, h3 elements */
  --typography-weight-heading: 600;

  /* Line heights */
  --line-height-default: 1.5;
  --line-height-condensed: 1.25;

  /* Heading font family (optional) */
  --font-family-heading: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

## Status Types

Status props map to semantic CSS custom properties:

```css
:root {
  /* Functional status colors */
  --content-color-success: #10b981;
  --content-color-error: #ef4444;
  --content-color-warning: #f59e0b;
  --content-color-active: #3b82f6;
  --content-color-default: #6b7280;
  
  /* Visual status colors */
  --content-color-muted: #9ca3af;
  --content-color-highlighted: #fbbf24;
  --content-color-primary: #6366f1;
  --content-color-secondary: #8b5cf6;
}
```

### Available Status Types

- **Functional**: `active`, `default`, `disabled`, `error`, `success`, `warning`
- **Visual**: `highlighted`, `primary`, `secondary`

## Examples

### Page Header

```jsx
<div>
  <Typography as="h1" align="center">
    Welcome to Our App
  </Typography>
  <Typography as="p" size="1.25rem" weight="400" color="#6b7280" align="center">
    Build something amazing today
  </Typography>
</div>
```

### Alert Messages

```jsx
// Success message
<Typography status="success">
  ✓ Your changes have been saved
</Typography>

// Error message
<Typography status="error" weight="600">
  ⚠ Please fix the errors below
</Typography>

// Warning
<Typography status="warning">
  This action cannot be undone
</Typography>
```

### Code Display

```jsx
<Typography as="p" size="0.875rem">
  To install, run:
</Typography>
<Typography code size="0.875rem" color="#e5e7eb">
  npm install nice-react-typography
</Typography>
```

### Article Content

```jsx
<article>
  <Typography as="h1">Article Title</Typography>

  <Typography as="p" size="0.875rem" status="disabled">
    Published on January 1, 2024 by Author Name
  </Typography>

  <Typography as="p" lineHeight="default">
    This is the main body content of the article. It uses default
    line height for optimal readability across different screen sizes.
  </Typography>

  <Typography as="h2">Section Heading</Typography>

  <Typography as="p">
    More content continues here...
  </Typography>
</article>
```

### Form Labels and Help Text

```jsx
<div>
  <Typography as="span" size="0.875rem" weight="600">
    Email Address
  </Typography>
  <input type="email" />
  <Typography as="span" size="0.75rem" status="disabled">
    We'll never share your email with anyone
  </Typography>
</div>
```

### Dashboard Metrics

```jsx
<div>
  <Typography as="h3" status="disabled" size="0.875rem">
    Total Revenue
  </Typography>
  <Typography as="p" size="2rem" weight="700">
    $12,345.67
  </Typography>
  <Typography as="span" status="success" size="0.875rem">
    ↑ 12% from last month
  </Typography>
</div>
```

### Navigation Items

```jsx
<nav>
  <Typography
    as="span"
    weight="500"
    status="active"
  >
    Dashboard
  </Typography>
  <Typography
    as="span"
    weight="400"
  >
    Analytics
  </Typography>
  <Typography
    as="span"
    weight="400"
  >
    Settings
  </Typography>
</nav>
```

### Using Custom CSS Variables

```jsx
// Define your own design system variables
:root {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;

  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}

// Use them in your components
<Typography size="var(--text-lg)" weight="var(--font-semibold)">
  Large, semibold text
</Typography>
<Typography size="var(--text-sm)" weight="var(--font-normal)">
  Small, normal text
</Typography>
```

## Accessibility Features

### Font Antialiasing

Enabled by default for smoother text rendering:

```jsx
<Typography antialiased>
  Smooth, antialiased text
</Typography>
```

### Legibility Optimization

For improved readability in certain conditions:

```jsx
<Typography legibilityOptimized>
  Optimized for maximum legibility
</Typography>
```

The legibility optimization applies:
- Hardware acceleration
- 3D transforms for sharper rendering
- Backface visibility fixes

## Architecture

### Core Files

- **`Typography.tsx`** - Main component with prop handling
- **`types.ts`** - TypeScript type definitions
- **`styles.ts`** - Styled component with conditional styling
- **`utils.ts`** - Utility functions and style helpers

### Services

- **`getEffectiveFontWeight`** - Determines font weight based on element type
- **`getEffectiveLineHeight`** - Determines line height based on element type

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import Typography, {
  TypographyProps,
  TypographyAsType,
  StatusType,
  AlignType,
  LineHeightType
} from 'nice-react-typography'

const MyComponent: React.FC = () => {
  const headingProps: TypographyProps = {
    as: 'h1',
    size: '2rem',
    weight: '700',
    align: 'center'
  }

  return <Typography {...headingProps}>Heading</Typography>
}
```

## Browser Support

- Modern browsers with CSS custom properties support
- Chrome 49+, Firefox 31+, Safari 9.1+, Edge 15+
- Mobile browsers (iOS Safari 9.3+, Android Chrome 49+)

## Dependencies

- React 16.8+
- styled-components 5.0+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## License

MIT License - see LICENSE file for details