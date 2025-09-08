# Typography Component

A flexible and customizable typography component for React with styled-components. Provides comprehensive text styling control with semantic HTML elements, responsive sizing, and accessibility features.

## Features

- 🎯 **Semantic HTML**: Supports h1-h4, p, and span elements
- 📏 **Flexible Sizing**: 6-level size system with sensible defaults
- 🎨 **Rich Styling**: Weight, color, alignment, and line-height control
- 💡 **Status Colors**: Built-in semantic color support for status messages
- 🔤 **Code Support**: Monospace font styling for code snippets
- ♿ **Accessibility**: Font antialiasing and legibility optimizations
- 💪 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🧩 **Clean Architecture**: Service-based approach for maintainability

## Installation

```bash
npm install nice-react-typography
```

## Basic Usage

```jsx
import Typography from 'nice-react-typography'

// Simple heading
<Typography as="h1">Main Heading</Typography>

// Paragraph with custom size and weight
<Typography as="p" size={3} weight={500}>
  Body text content
</Typography>

// Status message with semantic color
<Typography status="success" size={2}>
  Operation completed successfully
</Typography>

// Code snippet
<Typography code size={2}>
  const result = calculateValue()
</Typography>
```

## Props API

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "p" \| "span"` | `"p"` | HTML element to render |
| `size` | `1-6` | Based on `as` prop | Font size level (1=smallest, 6=largest) |
| `weight` | `number` | Based on `as` prop | Font weight value |
| `color` | `string` | - | Custom text color |
| `status` | `StatusType` | - | Semantic status color |
| `align` | `"left" \| "center" \| "right" \| "justify"` | - | Text alignment |
| `lineHeight` | `"default" \| "condensed"` | Based on `as` prop | Line height setting |

### Feature Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `boolean` | `false` | Apply monospace font for code |
| `antialiased` | `boolean` | `true` | Enable font antialiasing |
| `legibilityOptimized` | `boolean` | `false` | Apply legibility optimizations |

### Standard Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Text content or elements |
| `className` | `string` | CSS class name |

## Size System

The size system uses levels 1-6, mapping to CSS custom properties:

```css
/* Your CSS should define these variables */
:root {
  --font-size-1: 0.75rem;   /* 12px - Small */
  --font-size-2: 0.875rem;  /* 14px - Body Small */
  --font-size-3: 1rem;      /* 16px - Body */
  --font-size-4: 1.25rem;   /* 20px - Large */
  --font-size-5: 1.5rem;    /* 24px - Heading */
  --font-size-6: 2rem;      /* 32px - Display */
}
```

### Default Sizes by Element

| Element | Default Size |
|---------|--------------|
| `h1` | 5 |
| `h2` | 4 |
| `h3` | 3 |
| `h4` | 3 |
| `p` | 3 |
| `span` | 3 |

## Weight System

Font weights use CSS custom properties:

```css
:root {
  --font-weight-1: 300;  /* Light */
  --font-weight-2: 400;  /* Normal */
  --font-weight-3: 500;  /* Medium */
  --font-weight-4: 600;  /* Semibold */
  --font-weight-5: 700;  /* Bold */
  --font-weight-6: 800;  /* Heavy */
}
```

### Default Weights by Element

| Element | Default Weight |
|---------|----------------|
| `h1`, `h2`, `h3` | 3 (500) |
| `h4`, `p`, `span` | None (inherits) |

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

- **Functional**: `success`, `error`, `warning`, `active`, `default`
- **Visual**: `muted`, `highlighted`, `primary`, `secondary`

## Line Height System

Line heights use CSS custom properties:

```css
:root {
  --line-height-default: 1.5;    /* Body text */
  --line-height-condensed: 1.25; /* Headings */
}
```

### Default Line Heights

- Headings (`h1`-`h4`): `condensed`
- Body text (`p`, `span`): `default`

## Examples

### Page Header

```jsx
<div>
  <Typography as="h1" align="center">
    Welcome to Our App
  </Typography>
  <Typography as="p" size={4} weight={2} color="#6b7280" align="center">
    Build something amazing today
  </Typography>
</div>
```

### Alert Messages

```jsx
// Success message
<Typography status="success" size={2}>
  ✓ Your changes have been saved
</Typography>

// Error message
<Typography status="error" size={2} weight={4}>
  ⚠ Please fix the errors below
</Typography>

// Warning
<Typography status="warning" size={3}>
  This action cannot be undone
</Typography>
```

### Code Display

```jsx
<Typography as="p" size={2}>
  To install, run:
</Typography>
<Typography code size={2} color="#e5e7eb">
  npm install nice-react-typography
</Typography>
```

### Article Content

```jsx
<article>
  <Typography as="h1">Article Title</Typography>
  
  <Typography as="p" size={2} status="muted">
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
  <Typography as="span" size={2} weight={4}>
    Email Address
  </Typography>
  <input type="email" />
  <Typography as="span" size={1} status="muted">
    We'll never share your email with anyone
  </Typography>
</div>
```

### Dashboard Metrics

```jsx
<div>
  <Typography as="h3" status="muted" size={2}>
    Total Revenue
  </Typography>
  <Typography as="p" size={6} weight={5}>
    $12,345.67
  </Typography>
  <Typography as="span" status="success" size={2}>
    ↑ 12% from last month
  </Typography>
</div>
```

### Navigation Items

```jsx
<nav>
  <Typography 
    as="span" 
    size={3} 
    weight={3}
    status="active"
  >
    Dashboard
  </Typography>
  <Typography 
    as="span" 
    size={3} 
    weight={2}
  >
    Analytics
  </Typography>
  <Typography 
    as="span" 
    size={3} 
    weight={2}
  >
    Settings
  </Typography>
</nav>
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
  StatusType 
} from 'nice-react-typography'

const MyComponent: React.FC = () => {
  const headingProps: TypographyProps = {
    as: 'h1',
    size: 5,
    weight: 600,
    align: 'center'
  }
  
  return <Typography {...headingProps}>Heading</Typography>
}
```

## CSS Requirements

This component expects certain CSS custom properties to be defined in your application:

```css
:root {
  /* Font sizes */
  --font-size-1: 0.75rem;
  --font-size-2: 0.875rem;
  --font-size-3: 1rem;
  --font-size-4: 1.25rem;
  --font-size-5: 1.5rem;
  --font-size-6: 2rem;
  
  /* Font weights */
  --font-weight-1: 300;
  --font-weight-2: 400;
  --font-weight-3: 500;
  --font-weight-4: 600;
  --font-weight-5: 700;
  --font-weight-6: 800;
  
  /* Line heights */
  --line-height-default: 1.5;
  --line-height-condensed: 1.25;
  
  /* Status colors */
  --content-color-success: #10b981;
  --content-color-error: #ef4444;
  --content-color-warning: #f59e0b;
  --content-color-active: #3b82f6;
  --content-color-default: #6b7280;
  --content-color-muted: #9ca3af;
  --content-color-highlighted: #fbbf24;
  --content-color-primary: #6366f1;
  --content-color-secondary: #8b5cf6;
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