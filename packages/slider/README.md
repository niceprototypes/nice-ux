# nice-react-slider

A smooth, animated vertical slider component for React applications with styled-components.

## Installation

```bash
npm install nice-react-slider
```

## Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react styled-components
```

## Usage

```tsx
import Slider from 'nice-react-slider'
import { useState } from 'react'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    setIsAnimating(true)
    setCurrentIndex((prev) => prev + 1)
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  return (
    <Slider
      currentIndex={currentIndex}
      isAnimating={isAnimating}
      onAnimationComplete={handleAnimationComplete}
    >
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Slider>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode[]` | **required** | Array of React elements to display as slides |
| `currentIndex` | `number` | `0` | Index of the currently active slide |
| `isAnimating` | `boolean` | `false` | Whether the slider is currently animating |
| `onAnimationComplete` | `() => void` | `undefined` | Callback fired when animation completes (after 300ms) |

## Features

- Smooth vertical sliding animations
- Customizable animation state management
- Hidden scrollbars for clean UI
- TypeScript support
- Lightweight and performant

## License

MIT
