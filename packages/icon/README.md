# nice-react-icon

A flexible and customizable React icon component with built-in icon set and theming support.

## Features

- 🎨 **30+ Built-in Icons**: Comprehensive icon set with fill and stroke variants
- 📐 **Flexible Sizing**: 4 predefined sizes (1-4) with responsive scaling
- 🎯 **Status-based Theming**: Automatic color theming based on status
- 🔄 **Animations**: Built-in spinning animation and rotation support
- 🖼️ **Custom SVG Support**: Use your own SVG URLs
- ♿ **Accessibility**: Proper ARIA support and screen reader friendly
- 📱 **Responsive**: Works across all device sizes
- 🔧 **TypeScript**: Full type safety and IntelliSense support

## Installation

```bash
npm install nice-react-icon
```

### Peer Dependencies

```bash
npm install react styled-components
```

## Quick Start

```tsx
import Icon from 'nice-react-icon'

function App() {
  return (
    <Icon
      name="arrow"
      size={3}
      variant="stroke"
      color="blue"
    />
  )
}
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `IconNameType` | - | Icon name from the built-in set |
| `variant` | `"fill" \| "stroke"` | `"stroke"` | Icon variant style |
| `url` | `string` | - | Custom SVG URL (overrides name) |
| `color` | `string` | - | Icon color (CSS value) |
| `backgroundColor` | `string` | - | Background color for icon container |
| `size` | `1 \| 2 \| 3 \| 4` | `3` | Icon size (smallest to largest) |
| `borderRadius` | `1 \| 2 \| 3` | - | Border radius for icon container |
| `imageSize` | `string` | `"30%"` | Image size as percentage of container |
| `status` | `StatusType` | - | Status for automatic theming |
| `spinning` | `boolean` | `false` | Whether icon should spin |
| `rotation` | `number` | `0` | Rotation angle in degrees |
| `strokeWidth` | `1 \| 2` | `1` | Stroke width for stroke variant |
| `isActive` | `boolean` | `true` | Whether icon is in active state |
| `className` | `string` | - | Additional CSS class |

## Available Icons

The following icons are available in both `fill` and `stroke` variants:

- arrow
- attention
- box
- brush
- calendar
- cancel
- carat
- check
- cloud
- code
- cog
- contact
- content
- edit
- link
- lock
- menu
- message
- pause
- placeholder
- plus
- profile
- puzzle
- search
- shuffle
- skip
- spinner
- trash
- upload
- x

## Usage Examples

### Basic Icons

```tsx
import Icon from 'nice-react-icon'

// Arrow icon
<Icon name="arrow" />

// Check icon with custom color
<Icon name="check" color="#10b981" />

// Plus icon with fill variant
<Icon name="plus" variant="fill" />
```

### Different Sizes

```tsx
<Icon name="search" size={1} /> // Small
<Icon name="search" size={2} /> // Medium
<Icon name="search" size={3} /> // Large (default)
<Icon name="search" size={4} /> // Extra Large
```

### With Rotation and Animation

```tsx
// Rotate 90 degrees
<Icon name="arrow" rotation={90} />

// Spinning icon
<Icon name="spinner" spinning />

// Loading state with auto-spin
<Icon status="active" />
```

### Status-based Theming

```tsx
<Icon name="check" status="success" />
<Icon name="x" status="error" />
<Icon name="attention" status="warning" />
<Icon name="arrow" status="primary" />
```

### Custom SVG

```tsx
<Icon
  url="/path/to/custom-icon.svg"
  size={3}
  color="#6366f1"
/>
```

### With Background and Border Radius

```tsx
<Icon
  name="profile"
  backgroundColor="#f3f4f6"
  borderRadius={3}
  size={4}
/>
```

## CSS Variables

The component uses CSS variables for theming. Define these in your application:

```css
:root {
  /* Icon stroke colors */
  --icon-stroke-color-primary: currentColor;
  --icon-stroke-color-default: currentColor;

  /* Content colors for status */
  --content-color-primary: #000;
  --content-color-success: #10b981;
  --content-color-error: #ef4444;
  --content-color-warning: #f59e0b;

  /* Sizes */
  --cell-height-1: 16px;
  --cell-height-2: 24px;
  --cell-height-3: 32px;
  --cell-height-4: 40px;

  /* Border radius */
  --border-radius-1: 4px;
  --border-radius-2: 8px;
  --border-radius-3: 12px;

  /* Icon stroke width */
  --icon-stroke-width-1: 1.5;
  --icon-stroke-width-2: 2;

  /* Animation */
  --animation-duration-1: 0.2s;
  --animation-easing-1: ease;
}
```

## TypeScript

The component is fully typed. Import types as needed:

```tsx
import Icon, { IconProps, IconNameType, StatusType } from 'nice-react-icon'

const MyComponent: React.FC = () => {
  const iconName: IconNameType = 'arrow'
  const status: StatusType = 'primary'

  return <Icon name={iconName} status={status} />
}
```

## License

MIT © Nice Prototypes