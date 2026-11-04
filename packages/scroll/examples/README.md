# Examples

This directory contains working examples demonstrating various features of @niceprototypes/scroll.

## Available Examples

### 1. Basic Sticky (`basic-sticky.tsx`)
The simplest example showing how to make a header stick to the top of the page.

**Features demonstrated:**
- `<Scroll root>` setup
- Basic `<Scroll sticky>` usage

### 2. Multiple Sticky (`multiple-sticky.tsx`)
Shows how to stack multiple sticky elements on top of each other.

**Features demonstrated:**
- Multiple `<Scroll sticky>` elements
- Using the sticky `order` option for stacking
- Automatic offset calculation

### 3. Section Navigation (`section-navigation.tsx`)
A complete navigation system with automatic active section detection.

**Features demonstrated:**
- StickySectionLinks component
- StickySection component
- Automatic active state detection
- Custom link rendering
- Smooth scroll animation

### 4. Fade on Scroll (`fade-on-scroll.tsx`)
Various fade effects based on scroll position.

**Features demonstrated:**
- `<Scroll fade>`
- Different fade configurations
- Fade in, fade out, and fade through
- Parallax-style effects

### 5. Complete Example (`complete-example.tsx`)
A comprehensive example combining all features.

**Features demonstrated:**
- All components together
- useScroll hook
- `sticky.onChange` callback
- Real-world application structure

## Running the Examples

These examples are written in TypeScript and use styled-components. To run them:

1. Install dependencies:
```bash
npm install @niceprototypes/scroll react react-dom styled-components
npm install -D @types/react @types/react-dom typescript
```

2. Import and use in your React application:
```tsx
import CompleteExample from './examples/complete-example'

function App() {
  return <CompleteExample />
}
```

## Code Structure

Each example follows this pattern:

```tsx
import { Scroll, /* other components */ } from '@niceprototypes/scroll'

export default function Example() {
  return (
    <Scroll root>
      {/* Your components */}
    </Scroll>
  )
}
```

## Learning Path

We recommend exploring the examples in this order:

1. Start with `basic-sticky.tsx` to understand the foundation
2. Move to `multiple-sticky.tsx` to learn about stacking
3. Explore `section-navigation.tsx` for navigation features
4. Try `fade-on-scroll.tsx` for animation effects
5. Study `complete-example.tsx` to see everything together

## Common Patterns

### Root Setup
Always wrap your app with a Scroll root:
```tsx
<Scroll root>
  {/* Your app */}
</Scroll>
```

### Sticky Stacking
Use the sticky `order` option to control stacking (lower = higher):
```tsx
<Scroll sticky={{ order: 0 }}>Header</Scroll>
<Scroll sticky={{ order: 1 }}>Nav</Scroll>
```

### Section Navigation
Combine StickySectionLinks with StickySection:
```tsx
<StickySectionLinks links={[{ href: '#intro', label: 'Intro' }]} />
<StickySection id="intro">Content</StickySection>
```

## Need Help?

- Check the main [README.md](../README.md)
- Read the [API documentation](../API.md)
- Open an issue on GitHub