# nice-react-typography

A flexible and customizable typography component for React with styled-components. Provides comprehensive text styling control with semantic HTML elements, CSS custom properties, and accessibility features.

## Why Choose nice-react-typography?

Unlike monolithic UI frameworks that enforce their design system and component ecosystem, `nice-react-typography` is built on web standards and provides direct control over typography:

### Framework Independence
- **Composable architecture**: Integrates with any UI library or framework (Material-UI, Chakra, Ant Design, or standalone)
- **Minimal dependencies**: Requires only React and styled-components
- **Incremental adoption**: Integrate into existing codebases without refactoring

### Standards-Based Design
- **CSS Custom Properties**: Uses native CSS variables rather than proprietary theming systems
- **Cross-system compatibility**: Works with any design system that uses CSS variables
- **Web standards foundation**: Relies on stable CSS specifications rather than framework-specific APIs

### Direct Control
- **Custom design tokens**: Define typography scales and weights to match your specifications
- **Value flexibility**: Accepts literal CSS values (`"1.5rem"`, `"600"`) or CSS variables (`var(--text-lg)`)
- **No theming layer**: Bypasses theme providers and context APIs in favor of standard CSS variables
- **Safe fallbacks**: CSS variables include sensible defaults (`1rem` for size, `normal` for weight) that render correctly even when design tokens are undefined

### Focused Implementation
- **Single responsibility**: Handles typography styling without additional UI concerns
- **Small package size**: ~10KB compared to 100KB+ for full UI frameworks
- **Minimal runtime cost**: No theme context lookups or prop transformation overhead

Designed for teams building production applications who need reliable typography without framework dependencies, or for design systems requiring precise control over type rendering.

## Features

- 🎯 **Semantic HTML**: Supports h1-h4, p, and span elements
- 📏 **Flexible Sizing**: CSS custom property-based sizing with fallbacks
- 🎨 **Rich Styling**: Weight, color, alignment, and line-height control
- 🔤 **Code Support**: Monospace font styling for code snippets
- ♿ **Accessibility**: Font antialiasing and legibility optimizations
- 💪 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🎨 **CSS Variables**: Uses CSS custom properties for flexible theming

## Installation

```bash
npm install nice-react-typography
```

### Optional: Install CSS Variables Package

For a complete design system with pre-defined CSS custom properties, install `nice-styles`:

```bash
npm install nice-styles
```

Then import the CSS variables in your app:

```css
/* Import all variables */
@import 'nice-styles/variables.css';

/* Or import individual categories for better performance */
@import 'nice-styles/static/css/font-size.css';
@import 'nice-styles/static/css/content-color.css';
@import 'nice-styles/static/css/line-height.css';
```

The `nice-styles` package provides:
- Font size scale (12px - 24px)
- Content colors with semantic meanings (success, error, warning, etc.)
- Line heights (default and condensed)
- Font families (heading, body, code)
- And more design tokens

You can also use the constants directly in JavaScript/TypeScript:

```typescript
import { fontSize, contentColor } from 'nice-styles'

console.log(fontSize.default) // '16px'
console.log(contentColor.success) // 'hsla(146, 68%, 44%, 1)'
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

// Custom color with CSS variable
<Typography color="var(--content-color-success)">
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
| `children` | `React.ReactNode` | - | Text content or elements (required) |
| `as` | `TypographyAsType` | `"p"` | HTML element: `"h1"`, `"h2"`, `"h3"`, `"h4"`, `"p"`, `"span"` |
| `size` | `string` | `var(--typography-size-default, 1rem)` | Font size (any CSS size value or variable) |
| `weight` | `string` | `var(--typography-weight-default, normal)` | Font weight (any CSS weight value or variable) |
| `align` | `AlignType` | - | Text alignment: `"left"`, `"center"`, `"right"`, `"justify"` |
| `lineHeight` | `LineHeightType` | Based on `as` prop | Line height: `"default"` or `"condensed"` |
| `color` | `string` | - | Custom text color (any CSS color value or variable) |
| `antialiased` | `boolean` | `false` | Enable font antialiasing |
| `legibilityOptimized` | `boolean` | `false` | Apply legibility optimizations |
| `code` | `boolean` | `false` | Apply monospace font for code |
| `className` | `string` | - | CSS class name |

## CSS Custom Properties

The component uses CSS custom properties with built-in fallback values, ensuring typography renders correctly even when design tokens are not defined.

### Fallback Mechanism

All CSS variables include safe defaults using the native CSS `var()` fallback syntax:

```css
/* Component implementation */
font-size: var(--typography-size-default, 1rem);     /* Falls back to 1rem */
font-weight: var(--typography-weight-default, normal); /* Falls back to normal */
```

This means the component works immediately after installation without requiring CSS variable definitions. Define custom values only when needed to override defaults.

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

All variables are optional. Undefined variables automatically use their fallback values.

## Status Types

Status props map to semantic CSS custom properties. The Typography component supports the following status types:

```css
:root {
  /* Core status colors (provided by nice-styles v3.0.0+) */
  --status-color-active: hsla(202, 100%, 50%, 1);
  --status-color-success: hsla(146, 68%, 44%, 1);
  --status-color-error: hsla(10, 92%, 63%, 1);
  --status-color-warning: hsla(29, 98%, 62%, 1);

  /* Shade variants (provided by nice-styles v3.0.0+) */
  --content-color-darker: hsla(210, 15%, 5%, 1);
  --content-color-dark: hsla(210, 5%, 25%, 1);
  --content-color-default: hsla(210, 5%, 45%, 1);
  --content-color-light: hsla(210, 5%, 65%, 1);
  --content-color-lighter: hsla(210, 5%, 85%, 1);

  /* Extended status colors (define these in your app if needed) */
  --content-color-disabled: #9ca3af;
  --content-color-highlighted: #fbbf24;
  --content-color-primary: #6366f1;
  --content-color-secondary: #8b5cf6;
}
```

### Available Status Types

The Typography component supports these status types:

- **Core status colors (from nice-styles v3.0.0+)**: `active`, `error`, `success`, `warning` → mapped to `--status-color-*`
- **Shade variants (from nice-styles v3.0.0+)**: `darker`, `dark`, `default`, `light`, `lighter` → mapped to `--content-color-*`
- **Extended (custom)**: `disabled`, `highlighted`, `primary`, `secondary` → mapped to `--content-color-*`

Note: Core status colors and shade variants are provided by `nice-styles` v3.0.0+. Extended status colors must be defined in your application's CSS if you want to use them.

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

- React 19.1.1+
- styled-components 6.0+
- nice-styles (optional) - Provides CSS custom property definitions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## License

MIT License - see LICENSE file for details