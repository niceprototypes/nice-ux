# nice-react-button

A flexible and customizable React button component with built-in theming support, designed to work seamlessly with the nice-react ecosystem.

> **⚠️ Storybook Notice**: Storybook has been temporarily removed due to React 19 compatibility issues. The Storybook configuration is preserved in the `storybook-preserve` branch and will be restored when Storybook officially supports React 19.

## Features

- 🎨 **Theming**: Full CSS variable support with customizable themes
- 📐 **Flexible Sizing**: 4 predefined sizes (1-4) with responsive scaling
- 🎯 **Multiple Variants**: Primary, secondary, muted, highlighted styles
- 🔄 **State Management**: Disabled, success, error, warning, active states
- 🖼️ **Icon Support**: Built-in icon support with nice-react-icon
- ♿ **Accessibility**: ARIA support, keyboard navigation, screen reader friendly
- 📱 **Responsive**: Works across all device sizes
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- 🎭 **Custom Styling**: CSS-in-JS with styled-components

## Installation

```bash
npm install nice-react-button
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom styled-components nice-react-typography nice-react-flex
```

## Quick Start

```tsx
import React from 'react'
import Button from 'nice-react-button'

function App() {
  return (
    <Button
      status="primary"
      onClick={() => console.log('Button clicked!')}
    >
      Click me
    </Button>
  )
}
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `1 \| 2 \| 3 \| 4` | `3` | Button size (smallest to largest) |
| `status` | `ButtonStatusType` | `"primary"` | Visual variant of the button |
| `state` | `ButtonStateType` | `"default"` | Interactive state of the button |
| `icon` | `string` | - | Icon name from nice-react-icon |
| `iconPosition` | `"left" \| "right"` | `"right"` | Position of icon relative to text |
| `iconRotation` | `number` | `0` | Icon rotation in degrees |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `fullWidth` | `boolean` | `false` | Whether button takes full container width |
| `onClick` | `() => void` | - | Click event handler |
| `theme` | `ButtonTheme` | - | Theme configuration object |
| `className` | `string` | - | Additional CSS class |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | HTML button type |

### Status Types

- `"primary"` - Primary action button (filled)
- `"secondary"` - Secondary action button (outlined)
- `"default"` - Default button styling
- `"muted"` - Subdued button styling
- `"highlighted"` - Emphasized button styling

### State Types

- `"default"` - Normal interactive state
- `"disabled"` - Non-interactive state
- `"success"` - Success state styling
- `"error"` - Error state styling
- `"warning"` - Warning state styling
- `"active"` - Active/pressed state

## Usage Examples

### Basic Buttons

```tsx
import Button from 'nice-react-button'

// Primary button
<Button status="primary" onClick={handleClick}>
  Save Changes
</Button>

// Secondary button
<Button status="secondary" onClick={handleClick}>
  Cancel
</Button>

// Different sizes
<Button size={1}>Small</Button>
<Button size={2}>Medium</Button>
<Button size={3}>Large</Button>
<Button size={4}>Extra Large</Button>
```

### Buttons with Icons

Icons are automatically rendered using nice-react-icon. Just specify the icon name:

```tsx
import Button from 'nice-react-button'

// Button with right icon (default)
<Button
  icon="arrow"
  onClick={handleClick}
>
  Next Step
</Button>

// Button with left icon
<Button
  icon="check"
  iconPosition="left"
  onClick={handleClick}
>
  Save Changes
</Button>

// Button with rotated icon
<Button
  icon="arrow"
  iconRotation={180}
  iconPosition="left"
  onClick={handleClick}
>
  Previous
</Button>

// Icon-only button
<Button
  icon="search"
  aria-label="Search"
  onClick={handleClick}
/>
```

### Button States

```tsx
// Disabled button
<Button disabled>
  Disabled Button
</Button>

// Success state
<Button state="success">
  Form Saved
</Button>

// Error state
<Button state="error">
  Delete Item
</Button>

// Warning state
<Button state="warning">
  Proceed with Caution
</Button>
```

### Full Width Button

```tsx
<Button fullWidth status="primary">
  Full Width Button
</Button>
```

### Custom Theming

```tsx
import Button, { ButtonTheme } from 'nice-react-button'

const customTheme: ButtonTheme = {
  colors: {
    primary: '#6366f1',
    secondary: '#64748b',
  },
  cssVariables: {
    contentColor: 'var(--my-text-color)',
    borderColor: 'var(--my-border-color)',
    borderWidth: '2px',
  }
}

<Button theme={customTheme} status="primary">
  Themed Button
</Button>
```

## CSS Variables

The component uses CSS variables for theming. Define these in your application:

```css
:root {
  /* Content colors */
  --content-color-1: #000000;
  --content-color-1-inverse: #ffffff;
  --content-color-2: #374151;
  --content-color-3: #9ca3af;

  /* Background colors */
  --background-color-1-inverse: #000000;

  /* Border colors */
  --border-color-default: #d1d5db;
  --border-width-1: 1px;

  /* Sizes */
  --cell-height-1: 24px;
  --cell-height-2: 32px;
  --cell-height-3: 40px;
  --cell-height-4: 48px;

  /* States */
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  --color-focus: #3b82f6;
}
```

## Accessibility

The component includes built-in accessibility features:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility

```tsx
<Button
  aria-label="Save document"
  data-testid="save-button"
>
  Save
</Button>
```

## Advanced Usage

### Custom Styling

You can extend the button with custom styles:

```tsx
import styled from 'styled-components'
import Button from 'nice-react-button'

const CustomButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" status="primary">
    Submit Form
  </Button>

  <Button type="reset" status="secondary">
    Reset Form
  </Button>
</form>
```

## Migration from helpshelf-ui

If you're migrating from the internal Button component:

1. Install `nice-react-button`
2. Update your imports:
   ```tsx
   // Before
   import Button from '@/components/Button'

   // After
   import Button from 'nice-react-button'

   // Icons work automatically now
   <Button icon="arrow">
     Click me
   </Button>
   ```

## Development

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build

```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © Nice Prototypes